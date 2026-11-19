// Tests de "¿Por dónde vas en clase?" (applyClassProgress) y de las tablas Markdown.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyClassProgress, CLASS_MASTERY } from '../src/data/store.js';
import { unitsOfSubject } from '../src/data/content.js';
import { generatePlan } from '../src/core/planner.js';
import { allUnits } from '../src/data/content.js';
import { renderMarkdown } from '../src/ui/markdown.js';

const TODAY = '2026-11-19';
const units = unitsOfSubject('qui');

test('las unidades vistas en clase quedan completadas, con dominio prudente y repasos escalonados', () => {
  const ids = units.slice(0, 6).map((u) => u.id);
  const { progress, added } = applyClassProgress({}, 'qui', ids, TODAY);
  assert.equal(added.length, 6);
  for (const id of ids) {
    assert.equal(progress[id].completed, true);
    assert.equal(progress[id].source, 'clase');
    assert.equal(progress[id].mastery, CLASS_MASTERY);
    assert.ok(progress[id].nextReview > TODAY);
  }
  // No caen todos los repasos el mismo día.
  assert.ok(new Set(ids.map((id) => progress[id].nextReview)).size >= 4);
});

test('no se pisa lo estudiado en la app y se puede desmarcar lo de clase', () => {
  const [a, b] = units;
  const studied = { [a.id]: { completed: true, mastery: 0.9, lastScore: 0.9, source: undefined } };
  const first = applyClassProgress(studied, 'qui', [a.id, b.id], TODAY);
  assert.equal(first.progress[a.id].mastery, 0.9, 'la nota real se conserva');
  assert.deepEqual(first.added, [b.id]);
  const second = applyClassProgress(first.progress, 'qui', [], TODAY);
  assert.deepEqual(second.removed, [b.id]);
  assert.equal(second.progress[a.id].completed, true, 'lo estudiado en la app no se desmarca');
});

test('el planificador no vuelve a dar como clase lo visto en el instituto', () => {
  const seen = units.slice(0, 5).map((u) => u.id);
  const { progress } = applyClassProgress({}, 'qui', seen, TODAY);
  const plan = generatePlan({
    today: TODAY, examDate: '2027-06-02', availability: [0, 60, 60, 60, 60, 60, 0], usedToday: 0,
    subjects: [{ id: 'qui', weight: 1 }], units: allUnits.filter((u) => u.subjectId === 'qui'), progress,
  });
  const lessons = plan.sessions.filter((s) => s.kind === 'lesson').map((s) => s.unitId);
  for (const id of seen) assert.ok(!lessons.includes(id), `${id} no debería tener clase`);
  assert.ok(plan.sessions.some((s) => s.kind === 'review' && seen.includes(s.unitId)), 'pero sí repasos');
});

test('las tablas Markdown se convierten en <table> y escapan el HTML', () => {
  const out = renderMarkdown('| A | B |\n|---|---|\n| <script> | 2 |');
  assert.match(out, /<table class="md-table">/);
  assert.match(out, /<th scope="col">A<\/th>/);
  assert.ok(!out.includes('<script>'));
  assert.match(out, /&lt;script&gt;/);
});
