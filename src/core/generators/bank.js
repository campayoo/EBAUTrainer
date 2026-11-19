/**
 * bank.js — Generadores a partir de un BANCO de preguntas tipo test.
 *
 * Para materias más teóricas (Biología, parte de Química) no tiene sentido
 * generar números aleatorios: se escribe un banco de preguntas y el generador
 * elige una según la semilla. Las pistas se construyen así:
 *   1. una idea escrita a mano para esa pregunta;
 *   2. y 3. se descartan opciones incorrectas (como un "50 %" del profe).
 *
 * Formato de cada pregunta:
 *   { q: enunciado, o: [opciones], c: índice correcto, h: pista, s: explicación }
 */

import { choice } from './helpers.js';

export function bankGenerator(id, title, items) {
  return {
    id,
    title,
    size: items.length,
    generate(rng) {
      const item = items[Math.floor(rng.next() * items.length)];
      // Barajamos las opciones para que la correcta no esté siempre en el mismo sitio.
      const order = rng.shuffle(item.o.map((_, i) => i));
      const options = order.map((i) => ({ text: item.o[i] }));
      const correct = order.indexOf(item.c);
      const wrong = order.map((orig, pos) => ({ orig, pos })).filter((x) => x.orig !== item.c);
      const letter = (pos) => 'ABCDEFG'[pos];
      return {
        statement: item.q,
        answer: choice(options, correct),
        hints: [
          item.h,
          `Puedes descartar la opción ${letter(wrong[0].pos)}: «${item.o[wrong[0].orig]}».`,
          `Descarta también la ${letter(wrong[1].pos)}. Te quedan dos opciones.`,
        ],
        solution: `La respuesta correcta es **${item.o[item.c]}**. ${item.s}`,
      };
    },
  };
}
