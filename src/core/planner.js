/**
 * planner.js — El algoritmo de planificación semanal.
 *
 * Es la pieza más importante del proyecto y está escrita como FUNCIONES PURAS:
 *   - no lee ni escribe en el almacenamiento, no toca la interfaz, no mira el reloj;
 *   - la misma entrada produce siempre el mismo plan (determinismo).
 * Gracias a eso se puede probar con tests automáticos (ver tests/planner.test.mjs).
 *
 * Replanificar NO es un caso especial: cuando algo cambia (añades una asignatura,
 * faltas un día, una unidad se te atraganta...), simplemente se vuelve a llamar a
 * generatePlan() con el estado nuevo, y diffPlans() explica qué ha cambiado.
 *
 * Tipos de sesión:
 *   - 'lesson'    clase de una unidad nueva (puede partirse en varios días)
 *   - 'review'    repaso espaciado corto de una unidad ya vista
 *   - 'reinforce' refuerzo de una unidad que salió mal
 *   - 'mock'      simulacro de examen (en las últimas semanas)
 */

import { addDays, diffDays, rangeDays, weekday, startOfWeek, formatShort } from './dates.js';

/** Parámetros por defecto (se pueden sobrescribir en input.options). */
export const PLANNER_DEFAULTS = {
  minSessionMinutes: 20, // no se crean sesiones más cortas
  minSplitMinutes: 25, // si una unidad se parte, cada trozo dura al menos esto
  reviewMinutes: 15, // duración de un repaso
  maxReviewsPerDay: 2, // como mucho 2 repasos al día
  reviewOffsets: [2, 7, 21], // días tras terminar una unidad en que se repasa
  reinforceMinutes: 30, // refuerzo de unidades con nota baja
  reinforceThreshold: 0.5, // por debajo de este dominio, se refuerza
  maxSameSubjectPerDay: 120, // evita días monótonos de una sola asignatura
  mockMinutes: 90, // duración de un simulacro (por confirmar con la guía oficial)
  finalPhaseRatio: 0.15, // % final del calendario reservado a repasos y simulacros
  paceTarget: 0.75, // si sobra tiempo, el temario se termina hacia el 75 % de la fase de estudio
  consolidationMinutes: 30, // práctica extra de unidades ya vistas en los días con hueco
  finalPhaseMinDays: 7,
  finalPhaseMaxDays: 21,
};

const KIND_ORDER = { reinforce: 0, review: 1, lesson: 2, mock: 3 };

/* ------------------------------------------------------------------ */
/* Funciones auxiliares (exportadas para poder testearlas)             */
/* ------------------------------------------------------------------ */

/**
 * Minutos que necesita realmente una unidad para un alumno concreto.
 *   - más dificultad -> más tiempo
 *   - asignatura con más peso ("me cuesta más") -> más tiempo
 *   - si ya domina parte (p. ej., por la prueba inicial) -> menos tiempo
 */
export function unitDemand(unit, progress, weight = 1) {
  const difficultyFactor = 0.85 + 0.1 * ((unit.difficulty ?? 3) - 1); // 0,85 ... 1,25
  const weightFactor = 0.5 + 0.5 * weight; // peso 1 -> x1; peso 1,5 -> x1,25
  const masteryFactor = 1 - 0.4 * (progress?.mastery ?? 0);
  const minutes = unit.minutes * difficultyFactor * weightFactor * masteryFactor;
  return Math.max(20, Math.round(minutes / 5) * 5); // múltiplo de 5, mínimo 20
}

/**
 * Ordenación topológica (algoritmo de Kahn): devuelve las unidades en un orden
 * en el que cada una aparece DESPUÉS de sus prerrequisitos. Si dos unidades
 * pueden ir en cualquier orden, se respeta el orden original del temario.
 * Lanza un error si hay un ciclo (A requiere B y B requiere A).
 */
