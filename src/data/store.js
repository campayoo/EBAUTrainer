/**
 * store.js — El ESTADO de la aplicación y las acciones que lo cambian.
 *
 * Patrón: hay un único objeto `state` con todos los datos del alumno.
 * Nadie lo modifica directamente: se llama a una acción (addSubject,
 * finishSession...), que crea un estado NUEVO, lo guarda y avisa a quien
 * esté suscrito (la interfaz, que se vuelve a dibujar).
 * Es una versión mínima de lo que hacen librerías como Redux.
 *
 * Aquí es donde se conectan las piezas puras del núcleo (planner, srs) con
 * los datos reales: cada vez que algo cambia, se REPLANIFICA y se guarda la
 * explicación del profesor en `changes`.
 */

import { loadState, saveState, clearState } from './storage.js';
import { generatePlan, diffPlans, summarizePlan } from '../core/planner.js';
import { applyReview, initialProgress } from '../core/srs.js';
import { todayISO, defaultExamDate, formatShort } from '../core/dates.js';
import { streak, compliance, aggregate, weakPoints } from '../core/stats.js';
import { allUnits, subjectsById, subjectNames, unitsById, unitsOfSubject } from './content.js';

export const SCHEMA_VERSION = 1;

/** Peso de una asignatura según cómo dice el alumno que la lleva. */
export const LEVEL_WEIGHTS = { bajo: 1.5, medio: 1, alto: 0.75 };
export const WEIGHT_LABELS = { 0.75: 'Me cuesta poco', 1: 'Normal', 1.5: 'Me cuesta más' };

/** Estado inicial (alumno nuevo). */
export function emptyState(today = todayISO()) {
  return {
    version: SCHEMA_VERSION,
    student: null, // { name, targetGrade, createdAt }
    profile: {
      availability: [0, 60, 60, 60, 60, 60, 90], // minutos de domingo a sábado
      examDate: defaultExamDate(today),
      startTime: '17:00', // hora habitual de estudio (para el .ics)
    },
    subjects: [], // [{ id, weight, level }]
    progress: {}, // { [unitId]: estado SM-2 + dominio }
    plan: null, // último plan generado
    history: [], // sesiones hechas o perdidas
    changes: [], // explicaciones de cada replanificación
    scores: [], // notas de cada sesión (para las gráficas)
    exams: [], // simulacros hechos
    settings: { theme: 'auto', aiKey: '', aiModel: 'claude-sonnet-5-5' },
  };
}

/** Completa un estado antiguo o incompleto con los valores por defecto. */
export function migrate(saved) {
  if (!saved || typeof saved !== 'object') return null;
  const base = emptyState();
  return {
    ...base,
    ...saved,
    version: SCHEMA_VERSION,
    profile: { ...base.profile, ...(saved.profile ?? {}) },
    settings: { ...base.settings, ...(saved.settings ?? {}) },
    // Si una asignatura desaparece del contenido, se ignora.
    subjects: (saved.subjects ?? []).filter((s) => subjectsById.has(s.id)),
  };
}

let state = migrate(loadState()) ?? emptyState();
const listeners = new Set();

export const getState = () => state;

/** Suscribirse a los cambios. Devuelve una función para darse de baja. */
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Sustituye el estado, lo guarda y avisa a los suscriptores. */
function commit(next) {
  state = next;
  saveState(state);
  for (const fn of listeners) fn(state);
}

/* ------------------------------------------------------------------ */
/* Planificación                                                       */
/* ------------------------------------------------------------------ */

/** Construye la entrada del planificador a partir del estado. */
export function planInput(st, today = todayISO()) {
  const chosen = new Set(st.subjects.map((s) => s.id));
  const usedToday = st.history.filter((h) => h.date === today && h.status === 'done').reduce((a, h) => a + (h.minutes ?? 0), 0);
  return {
    today,
    examDate: st.profile.examDate,
    availability: st.profile.availability,
    usedToday,
    subjects: st.subjects.map((s) => ({ id: s.id, weight: s.weight })),
    units: allUnits.filter((u) => chosen.has(u.subjectId)),
    progress: st.progress,
  };
}

