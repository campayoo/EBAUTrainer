/**
 * content-lib.mjs — Carga y VALIDA el contenido educativo (carpeta content/).
 *
 * Se usa en dos sitios:
 *   - tools/build-content.mjs: genera src/content/content.generated.js
 *   - tests/content.test.mjs:   el CI falla si el contenido tiene errores
 *
 * Qué se comprueba (si algo falla, se lista con su ruta para corregirlo):
 *   1. Estructura: campos obligatorios, ids únicos y con el prefijo correcto.
 *   2. Temario: prerrequisitos que existen y SIN ciclos; generadores que existen.
 *   3. Ejercicios: 3 pistas, opciones válidas, unidades conocidas...
 *   4. Respuestas: el campo `check` (una expresión) se evalúa y debe dar
 *      el mismo valor que `answer.value`. Así se cazan errores de cálculo.
 *   5. Fórmulas: cada fórmula LaTeX se compila con KaTeX en modo estricto.
 *   6. Simulacros: los puntos de cada examen suman 10.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { parse as parseYaml } from 'yaml';
import katex from '../vendor/katex/katex.mjs';
import { extractMath } from '../src/ui/markdown.js';
import { hasGenerator } from '../src/core/generators/index.js';
import { topoSort } from '../src/core/planner.js';
import { lookupUnit, withinTolerance, gradeNumeric, plainNumber } from '../src/core/grading.js';

/** Lee un YAML y devuelve su contenido (o lanza un error con el nombre del archivo). */
function readYaml(path) {
  try {
    return parseYaml(readFileSync(path, 'utf8'));
  } catch (err) {
    throw new Error(`${path}: YAML no válido — ${err.message}`);
  }
}

/** Carga todas las asignaturas de content/<carpeta>/. */
export function loadContent(root) {
  const hash = createHash('sha256');
  const subjects = [];
  const exams = {};
  const lessons = {};
  const folders = readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();

  for (const folder of folders) {
    const dir = join(root, folder);
    const subjectPath = join(dir, 'subject.yaml');
    if (!existsSync(subjectPath)) continue;
    hash.update(readFileSync(subjectPath));
    const subject = readYaml(subjectPath);
    subject.folder = folder;
    subjects.push(subject);

    const examPath = join(dir, 'exam.yaml');
    if (existsSync(examPath)) {
      hash.update(readFileSync(examPath));
      exams[subject.id] = readYaml(examPath);
    }
    const unitsDir = join(dir, 'units');
    if (existsSync(unitsDir)) {
      for (const file of readdirSync(unitsDir).filter((f) => f.endsWith('.yaml')).sort()) {
        hash.update(readFileSync(join(unitsDir, file)));
        const lesson = readYaml(join(unitsDir, file));
        lesson.__file = `${folder}/units/${file}`;
        lessons[lesson.id] = lesson;
      }
    }
  }
  // Orden de presentación: el campo opcional `order` de subject.yaml (y si no, el de la carpeta).
  subjects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  return { version: hash.digest('hex').slice(0, 12), subjects, exams, lessons };
}

