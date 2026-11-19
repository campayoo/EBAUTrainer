import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyReview, initialProgress, dueReviews, scoreToQuality } from '../src/core/srs.js';

test('SM-2: buenas respuestas alargan el intervalo (1, 6, ...)', () => {
  let p = initialProgress();
  p = applyReview(p, 1, '2026-01-01');
  assert.equal(p.interval, 1);
  assert.equal(p.nextReview, '2026-01-02');
  p = applyReview(p, 1, '2026-01-02');
  assert.equal(p.interval, 6);
  p = applyReview(p, 1, '2026-01-08');
  assert.ok(p.interval > 6);
});

test('SM-2: una mala respuesta reinicia la serie y baja la facilidad', () => {
  let p = applyReview(applyReview(initialProgress(), 1, '2026-01-01'), 1, '2026-01-02');
  const ef = p.ef;
  p = applyReview(p, 0.2, '2026-01-08');
  assert.equal(p.reps, 0);
  assert.equal(p.interval, 1);
  assert.ok(p.ef < ef);
  assert.ok(p.ef >= 1.3);
});

test('dominio y calidad', () => {
  assert.equal(scoreToQuality(0.95), 5);
  const p = applyReview(initialProgress(), 0.8, '2026-01-01');
  assert.equal(p.mastery, 0.8);
  assert.equal(applyReview(p, 0.3, '2026-01-02').mastery, 0.6);
});

test('dueReviews devuelve solo lo vencido, del más antiguo al más reciente', () => {
  const progress = {
    a: { completed: true, nextReview: '2026-01-05', mastery: 0.5 },
    b: { completed: true, nextReview: '2026-01-03', mastery: 0.9 },
    c: { completed: true, nextReview: '2026-02-01', mastery: 0.5 },
    d: { completed: false, nextReview: null },
  };
  assert.deepEqual(dueReviews(progress, '2026-01-10'), ['b', 'a']);
});