/**
 * Vuelve a generar el plan y guarda la explicación de los cambios.
 * @param trigger  motivo ('onboarding', 'subject-added', 'missed'...)
 * @param intro    mensajes del profesor que van antes del resumen automático
 * @param silent   si es true, no se anota en el historial de cambios
 * @returns los mensajes del profesor
 */
export function replan(trigger, intro = [], { silent = false, describe } = {}) {
  const today = todayISO();
  const fresh = generatePlan(planInput(state, today));
  // `describe` permite sustituir el resumen automático (lo usa el plan inicial).
  const auto = describe ? describe(fresh) : diffPlans(state.plan, fresh, today, subjectNames);
  const messages = [...intro, ...auto.filter((m) => !(intro.length && m.startsWith('Tu planning sigue')))];
  const plan = { ...fresh, version: (state.plan?.version ?? 0) + 1, generatedAt: today };
  const changes = silent ? state.changes : [{ at: today, trigger, messages }, ...state.changes].slice(0, 60);
  commit({ ...state, plan, changes });
  return messages;
}

/**
 * Al abrir la app: las sesiones de días pasados que no se hicieron se marcan
 * como perdidas y se replanifica para recolocarlas.
 */
export function checkMissed() {
  if (!state.student || !state.plan) return [];
  const today = todayISO();
  const recorded = new Set(state.history.map((h) => h.id));
  const missed = state.plan.sessions.filter((s) => s.date < today && !recorded.has(s.id));
  if (missed.length === 0) {
    // Aunque no haya faltas, si el plan es de otro día se recalcula en silencio.
    if (state.plan.generatedAt !== today) replan('new-day', [], { silent: true });
    return [];
  }
  state = { ...state, history: [...state.history, ...missed.map((s) => ({ ...s, status: 'missed' }))] };
  const days = new Set(missed.map((m) => m.date)).size;
  return replan('missed', [
    `No hiciste ${missed.length} sesi${missed.length === 1 ? 'ón' : 'ones'} (${days === 1 ? '1 día' : `${days} días`}). No pasa nada: las he recolocado en los próximos días.`,
  ]);
}

/* ------------------------------------------------------------------ */
/* Acciones del alumno                                                 */
/* ------------------------------------------------------------------ */

/**
 * Termina la conversación inicial.
 * @param data { name, targetGrade, subjects: [{ id, level }], availability, examDate, diagnostic: { unitId: nota } }
 */
export function completeOnboarding(data) {
  const today = todayISO();
  const progress = { ...state.progress };
  for (const [unitId, score] of Object.entries(data.diagnostic ?? {})) {
    if (progress[unitId]?.completed) continue;
    // La prueba inicial no completa unidades: solo reduce el tiempo que necesitan.
    progress[unitId] = { ...initialProgress(), ...(progress[unitId] ?? {}), mastery: Math.round(Math.min(0.6, score * 0.6) * 100) / 100 };
  }
  const isFirstTime = !state.student;
  state = {
    ...state,
    student: { name: data.name.trim(), targetGrade: data.targetGrade, createdAt: state.student?.createdAt ?? today },
    profile: { ...state.profile, availability: data.availability, examDate: data.examDate },
    subjects: data.subjects.map((s) => ({ id: s.id, level: s.level, weight: LEVEL_WEIGHTS[s.level] ?? 1 })),
    progress,
  };
  return replan('onboarding', [
    isFirstTime ? `¡Listo, ${data.name.trim()}! He preparado tu planning hasta el examen.` : 'He actualizado tu planning con tus nuevas respuestas.',
  ], { describe: (plan) => describePlan(plan, today) });
}