/** Valida el contenido. Devuelve la lista de errores (vacía si todo va bien). */
export function validateContent(content) {
  const errors = [];
  const err = (where, msg) => errors.push(`${where}: ${msg}`);
  const allIds = new Set();
  const allUnits = [];

  const checkId = (id, where, prefix) => {
    if (typeof id !== 'string' || !/^[a-z0-9.-]+$/.test(id)) err(where, `id no válido «${id}» (solo minúsculas, números, puntos y guiones)`);
    if (prefix && !String(id).startsWith(prefix + '.')) err(where, `el id «${id}» debería empezar por «${prefix}.»`);
    if (allIds.has(id)) err(where, `id repetido «${id}»`);
    allIds.add(id);
  };

  // 1-2. Estructura del temario
  for (const s of content.subjects) {
    const where = `${s.folder}/subject.yaml`;
    for (const field of ['id', 'name', 'short', 'color', 'blocks']) if (!s[field]) err(where, `falta el campo «${field}»`);
    checkId(s.id, where);
    for (const b of s.blocks ?? []) {
      checkId(b.id, where, s.id);
      if (!b.title) err(where, `el bloque ${b.id} no tiene título`);
      if (typeof b.examWeight !== 'number') err(where, `el bloque ${b.id} necesita examWeight numérico`);
      for (const tp of b.topics ?? []) {
        checkId(tp.id, where, b.id);
        if (!tp.units?.length) err(where, `el tema ${tp.id} no tiene unidades`);
        for (const u of tp.units ?? []) {
          checkId(u.id, where, tp.id);
          if (!u.title) err(where, `la unidad ${u.id} no tiene título`);
          if (!(u.minutes >= 20 && u.minutes <= 90)) err(where, `${u.id}: minutes debe estar entre 20 y 90`);
          if (!(u.difficulty >= 1 && u.difficulty <= 5)) err(where, `${u.id}: difficulty debe estar entre 1 y 5`);
          for (const g of u.generators ?? []) if (!hasGenerator(g)) err(where, `${u.id}: el generador «${g}» no existe`);
          allUnits.push({ ...u, subjectId: s.id, requires: u.requires ?? [] });
        }
      }
    }
  }
  const unitIds = new Set(allUnits.map((u) => u.id));
  for (const u of allUnits) {
    for (const r of u.requires) if (!unitIds.has(r)) err(u.id, `prerrequisito inexistente «${r}»`);
  }
  try {
    topoSort(allUnits);
  } catch {
    err('temario', 'hay un ciclo de prerrequisitos');
  }

  // 3-5. Lecciones completas
  const unitById = new Map(allUnits.map((u) => [u.id, u]));
  for (const [id, lesson] of Object.entries(content.lessons)) {
    const where = lesson.__file;
    if (!unitIds.has(id)) err(where, `no hay ninguna unidad «${id}» en el temario`);
    const hasGenerators = (unitById.get(id)?.generators ?? []).length > 0;
    if (!lesson.explanation?.length) err(where, 'falta la explicación');
    for (const [i, card] of (lesson.explanation ?? []).entries()) {
      if (!card.title || !card.body) err(where, `explicación #${i + 1}: necesita title y body`);
      checkMath(card.body, `${where} explicación #${i + 1}`, err);
    }
    for (const ex of lesson.examples ?? []) {
      checkMath([ex.statement, ...(ex.steps ?? []), ex.result].join('\n'), `${where} ejemplo`, err);
    }
    const exercises = [...(lesson.warmup ?? []), ...(lesson.practice ?? []), ...(lesson.test ?? [])];
    // Práctica y test pueden venir de los generadores de la unidad.
    if (!lesson.practice?.length && !hasGenerators) err(where, 'falta la práctica guiada (y la unidad no tiene generadores)');
    if (!lesson.test?.length && !hasGenerators) err(where, 'falta el mini test (y la unidad no tiene generadores)');
    if (!lesson.examples?.length) err(where, 'falta al menos un ejemplo resuelto');
    if (!lesson.summary?.length) err(where, 'falta el resumen');
    for (const ex of exercises) validateExercise(ex, where, err, checkId);
    for (const line of [...(lesson.summary ?? []), ...(lesson.common_errors ?? [])]) checkMath(line, `${where} resumen`, err);
  }

  // 6. Simulacros
  for (const [subjectId, exam] of Object.entries(content.exams)) {
    const where = `${subjectId}/exam.yaml`;
    const total = (exam.sections ?? []).reduce((a, s) => a + s.points, 0);
    if (Math.abs(total - 10) > 1e-9) err(where, `los puntos suman ${total}, no 10`);
    for (const sec of exam.sections ?? []) {
      if (![1, 2].includes(sec.options)) err(where, `sección ${sec.id}: options debe ser 1 o 2`);
      if ((sec.generators ?? []).length < sec.questions * sec.options) err(where, `sección ${sec.id}: faltan generadores para ${sec.questions * sec.options} preguntas distintas`);
      for (const g of sec.generators ?? []) if (!hasGenerator(g)) err(where, `sección ${sec.id}: el generador «${g}» no existe`);
    }
  }
  return errors;
}

