/**
 * exam.js — Simulacros de examen con el formato de la PAU (funciones puras).
 *
 * La estructura de cada examen (apartados, puntos, optatividad) está en
 * content/<asignatura>/exam.yaml. Aquí se construye un examen concreto con
 * ejercicios generados y se corrige.
 */

import { generateExercise } from './generators/index.js';
import { createRng } from './random.js';
import { grade } from './grading.js';

/**
 * Construye un simulacro.
 * Para cada apartado se crean 1 o 2 opciones (según `options`), cada una con
 * `questions` preguntas de generadores DISTINTOS.
 */
export function buildMockExam(examDef, seed) {
  const rng = createRng(seed);
  return {
    subjectId: examDef.subject,
    seed,
    durationMinutes: examDef.duration_minutes ?? 90,
    sections: examDef.sections.map((sec) => {
      const pool = rng.shuffle(sec.generators);
      const options = [];
      for (let o = 0; o < sec.options; o++) {
        const ids = pool.slice(o * sec.questions, (o + 1) * sec.questions);
        options.push(ids.map((id) => generateExercise(id, rng.int(1, 2 ** 31 - 1))));
      }
      return { id: sec.id, title: sec.title, points: sec.points, options };
    }),
  };
}

/**
 * Corrige un simulacro.
 * @param exam     el examen construido
 * @param answers  { [exerciseId]: respuesta (texto o índice de opción) }
 * @param chosen   { [sectionId]: índice de la opción elegida }
 * @returns { grade (0-10), sections: [{ id, title, max, points, option, items }] }
 */
export function gradeMockExam(exam, answers, chosen) {
  let total = 0;
  const sections = exam.sections.map((sec) => {
    const option = sec.options.length > 1 ? (chosen[sec.id] ?? 0) : 0;
    const items = sec.options[option];
    const perQuestion = sec.points / items.length;
    const graded = items.map((ex) => {
      const answer = answers[ex.id];
      const empty = answer === undefined || answer === '' || answer === null;
      const result = empty ? { correct: false, score: 0, status: 'blank', message: 'Sin responder.' } : grade(ex.answer, answer);
      return { exercise: ex, answer, result, points: Math.round(perQuestion * result.score * 100) / 100 };
    });
    const points = graded.reduce((a, g) => a + g.points, 0);
    total += points;
    return { id: sec.id, title: sec.title, max: sec.points, points: Math.round(points * 100) / 100, option, items: graded };
  });
  return { grade: Math.round(total * 100) / 100, sections };
}
