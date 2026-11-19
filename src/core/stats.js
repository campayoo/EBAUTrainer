/**
 * stats.js — Cálculo de progreso y estadísticas (funciones puras).
 *
 * Recibe el temario y el progreso del alumno, y devuelve números listos para
 * mostrar: porcentajes por asignatura/bloque/tema, puntos débiles, racha...
 */

import { addDays, startOfWeek, diffDays } from './dates.js';

/** Porcentaje y dominio medio de una lista de unidades. */
export function aggregate(units, progress) {
  const total = units.length;
  const completed = units.filter((u) => progress[u.id]?.completed).length;
  const masteries = units.filter((u) => progress[u.id]?.completed).map((u) => progress[u.id].mastery);
  const mastery = masteries.length ? masteries.reduce((a, b) => a + b, 0) / masteries.length : 0;
  return { total, completed, pct: total ? completed / total : 0, mastery };
}

/** Árbol de progreso: asignatura -> bloques -> temas -> unidades. */
export function progressTree(subject, progress) {
  const blocks = subject.blocks.map((b) => {
    const topics = b.topics.map((tp) => ({ ...tp, stats: aggregate(tp.units, progress) }));
    return { ...b, topics, stats: aggregate(topics.flatMap((tp) => tp.units), progress) };
  });
  const allUnits = blocks.flatMap((b) => b.topics.flatMap((tp) => tp.units));
  return { ...subject, blocks, stats: aggregate(allUnits, progress) };
}

/**
 * Puntos débiles: unidades vistas con dominio bajo, de peor a mejor.
 * Se ordenan por (1 - dominio) x peso en el examen.
 */
export function weakPoints(units, progress, limit = 5) {
  return units
    .filter((u) => progress[u.id]?.completed && progress[u.id].mastery < 0.7)
    .map((u) => ({ unit: u, mastery: progress[u.id].mastery, priority: (1 - progress[u.id].mastery) * (u.examWeight ?? 1) }))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

/** Racha: días consecutivos (hasta hoy o ayer) con al menos una sesión hecha. */
export function streak(history, today) {
  const days = new Set(history.filter((h) => h.status === 'done').map((h) => h.date));
  let d = days.has(today) ? today : addDays(today, -1);
  let count = 0;
  while (days.has(d)) {
    count++;
    d = addDays(d, -1);
  }
  return count;
}

/** Cumplimiento del planning: sesiones hechas / (hechas + perdidas). */
export function compliance(history) {
  const done = history.filter((h) => h.status === 'done' && h.planned !== false).length;
  const missed = history.filter((h) => h.status === 'missed').length;
  return done + missed === 0 ? null : done / (done + missed);
}

/** Minutos estudiados por semana (últimas `weeks` semanas, de la más antigua a la actual). */
export function minutesPerWeek(history, today, weeks = 8) {
  const current = startOfWeek(today);
  const out = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const monday = addDays(current, -7 * i);
    const end = addDays(monday, 7);
    const minutes = history
      .filter((h) => h.status === 'done' && h.date >= monday && h.date < end)
      .reduce((a, h) => a + (h.minutes ?? 0), 0);
    out.push({ week: monday, minutes });
  }
  return out;
}

/** Días que faltan para el examen. */
export const daysUntil = (today, examDate) => diffDays(today, examDate);