/** Resumen de un plan recién creado, en palabras del profesor. */
export function describePlan(plan, today = todayISO()) {
  const summary = summarizePlan(plan, today);
  const lessons = plan.sessions.filter((x) => x.kind === 'lesson');
  const units = new Set(lessons.map((x) => x.unitId)).size;
  const mixing = Object.keys(summary).length > 1 ? ', intercalando asignaturas' : '';
  const out = [`Son ${units} unidades repartidas en ${Math.ceil((plan.stats.studyDays ?? 0) / 7)} semanas${mixing} y con repasos espaciados.`];
  for (const [id, info] of Object.entries(summary)) {
    if (info.lastLessonDate) out.push(`${subjectNames[id]}: terminarás el temario el ${formatShort(info.lastLessonDate)}.`);
  }
  if (plan.stats.finalPhaseStart) out.push(`Desde el ${formatShort(plan.stats.finalPhaseStart)}: repaso de tus puntos débiles y simulacros de examen.`);
  return [...out, ...plan.warnings];
}

export function addSubject(id, weight = 1) {
  if (state.subjects.some((s) => s.id === id)) return [];
  state = { ...state, subjects: [...state.subjects, { id, weight, level: weight > 1 ? 'bajo' : weight < 1 ? 'alto' : 'medio' }] };
  return replan('subject-added', [`Has añadido ${subjectNames[id]} a tu vida de estudiante. Reorganizo toda la semana para hacerle hueco.`]);
}

export function removeSubject(id) {
  state = { ...state, subjects: state.subjects.filter((s) => s.id !== id) };
  return replan('subject-removed', [`Has quitado ${subjectNames[id]}. Guardo tu progreso por si vuelves a añadirla.`]);
}

export function setSubjectWeight(id, weight) {
  state = { ...state, subjects: state.subjects.map((s) => (s.id === id ? { ...s, weight } : s)) };
  return replan('weight', [`Entendido: ${subjectNames[id]} → «${WEIGHT_LABELS[weight] ?? weight}». ${weight > 1 ? 'Le dedicaré más tiempo a cada unidad.' : weight < 1 ? 'Iremos algo más rápido con ella.' : ''}`.trim()]);
}

/** Cambia horario, fecha de examen u hora de estudio. */
export function updateProfile(patch) {
  const prev = state.profile;
  state = { ...state, profile: { ...prev, ...patch } };
  const scheduleChanged = JSON.stringify(prev.availability) !== JSON.stringify(state.profile.availability) || prev.examDate !== state.profile.examDate;
  if (scheduleChanged && state.student) {
    const intro = prev.examDate !== state.profile.examDate ? ['Has cambiado la fecha del examen.'] : ['Has cambiado tu horario de estudio.'];
    return replan('schedule', intro);
  }
  commit(state);
  return [];
}

export function updateStudent(patch) {
  commit({ ...state, student: { ...state.student, ...patch } });
}

export function updateSettings(patch) {
  commit({ ...state, settings: { ...state.settings, ...patch } });
}

/**
 * Registra una sesión terminada (clase, repaso o refuerzo), actualiza el
 * repaso espaciado y replanifica.
 * @returns mensajes del profesor sobre cómo cambia el planning
 */
