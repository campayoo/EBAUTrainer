import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addDays, diffDays, weekday, startOfWeek, isISODate, defaultExamDate, rangeDays } from '../src/core/dates.js';
import { buildICS, foldLine, escapeText } from '../src/core/ics.js';
import { streak, compliance, aggregate } from '../src/core/stats.js';

test('fechas', () => {
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(addDays('2027-03-28', 1), '2027-03-29'); // cambio de hora
  assert.equal(diffDays('2026-11-18', '2027-06-01'), 195);
  assert.equal(weekday('2026-11-18'), 3); // miércoles
  assert.equal(startOfWeek('2026-11-22'), '2026-11-16'); // domingo -> lunes anterior
  assert.equal(isISODate('2026-02-31'), false);
  assert.equal(weekday(defaultExamDate('2026-11-18')), 2);
  assert.equal(rangeDays('2026-01-01', '2026-01-04').length, 3);
});

test('ICS válido', () => {
  const ics = buildICS([{ id: 'x|lesson|u|1', date: '2026-11-18', minutes: 50 }, { id: 'y', date: '2026-11-18', minutes: 15 }],
    () => ({ title: 'Clase, tema 1', description: 'Línea 1\nLínea 2' }), { now: new Date('2026-11-18T10:00:00Z') });
  assert.match(ics, /^BEGIN:VCALENDAR\r\n/);
  assert.match(ics, /DTSTART:20261118T170000/);
  assert.match(ics, /DTSTART:20261118T175000/); // la segunda empieza al acabar la primera
  assert.match(ics, /SUMMARY:Clase\\, tema 1/);
  assert.ok(ics.split('\r\n').every((l) => new TextEncoder().encode(l).length <= 75));
  assert.ok(foldLine('á'.repeat(60)).split('\r\n').every((l) => new TextEncoder().encode(l).length <= 75));
  assert.equal(escapeText('a;b'), 'a\\;b');
  assert.equal(foldLine('x'.repeat(80)).split('\r\n').length, 2);
});

test('estadísticas', () => {
  const h = [
    { date: '2026-11-16', status: 'done' }, { date: '2026-11-17', status: 'done' }, { date: '2026-11-18', status: 'done' },
    { date: '2026-11-14', status: 'missed' },
  ];
  assert.equal(streak(h, '2026-11-18'), 3);
  assert.equal(streak(h, '2026-11-19'), 3);
  assert.equal(compliance(h), 0.75);
  assert.deepEqual(aggregate([{ id: 'a' }, { id: 'b' }], { a: { completed: true, mastery: 0.8 } }), { total: 2, completed: 1, pct: 0.5, mastery: 0.8 });
});