export function topoSort(units) {
  const ids = new Set(units.map((u) => u.id));
  const position = new Map(units.map((u, i) => [u.id, i]));
  const pendingReqs = new Map(); // unidad -> nº de prerrequisitos sin colocar
  const dependents = new Map(); // unidad -> unidades que la necesitan
  for (const u of units) {
    const reqs = (u.requires ?? []).filter((r) => ids.has(r));
    pendingReqs.set(u.id, reqs.length);
    for (const r of reqs) {
      if (!dependents.has(r)) dependents.set(r, []);
      dependents.get(r).push(u.id);
    }
  }
  const byId = new Map(units.map((u) => [u.id, u]));
  // "ready" funciona como una cola de prioridad ordenada por posición en el temario
  const ready = units.filter((u) => pendingReqs.get(u.id) === 0).map((u) => u.id);
  const result = [];
  while (ready.length > 0) {
    ready.sort((a, b) => position.get(a) - position.get(b));
    const id = ready.shift();
    result.push(byId.get(id));
    for (const dep of dependents.get(id) ?? []) {
      pendingReqs.set(dep, pendingReqs.get(dep) - 1);
      if (pendingReqs.get(dep) === 0) ready.push(dep);
    }
  }
  if (result.length !== units.length) {
    throw new Error('Hay un ciclo de prerrequisitos en el temario.');
  }
  return result;
}

/** Cuántos días finales se reservan para repasos y simulacros. */
export function finalPhaseLength(totalDays, opt = PLANNER_DEFAULTS) {
  if (totalDays < 28) return Math.floor(totalDays / 4);
  const days = Math.round(totalDays * opt.finalPhaseRatio);
  return Math.min(opt.finalPhaseMaxDays, Math.max(opt.finalPhaseMinDays, days));
}

/* ------------------------------------------------------------------ */
/* Algoritmo principal                                                 */
/* ------------------------------------------------------------------ */

/**
 * Genera el plan de estudio desde `today` hasta el día anterior al examen.
 *
 * @param input {
 *   today:        'AAAA-MM-DD',
 *   examDate:     'AAAA-MM-DD',
 *   availability: [min domingo, min lunes, ..., min sábado],
 *   usedToday:    minutos ya estudiados hoy (opcional),
 *   subjects:     [{ id, weight }],
 *   units:        [{ id, subjectId, minutes, difficulty, requires, examWeight }] en orden de temario,
 *   progress:     { [unitId]: { completed, mastery, nextReview, reinforcedAt } },
 *   options:      sobrescribe PLANNER_DEFAULTS
 * }
 * @returns { sessions, warnings, unscheduled, stats }
 */
