/**
 * lesson.js — La clase diaria como MÁQUINA DE ESTADOS.
 *
 * Una clase es una secuencia fija de pasos:
 *   calentamiento -> explicación -> ejemplo resuelto -> práctica guiada -> mini test -> cierre
 *
 * Separamos dos cosas:
 *   - `lesson`: QUÉ se enseña (se construye una vez con buildLesson).
 *   - `state`:  POR DÓNDE va el alumno y cómo le está yendo.
 * Las funciones que cambian el estado devuelven un estado NUEVO en vez de
 * modificar el anterior (inmutabilidad). La interfaz solo tiene que dibujar
 * el estado actual; así la lógica se puede testear sin interfaz.
 */

import { generateExercise, hasGenerator } from './generators/index.js';
import { createRng } from './random.js';

export const STEP_LABELS = {
  warmup: 'Calentamiento',
  explanation: 'Explicación',
  example: 'Ejemplo resuelto',
  practice: 'Práctica guiada',
  test: 'Mini test',
  self: 'Autoevaluación',
  summary: 'Cierre',
};

/** Pasa un ejercicio escrito en YAML al mismo formato que los generados. */
export function normalizeExercise(raw) {
  const hints = (raw.hints ?? []).map((h) => (typeof h === 'string' ? h : h.text));
  let answer;
  if (raw.kind === 'choice' || raw.options) {
    answer = { kind: 'choice', options: raw.options.map((o) => (typeof o === 'string' ? { text: o } : o)), correct: raw.correct };
  } else {
    answer = { kind: 'numeric', ...raw.answer };
  }
  return {
    id: raw.id,
    title: raw.title,
    statement: raw.statement,
    answer,
    hints,
    solution: raw.solution ?? '',
    commonError: raw.common_error ?? raw.commonError,
  };
}

/**
 * Construye la clase de una unidad.
 * @param unit       unidad del temario
 * @param lessonDef  contenido completo de la unidad (o null si no tiene)
 * @param warmup     ejercicios de calentamiento ya preparados
 * @param seed       semilla para los ejercicios generados
 */
export function buildLesson({ unit, lessonDef, warmup = [], seed = 1 }) {
  const rng = createRng(seed);
  const generators = (unit.generators ?? []).filter(hasGenerator);
  const gen = (count) =>
    Array.from({ length: count }, (_, i) => generateExercise(generators[i % generators.length], rng.int(1, 2 ** 31 - 1)));

  const steps = [];
  const warmupItems = warmup.length > 0 ? warmup : (lessonDef?.warmup ?? []).map(normalizeExercise);
  if (warmupItems.length > 0) steps.push({ type: 'warmup', items: warmupItems });

  let mode;
  if (lessonDef) {
    // Clase COMPLETA: todo el contenido viene del YAML de la unidad.
    mode = 'full';
    steps.push({ type: 'explanation', items: lessonDef.explanation ?? [] });
    if (lessonDef.examples?.length) steps.push({ type: 'example', items: lessonDef.examples });
    // Práctica: los ejercicios escritos a mano + una variante generada.
    // Si la clase no trae ejercicios propios, se usan 3 generados.
    const practice = (lessonDef.practice ?? []).map(normalizeExercise);
    if (generators.length > 0) practice.push(...gen(practice.length > 0 ? 1 : 3));
    if (practice.length) steps.push({ type: 'practice', items: practice });
    // Test: el escrito a mano o, si no hay, 2 ejercicios generados.
    let test = (lessonDef.test ?? []).map(normalizeExercise);
    if (test.length === 0 && generators.length > 0) test = gen(2);
    if (test.length) steps.push({ type: 'test', items: test });
  } else if (generators.length > 0) {
    // Clase EXPRÉS: unidad sin teoría escrita, pero con ejercicios generados.
    mode = 'express';
    steps.push({
      type: 'explanation',
      items: [{
        title: 'Clase exprés',
        body: `Esta unidad todavía no tiene la teoría escrita en Pauta. Repasa la teoría de **${unit.title}** en tu libro o apuntes y, después, practica aquí con ejercicios generados: tienen pistas por niveles y solución paso a paso.`,
      }],
    });
    steps.push({ type: 'practice', items: gen(3) });
    steps.push({ type: 'test', items: gen(2) });
  } else {
    // Sin contenido ni generadores: el alumno estudia por su cuenta y se autoevalúa.
    mode = 'self';
    steps.push({
      type: 'explanation',
      items: [{ title: 'Estudio autónomo', body: `Para **${unit.title}** todavía no hay contenido en la app. Estudia el tema con tus materiales y, al terminar, dime qué tal te ha ido.` }],
    });
    steps.push({ type: 'self', items: [{ id: `${unit.id}#self` }] });
  }
  steps.push({ type: 'summary', items: [{ id: 'summary' }] });

  return { unitId: unit.id, mode, steps, summary: lessonDef?.summary ?? [], commonErrors: lessonDef?.common_errors ?? [] };
}

