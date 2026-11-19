/**
 * Tests del planificador.
 *
 * Además de casos concretos, usamos TESTS DE PROPIEDADES: generamos cientos de
 * situaciones aleatorias (con semilla, para que sean reproducibles) y
 * comprobamos que ciertas reglas se cumplen SIEMPRE.
 * Ejecuta: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generatePlan, topoSort, unitDemand, diffPlans, finalPhaseLength } from '../src/core/planner.js';
import { createRng } from '../src/core/random.js';
import { addDays, weekday } from '../src/core/dates.js';

/** Temario de juguete: n unidades por asignatura, cada una requiere la anterior. */
function toyUnits(subjectIds, n = 6) {
  return subjectIds.flatMap((s) =>
    Array.from({ length: n }, (_, i) => ({
      id: `${s}.u${i}`, subjectId: s, minutes: 45, difficulty: 1 + (i % 5), examWeight: 1 + (i % 3),
      requires: i > 0 ? [`${s}.u${i - 1}`] : [],
    })),
  );
}

const baseInput = (over = {}) => ({
  today: '2026-11-18',
  examDate: '2027-06-01',
  availability: [0, 60, 60, 60, 60, 60, 120],
  subjects: [{ id: 'mat', weight: 1 }, { id: 'fis', weight: 1 }],
  units: toyUnits(['mat', 'fis']),
  progress: {},
  ...over,
});

test('topoSort respeta los prerrequisitos y el orden del temario', () => {
  const units = [
    { id: 'c', requires: ['b'] }, { id: 'a', requires: [] }, { id: 'b', requires: ['a'] }, { id: 'd', requires: [] },
  ];
  assert.deepEqual(topoSort(units).map((u) => u.id), ['a', 'b', 'c', 'd']);
});

test('topoSort detecta ciclos', () => {
  assert.throws(() => topoSort([{ id: 'a', requires: ['b'] }, { id: 'b', requires: ['a'] }]), /ciclo/);
});

test('unitDemand: más dificultad o más peso -> más minutos; más dominio -> menos', () => {
  const u = { minutes: 45, difficulty: 3 };
  assert.ok(unitDemand({ ...u, difficulty: 5 }) > unitDemand(u));
  assert.ok(unitDemand(u, {}, 1.5) > unitDemand(u, {}, 1));
  assert.ok(unitDemand(u, { mastery: 0.8 }) < unitDemand(u, { mastery: 0 }));
  assert.equal(unitDemand(u) % 5, 0);
});

test('genera clases para todas las unidades si hay tiempo de sobra', () => {
  const plan = generatePlan(baseInput());
  const lessonUnits = new Set(plan.sessions.filter((s) => s.kind === 'lesson').map((s) => s.unitId));
  assert.equal(lessonUnits.size, 12);
  assert.equal(plan.unscheduled.length, 0);
  assert.ok(plan.sessions.some((s) => s.kind === 'review'));
  assert.ok(plan.sessions.some((s) => s.kind === 'mock'));
});

test('intercala asignaturas: ninguna termina mucho antes que la otra', () => {
  const plan = generatePlan(baseInput());
  const last = (sub) => plan.sessions.filter((s) => s.kind === 'lesson' && s.subjectId === sub).at(-1).date;
  const gap = Math.abs(new Date(last('mat')) - new Date(last('fis'))) / 86400000;
  const span = (new Date(plan.stats.finalPhaseStart) - new Date('2026-11-18')) / 86400000;
  assert.ok(gap <= span * 0.1, `diferencia de ${gap} días en ${span}`);
});

test('si sobra tiempo, reparte el temario en vez de acabarlo en unas semanas', () => {
  const plan = generatePlan(baseInput());
  const lessons = plan.sessions.filter((s) => s.kind === 'lesson');
  const finalStart = plan.stats.finalPhaseStart;
  const span = (new Date(finalStart) - new Date('2026-11-18')) / 86400000;
  const lastLesson = (new Date(lessons.at(-1).date) - new Date('2026-11-18')) / 86400000;
  assert.ok(lastLesson > span * 0.5, `la última clase es el día ${lastLesson} de ${span}`);
  assert.ok(lastLesson <= span * 0.85);
  // y los días sin clase tienen práctica de consolidación
  assert.ok(plan.sessions.filter((s) => s.kind === 'review').length > 40);
});

test('si el tiempo es justo, va a ritmo máximo', () => {
  const plan = generatePlan(baseInput({ examDate: '2027-01-20', units: toyUnits(['mat', 'fis'], 25) }));
  const lessonMinutes = plan.sessions.filter((s) => s.kind === 'lesson' && s.date < plan.stats.finalPhaseStart).reduce((a, s) => a + s.minutes, 0);
  assert.ok(lessonMinutes > 0.8 * plan.stats.demandMinutes || plan.unscheduled.length > 0);
});

test('avisa cuando no da tiempo', () => {
  const plan = generatePlan(baseInput({ examDate: '2026-12-01', units: toyUnits(['mat', 'fis'], 30) }));
  assert.ok(plan.unscheduled.length > 0);
  assert.ok(plan.warnings.some((w) => w.includes('No da tiempo')));
});

test('las unidades completadas no se vuelven a planificar, pero sí sus repasos', () => {
  const progress = { 'mat.u0': { completed: true, mastery: 0.9, nextReview: '2026-11-20' } };
  const plan = generatePlan(baseInput({ progress }));
  assert.ok(!plan.sessions.some((s) => s.kind === 'lesson' && s.unitId === 'mat.u0'));
  assert.ok(plan.sessions.some((s) => s.kind === 'review' && s.unitId === 'mat.u0' && s.date === '2026-11-20'));
});