export function generatePlan(input) {
  const opt = { ...PLANNER_DEFAULTS, ...(input.options ?? {}) };
  const { today, examDate } = input;
  const progress = input.progress ?? {};
  const warnings = [];
  const sessions = [];

  if (!examDate || examDate <= today) {
    return { sessions, warnings: ['La fecha de examen ya ha pasado o no está configurada. Cámbiala en Ajustes.'], unscheduled: [], stats: emptyStats() };
  }
  if (input.subjects.length === 0) {
    return { sessions, warnings: ['Todavía no has elegido ninguna asignatura.'], unscheduled: [], stats: emptyStats() };
  }

  const days = rangeDays(today, examDate);
  const finalDays = finalPhaseLength(days.length, opt);
  const finalStart = days[days.length - finalDays] ?? examDate;

  // Minutos disponibles de cada día.
  const capacity = new Map(days.map((d) => [d, input.availability[weekday(d)] ?? 0]));
  capacity.set(today, Math.max(0, capacity.get(today) - (input.usedToday ?? 0)));
  const totalCapacity = [...capacity.values()].reduce((a, b) => a + b, 0);
  if (totalCapacity === 0) {
    return { sessions, warnings: ['No tienes ningún día con tiempo de estudio. Añade horas en Ajustes.'], unscheduled: [], stats: emptyStats() };
  }

  // 1) Colas de unidades pendientes por asignatura, en orden válido.
  const weightOf = new Map(input.subjects.map((s) => [s.id, s.weight ?? 1]));
  const queues = new Map();
  const totalDemand = new Map();
  for (const s of input.subjects) {
    const units = input.units.filter((u) => u.subjectId === s.id);
    const ordered = topoSort(units).filter((u) => !progress[u.id]?.completed);
    const items = ordered.map((u) => ({ unit: u, remaining: unitDemand(u, progress[u.id], weightOf.get(s.id)), part: 0 }));
    queues.set(s.id, items);
    totalDemand.set(s.id, items.reduce((sum, it) => sum + it.remaining, 0));
  }
  const demandMinutes = [...totalDemand.values()].reduce((a, b) => a + b, 0);
  const assigned = new Map(input.subjects.map((s) => [s.id, 0]));

  // 2) Repasos espaciados ya programados por SM-2 y refuerzos pendientes.
  const reviewsByDay = new Map(); // fecha -> [{ unitId, subjectId }]
  const addReview = (date, unit) => {
    if (date >= examDate) return;
    if (!reviewsByDay.has(date)) reviewsByDay.set(date, []);
    const list = reviewsByDay.get(date);
    if (list.some((r) => r.unitId === unit.id)) return; // no repetir el mismo repaso el mismo día
    list.push({ unitId: unit.id, subjectId: unit.subjectId });
  };
  const unitsById = new Map(input.units.map((u) => [u.id, u]));
  const reinforce = [];
  for (const u of input.units) {
    const p = progress[u.id];
    if (!p?.completed) continue;
    if (p.nextReview) addReview(p.nextReview < today ? today : p.nextReview, u);
    const recentlyReinforced = p.reinforcedAt && diffDays(p.reinforcedAt, today) < 7;
    if (p.mastery < opt.reinforceThreshold && !recentlyReinforced) reinforce.push(u);
  }

  // RITMO: si sobra mucho tiempo, no tiene sentido ver todo el temario en
  // un mes y luego no hacer nada. Repartimos las clases para terminar hacia el
  // 75 % de la fase de estudio; el tiempo que sobra se usa en consolidar.
  const studyCapacity = days.filter((d) => d < finalStart).reduce((a, d) => a + capacity.get(d), 0);
  const paceRatio = Math.min(1, demandMinutes / Math.max(1, opt.paceTarget * studyCapacity));
  let allowance = 0; // "crédito" de minutos de clase acumulado
  const lessonDoneOn = new Map(); // unidad -> día en que termina su clase en este plan
  for (const u of input.units) if (progress[u.id]?.completed) lessonDoneOn.set(u.id, '0000-00-00');
  const lastConsolidated = new Map();

  // 3) Fase de estudio: día a día, llenamos el tiempo disponible.
  for (const day of days) {
    if (day >= finalStart) break;
    let budget = capacity.get(day);
    allowance += budget * paceRatio;
    const reviewedToday = new Set();
    const usedBySubject = new Map();
    const push = (s) => {
      sessions.push(s);
      budget -= s.minutes;
      usedBySubject.set(s.subjectId, (usedBySubject.get(s.subjectId) ?? 0) + s.minutes);
    };

    // 3a) Refuerzos: en los primeros días, antes que nada.
    while (reinforce.length > 0 && budget >= opt.reinforceMinutes && diffDays(today, day) < 7) {
      const u = reinforce.shift();
      push({ date: day, kind: 'reinforce', subjectId: u.subjectId, unitId: u.id, minutes: opt.reinforceMinutes });
    }

    // 3b) Repasos que tocan hoy (los que no caben pasan al día siguiente).
    const due = reviewsByDay.get(day) ?? [];
    reviewsByDay.delete(day);
    let done = 0;
    for (const r of due) {
      if (done < opt.maxReviewsPerDay && budget >= opt.reviewMinutes && budget > 0) {
        push({ date: day, kind: 'review', subjectId: r.subjectId, unitId: r.unitId, minutes: opt.reviewMinutes });
        reviewedToday.add(r.unitId);
        done++;
      } else {
        addReview(addDays(day, 1), unitsById.get(r.unitId));
      }
    }

    // 3c) Clases nuevas, intercalando asignaturas (si el ritmo lo permite).
    while (budget >= opt.minSessionMinutes && allowance > 0) {
      const subjectId = pickSubject(queues, assigned, totalDemand, usedBySubject, opt);
      if (!subjectId) break;
      const item = queues.get(subjectId)[0];
      // Si lo que queda de la unidad cabe con 10 min de margen, se termina hoy.
      // Si no, se parte, cuidando de que ni este trozo ni el que queda sean demasiado cortos.
      let chunk;
      if (item.remaining <= budget + 10) {
        chunk = item.remaining;
      } else {
        chunk = budget;
        if (item.remaining - chunk < opt.minSessionMinutes) chunk = item.remaining - opt.minSessionMinutes;
        if (chunk < opt.minSplitMinutes) break;
      }
      if (chunk < Math.min(opt.minSessionMinutes, item.remaining)) break;
      item.part += 1;
      push({ date: day, kind: 'lesson', subjectId, unitId: item.unit.id, minutes: chunk, part: item.part });
      item.remaining -= chunk;
      allowance -= chunk;
      assigned.set(subjectId, assigned.get(subjectId) + chunk);
      if (item.remaining <= 0) {
        queues.get(subjectId).shift();
        lessonDoneOn.set(item.unit.id, day);
        // Al terminar una unidad, se programan sus repasos espaciados.
        for (const offset of opt.reviewOffsets) addReview(addDays(day, offset), item.unit);
      }
    }

    // 3d) Consolidación: si sobra hueco, práctica extra de una unidad ya vista
    //     (la de más peso en el examen y menos dominio que no se haya practicado esta semana).
    if (budget >= opt.minSessionMinutes) {
      const pick = consolidationCandidate(input.units, progress, lessonDoneOn, lastConsolidated, reviewedToday, day);
      if (pick) {
        push({ date: day, kind: 'review', subjectId: pick.subjectId, unitId: pick.id, minutes: Math.min(budget, opt.consolidationMinutes) });
        lastConsolidated.set(pick.id, day);
      }
    }
  }

  // 4) Unidades que no caben antes de la fase final.
  const unscheduled = [];
  for (const items of queues.values()) {
    for (const it of items) unscheduled.push(it.unit.id);
  }
  if (unscheduled.length > 0) {
    warnings.push(
      `No da tiempo a ver ${unscheduled.length} unidad${unscheduled.length === 1 ? '' : 'es'} antes de la fase de repaso final. ` +
      'Puedes añadir más tiempo de estudio, adelantar el inicio o bajar el peso de alguna asignatura.',
    );
  }

  // 5) Fase final: simulacros y repaso de los puntos débiles.
  planFinalPhase({ days, finalStart, capacity, reviewsByDay, input, progress, unitsById, opt, sessions });

  // 6) Orden estable y numeración de las partes de cada unidad.
  sessions.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : KIND_ORDER[a.kind] - KIND_ORDER[b.kind]));
  const partsCount = new Map();
  for (const s of sessions) if (s.kind === 'lesson') partsCount.set(s.unitId, (partsCount.get(s.unitId) ?? 0) + 1);
  for (const s of sessions) {
    if (s.kind === 'lesson') s.parts = partsCount.get(s.unitId);
    s.id = sessionId(s);
  }

  const scheduledLessonMinutes = sessions.filter((s) => s.kind === 'lesson').reduce((a, s) => a + s.minutes, 0);
  return {
    sessions,
    warnings,
    unscheduled,
    stats: {
      capacityMinutes: totalCapacity,
      demandMinutes,
      scheduledLessonMinutes,
      finalPhaseStart: finalStart,
      studyDays: days.length,
    },
  };
}

