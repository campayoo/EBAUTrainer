/**
 * srs.js — Repaso espaciado (Spaced Repetition System) con el algoritmo SM-2.
 *
 * Idea: lo que acabas de aprender se olvida rápido, pero cada repaso hecho
 * en el momento justo hace que tardes más en olvidarlo. SM-2 (de SuperMemo,
 * 1987) calcula cuántos días esperar hasta el siguiente repaso:
 *   - si respondes bien, el intervalo crece (1 día, 6 días, 6·EF, ...);
 *   - si respondes mal, vuelves a empezar (repaso al día siguiente).
 * EF ("easiness factor") mide lo fácil que te resulta esa unidad (mínimo 1,3).
 *
 * También calculamos el "dominio" (mastery) de cada unidad, de 0 a 1,
 * que usa el planificador para decidir cuánto tiempo dedicarle.
 */

import { addDays } from './dates.js';

/** Estado inicial de una unidad que nunca se ha estudiado. */
export function initialProgress() {
  return {
    mastery: 0,
    completed: false,
    completedAt: null,
    ef: 2.5, // valor inicial estándar de SM-2
    interval: 0,
    reps: 0,
    nextReview: null,
    sessions: 0,
    hintsUsed: 0,
    lastScore: null,
  };
}

/** Convierte una nota de 0 a 1 en la "calidad" de 0 a 5 que usa SM-2. */
export function scoreToQuality(score) {
  return Math.max(0, Math.min(5, Math.round(score * 5)));
}

/**
 * Aplica SM-2 tras estudiar o repasar una unidad.
 * @param progress estado anterior de la unidad
 * @param score    nota de la sesión (0-1)
 * @param today    fecha ISO
 * @returns un estado NUEVO (no modifica el anterior: inmutabilidad)
 */
export function applyReview(progress, score, today) {
  const p = { ...initialProgress(), ...progress };
  const q = scoreToQuality(score);

  let { reps, interval, ef } = p;
  if (q < 3) {
    // Respuesta deficiente: se reinicia la serie.
    reps = 0;
    interval = 1;
  } else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.round(interval * ef);
  }
  // Fórmula original de SM-2 para actualizar la facilidad.
  ef = Math.max(1.3, ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

  // Dominio: media ponderada que da más peso a lo reciente.
  const mastery = p.sessions === 0 ? score : 0.6 * p.mastery + 0.4 * score;

  return {
    ...p,
    reps,
    interval,
    ef: Math.round(ef * 100) / 100,
    nextReview: addDays(today, interval),
    mastery: Math.round(mastery * 100) / 100,
    sessions: p.sessions + 1,
    lastScore: score,
  };
}

/** Unidades cuyo repaso toca hoy o ya está atrasado, de la más urgente a la menos. */
export function dueReviews(progressByUnit, today) {
  return Object.entries(progressByUnit)
    .filter(([, p]) => p.completed && p.nextReview && p.nextReview <= today)
    .sort(([, a], [, b]) => (a.nextReview < b.nextReview ? -1 : a.nextReview > b.nextReview ? 1 : a.mastery - b.mastery))
    .map(([unitId]) => unitId);
}
