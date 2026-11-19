/**
 * helpers.js — Funciones de ayuda para escribir generadores de ejercicios.
 *
 * Un GENERADOR es un objeto { id, title, generate(rng) } que, a partir de
 * números aleatorios, construye un ejercicio con enunciado, respuesta,
 * pistas por niveles y solución paso a paso. La solución se CALCULA con
 * código, así que siempre es coherente con los datos del enunciado.
 */

import { texNumber } from '../grading.js';

/** Número formateado para LaTeX con `sig` cifras significativas. */
export const t = (x, sig = 3) => texNumber(x, sig);

/** Respuesta numérica. */
export function numeric(value, unit, { tolerance, commonErrors } = {}) {
  return { kind: 'numeric', value, unit, tolerance, commonErrors };
}

/** Respuesta tipo test. `options`: [{ text, why? }], `correct`: índice correcto. */
export function choice(options, correct) {
  return { kind: 'choice', options, correct };
}

/** Matriz en LaTeX: [[1,2],[3,4]] -> \begin{pmatrix}1 & 2\\3 & 4\end{pmatrix} */
export function texMatrix(rows) {
  return `\\begin{pmatrix}${rows.map((r) => r.join(' & ')).join(' \\\\ ')}\\end{pmatrix}`;
}

/** Vector (a, b, c) */
export function texVec(v) {
  return `(${v.join(',\\,')})`;
}

/**
 * Polinomio en LaTeX a partir de sus coeficientes (de mayor a menor grado).
 * poly([1, -3, 0, 2]) -> "x^3 - 3x^2 + 2"
 */
export function poly(coefs, variable = 'x') {
  const n = coefs.length - 1;
  const terms = [];
  coefs.forEach((c, i) => {
    if (c === 0) return;
    const power = n - i;
    const abs = Math.abs(c);
    const coefText = abs === 1 && power > 0 ? '' : String(abs);
    const varText = power === 0 ? '' : power === 1 ? variable : `${variable}^${power}`;
    const sign = c < 0 ? '-' : '+';
    terms.push({ sign, body: coefText + varText });
  });
  if (terms.length === 0) return '0';
  return terms
    .map((term, i) => (i === 0 ? (term.sign === '-' ? '-' : '') + term.body : ` ${term.sign} ${term.body}`))
    .join('');
}

/** Ecuación lineal: linEq([2,-1,0],[x,y,z],5) -> "2x - y = 5" */
export function linEq(coefs, vars, rhs) {
  return `${linear(coefs, vars)} = ${rhs}`;
}

/** Parte izquierda de una ecuación lineal: linear([2,-1,1],['x','y','z']) -> "2x - y + z" */
export function linear(coefs, vars) {
  const parts = [];
  coefs.forEach((c, i) => {
    if (c === 0) return;
    const abs = Math.abs(c);
    const body = (abs === 1 ? '' : abs) + vars[i];
    if (parts.length === 0) parts.push((c < 0 ? '-' : '') + body);
    else parts.push(`${c < 0 ? '-' : '+'} ${body}`);
  });
  return parts.length ? parts.join(' ') : '0';
}

/** "Datos: G = ..., M = ..." como línea de Markdown. */
export function datos(list) {
  return `*Datos:* ${list.map((d) => `$${d}$`).join(', ')}.`;
}

/** Determinante 3x3 (regla de Sarrus). */
export function det3(m) {
  const [[a, b, c], [d, e, f], [g, h, i]] = m;
  return a * e * i + b * f * g + c * d * h - c * e * g - a * f * h - b * d * i;
}

/** Producto vectorial. */
export function cross(u, v) {
  return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
}

/** Producto escalar. */
export const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
/** Módulo de un vector. */
export const norm = (u) => Math.sqrt(dot(u, u));
/** Resta de vectores (puntos): B - A. */
export const sub = (b, a) => b.map((x, i) => x - a[i]);

/** Rango de una matriz (eliminación gaussiana con tolerancia numérica). */
export function rank(matrix) {
  const m = matrix.map((r) => [...r]);
  let r = 0;
  for (let col = 0; col < m[0].length && r < m.length; col++) {
    let pivot = r;
    while (pivot < m.length && Math.abs(m[pivot][col]) < 1e-9) pivot++;
    if (pivot === m.length) continue;
    [m[r], m[pivot]] = [m[pivot], m[r]];
    for (let i = r + 1; i < m.length; i++) {
      const factor = m[i][col] / m[r][col];
      for (let j = col; j < m[0].length; j++) m[i][j] -= factor * m[r][j];
    }
    r++;
  }
  return r;
}

/** Combinatorio n sobre k. */
export function binom(n, k) {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
}

/**
 * Función de distribución de la normal estándar, Φ(z).
 * Usa la aproximación de Abramowitz y Stegun (7.1.26) para erf,
 * con un error menor que 1,5·10⁻⁷: más que suficiente para la PAU.
 */
export function normalCdf(z) {
  const x = Math.abs(z) / Math.SQRT2;
  const tt = 1 / (1 + 0.3275911 * x);
  const y = 1 - ((((1.061405429 * tt - 1.453152027) * tt + 1.421413741) * tt - 0.284496736) * tt + 0.254829592) * tt * Math.exp(-x * x);
  const erf = z >= 0 ? y : -y;
  return 0.5 * (1 + erf);
}

/** Grados <-> radianes */
export const rad = (deg) => (deg * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
