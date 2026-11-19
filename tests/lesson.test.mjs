import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildLesson, initialState, advance, recordAnswer, revealHint, showSolution, computeScore, canAdvance, currentStep, currentItem, selfAssess } from '../src/core/lesson.js';

const unit = { id: 'mat2.alg.det.u01', title: 'Determinantes', generators: ['det-2x2'] };

test('clase exprés: explicación, práctica (3), test (2) y cierre', () => {
  const lesson = buildLesson({ unit, lessonDef: null, seed: 5 });
  assert.equal(lesson.mode, 'express');
  assert.deepEqual(lesson.steps.map((s) => s.type), ['explanation', 'practice', 'test', 'summary']);
  assert.equal(lesson.steps[1].items.length, 3);
});

test('modo autónomo si no hay contenido ni generadores', () => {
  const lesson = buildLesson({ unit: { id: 'x', title: 'X' }, lessonDef: null });
  assert.equal(lesson.mode, 'self');
  let s = initialState();
  s = advance(lesson, s);
  assert.equal(currentStep(lesson, s).type, 'self');
  assert.equal(canAdvance(lesson, s), false);
  s = selfAssess(s, currentItem(lesson, s).id, 2);
  assert.equal(canAdvance(lesson, s), true);
  assert.equal(computeScore(lesson, s).score, 0.95);
});

test('las pistas y la solución reducen la nota', () => {
  const ok = { correct: true, score: 1, status: 'correct', message: '' };
  let s = initialState();
  s = recordAnswer(s, 'a', ok);
  s = revealHint(s, 'b');
  s = revealHint(s, 'b');
  s = recordAnswer(s, 'b', ok);
  s = showSolution(s, 'c');
  s = recordAnswer(s, 'c', ok);
  assert.equal(s.results.a.score, 1);
  assert.equal(s.results.b.score, 0.5);
  assert.equal(s.results.c.score, 0);
});

test('en el test solo cuenta el primer intento', () => {
  const bad = { correct: false, score: 0, status: 'incorrect', message: '' };
  const ok = { correct: true, score: 1, status: 'correct', message: '' };
  let s = recordAnswer(initialState(), 't', bad, { stepType: 'test' });
  s = recordAnswer(s, 't', ok, { stepType: 'test' });
  assert.equal(s.results.t.correct, false);
});

test('nota final = 40 % práctica + 60 % test', () => {
  const lesson = buildLesson({ unit, lessonDef: null, seed: 1 });
  let s = initialState();
  const ok = { correct: true, score: 1, status: 'correct', message: '' };
  for (const it of lesson.steps[1].items) s = recordAnswer(s, it.id, ok);
  assert.equal(computeScore(lesson, s).score, 0.4);
});