/**
 * Sesión corta de REPASO o REFUERZO de una unidad ya vista.
 * Usa ejercicios generados (variantes nuevas) o, si la unidad no tiene
 * generadores, las preguntas de su clase completa.
 */
export function buildReview({ unit, lessonDef, kind = 'review', seed = 1 }) {
  const rng = createRng(seed);
  const count = kind === 'reinforce' ? 4 : 3;
  const generators = (unit.generators ?? []).filter(hasGenerator);
  let items;
  if (generators.length > 0) {
    items = Array.from({ length: count }, (_, i) => generateExercise(generators[i % generators.length], rng.int(1, 2 ** 31 - 1)));
  } else {
    const pool = [...(lessonDef?.practice ?? []), ...(lessonDef?.test ?? [])].map(normalizeExercise);
    items = rng.shuffle(pool).slice(0, count);
  }
  const steps = [];
  if (kind === 'reinforce' && lessonDef?.explanation?.length) {
    // En el refuerzo se vuelve a ver la teoría antes de practicar.
    steps.push({ type: 'explanation', items: lessonDef.explanation });
  }
  if (items.length > 0) steps.push({ type: 'practice', items });
  else steps.push({ type: 'self', items: [{ id: `${unit.id}#self` }] });
  steps.push({ type: 'summary', items: [{ id: 'summary' }] });
  return { unitId: unit.id, mode: kind, steps, summary: lessonDef?.summary ?? [], commonErrors: lessonDef?.common_errors ?? [] };
}

/* ------------------------------ Estado ------------------------------ */

export function initialState() {
  return { step: 0, item: 0, results: {}, finished: false };
}

export const currentStep = (lesson, state) => lesson.steps[state.step];
export const currentItem = (lesson, state) => currentStep(lesson, state)?.items[state.item];

/** Resultado de un ejercicio (o uno vacío). */
export function resultOf(state, exerciseId) {
  return state.results[exerciseId] ?? { attempts: 0, hintsUsed: 0, solutionShown: false, correct: false, score: 0, lastMessage: null, lastStatus: null };
}

const withResult = (state, id, patch) => ({
  ...state,
  results: { ...state.results, [id]: { ...resultOf(state, id), ...patch } },
});

/** Registra una respuesta ya corregida (gradeResult viene de grading.js). */
export function recordAnswer(state, exerciseId, gradeResult, { stepType } = {}) {
  const prev = resultOf(state, exerciseId);
  if (prev.correct) return state; // ya estaba bien: no se vuelve a puntuar
  if (stepType === 'test' && prev.attempts > 0) return state; // en el test, un único intento
  const attempts = prev.attempts + 1;
  let score = 0;
  if (gradeResult.correct && !prev.solutionShown) {
    // Cada pista resta un 25 % y cada intento fallido previo un 15 %.
    score = gradeResult.score * Math.max(0.25, 1 - 0.25 * prev.hintsUsed) * (attempts > 1 ? 0.85 : 1);
  }
  return withResult(state, exerciseId, {
    attempts,
    correct: gradeResult.correct,
    score: Math.round(score * 100) / 100,
    lastMessage: gradeResult.message,
    lastStatus: gradeResult.status,
  });
}

