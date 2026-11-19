/**
 * index.js — Registro de todos los generadores de ejercicios.
 *
 * El resto de la app no importa los generadores uno a uno: pide un ejercicio
 * por su id con `generateExercise('det-3x3', semilla)`. Así, añadir un
 * generador nuevo solo exige escribirlo y añadirlo a la lista de abajo.
 */

import { algebra, geometry, analysis, integrals, probability } from './math.js';
import { gravitation, electromagnetism, waves, modern } from './physics.js';
import { createRng } from '../random.js';

const ALL = [
  ...algebra, ...geometry, ...analysis, ...integrals, ...probability,
  ...gravitation, ...electromagnetism, ...waves, ...modern,
];

/** Mapa id -> generador (como un HashMap<String, Generator> de Java). */
export const GENERATORS = new Map(ALL.map((g) => [g.id, g]));

/** ¿Existe un generador con este id? */
export const hasGenerator = (id) => GENERATORS.has(id);

/**
 * Genera un ejercicio concreto. La misma (id, semilla) produce SIEMPRE
 * el mismo ejercicio, así que basta con guardar ambos para reconstruirlo.
 */
export function generateExercise(generatorId, seed) {
  const gen = GENERATORS.get(generatorId);
  if (!gen) throw new Error(`Generador desconocido: ${generatorId}`);
  const rng = createRng(seed);
  const exercise = gen.generate(rng);
  return {
    id: `${generatorId}#${seed}`,
    generatorId,
    seed,
    title: gen.title,
    ...exercise,
  };
}