/**
 * Elige la asignatura de la siguiente clase: la que va más "retrasada"
 * en proporción a lo que le queda (así todas avanzan a la vez y terminan
 * a la par). Se penaliza un poco repetir asignatura el mismo día.
 */
function pickSubject(queues, assigned, totalDemand, usedBySubject, opt) {
  let best = null;
  let bestScore = Infinity;
  for (const [subjectId, items] of queues) {
    if (items.length === 0) continue;
    const used = usedBySubject.get(subjectId) ?? 0;
    const fraction = assigned.get(subjectId) / Math.max(1, totalDemand.get(subjectId));
    let score = fraction + (used > 0 ? 0.01 : 0);
    if (used >= opt.maxSameSubjectPerDay) score += 1; // solo si no hay alternativa
    if (score < bestScore) {
      bestScore = score;
      best = subjectId;
    }
  }
  return best;
}

/** Unidad ya vista (antes de `day`) que más conviene practicar hoy, o null. */
function consolidationCandidate(units, progress, lessonDoneOn, lastConsolidated, reviewedToday, day) {
  let best = null;
  let bestPriority = -Infinity;
  for (const u of units) {
    const doneOn = lessonDoneOn.get(u.id);
    // Solo unidades vistas hace al menos una semana: lo reciente ya lo cubren los repasos espaciados.
    if (!doneOn || diffDays(doneOn, day) < 7 || reviewedToday.has(u.id)) continue;
    const last = lastConsolidated.get(u.id);
    if (last && diffDays(last, day) < 7) continue;
    const mastery = progress[u.id]?.completed ? progress[u.id].mastery : 0.6;
    const priority = (u.examWeight ?? 1) * (1 - mastery) + (last ? 0 : 0.05); // las nunca consolidadas, primero
    if (priority > bestPriority) {
      bestPriority = priority;
      best = u;
    }
  }
  return best;
}