test('una unidad con nota baja recibe una sesión de refuerzo en la primera semana', () => {
  const progress = { 'fis.u0': { completed: true, mastery: 0.3, nextReview: '2026-11-19' } };
  const plan = generatePlan(baseInput({ progress }));
  const r = plan.sessions.find((s) => s.kind === 'reinforce');
  assert.equal(r?.unitId, 'fis.u0');
  assert.ok(r.date < addDays('2026-11-18', 7));
});

test('más peso a una asignatura le da más minutos de clase', () => {
  const plan = generatePlan(baseInput({ subjects: [{ id: 'mat', weight: 1.5 }, { id: 'fis', weight: 1 }] }));
  const minutes = (sub) => plan.sessions.filter((s) => s.kind === 'lesson' && s.subjectId === sub).reduce((a, s) => a + s.minutes, 0);
  assert.ok(minutes('mat') > minutes('fis'));
});

test('diffPlans explica que se ha añadido una asignatura', () => {
  const before = generatePlan(baseInput({ subjects: [{ id: 'mat', weight: 1 }], units: toyUnits(['mat']) }));
  const after = generatePlan(baseInput());
  const msgs = diffPlans(before, after, '2026-11-18', { fis: 'Física', mat: 'Matemáticas II' });
  assert.ok(msgs.some((m) => m.includes('He añadido Física')));
});

test('fecha de examen pasada -> plan vacío con aviso', () => {
  const plan = generatePlan(baseInput({ examDate: '2026-11-01' }));
  assert.equal(plan.sessions.length, 0);
  assert.equal(plan.warnings.length, 1);
});

test('finalPhaseLength está acotada', () => {
  assert.equal(finalPhaseLength(200), 21);
  assert.equal(finalPhaseLength(60), 9);
  assert.equal(finalPhaseLength(20), 5);
});

/* ------------------------- Tests de propiedades ------------------------- */

test('PROPIEDADES: en 300 escenarios aleatorios el plan siempre es válido', () => {
  for (let seed = 1; seed <= 300; seed++) {
    const rng = createRng(seed);
    const subjects = rng.shuffle(['a', 'b', 'c']).slice(0, rng.int(1, 3)).map((id) => ({ id, weight: rng.pick([0.75, 1, 1.5]) }));
    const units = toyUnits(subjects.map((s) => s.id), rng.int(1, 15)).map((u) => ({ ...u, minutes: rng.int(6, 12) * 5 }));
    const availability = Array.from({ length: 7 }, () => rng.pick([0, 0, 30, 45, 60, 90, 120, 180]));
    const today = addDays('2026-09-01', rng.int(0, 200));
    const examDate = addDays(today, rng.int(1, 260));
    const progress = {};
    for (const u of units) if (rng.next() < 0.2) progress[u.id] = { completed: true, mastery: rng.next(), nextReview: addDays(today, rng.int(-5, 30)) };
    const usedToday = rng.pick([0, 0, 20, 60]);
    const input = { today, examDate, availability, subjects, units, progress, usedToday };

    const plan = generatePlan(input);
    const plan2 = generatePlan(input);

    // 1. Determinismo: misma entrada -> mismo plan
    assert.deepEqual(plan, plan2, `seed ${seed}: no es determinista`);

    // 2. Nunca se supera el tiempo disponible de un día (+10 min de margen para no partir una unidad)
    const perDay = new Map();
    for (const s of plan.sessions) perDay.set(s.date, (perDay.get(s.date) ?? 0) + s.minutes);
    for (const [date, minutes] of perDay) {
      const cap = availability[weekday(date)] - (date === today ? usedToday : 0);
      assert.ok(minutes <= cap + 10, `seed ${seed}: ${date} tiene ${minutes} min y solo hay ${cap}`);
    }

    // 3. Ninguna sesión fuera de [hoy, examen)
    for (const s of plan.sessions) assert.ok(s.date >= today && s.date < examDate, `seed ${seed}: sesión fuera de rango ${s.date}`);

    // 4. Una unidad nunca empieza antes de que haya empezado su prerrequisito
    const firstLesson = new Map();
    for (const s of plan.sessions) if (s.kind === 'lesson' && !firstLesson.has(s.unitId)) firstLesson.set(s.unitId, s.date);
    for (const u of units) {
      if (!firstLesson.has(u.id)) continue;
      for (const r of u.requires) {
        if (progress[r]?.completed) continue;
        assert.ok(firstLesson.has(r) && firstLesson.get(r) <= firstLesson.get(u.id), `seed ${seed}: ${u.id} antes que ${r}`);
      }
    }

    // 5. Las unidades completadas no tienen clases nuevas
    for (const s of plan.sessions) if (s.kind === 'lesson') assert.ok(!progress[s.unitId]?.completed);

    // 6. Ids únicos
    assert.equal(new Set(plan.sessions.map((s) => s.id)).size, plan.sessions.length, `seed ${seed}: ids repetidos`);

    // 7. Ninguna sesión dura menos de lo mínimo (salvo repasos) ni 0 minutos
    for (const s of plan.sessions) assert.ok(s.minutes >= 15, `seed ${seed}: sesión de ${s.minutes} min`);
  }
});