function validateExercise(ex, file, err, checkId) {
  const where = `${file} [${ex.id}]`;
  checkId(ex.id, where);
  if (!ex.statement) err(where, 'falta el enunciado');
  if ((ex.hints ?? []).length !== 3) err(where, 'debe tener exactamente 3 pistas (idea, método, primer paso)');
  if (!ex.solution) err(where, 'falta la solución');
  checkMath([ex.statement, ...(ex.hints ?? []), ex.solution].join('\n'), where, err);

  if (ex.kind === 'choice') {
    if (!Array.isArray(ex.options) || ex.options.length < 2) err(where, 'necesita al menos 2 opciones');
    else if (!(ex.correct >= 0 && ex.correct < ex.options.length)) err(where, '«correct» no es un índice válido');
    for (const o of ex.options ?? []) checkMath(`${o.text ?? o} ${o.why ?? ''}`, where, err);
  } else if (ex.kind === 'numeric') {
    const a = ex.answer ?? {};
    if (typeof a.value !== 'number') return err(where, 'answer.value debe ser un número');
    if (a.unit && !lookupUnit(a.unit)) err(where, `unidad desconocida «${a.unit}» (añádela a grading.js)`);
    if (ex.check) {
      let computed;
      try {
        // Expresión escrita por el autor del contenido (repo propio, solo en build/test).
        computed = Function(`"use strict"; return (${ex.check});`)();
      } catch (e) {
        return err(where, `no se puede evaluar check «${ex.check}»: ${e.message}`);
      }
      const tolerance = a.tolerance?.absolute !== undefined ? { absolute: Math.max(a.tolerance.absolute, 1e-9) } : { relative: 0.002 };
      if (!withinTolerance(a.value, computed, tolerance)) err(where, `answer.value = ${a.value}, pero check da ${computed}`);
    }
    const typed = `${plainNumber(a.value, 4)} ${a.unit ?? ''}`;
    if (!gradeNumeric(a, typed).correct) err(where, `la propia respuesta (${typed}) no se corrige como buena`);
  } else {
    err(where, `kind debe ser «numeric» o «choice», no «${ex.kind}»`);
  }
}

/** Compila cada fórmula con KaTeX y anota las que tengan errores de sintaxis. */
function checkMath(text, where, err) {
  for (const { tex, display } of extractMath(text)) {
    try {
      katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: 'ignore' });
    } catch (e) {
      err(where, `fórmula LaTeX con error «${tex}»: ${e.message.split('\n')[0]}`);
    }
  }
}

/**
 * Convierte el contenido cargado al formato que usa la app:
 * cada unidad sabe a qué asignatura, bloque y tema pertenece,
 * y si tiene clase completa.
 */
export function compileContent(content) {
  const subjects = content.subjects.map((s) => ({
    id: s.id,
    name: s.name,
    short: s.short,
    color: s.color,
    icon: s.icon ?? '',
    description: s.description ?? '',
    blocks: s.blocks.map((b) => ({
      id: b.id,
      title: b.title,
      examSection: b.examSection,
      examWeight: b.examWeight,
      topics: b.topics.map((tp) => ({
        id: tp.id,
        title: tp.title,
        units: tp.units.map((u) => ({
          id: u.id,
          title: u.title,
          minutes: u.minutes,
          difficulty: u.difficulty,
          requires: u.requires ?? [],
          generators: u.generators ?? [],
          subjectId: s.id,
          blockId: b.id,
          topicId: tp.id,
          examWeight: b.examWeight,
          hasLesson: Boolean(content.lessons[u.id]),
        })),
      })),
    })),
  }));
  const lessons = {};
  for (const [id, l] of Object.entries(content.lessons)) {
    const { __file, ...rest } = l; // eslint-disable-line no-unused-vars
    lessons[id] = rest;
  }
  return { version: content.version, subjects, exams: content.exams, lessons };
}
