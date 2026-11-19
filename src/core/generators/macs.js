/**
 * macs.js — Generadores propios de Matemáticas Aplicadas a las CC. SS. II:
 * programación lineal, funciones de beneficio, distribución de la media
 * muestral e intervalos de confianza. (El resto de MACS reutiliza los de Mat. II.)
 */

import { t, numeric, normalCdf } from './helpers.js';

/** Valores críticos z_{α/2} habituales. */
const Z = { 90: 1.645, 95: 1.96, 99: 2.575 };

export const macs = [
  {
    id: 'prog-lineal',
    title: 'Programación lineal',
    generate(rng) {
      // Restricciones: x + y <= S, a x + b y <= T, x >= 0, y >= 0 ; maximizar z = p x + q y
      let S, a, b, T, p, q, vertices;
      do {
        S = rng.int(4, 12);
        a = rng.int(1, 4); b = rng.int(1, 4);
        T = rng.int(S + 2, 3 * S);
        p = rng.int(1, 9) * 10; q = rng.int(1, 9) * 10;
        // Vértices candidatos: origen, cortes con los ejes e intersección de las dos rectas.
        const cands = [[0, 0], [S, 0], [0, S], [T / a, 0], [0, T / b]];
        const det = 1 * b - 1 * a;
        if (det !== 0) cands.push([(S * b - T) / det, (T - a * S) / det]);
        const ok = ([x, y]) => x >= -1e-9 && y >= -1e-9 && x + y <= S + 1e-9 && a * x + b * y <= T + 1e-9;
        const seen = new Set();
        vertices = cands.filter(ok).filter(([x, y]) => { const key = `${x.toFixed(6)},${y.toFixed(6)}`; if (seen.has(key)) return false; seen.add(key); return true; });
      } while (vertices.length < 4);
      const z = ([x, y]) => p * x + q * y;
      const best = vertices.reduce((m, v) => (z(v) > z(m) ? v : m));
      const value = z(best);
      return {
        statement: `Un taller fabrica dos productos. Si fabrica $x$ unidades del primero e $y$ del segundo, las restricciones son $x + y \\le ${S}$ y $${a === 1 ? '' : a}x + ${b === 1 ? '' : b}y \\le ${T}$, con $x, y \\ge 0$. El beneficio es $B(x, y) = ${p}x + ${q}y$ euros. ¿Cuál es el beneficio máximo?`,
        answer: numeric(value, undefined, { tolerance: { relative: 0.005 } }),
        hints: ['Dibuja la región factible: el máximo de una función lineal se alcanza en un VÉRTICE.', 'Calcula los vértices: el origen, los cortes con los ejes y la intersección de las dos rectas.', `Los vértices son ${vertices.map(([x, y]) => `$(${t(x)}, ${t(y)})$`).join(', ')}. Evalúa $B$ en cada uno.`],
        solution: `${vertices.map((v) => `$B(${t(v[0])}, ${t(v[1])}) = ${t(z(v), 4)}$`).join('; ')}.\n\nEl máximo es $\\boxed{${t(value, 4)}}$ €, en $(${t(best[0])}, ${t(best[1])})$.`,
      };
    },
  },
  {
    id: 'beneficio-max',
    title: 'Optimización de una función de beneficio',
    generate(rng) {
      const k = rng.pick([1, 2, 5]);
      const x0 = rng.int(5, 40);
      const c = rng.int(1, Math.max(1, Math.floor((k * x0 * x0) / 20))) * 10; // así el beneficio máximo es positivo
      // B(x) = -k x^2 + 2 k x0 x - c  => máximo en x0
      const b = 2 * k * x0;
      const value = -k * x0 * x0 + b * x0 - c;
      const askX = rng.int(0, 1) === 1;
      return {
        statement: `El beneficio (en euros) de una empresa al vender $x$ unidades es $B(x) = -${k === 1 ? '' : k}x^2 + ${b}x - ${c}$. ${askX ? '¿Cuántas unidades debe vender para obtener el máximo beneficio?' : '¿Cuál es el beneficio máximo?'}`,
        answer: numeric(askX ? x0 : value, undefined, { tolerance: { relative: 0.005 } }),
        hints: ['El máximo está donde la derivada se anula.', `$B'(x) = -${2 * k}x + ${b}$`, `$B'(x) = 0 \\Rightarrow x = ${x0}$. Comprueba que $B''(x) < 0$.`],
        solution: `$B'(x) = 0 \\Rightarrow x = ${x0}$ unidades (máximo, porque $B''(x) = -${2 * k} < 0$). Beneficio máximo: $B(${x0}) = ${t(value, 5)}$ €. Respuesta: $\\boxed{${t(askX ? x0 : value, 5)}}$.`,
      };
    },
  },
  {
    id: 'media-muestral',
    title: 'Distribución de la media muestral',
    generate(rng) {
      const mu = rng.pick([50, 100, 170, 250, 500]);
      const sigma = rng.pick([8, 10, 12, 20, 30]);
      const n = rng.pick([16, 25, 36, 49, 64, 100]);
      const se = sigma / Math.sqrt(n);
      const z = Math.round(rng.decimal(0.5, 2.4, 2) * 100) / 100;
      const x = Math.round((mu + z * se) * 10) / 10;
      const zr = Math.round(((x - mu) / se) * 100) / 100;
      const value = 1 - normalCdf(zr);
      return {
        statement: `El tiempo de una tarea sigue una $N(${mu}, ${sigma})$. Se toma una muestra de ${n} personas. ¿Cuál es la probabilidad de que la media muestral supere ${String(x).replace('.', ',')}?`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0.006 }, commonErrors: [{ value: 1 - normalCdf((x - mu) / sigma), message: 'Has usado la desviación de la población. La media muestral tiene desviación $\\sigma/\\sqrt n$.' }] }),
        hints: ['La media muestral también sigue una normal, pero más estrecha.', `$\\bar X \\sim N\\left(\\mu, \\dfrac{\\sigma}{\\sqrt n}\\right) = N(${mu},\\ ${t(se)})$`, `$z = \\dfrac{${String(x).replace('.', '{,}')} - ${mu}}{${t(se)}} = ${t(zr, 3)}$`],
        solution: `$P(\\bar X > ${String(x).replace('.', '{,}')}) = P(Z > ${t(zr, 3)}) = 1 - ${t(normalCdf(zr), 4)} = \\boxed{${t(value, 3)}}$`,
      };
    },
  },
  {
    id: 'ic-media',
    title: 'Intervalo de confianza para la media',
    generate(rng) {
      const nivel = rng.pick([90, 95, 99]);
      const sigma = rng.pick([4, 5, 6, 8, 10, 12, 15]);
      const n = rng.pick([25, 36, 49, 64, 81, 100, 144]);
      const xbar = rng.int(20, 200);
      const E = (Z[nivel] * sigma) / Math.sqrt(n);
      return {
        statement: `En una muestra de ${n} personas, la media de cierta variable es ${xbar}. Se sabe que la desviación típica poblacional es ${sigma}. Calcula el **error máximo** del intervalo de confianza para la media al ${nivel} %.`,
        answer: numeric(E, undefined, { tolerance: { relative: 0.01 }, commonErrors: [{ value: Z[nivel] * sigma, message: 'Falta dividir entre $\\sqrt n$.' }, { value: sigma / Math.sqrt(n), message: 'Falta multiplicar por el valor crítico $z_{\\alpha/2}$.' }] }),
        hints: ['El intervalo es $\\left(\\bar x - E,\\ \\bar x + E\\right)$.', '$E = z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt n}$', `Para el ${nivel} %, $z_{\\alpha/2} = ${t(Z[nivel], 4)}$.`],
        solution: `$E = ${t(Z[nivel], 4)}\\cdot\\dfrac{${sigma}}{\\sqrt{${n}}} = \\boxed{${t(E)}}$. El intervalo es $(${t(xbar - E, 4)},\\ ${t(xbar + E, 4)})$.`,
      };
    },
  },
  {
    id: 'ic-proporcion',
    title: 'Intervalo de confianza para una proporción',
    generate(rng) {
      const nivel = rng.pick([90, 95, 99]);
      const n = rng.pick([100, 200, 300, 400, 500, 800]);
      const k = rng.int(Math.round(n * 0.15), Math.round(n * 0.8));
      const p = k / n;
      const E = Z[nivel] * Math.sqrt((p * (1 - p)) / n);
      return {
        statement: `En una encuesta a ${n} estudiantes, ${k} dicen que usan el transporte público. Calcula el error máximo del intervalo de confianza al ${nivel} % para la proporción de estudiantes que lo usan.`,
        answer: numeric(E, undefined, { tolerance: { relative: 0.015 } }),
        hints: [`Proporción muestral: $\\hat p = ${k}/${n} = ${t(p)}$.`, '$E = z_{\\alpha/2}\\sqrt{\\dfrac{\\hat p(1 - \\hat p)}{n}}$', `$z_{\\alpha/2} = ${t(Z[nivel], 4)}$`],
        solution: `$E = ${t(Z[nivel], 4)}\\sqrt{\\dfrac{${t(p)}\\cdot${t(1 - p)}}{${n}}} = \\boxed{${t(E)}}$. Intervalo: $(${t(p - E)},\\ ${t(p + E)})$.`,
      };
    },
  },
  {
    id: 'tamano-muestra',
    title: 'Tamaño mínimo de la muestra',
    generate(rng) {
      const nivel = rng.pick([90, 95, 99]);
      const sigma = rng.pick([5, 8, 10, 12, 15, 20]);
      const Emax = rng.pick([1, 1.5, 2, 2.5, 3]);
      const value = Math.ceil(((Z[nivel] * sigma) / Emax) ** 2);
      return {
        statement: `La desviación típica de una variable es ${sigma}. ¿Qué tamaño mínimo debe tener la muestra para estimar la media con un error menor que ${String(Emax).replace('.', ',')} y una confianza del ${nivel} %?`,
        answer: numeric(value, undefined, { tolerance: { absolute: 1 } }),
        hints: ['Despeja $n$ de la fórmula del error.', '$n \\ge \\left(\\dfrac{z_{\\alpha/2}\\,\\sigma}{E}\\right)^2$', 'Redondea SIEMPRE hacia arriba: el tamaño es un número entero y no puede quedarse corto.'],
        solution: `$n \\ge \\left(\\dfrac{${t(Z[nivel], 4)}\\cdot${sigma}}{${t(Emax)}}\\right)^2 = ${t(((Z[nivel] * sigma) / Emax) ** 2, 5)}$, así que $n = \\boxed{${value}}$.`,
      };
    },
  },
];
