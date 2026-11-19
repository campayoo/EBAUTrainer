/**
 * random.js — Generador de números aleatorios con SEMILLA.
 *
 * Math.random() no se puede "repetir": cada vez da números distintos.
 * Para los ejercicios generados necesitamos lo contrario: con la misma
 * semilla, el mismo ejercicio. Así podemos:
 *   - guardar solo la semilla (un número) y reconstruir el enunciado después;
 *   - escribir tests deterministas.
 *
 * Usamos el algoritmo "mulberry32": muy corto, rápido y suficiente para esto
 * (NO sirve para criptografía).
 */

/** Crea un generador. Devuelve un objeto con métodos de ayuda. */
export function createRng(seed) {
  let state = seed >>> 0; // fuerza un entero sin signo de 32 bits

  /** Número decimal en [0, 1). Es el núcleo del algoritmo mulberry32. */
  function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  return {
    next,
    /** Entero en [min, max], ambos incluidos. */
    int(min, max) {
      return min + Math.floor(next() * (max - min + 1));
    },
    /** Entero en [min, max] distinto de 0. */
    nonZero(min, max) {
      let v = 0;
      while (v === 0) v = min + Math.floor(next() * (max - min + 1));
      return v;
    },
    /** Decimal en [min, max] redondeado a `decimals` cifras decimales. */
    decimal(min, max, decimals = 1) {
      const f = 10 ** decimals;
      return Math.round((min + next() * (max - min)) * f) / f;
    },
    /** Elemento al azar de un array. */
    pick(array) {
      return array[Math.floor(next() * array.length)];
    },
    /** Copia barajada de un array (algoritmo de Fisher-Yates). */
    shuffle(array) {
      const a = [...array];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };
}

/** Semilla nueva a partir del reloj (para cuando queremos un ejercicio distinto). */
export function freshSeed() {
  return (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
}
