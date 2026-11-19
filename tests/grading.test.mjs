import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAnswer, gradeNumeric, gradeChoice, texNumber, plainNumber, lookupUnit } from '../src/core/grading.js';

test('parseAnswer entiende los formatos habituales', () => {
  const cases = [
    ['8,69', 8.69, ''], ['8.69 N/kg', 8.69, 'N/kg'], ['6.67e-11', 6.67e-11, ''],
    ['6,67·10^-11 N', 6.67e-11, 'N'], ['6,67x10^-11', 6.67e-11, ''], ['6,67 × 10⁻¹¹', 6.67e-11, ''],
    ['-3/4', -0.75, ''], ['7669 m/s', 7669, 'm/s'], ['−2', -2, ''], ['1,5·10^(3) km', 1500, 'km'],
  ];
  for (const [input, value, unit] of cases) {
    const r = parseAnswer(input);
    assert.ok(Math.abs(r.value - value) < Math.abs(value) * 1e-9 + 1e-15, `${input} -> ${r.value}`);
    assert.equal(r.unit, unit, input);
  }
  assert.ok(parseAnswer('hola').error);
  assert.ok(parseAnswer('').error);
  assert.ok(parseAnswer('3/0').error);
});

test('tolerancia relativa y conversión de unidades', () => {
  const spec = { value: 7669, unit: 'm/s' };
  assert.equal(gradeNumeric(spec, '7670 m/s').status, 'correct');
  assert.equal(gradeNumeric(spec, '7,67 km/s').status, 'correct');
  assert.equal(gradeNumeric(spec, '7669').status, 'missing-unit');
  assert.equal(gradeNumeric(spec, '7669 N').status, 'wrong-unit');
  assert.equal(gradeNumeric(spec, '9000 m/s').status, 'incorrect');
  assert.equal(gradeNumeric({ value: 8.69, unit: 'N/kg' }, '8,7 m/s^2').status, 'correct');
});

test('diagnóstico de errores típicos', () => {
  const spec = { value: 8.69, unit: 'N/kg', commonErrors: [{ value: 2489, message: 'Has usado h' }] };
  assert.equal(gradeNumeric(spec, '2490 N/kg').message, 'Has usado h');
  assert.match(gradeNumeric({ value: 5 }, '-5').message, /signo/);
  assert.match(gradeNumeric({ value: 5 }, '5000').message, /potencias de 10/);
  assert.match(gradeNumeric({ value: 5 }, '10').message, /doble/);
  assert.match(gradeNumeric({ value: 8 }, '2').message, /cuadrado/);
});

test('tolerancia absoluta para respuestas exactas', () => {
  assert.equal(gradeNumeric({ value: 24, tolerance: { absolute: 0 } }, '24').correct, true);
  assert.equal(gradeNumeric({ value: 24, tolerance: { absolute: 0 } }, '24,1').correct, false);
});

test('preguntas tipo test', () => {
  const spec = { options: [{ text: 'a' }, { text: 'b', why: 'porque no' }], correct: 0 };
  assert.equal(gradeChoice(spec, 0).correct, true);
  assert.equal(gradeChoice(spec, 1).message, 'porque no');
});

test('formato de números en castellano', () => {
  assert.equal(plainNumber(8.688), '8,69');
  assert.equal(plainNumber(6.67e-11), '6,67·10^-11');
  assert.equal(texNumber(6.67e-11), '6{,}67\\cdot 10^{-11}');
  assert.equal(texNumber(24), '24');
  assert.ok(lookupUnit('MeV'));
});