/** Últimas semanas: simulacros alternos y repaso de lo más flojo. */
function planFinalPhase({ days, finalStart, capacity, reviewsByDay, input, progress, unitsById, opt, sessions }) {
  const finalDays = days.filter((d) => d >= finalStart);
  if (finalDays.length === 0) return;

  // Prioridad de repaso: peso en el examen x lo que falta por dominar.
  const candidates = input.units
    .map((u) => {
      const mastery = progress[u.id]?.completed ? progress[u.id].mastery : 0.5;
      return { u, priority: (u.examWeight ?? 1) * (1 - mastery) + 0.01 };
    })
    .sort((a, b) => b.priority - a.priority || a.u.id.localeCompare(b.u.id));
  let cursor = 0;
  const subjects = input.subjects.map((s) => s.id);

  finalDays.forEach((day, i) => {
    let budget = capacity.get(day);
    const usedToday = new Set();
    // Repasos SM-2 que caen en esta fase.
    for (const r of (reviewsByDay.get(day) ?? []).slice(0, opt.maxReviewsPerDay)) {
      if (budget < opt.reviewMinutes) break;
      sessions.push({ date: day, kind: 'review', subjectId: r.subjectId, unitId: r.unitId, minutes: opt.reviewMinutes });
      usedToday.add(r.unitId);
      budget -= opt.reviewMinutes;
    }
    // Un simulacro cada dos días, rotando asignaturas.
    if (i % 2 === 0 && budget >= opt.minSessionMinutes * 2) {
      const subjectId = subjects[(i / 2) % subjects.length];
      const minutes = Math.min(budget, opt.mockMinutes);
      sessions.push({ date: day, kind: 'mock', subjectId, unitId: null, minutes });
      budget -= minutes;
    }
    // El resto del día: repaso de puntos débiles (30 min cada uno).
    const length = opt.reviewMinutes * 2;
    let tries = 0;
    while (budget >= opt.minSessionMinutes && candidates.length > 0 && tries < candidates.length) {
      const { u } = candidates[cursor % candidates.length];
      cursor++;
      tries++;
      if (usedToday.has(u.id)) continue;
      usedToday.add(u.id);
      const minutes = Math.min(budget, length);
      sessions.push({ date: day, kind: 'review', subjectId: u.subjectId, unitId: u.id, minutes });
      budget -= minutes;
    }
  });
}

