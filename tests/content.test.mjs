/** Tests del contenido: el temario real debe ser válido y el validador debe cazar errores. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadContent, validateContent, compileContent } from '../tools/content-lib.mjs';
import generated from '../src/content/content.generated.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

test('el contenido de content/ no tiene errores', () => {
  const errors = validateContent(loadContent(join(root, 'content')));
  assert.deepEqual(errors, []);
});

test('content.generated.js está actualizado (ejecuta npm run build:content)', () => {
  const compiled = compileContent(loadContent(join(root, 'content')));
  assert.equal(generated.version, compiled.version);
});

test('el validador detecta respuestas mal calculadas, fórmulas rotas y ciclos', () => {
  const broken = {
    version: 'x',
    exams: {},
    subjects: [{
      id: 's', name: 'S', short: 'S', color: '#000', folder: 's',
      blocks: [{ id: 's.b', title: 'B', examWeight: 1, topics: [{ id: 's.b.t', title: 'T', units: [
        { id: 's.b.t.u1', title: 'U1', minutes: 40, difficulty: 2, requires: ['s.b.t.u2'] },
        { id: 's.b.t.u2', title: 'U2', minutes: 40, difficulty: 2, requires: ['s.b.t.u1'] },
      ] }] }],
    }],
    lessons: {
      's.b.t.u1': {
        id: 's.b.t.u1', __file: 'u1.yaml',
        explanation: [{ title: 'x', body: '$\\frac{1}{$' }],
        practice: [{ id: 'e1', kind: 'numeric', statement: 'a', answer: { value: 5 }, check: '2 + 2', hints: ['a', 'b', 'c'], solution: 's' }],
        test: [{ id: 'e2', kind: 'choice', statement: 'a', options: ['x', 'y'], correct: 5, hints: ['a'], solution: 's' }],
      },
    },
  };
  const errors = validateContent(broken).join('\n');
  assert.match(errors, /ciclo/);
  assert.match(errors, /check da 4/);
  assert.match(errors, /LaTeX/);
  assert.match(errors, /índice válido/);
  assert.match(errors, /3 pistas/);
});

test('todas las unidades del temario tienen clase completa', () => {
  const units = generated.subjects.flatMap((s) => s.blocks.flatMap((b) => b.topics.flatMap((t) => t.units)));
  const missing = units.filter((u) => !generated.lessons[u.id]).map((u) => u.id);
  assert.deepEqual(missing, []);
});