export function finishSession({ sessionId, unitId, kind, minutes, score, hintsUsed = 0 }) {
  const today = todayISO();
  const unit = unitsById.get(unitId);
  const id = sessionId ?? `${today}|extra-${kind}|${unitId}|${Date.now()}`;
  let p = applyReview(state.progress[unitId] ?? initialProgress(), score, today);
  if (kind === 'lesson') p = { ...p, completed: true, completedAt: state.progress[unitId]?.completedAt ?? today };
  if (kind === 'reinforce') p = { ...p, reinforcedAt: today };
  p = { ...p, hintsUsed: (p.hintsUsed ?? 0) + hintsUsed };

  state = {
    ...state,
    progress: { ...state.progress, [unitId]: p },
    history: [...state.history.filter((h) => h.id !== id), { id, date: today, kind, subjectId: unit.subjectId, unitId, minutes, status: 'done', score, planned: Boolean(sessionId) }],
    scores: [...state.scores, { date: today, unitId, subjectId: unit.subjectId, score, kind }],
  };

  const pct = Math.round(score * 100);
  const intro = [];
  if (kind === 'lesson' && score < 0.5) intro.push(`«${unit.title}» se te ha atragantado (${pct} %). Te he puesto una sesión de refuerzo en los próximos días.`);
  else if (kind === 'lesson' && score >= 0.85) intro.push(`¡${pct} % en «${unit.title}»! Como vas bien, adelanto lo siguiente.`);
  else if (kind === 'review' && score < 0.5) intro.push(`El repaso de «${unit.title}» ha costado: lo repetiremos mañana.`);
  return replan(`${kind}-done`, intro, { silent: intro.length === 0 });
}

/** Guarda el resultado de un simulacro. */
export function recordExam({ subjectId, grade, sections, minutes, sessionId }) {
  const today = todayISO();
  const entry = { date: today, subjectId, grade, sections };
  const history = sessionId || minutes
    ? [...state.history.filter((h) => h.id !== sessionId), { id: sessionId ?? `${today}|extra-mock|${subjectId}|${Date.now()}`, date: today, kind: 'mock', subjectId, unitId: null, minutes, status: 'done', score: grade / 10, planned: Boolean(sessionId) }]
    : state.history;
  state = { ...state, exams: [...state.exams, entry], history };
  return replan('mock-done', [], { silent: true });
}

/* ------------------------------------------------------------------ */
/* Copias de seguridad e informes                                      */
/* ------------------------------------------------------------------ */

export function exportBackup() {
  return JSON.stringify({ app: 'pauta', schema: SCHEMA_VERSION, exportedAt: new Date().toISOString(), state }, null, 1);
}

/** Importa una copia. Lanza un error con un mensaje claro si el archivo no vale. */
export function importBackup(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('El archivo no es un JSON válido.');
  }
  if (data?.app !== 'pauta' || typeof data.state !== 'object') throw new Error('No parece una copia de seguridad de Pauta.');
  const next = migrate(data.state);
  if (!Array.isArray(next.history) || typeof next.progress !== 'object') throw new Error('La copia está incompleta o dañada.');
  commit(next);
}

/** Informe resumido para el modo profesor (solo lo necesario: minimización de datos). */
export function buildReport(st = state, today = todayISO()) {
  const subjects = st.subjects.map((s) => {
    const agg = aggregate(unitsOfSubject(s.id), st.progress);
    return { id: s.id, name: subjectNames[s.id], completed: agg.completed, total: agg.total, pct: Math.round(agg.pct * 100), mastery: Math.round(agg.mastery * 100) };
  });
  const chosenUnits = allUnits.filter((u) => st.subjects.some((s) => s.id === u.subjectId));
  const recent = st.scores.slice(-20);
  return {
    app: 'pauta-report',
    version: 1,
    student: st.student?.name ?? 'Sin nombre',
    generatedAt: today,
    examDate: st.profile.examDate,
    subjects,
    avgScore: recent.length ? Math.round((recent.reduce((a, s) => a + s.score, 0) / recent.length) * 100) : null,
    lastActivity: st.history.filter((h) => h.status === 'done').map((h) => h.date).sort().at(-1) ?? null,
    streak: streak(st.history, today),
    compliance: compliance(st.history) === null ? null : Math.round(compliance(st.history) * 100),
    weakPoints: weakPoints(chosenUnits, st.progress).map((w) => w.unit.title),
    exams: st.exams.map((e) => ({ date: e.date, subject: subjectNames[e.subjectId], grade: e.grade })),
  };
}

export function resetAll() {
  clearState();
  commit(emptyState());
}