function emptyStats() {
  return { capacityMinutes: 0, demandMinutes: 0, scheduledLessonMinutes: 0, finalPhaseStart: null, studyDays: 0 };
}

/** Identificador único y estable de una sesión. */
export function sessionId(s) {
  return `${s.date}|${s.kind}|${s.unitId ?? s.subjectId}|${s.part ?? 0}`;
}

/* ------------------------------------------------------------------ */
/* Consultas sobre un plan                                             */
/* ------------------------------------------------------------------ */

/** Sesiones de un día concreto. */
export function sessionsOn(plan, date) {
  return (plan?.sessions ?? []).filter((s) => s.date === date);
}

/** Sesiones de la semana que empieza en `monday`. */
export function sessionsOfWeek(plan, monday) {
  const end = addDays(monday, 7);
  return (plan?.sessions ?? []).filter((s) => s.date >= monday && s.date < end);
}

/** Resumen por asignatura: fecha de la última clase y clases por semana (próx. 4 semanas). */
export function summarizePlan(plan, today) {
  const horizon = addDays(today, 28);
  const out = {};
  for (const s of plan?.sessions ?? []) {
    const entry = (out[s.subjectId] ??= { lastLessonDate: null, lessonsNext4Weeks: 0, units: new Set() });
    if (s.kind !== 'lesson') continue;
    entry.units.add(s.unitId);
    if (!entry.lastLessonDate || s.date > entry.lastLessonDate) entry.lastLessonDate = s.date;
    if (s.date >= today && s.date < horizon) entry.lessonsNext4Weeks++;
  }
  return out;
}

/**
 * Compara el plan anterior con el nuevo y explica los cambios en lenguaje
 * natural, como lo haría un profesor. `names` traduce ids de asignatura a nombres.
 */
export function diffPlans(oldPlan, newPlan, today, names = {}) {
  const messages = [];
  const before = summarizePlan(oldPlan, today);
  const after = summarizePlan(newPlan, today);
  const subjectIds = new Set([...Object.keys(before), ...Object.keys(after)]);

  for (const id of subjectIds) {
    const name = names[id] ?? id;
    const a = before[id];
    const b = after[id];
    if (!a && b) { messages.push(`He añadido ${name} a tu planning.`); continue; }
    if (a && !b) { messages.push(`He quitado ${name} de tu planning.`); continue; }
    const perWeekA = Math.round((a.lessonsNext4Weeks / 4) * 10) / 10;
    const perWeekB = Math.round((b.lessonsNext4Weeks / 4) * 10) / 10;
    if (Math.abs(perWeekA - perWeekB) >= 0.5) {
      messages.push(`${name}: pasas de ${fmt(perWeekA)} a ${fmt(perWeekB)} clases por semana.`);
    }
    if (a.lastLessonDate && b.lastLessonDate && a.lastLessonDate !== b.lastLessonDate) {
      const delta = diffDays(a.lastLessonDate, b.lastLessonDate);
      if (Math.abs(delta) >= 3) {
        messages.push(
          `Terminarás el temario de ${name} el ${formatShort(b.lastLessonDate)} ` +
          `(${delta < 0 ? `${-delta} días antes` : `${delta} días después`} de lo previsto).`,
        );
      }
    }
  }
  const newWarnings = (newPlan?.warnings ?? []).filter((w) => !(oldPlan?.warnings ?? []).includes(w));
  messages.push(...newWarnings);
  if (messages.length === 0) messages.push('Tu planning sigue prácticamente igual.');
  return messages;
}

const fmt = (x) => String(x).replace('.', ',');

/** Semanas (lunes) que cubre el plan, para la vista de calendario. */
export function planWeeks(plan, today) {
  const sessions = plan?.sessions ?? [];
  if (sessions.length === 0) return [startOfWeek(today)];
  const first = startOfWeek(today);
  const last = startOfWeek(sessions[sessions.length - 1].date);
  const weeks = [];
  for (let w = first; w <= last; w = addDays(w, 7)) weeks.push(w);
  return weeks;
}
