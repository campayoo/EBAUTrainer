import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GENERATORS, generateExercise } from '../src/core/generators/index.js';
import { gradeNumeric, gradeChoice, plainNumber } from '../src/core/grading.js';
import { det3, rank, normalCdf, binom } from '../src/core/generators/helpers.js';

test('todos los generadores producen ejercicios válidos con 200 semillas', () => {
  for (const id of GENERATORS.keys()) {
    for (let seed = 1; seed <= 200; seed++) {
      const ex = generateExercise(id, seed * 104729);
      const text = ex.statement + ex.solution + ex.hints.join('');
      assert.doesNotMatch(text, /undefined|NaN|Infinity|\[object/, `${id} #${seed}`);
      assert.equal(ex.hints.length, 3, id);
      if (ex.answer.kind === 'numeric') {
        assert.ok(Number.isFinite(ex.answer.value), `${id} #${seed}`);
        // La propia respuesta, escrita con 4 cifras, se corrige como buena.
        const typed = `${plainNumber(ex.answer.value, 4)} ${ex.answer.unit ?? ''}`;
        assert.equal(gradeNumeric(ex.answer, typed).correct, true, `${id} #${seed}: ${typed}`);
      } else {
        assert.equal(gradeChoice(ex.answer, ex.answer.correct).correct, true);
      }
    }
  }
});

test('la misma semilla da el mismo ejercicio', () => {
  assert.deepEqual(generateExercise('det-3x3', 7), generateExercise('det-3x3', 7));
  assert.notDeepEqual(generateExercise('det-3x3', 7), generateExercise('det-3x3', 8));
});

test('funciones matemáticas de apoyo', () => {
  assert.equal(det3([[2, 1, 0], [1, 3, -1], [0, 2, 4]]), 24);
  assert.equal(rank([[1, 2, 3], [2, 4, 6], [1, 0, 1]]), 2);
  assert.ok(Math.abs(normalCdf(1.96) - 0.975) < 1e-4);
  assert.ok(Math.abs(normalCdf(-1) - 0.1587) < 1e-4);
  assert.equal(binom(10, 3), 120);
});

test('valores de referencia de física', () => {
  // g a 400 km = 8,69 N/kg (comprobado a mano en la documentación)
  const g = (6.67e-11 * 5.97e24) / (6.37e6 + 4e5) ** 2;
  assert.ok(Math.abs(g - 8.688) < 0.001);
});