/** Muestra la siguiente pista (como mucho 3). */
export function revealHint(state, exerciseId, maxHints = 3) {
  const prev = resultOf(state, exerciseId);
  if (prev.hintsUsed >= maxHints || prev.correct) return state;
  return withResult(state, exerciseId, { hintsUsed: prev.hintsUsed + 1 });
}

/** Muestra la solución completa (el ejercicio deja de puntuar). */
export function showSolution(state, exerciseId) {
  return withResult(state, exerciseId, { solutionShown: true });
}

/** Autoevaluación (modo 'self'): 0 = mal, 1 = regular, 2 = bien. */
export function selfAssess(state, itemId, level) {
  const score = [0.4, 0.7, 0.95][level] ?? 0.7;
  return withResult(state, itemId, { attempts: 1, correct: true, score, lastStatus: 'self' });
}

/** Avanza al siguiente elemento o paso. */
export function advance(lesson, state) {
  const step = currentStep(lesson, state);
  if (state.item + 1 < step.items.length) return { ...state, item: state.item + 1 };
  if (state.step + 1 < lesson.steps.length) return { ...state, step: state.step + 1, item: 0 };
  return { ...state, finished: true };
}

/** Retrocede (solo para releer explicaciones y ejemplos). */
export function back(lesson, state) {
  if (state.item > 0) return { ...state, item: state.item - 1 };
  if (state.step > 0) {
    const prev = lesson.steps[state.step - 1];
    return { ...state, step: state.step - 1, item: prev.items.length - 1 };
  }
  return state;
}

/** ¿Puede el alumno pasar al siguiente elemento? (en ejercicios, tras responder). */
export function canAdvance(lesson, state) {
  const step = currentStep(lesson, state);
  const item = currentItem(lesson, state);
  if (['practice', 'test', 'warmup'].includes(step.type)) {
    const r = resultOf(state, item.id);
    return r.correct || r.solutionShown || (step.type !== 'practice' && r.attempts > 0) || r.attempts >= 3;
  }
  if (step.type === 'self') return resultOf(state, item.id).attempts > 0;
  return true;
}

/**
 * Nota final de la clase (0-1): práctica 40 % + test 60 %.
 * El calentamiento no puntúa: sirve para activar lo aprendido.
 */
export function computeScore(lesson, state) {
  const avg = (type) => {
    const step = lesson.steps.find((s) => s.type === type);
    if (!step || step.items.length === 0) return null;
    const total = step.items.reduce((sum, it) => sum + resultOf(state, it.id).score, 0);
    return total / step.items.length;
  };
  const practice = avg('practice');
  const test = avg('test');
  const self = avg('self');
  let score;
  if (self !== null) score = self;
  else if (practice !== null && test !== null) score = 0.4 * practice + 0.6 * test;
  else score = practice ?? test ?? 0;
  const hintsUsed = Object.values(state.results).reduce((s, r) => s + r.hintsUsed, 0);
  return { score: Math.round(score * 100) / 100, practice, test, hintsUsed };
}

/** Mensaje de cierre del profesor según la nota. */
export function closingMessage(score) {
  if (score >= 0.85) return '¡Muy bien! Dominas esta unidad. Adelantaré lo siguiente y la repasaremos más adelante para que no se olvide.';
  if (score >= 0.6) return 'Buen trabajo. Lo tienes bastante claro; la repasaremos pronto para afianzarla.';
  if (score >= 0.4) return 'Vas por buen camino, pero aún cuesta. Te programaré un repaso en los próximos días.';
  return 'Esta unidad se te ha atragantado, y es normal. Le dedicaré una sesión de refuerzo en los próximos días antes de seguir.';
}
