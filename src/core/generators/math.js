/**
 * math.js — Generadores de ejercicios de Matemáticas II.
 *
 * Cada generador recibe `rng` (generador aleatorio con semilla, ver random.js)
 * y devuelve un ejercicio con este formato:
 *   {
 *     statement: Markdown con fórmulas $...$,
 *     answer:    numeric(...) o choice(...),
 *     hints:     [pista 1: idea, pista 2: método, pista 3: primer paso],
 *     solution:  solución paso a paso en Markdown,
 *   }
 * Todos los enunciados son originales.
 */

import {
  t, numeric, choice, texMatrix, texVec, poly, linEq, det3, cross, dot, norm, sub, rank, binom, normalCdf, deg,
} from './helpers.js';

/* ============================== ÁLGEBRA ============================== */

const randMatrix = (rng, rows, cols, min = -5, max = 5) =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => rng.int(min, max)));

export const algebra = [
  {
    id: 'mat-combinacion',
    title: 'Combinación lineal de matrices',
    generate(rng) {
      const A = randMatrix(rng, 2, 2);
      const B = randMatrix(rng, 2, 2);
      const a = rng.pick([2, 3]);
      const b = rng.pick([-3, -2, 2, 3]);
      const i = rng.int(1, 2);
      const j = rng.int(1, 2);
      const value = a * A[i - 1][j - 1] + b * B[i - 1][j - 1];
      const expr = `${a}A ${b < 0 ? '-' : '+'} ${Math.abs(b)}B`;
      return {
        statement: `Dadas $A = ${texMatrix(A)}$ y $B = ${texMatrix(B)}$, calcula el elemento $c_{${i}${j}}$ de la matriz $C = ${expr}$.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0 } }),
        hints: [
          'Las operaciones de suma y producto por un número se hacen elemento a elemento.',
          `Solo necesitas los elementos de la fila ${i} y columna ${j}: $c_{${i}${j}} = ${a}\\,a_{${i}${j}} ${b < 0 ? '-' : '+'} ${Math.abs(b)}\\,b_{${i}${j}}$.`,
          `$a_{${i}${j}} = ${A[i - 1][j - 1]}$ y $b_{${i}${j}} = ${B[i - 1][j - 1]}$.`,
        ],
        solution: `$c_{${i}${j}} = ${a}\\cdot(${A[i - 1][j - 1]}) ${b < 0 ? '-' : '+'} ${Math.abs(b)}\\cdot(${B[i - 1][j - 1]}) = \\boxed{${value}}$`,
      };
    },
  },
  {
    id: 'mat-producto',
    title: 'Producto de matrices',
    generate(rng) {
      const A = randMatrix(rng, 2, 3, -4, 4);
      const B = randMatrix(rng, 3, 2, -4, 4);
      const i = rng.int(1, 2);
      const j = rng.int(1, 2);
      const terms = [0, 1, 2].map((k) => [A[i - 1][k], B[k][j - 1]]);
      const value = terms.reduce((s, [x, y]) => s + x * y, 0);
      return {
        statement: `Sean $A = ${texMatrix(A)}$ y $B = ${texMatrix(B)}$. Calcula el elemento $c_{${i}${j}}$ de $C = A\\cdot B$.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0 } }),
        hints: [
          '$A$ es $2\\times3$ y $B$ es $3\\times2$: el producto existe y es $2\\times2$.',
          `Cada elemento $c_{ij}$ es la fila $i$ de $A$ "por" la columna $j$ de $B$: se multiplican elemento a elemento y se suman.`,
          `Fila ${i} de $A$: $${texVec(A[i - 1])}$. Columna ${j} de $B$: $${texVec(B.map((r) => r[j - 1]))}$.`,
        ],
        solution: `$c_{${i}${j}} = ${terms.map(([x, y]) => `(${x})(${y})`).join(' + ')} = \\boxed{${value}}$`,
      };
    },
  },
  {
    id: 'det-2x2',
    title: 'Determinante de orden 2',
    generate(rng) {
      const [[a, b], [c, d]] = randMatrix(rng, 2, 2, -9, 9);
      const value = a * d - b * c;
      return {
        statement: `Calcula $\\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}$.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0 }, commonErrors: [{ value: a * d + b * c, message: 'Has sumado los dos productos. En orden 2 se RESTA: diagonal principal menos diagonal secundaria.' }] }),
        hints: [
          'Un determinante de orden 2 se calcula con las dos diagonales.',
          '$\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$',
          `Diagonal principal: $(${a})(${d}) = ${a * d}$.`,
        ],
        solution: `$(${a})(${d}) - (${b})(${c}) = ${a * d} - (${b * c}) = \\boxed{${value}}$`,
      };
    },
  },
  {
    id: 'det-3x3',
    title: 'Determinante de orden 3 (Sarrus)',
    generate(rng) {
      const M = randMatrix(rng, 3, 3, -4, 4);
      const [[a, b, c], [d, e, f], [g, h, i]] = M;
      const plus = [a * e * i, b * f * g, c * d * h];
      const minus = [c * e * g, a * f * h, b * d * i];
      const value = det3(M);
      return {
        statement: `Calcula el determinante de $A = ${texMatrix(M)}$.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0 } }),
        hints: [
          'Es de orden 3: usa la regla de Sarrus (o desarrolla por una fila con ceros).',
          'Suman los productos de la diagonal principal y sus dos "paralelas"; restan los de la diagonal secundaria y sus paralelas.',
          `Los productos que suman son ${plus.join(', ')}.`,
        ],
        solution: `Suman: $${plus.join(' + ')} = ${plus.reduce((s, x) => s + x, 0)}$.\n\nRestan: $${minus.join(' + ')} = ${minus.reduce((s, x) => s + x, 0)}$.\n\n$|A| = ${plus.reduce((s, x) => s + x, 0)} - (${minus.reduce((s, x) => s + x, 0)}) = \\boxed{${value}}$`,
      };
    },
  },
  {
    id: 'det-propiedades',
    title: 'Propiedades de los determinantes',
    generate(rng) {
      const k = rng.pick([-5, -4, -3, -2, 2, 3, 4, 5]);
      const variant = rng.int(0, 3);
      const lam = rng.pick([2, 3, -2]);
      const cases = [
        { expr: `${lam}A`, value: lam ** 3 * k, why: `Al multiplicar una matriz de orden 3 por ${lam}, cada una de sus 3 filas queda multiplicada por ${lam}: el determinante se multiplica por $${lam}^3$.`, err: { value: lam * k, message: `Cuidado: $|${lam}A| \\neq ${lam}|A|$. El ${lam} multiplica a las 3 filas, así que sale $${lam}^3$.` } },
        { expr: 'A^t', value: k, why: 'Una matriz y su traspuesta tienen el mismo determinante.' },
        { expr: 'A^{-1}', value: 1 / k, why: 'Como $A\\cdot A^{-1} = I$, se cumple $|A|\\cdot|A^{-1}| = 1$.' },
        { expr: 'A^2', value: k * k, why: 'El determinante de un producto es el producto de determinantes: $|A^2| = |A|\\cdot|A|$.', err: { value: 2 * k, message: '$|A^2|$ no es $2|A|$: es $|A|\\cdot|A|$.' } },
      ];
      const c = cases[variant];
      return {
        statement: `$A$ es una matriz cuadrada de orden 3 con $|A| = ${k}$. Calcula $|${c.expr}|$.`,
        answer: numeric(c.value, undefined, { tolerance: { relative: 0.01 }, commonErrors: c.err ? [c.err] : [] }),
        hints: [
          'No necesitas conocer la matriz: basta con las propiedades de los determinantes.',
          'Recuerda: $|\\lambda A| = \\lambda^n|A|$, $|A^t| = |A|$, $|AB| = |A||B|$.',
          c.why,
        ],
        solution: `${c.why}\n\n$|${c.expr}| = \\boxed{${t(c.value)}}$`,
      };
    },
  },
  {
    id: 'rango-3x3',
    title: 'Rango de una matriz',
    generate(rng) {
      const target = rng.pick([1, 2, 2, 3, 3]);
      let M;
      do {
        const r1 = randMatrix(rng, 1, 3, -4, 4)[0];
        const r2raw = randMatrix(rng, 1, 3, -4, 4)[0];
        const a = rng.nonZero(-2, 2);
        const b = rng.nonZero(-2, 2);
        if (target === 1) M = [r1, r1.map((x) => a * x), r1.map((x) => b * x)];
        else if (target === 2) M = [r1, r2raw, r1.map((x, k) => a * x + b * r2raw[k])];
        else M = [r1, r2raw, randMatrix(rng, 1, 3, -4, 4)[0]];
      } while (rank(M) !== target || M[0].every((x) => x === 0));
      return {
        statement: `Calcula el rango de $M = ${texMatrix(M)}$.`,
        answer: numeric(target, undefined, { tolerance: { absolute: 0 } }),
        hints: [
          'El rango es el número de filas (o columnas) linealmente independientes.',
          'Empieza por el determinante de orden 3: si no es 0, el rango es 3. Si es 0, busca un menor de orden 2 no nulo.',
          `$|M| = ${det3(M)}$.`,
        ],
        solution: target === 3
          ? `$|M| = ${det3(M)} \\neq 0$, así que $\\operatorname{rg}(M) = \\boxed{3}$.`
          : `$|M| = 0$, luego el rango es menor que 3. ${target === 2 ? 'Hay un menor de orden 2 no nulo (la tercera fila es combinación lineal de las dos primeras), así que' : 'Todas las filas son proporcionales a la primera, así que'} $\\operatorname{rg}(M) = \\boxed{${target}}$.`,
      };
    },
  },
  {
    id: 'inversa-2x2',
    title: 'Matriz inversa de orden 2',
    generate(rng) {
      let a, b, c, d, det;
      do {
        [[a, b], [c, d]] = randMatrix(rng, 2, 2, -5, 5);
        det = a * d - b * c;
      } while (![1, -1, 2, -2, 4].includes(det));
      const inv = [[d / det, -b / det], [-c / det, a / det]];
      const i = rng.int(1, 2);
      const j = rng.int(1, 2);
      const value = inv[i - 1][j - 1];
      const adjT = [[d, -b], [-c, a]];
      return {
        statement: `Dada $A = ${texMatrix([[a, b], [c, d]])}$, calcula el elemento de la fila ${i} y columna ${j} de $A^{-1}$. (Puedes responder con una fracción, como 3/2.)`,
        answer: numeric(value, undefined, { tolerance: { relative: 0.005 }, commonErrors: [{ value: adjT[i - 1][j - 1], message: 'Te has olvidado de dividir entre el determinante.' }] }),
        hints: [
          'Primero comprueba que $|A| \\neq 0$ (si no, no hay inversa).',
          'Para orden 2: $A^{-1} = \\dfrac{1}{|A|}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.',
          `$|A| = ${det}$.`,
        ],
        solution: `$|A| = (${a})(${d}) - (${b})(${c}) = ${det}$.\n\n$A^{-1} = \\dfrac{1}{${det}}${texMatrix(adjT)}$, así que el elemento pedido es $\\dfrac{${adjT[i - 1][j - 1]}}{${det}} = \\boxed{${t(value)}}$.`,
      };
    },
  },
  {
    id: 'sistema-gauss',
    title: 'Sistema de ecuaciones (Gauss)',
    generate(rng) {
      let A;
      do A = randMatrix(rng, 3, 3, -3, 3);
      while (det3(A) === 0);
      const sol = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)];
      const rhs = A.map((row) => dot(row, sol));
      const which = rng.int(0, 2);
      const v = ['x', 'y', 'z'][which];
      return {
        statement: `Resuelve el sistema y da el valor de $${v}$:\n\n$$\\begin{cases} ${A.map((row, k) => linEq(row, ['x', 'y', 'z'], rhs[k])).join(' \\\\ ')} \\end{cases}$$`,
        answer: numeric(sol[which], undefined, { tolerance: { absolute: 1e-6 } }),
        hints: [
          `El determinante de la matriz de coeficientes es ${det3(A)} ≠ 0: el sistema es compatible determinado (una única solución).`,
          'Método de Gauss: combina ecuaciones para hacer ceros debajo de la diagonal. También vale la regla de Cramer.',
          'Elige como pivote una ecuación cuyo coeficiente sea 1 o −1 para evitar fracciones.',
        ],
        solution: `La solución es $x = ${sol[0]}$, $y = ${sol[1]}$, $z = ${sol[2]}$ (compruébalo sustituyendo en las tres ecuaciones). Por tanto, $${v} = \\boxed{${sol[which]}}$.`,
      };
    },
  },
  {
    id: 'rouche-parametro',
    title: 'Discusión de un sistema con parámetro',
    generate(rng) {
      const p = rng.nonZero(-3, 3);
      const q = rng.nonZero(-3, 3);
      const value = -1 / (p * q);
      const M = [[1, p, 0], [0, 1, q], ['a', 0, 1]];
      return {
        statement: `Considera el sistema\n\n$$\\begin{cases} ${linEq([1, p, 0], ['x', 'y', 'z'], 1)} \\\\ ${linEq([0, 1, q], ['x', 'y', 'z'], 2)} \\\\ ax + z = 3 \\end{cases}$$\n\n¿Para qué valor de $a$ el sistema **no** es compatible determinado? (Puedes responder con una fracción.)`,
        answer: numeric(value, undefined, { tolerance: { relative: 0.005 } }),
        hints: [
          'Según Rouché-Frobenius, el sistema es compatible determinado cuando el rango de la matriz de coeficientes es 3, es decir, cuando su determinante no es 0.',
          `Calcula $|A|$ con $A = ${texMatrix(M)}$ en función de $a$ e iguálalo a 0.`,
          `Desarrollando por la primera fila: $|A| = 1 + ${p * q}a$.`,
        ],
        solution: `$|A| = 1\\cdot(1\\cdot 1 - ${q}\\cdot 0) - (${p})\\cdot(0\\cdot 1 - ${q}a) = 1 + ${p * q}a$.\n\n$|A| = 0 \\iff a = \\dfrac{-1}{${p * q}} = \\boxed{${t(value)}}$. Para ese valor el rango de $A$ baja a 2 y el sistema deja de ser compatible determinado.`,
      };
    },
  },
];

/* ============================== GEOMETRÍA ============================== */

const randVec = (rng, min = -5, max = 5) => [rng.int(min, max), rng.int(min, max), rng.int(min, max)];

export const geometry = [
  {
    id: 'producto-escalar',
    title: 'Producto escalar',
    generate(rng) {
      const u = randVec(rng);
      const v = randVec(rng);
      const value = dot(u, v);
      return {
        statement: `Calcula el producto escalar de $\\vec u = ${texVec(u)}$ y $\\vec v = ${texVec(v)}$.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0 } }),
        hints: ['En coordenadas, el producto escalar se calcula multiplicando componente a componente.', '$\\vec u\\cdot\\vec v = u_1v_1 + u_2v_2 + u_3v_3$', `$u_1v_1 = ${u[0] * v[0]}$`],
        solution: `$\\vec u\\cdot\\vec v = (${u[0]})(${v[0]}) + (${u[1]})(${v[1]}) + (${u[2]})(${v[2]}) = \\boxed{${value}}$`,
      };
    },
  },
  {
    id: 'angulo-vectores',
    title: 'Ángulo entre dos vectores',
    generate(rng) {
      let u, v;
      do { u = randVec(rng, -4, 4); v = randVec(rng, -4, 4); } while (norm(u) === 0 || norm(v) === 0);
      const cos = dot(u, v) / (norm(u) * norm(v));
      const value = deg(Math.acos(Math.max(-1, Math.min(1, cos))));
      return {
        statement: `Calcula el ángulo (en grados) que forman $\\vec u = ${texVec(u)}$ y $\\vec v = ${texVec(v)}$.`,
        answer: numeric(value, 'º', { tolerance: { absolute: 0.5 } }),
        hints: ['El producto escalar relaciona los módulos y el ángulo.', '$\\cos\\alpha = \\dfrac{\\vec u\\cdot\\vec v}{|\\vec u|\\,|\\vec v|}$', `$\\vec u\\cdot\\vec v = ${dot(u, v)}$, $|\\vec u| = \\sqrt{${dot(u, u)}}$, $|\\vec v| = \\sqrt{${dot(v, v)}}$.`],
        solution: `$\\cos\\alpha = \\dfrac{${dot(u, v)}}{\\sqrt{${dot(u, u)}}\\sqrt{${dot(v, v)}}} = ${t(cos)}$, así que $\\alpha = \\boxed{${t(value)}^\\circ}$.`,
      };
    },
  },
  {
    id: 'area-triangulo',
    title: 'Área de un triángulo en el espacio',
    generate(rng) {
      let A, B, C, n;
      do { A = randVec(rng, -3, 3); B = randVec(rng, -3, 3); C = randVec(rng, -3, 3); n = cross(sub(B, A), sub(C, A)); } while (norm(n) === 0);
      const value = norm(n) / 2;
      return {
        statement: `Calcula el área del triángulo de vértices $A${texVec(A)}$, $B${texVec(B)}$ y $C${texVec(C)}$.`,
        answer: numeric(value, 'u^2', { tolerance: { relative: 0.01 }, commonErrors: [{ value: norm(n), message: 'Ese es el área del paralelogramo. El triángulo es la mitad.' }] }),
        hints: ['El módulo del producto vectorial es el área del paralelogramo que forman dos vectores.', 'Área $= \\frac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$', `$\\overrightarrow{AB} = ${texVec(sub(B, A))}$, $\\overrightarrow{AC} = ${texVec(sub(C, A))}$.`],
        solution: `$\\overrightarrow{AB}\\times\\overrightarrow{AC} = ${texVec(n)}$, de módulo $\\sqrt{${dot(n, n)}}$.\n\nÁrea $= \\dfrac{\\sqrt{${dot(n, n)}}}{2} = \\boxed{${t(value)}\\ \\text{u}^2}$`,
      };
    },
  },
  {
    id: 'volumen-tetraedro',
    title: 'Volumen de un tetraedro',
    generate(rng) {
      let A, B, C, D, mixed;
      do { A = randVec(rng, -2, 3); B = randVec(rng, -2, 3); C = randVec(rng, -2, 3); D = randVec(rng, -2, 3); mixed = det3([sub(B, A), sub(C, A), sub(D, A)]); } while (mixed === 0);
      const value = Math.abs(mixed) / 6;
      return {
        statement: `Calcula el volumen del tetraedro de vértices $A${texVec(A)}$, $B${texVec(B)}$, $C${texVec(C)}$ y $D${texVec(D)}$.`,
        answer: numeric(value, 'u^3', { tolerance: { relative: 0.01 }, commonErrors: [{ value: Math.abs(mixed), message: 'Ese es el volumen del paralelepípedo. El tetraedro es la sexta parte.' }] }),
        hints: ['El producto mixto da el volumen del paralelepípedo que forman tres vectores.', 'Volumen $= \\frac16\\left|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]\\right|$', 'El producto mixto es el determinante de los tres vectores puestos en filas.'],
        solution: `$[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}] = ${texMatrix([sub(B, A), sub(C, A), sub(D, A)]).replace('pmatrix', 'vmatrix').replace('pmatrix', 'vmatrix')} = ${mixed}$.\n\n$V = \\dfrac{|${mixed}|}{6} = \\boxed{${t(value)}\\ \\text{u}^3}$`,
      };
    },
  },
  {
    id: 'plano-punto-normal',
    title: 'Ecuación de un plano',
    generate(rng) {
      let n;
      do n = randVec(rng, -4, 4); while (norm(n) === 0);
      const P = randVec(rng, -4, 4);
      const D = -dot(n, P);
      return {
        statement: `El plano $\\pi$ pasa por $P${texVec(P)}$ y tiene vector normal $\\vec n = ${texVec(n)}$. Si su ecuación es $${linEq(n, ['x', 'y', 'z'], 0).replace(' = 0', '')} + D = 0$, ¿cuánto vale $D$?`,
        answer: numeric(D, undefined, { tolerance: { absolute: 0 } }),
        hints: ['Los coeficientes de $x, y, z$ en la ecuación general son las componentes del vector normal.', 'Si $P$ está en el plano, sus coordenadas cumplen la ecuación.', 'Sustituye $P$ en la ecuación y despeja $D$.'],
        solution: `$${n[0]}(${P[0]}) + (${n[1]})(${P[1]}) + (${n[2]})(${P[2]}) + D = 0 \\Rightarrow ${dot(n, P)} + D = 0 \\Rightarrow D = \\boxed{${D}}$`,
      };
    },
  },
  {
    id: 'posicion-planos',
    title: 'Posición relativa de dos planos',
    generate(rng) {
      let n;
      do n = randVec(rng, -3, 3); while (norm(n) === 0);
      const D = rng.int(-5, 5);
      const k = rng.pick([2, -2, 3]);
      const kind = rng.int(0, 2); // 0 coincidentes, 1 paralelos, 2 secantes
      let n2 = n.map((x) => k * x);
      let D2 = k * D;
      if (kind === 1) D2 = k * D + rng.pick([1, 2, 3]);
      if (kind === 2) { do n2 = randVec(rng, -3, 3); while (norm(cross(n, n2)) === 0); D2 = rng.int(-5, 5); }
      const plane = (v, d) => `${linEq(v, ['x', 'y', 'z'], 0).replace(' = 0', '')} ${d < 0 ? '-' : '+'} ${Math.abs(d)} = 0`;
      return {
        statement: `¿Cuál es la posición relativa de $\\pi_1: ${plane(n, D)}$ y $\\pi_2: ${plane(n2, D2)}$?`,
        answer: choice([
          { text: 'Coincidentes', why: 'Para ser coincidentes, TODOS los coeficientes (también el término independiente) deben ser proporcionales.' },
          { text: 'Paralelos', why: 'Para ser paralelos, los vectores normales deben ser proporcionales pero no el término independiente.' },
          { text: 'Secantes (se cortan en una recta)', why: 'Si los vectores normales fueran no proporcionales serían secantes; compara las componentes.' },
        ], kind),
        hints: ['Compara los vectores normales de los dos planos.', 'Normales proporcionales → paralelos o coincidentes. Si no, secantes.', `$\\vec n_1 = ${texVec(n)}$, $\\vec n_2 = ${texVec(n2)}$.`],
        solution: kind === 2
          ? 'Los vectores normales no son proporcionales, así que los planos son **secantes**: se cortan en una recta.'
          : `$\\vec n_2 = ${k}\\,\\vec n_1$ y el término independiente ${kind === 0 ? 'también' : '**no**'} guarda esa proporción, así que son **${kind === 0 ? 'coincidentes' : 'paralelos'}**.`,
      };
    },
  },
  {
    id: 'distancia-punto-plano',
    title: 'Distancia de un punto a un plano',
    generate(rng) {
      let n;
      do n = randVec(rng, -4, 4); while (norm(n) === 0);
      const D = rng.int(-6, 6);
      const P = randVec(rng, -4, 4);
      const num = Math.abs(dot(n, P) + D);
      const value = num / norm(n);
      return {
        statement: `Calcula la distancia del punto $P${texVec(P)}$ al plano $\\pi: ${linEq(n, ['x', 'y', 'z'], 0).replace(' = 0', '')} ${D < 0 ? '-' : '+'} ${Math.abs(D)} = 0$.`,
        answer: numeric(value, 'u', { tolerance: { relative: 0.01 } }),
        hints: ['Hay una fórmula directa con la ecuación general del plano.', '$d(P,\\pi) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2+B^2+C^2}}$', `Numerador: $|${dot(n, P) + D}|$.`],
        solution: `$d = \\dfrac{|${dot(n, P) + D}|}{\\sqrt{${dot(n, n)}}} = \\boxed{${t(value)}\\ \\text{u}}$`,
      };
    },
  },
];

/* ============================== ANÁLISIS ============================== */

export const analysis = [
  {
    id: 'limite-infinito',
    title: 'Límite en el infinito',
    generate(rng) {
      const a = rng.nonZero(-6, 6); const b = rng.int(-5, 5); const c = rng.int(-5, 5);
      const d = rng.nonZero(-6, 6); const e = rng.int(-5, 5); const f = rng.int(-5, 5);
      const value = a / d;
      return {
        statement: `Calcula $\\displaystyle\\lim_{x\\to+\\infty} \\frac{${poly([a, b, c])}}{${poly([d, e, f])}}$. (Puedes responder con una fracción.)`,
        answer: numeric(value, undefined, { tolerance: { relative: 0.005 } }),
        hints: ['Es una indeterminación $\\infty/\\infty$ de dos polinomios.', 'Si numerador y denominador tienen el mismo grado, el límite es el cociente de los coeficientes principales.', `Coeficientes principales: ${a} y ${d}.`],
        solution: `Mismo grado (2), así que el límite es $\\dfrac{${a}}{${d}} = \\boxed{${t(value)}}$.`,
      };
    },
  },
  {
    id: 'limite-cero-cero',
    title: 'Indeterminación 0/0',
    generate(rng) {
      const r = rng.int(-4, 4);
      const s = rng.int(-4, 4);
      const value = r + s;
      return {
        statement: `Calcula $\\displaystyle\\lim_{x\\to ${r}} \\frac{${poly([1, s - r, -r * s])}}{${poly([1, -r])}}$.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 1e-9 } }),
        hints: [`Si sustituyes $x = ${r}$ sale $0/0$: hay que simplificar.`, `El numerador se anula en $x = ${r}$, así que es divisible entre $${poly([1, -r])}$ (Ruffini).`, `$${poly([1, s - r, -r * s])} = (${poly([1, -r])})(${poly([1, s])})$`],
        solution: `$\\dfrac{(${poly([1, -r])})(${poly([1, s])})}{${poly([1, -r])}} = ${poly([1, s])}$, y al sustituir $x = ${r}$ queda $\\boxed{${value}}$.`,
      };
    },
  },
  {
    id: 'bolzano-intervalo',
    title: 'Teorema de Bolzano',
    generate(rng) {
      let c, root;
      do {
        c = rng.int(3, 70);
        // f(x) = x^3 + x - c es creciente: buscamos su única raíz por bisección
        let lo = -10; let hi = 10;
        for (let k = 0; k < 60; k++) { const mid = (lo + hi) / 2; if (mid ** 3 + mid - c > 0) hi = mid; else lo = mid; }
        root = lo;
      } while (Math.abs(root - Math.round(root)) < 1e-6);
      const n = Math.floor(root);
      const f = (x) => x ** 3 + x - c;
      return {
        statement: `La función $f(x) = x^3 + x - ${c}$ tiene una única raíz real. Halla el número entero $n$ tal que la raíz está en el intervalo $(n, n+1)$.`,
        answer: numeric(n, undefined, { tolerance: { absolute: 0 } }),
        hints: ['$f$ es continua (es un polinomio). Busca dos enteros consecutivos donde $f$ cambie de signo.', 'Teorema de Bolzano: si $f(a)$ y $f(b)$ tienen distinto signo, hay una raíz entre $a$ y $b$.', `Prueba con $f(${n}) = ${f(n)}$.`],
        solution: `$f(${n}) = ${f(n)} < 0$ y $f(${n + 1}) = ${f(n + 1)} > 0$. Por Bolzano hay una raíz en $(${n}, ${n + 1})$: $n = \\boxed{${n}}$.`,
      };
    },
  },
  {
    id: 'derivada-punto',
    title: 'Derivada en un punto',
    generate(rng) {
      const [a, b, c, d] = [rng.nonZero(-4, 4), rng.int(-5, 5), rng.int(-6, 6), rng.int(-6, 6)];
      const x0 = rng.int(-3, 3);
      const value = 3 * a * x0 * x0 + 2 * b * x0 + c;
      return {
        statement: `Calcula $f'(${x0})$ siendo $f(x) = ${poly([a, b, c, d])}$.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 1e-9 } }),
        hints: ['Deriva término a término.', '$(x^n)\' = n\\,x^{n-1}$ y la derivada de una constante es 0.', `$f'(x) = ${poly([3 * a, 2 * b, c])}$`],
        solution: `$f'(x) = ${poly([3 * a, 2 * b, c])}$, así que $f'(${x0}) = \\boxed{${value}}$.`,
      };
    },
  },
  {
    id: 'recta-tangente',
    title: 'Recta tangente',
    generate(rng) {
      const [a, b, c] = [rng.nonZero(-3, 3), rng.int(-5, 5), rng.int(-5, 5)];
      const x0 = rng.int(-3, 3);
      const f0 = a * x0 * x0 + b * x0 + c;
      const m = 2 * a * x0 + b;
      const n = f0 - m * x0;
      return {
        statement: `La recta tangente a $f(x) = ${poly([a, b, c])}$ en $x = ${x0}$ es $y = mx + n$. Calcula $n$ (la ordenada en el origen).`,
        answer: numeric(n, undefined, { tolerance: { absolute: 1e-9 } }),
        hints: ['La recta tangente en $x_0$ es $y - f(x_0) = f\'(x_0)(x - x_0)$.', 'Necesitas $f(x_0)$ y la pendiente $m = f\'(x_0)$.', `$f(${x0}) = ${f0}$ y $f'(${x0}) = ${m}$.`],
        solution: `$y - ${f0} = ${m}(x - (${x0}))$, es decir, $y = ${m}x + ${n}$. Por tanto, $n = \\boxed{${n}}$.`,
      };
    },
  },
  {
    id: 'valor-medio',
    title: 'Teorema del valor medio',
    generate(rng) {
      const p = rng.nonZero(-3, 3); const q = rng.int(-4, 4);
      const a = rng.int(-3, 2); const b = a + rng.int(1, 4);
      const value = (a + b) / 2;
      return {
        statement: `Halla el valor $c\\in(${a}, ${b})$ que garantiza el teorema del valor medio para $f(x) = ${poly([p, q, 0])}$ en $[${a}, ${b}]$.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 1e-6 } }),
        hints: ['El teorema dice que existe $c$ con $f\'(c) = \\dfrac{f(b) - f(a)}{b - a}$.', `Calcula la pendiente media $\\dfrac{f(${b}) - f(${a})}{${b} - (${a})}$.`, `$f'(x) = ${poly([2 * p, q])}$`],
        solution: `$\\dfrac{f(${b}) - f(${a})}{${b - a}} = ${t((p * b * b + q * b - p * a * a - q * a) / (b - a))}$. Igualando a $f'(c) = ${poly([2 * p, q], 'c')}$: $c = \\boxed{${t(value)}}$.`,
      };
    },
  },
  {
    id: 'optimizacion',
    title: 'Optimización',
    generate(rng) {
      if (rng.int(0, 1) === 0) {
        const P = rng.pick([20, 24, 40, 60, 80, 100]);
        const value = (P * P) / 16;
        return {
          statement: `De todos los rectángulos de perímetro ${P} m, ¿cuál es el área máxima posible (en m²)?`,
          answer: numeric(value, 'm^2', { tolerance: { relative: 0.01 } }),
          hints: ['Escribe el área en función de un solo lado usando la condición del perímetro.', `Si un lado mide $x$, el otro mide $${P / 2} - x$, y $A(x) = x(${P / 2} - x)$.`, `$A'(x) = ${P / 2} - 2x = 0$.`],
          solution: `$A'(x) = 0 \\Rightarrow x = ${P / 4}$ m (es un máximo porque $A''(x) = -2 < 0$). El rectángulo óptimo es un cuadrado de lado ${P / 4} m y $A = \\boxed{${t(value)}\\ \\text{m}^2}$.`,
        };
      }
      const L = rng.pick([20, 40, 60, 80, 120]);
      const value = (L * L) / 8;
      return {
        statement: `Con ${L} m de valla queremos cercar un terreno rectangular pegado a un muro (por el lado del muro no hace falta valla). ¿Cuál es el área máxima (en m²)?`,
        answer: numeric(value, 'm^2', { tolerance: { relative: 0.01 }, commonErrors: [{ value: (L * L) / 16, message: 'Has usado los 4 lados. El lado del muro no lleva valla: solo hay 3 lados.' }] }),
        hints: ['Solo se vallan 3 lados: dos iguales de longitud $x$ y uno de longitud $y$.', `$2x + y = ${L}$, así que $A(x) = x(${L} - 2x)$.`, `$A'(x) = ${L} - 4x = 0$.`],
        solution: `$x = ${L / 4}$ m, $y = ${L / 2}$ m y $A = \\boxed{${t(value)}\\ \\text{m}^2}$ (máximo porque $A''(x) = -4 < 0$).`,
      };
    },
  },
  {
    id: 'extremo-cubica',
    title: 'Extremos relativos',
    generate(rng) {
      const k = rng.int(1, 4); const m = rng.int(-5, 5);
      return {
        statement: `Halla la abscisa del **mínimo** relativo de $f(x) = ${poly([1, 0, -3 * k * k, m])}$.`,
        answer: numeric(k, undefined, { tolerance: { absolute: 1e-9 }, commonErrors: [{ value: -k, message: `En $x = ${-k}$ hay un máximo: compruébalo con el signo de $f''$.` }] }),
        hints: ['Los extremos relativos están donde $f\'(x) = 0$.', `$f'(x) = 3x^2 - ${3 * k * k}$. Para decidir máximo o mínimo, usa $f''(x) = 6x$.`, `$f'(x) = 0 \\iff x = \\pm ${k}$.`],
        solution: `$f'(x) = 0$ en $x = \\pm${k}$. Como $f''(${k}) = ${6 * k} > 0$, hay mínimo en $x = \\boxed{${k}}$ (y máximo en $x = -${k}$).`,
      };
    },
  },
];

/* ============================== INTEGRALES ============================== */

export const integrals = [
  {
    id: 'integral-definida',
    title: 'Integral definida de un polinomio',
    generate(rng) {
      const p = rng.int(-3, 3); const q = rng.int(-4, 4); const r = rng.int(-5, 5);
      const a = rng.int(-2, 2); const b = a + rng.int(1, 3);
      const F = (x) => (p * x ** 3) / 3 + (q * x * x) / 2 + r * x;
      const value = F(b) - F(a);
      const integrand = poly([p, q, r]);
      return {
        statement: `Calcula $\\displaystyle\\int_{${a}}^{${b}} \\left(${integrand}\\right)dx$.`,
        answer: numeric(value, undefined, { tolerance: { relative: 0.005 } }),
        hints: ['Primero calcula una primitiva $F(x)$ y después aplica la regla de Barrow.', '$\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}$', 'Barrow: $\\int_a^b f(x)\\,dx = F(b) - F(a)$.'],
        solution: `$F(x) = \\frac{${p}}{3}x^3 + \\frac{${q}}{2}x^2 + ${r}x$.\n\n$F(${b}) - F(${a}) = ${t(F(b))} - (${t(F(a))}) = \\boxed{${t(value)}}$`,
      };
    },
  },
  {
    id: 'integral-partes',
    title: 'Integración por partes',
    generate(rng) {
      const a = rng.int(1, 3);
      const value = (a - 1) * Math.exp(a) + 1;
      return {
        statement: `Calcula $\\displaystyle\\int_{0}^{${a}} x\\,e^{x}\\,dx$ (con 3 cifras significativas).`,
        answer: numeric(value, undefined, { tolerance: { relative: 0.01 } }),
        hints: ['Es un producto de un polinomio y una exponencial: integración por partes.', '$\\int u\\,dv = uv - \\int v\\,du$, con $u = x$ y $dv = e^x dx$.', 'Una primitiva es $F(x) = (x - 1)e^x$.'],
        solution: `$\\int x e^x dx = xe^x - \\int e^x dx = (x - 1)e^x$.\n\n$F(${a}) - F(0) = ${a - 1}e^{${a}} - (-1) = \\boxed{${t(value)}}$`,
      };
    },
  },
  {
    id: 'area-parabola',
    title: 'Área entre una parábola y el eje X',
    generate(rng) {
      const k = rng.nonZero(-3, 3);
      const r1 = rng.int(-3, 2); const r2 = r1 + rng.int(1, 4);
      const value = (Math.abs(k) * (r2 - r1) ** 3) / 6;
      return {
        statement: `Calcula el área del recinto limitado por $f(x) = ${poly([k, -k * (r1 + r2), k * r1 * r2])}$ y el eje $X$.`,
        answer: numeric(value, 'u^2', { tolerance: { relative: 0.01 } }),
        hints: ['Primero halla dónde corta la parábola al eje X: serán los límites de integración.', `Las raíces son $x = ${r1}$ y $x = ${r2}$.`, 'El área es el valor absoluto de la integral entre las raíces.'],
        solution: `$\\left|\\displaystyle\\int_{${r1}}^{${r2}} f(x)\\,dx\\right| = \\boxed{${t(value)}\\ \\text{u}^2}$`,
      };
    },
  },
];

/* ============================== PROBABILIDAD ============================== */

export const probability = [
  {
    id: 'prob-total',
    title: 'Probabilidad total',
    generate(rng) {
      const p1 = rng.pick([30, 40, 55, 60, 70]); const p2 = 100 - p1;
      const d1 = rng.pick([2, 3, 4, 5]); const d2 = rng.pick([1, 6, 7, 8]);
      const value = (p1 / 100) * (d1 / 100) + (p2 / 100) * (d2 / 100);
      return {
        statement: `Una fábrica tiene dos máquinas. La máquina A produce el ${p1} % de las piezas y la B el resto. El ${d1} % de las piezas de A y el ${d2} % de las de B son defectuosas. Calcula la probabilidad de que una pieza elegida al azar sea defectuosa.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0.0015 } }),
        hints: ['Haz un diagrama de árbol: primero la máquina, después si es defectuosa.', 'Teorema de la probabilidad total: $P(D) = P(A)P(D|A) + P(B)P(D|B)$.', `$P(A) = ${t(p1 / 100)}$, $P(D|A) = ${t(d1 / 100)}$.`],
        solution: `$P(D) = ${t(p1 / 100)}\\cdot${t(d1 / 100)} + ${t(p2 / 100)}\\cdot${t(d2 / 100)} = \\boxed{${t(value, 4)}}$`,
      };
    },
  },
  {
    id: 'bayes',
    title: 'Teorema de Bayes',
    generate(rng) {
      const p1 = rng.pick([30, 40, 55, 60, 70]); const p2 = 100 - p1;
      const d1 = rng.pick([2, 3, 4, 5]); const d2 = rng.pick([1, 6, 7, 8]);
      const total = (p1 / 100) * (d1 / 100) + (p2 / 100) * (d2 / 100);
      const value = ((p1 / 100) * (d1 / 100)) / total;
      return {
        statement: `La máquina A fabrica el ${p1} % de las piezas y la B el resto. Son defectuosas el ${d1} % de las de A y el ${d2} % de las de B. Si una pieza es defectuosa, ¿qué probabilidad hay de que la haya fabricado A?`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0.004 }, commonErrors: [{ value: (p1 / 100) * (d1 / 100), message: 'Eso es $P(A\\cap D)$. Bayes pide dividirlo entre $P(D)$.' }] }),
        hints: ['Te dan información "al revés": conoces $P(D|A)$ y piden $P(A|D)$. Eso es Bayes.', '$P(A|D) = \\dfrac{P(A)P(D|A)}{P(D)}$', `$P(D) = ${t(total, 4)}$ (probabilidad total).`],
        solution: `$P(A|D) = \\dfrac{${t(p1 / 100)}\\cdot${t(d1 / 100)}}{${t(total, 4)}} = \\boxed{${t(value, 3)}}$`,
      };
    },
  },
  {
    id: 'binomial-exacta',
    title: 'Distribución binomial',
    generate(rng) {
      const n = rng.int(5, 10);
      const p = rng.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]);
      const k = rng.int(0, Math.min(n, 4));
      const value = binom(n, k) * p ** k * (1 - p) ** (n - k);
      return {
        statement: `La probabilidad de que un alumno apruebe un test sin estudiar es ${String(p).replace('.', ',')}. Si lo hacen ${n} alumnos sin estudiar, de forma independiente, ¿cuál es la probabilidad de que aprueben exactamente ${k}?`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0.003 } }),
        hints: [`$X$ = número de aprobados sigue una binomial $B(${n}, ${String(p).replace('.', '{,}')})$.`, '$P(X = k) = \\binom{n}{k}p^k(1-p)^{n-k}$', `$\\binom{${n}}{${k}} = ${binom(n, k)}$`],
        solution: `$P(X = ${k}) = ${binom(n, k)}\\cdot ${String(p).replace('.', '{,}')}^{${k}}\\cdot ${String(Math.round((1 - p) * 100) / 100).replace('.', '{,}')}^{${n - k}} = \\boxed{${t(value, 4)}}$`,
      };
    },
  },
  {
    id: 'normal-tipificar',
    title: 'Distribución normal',
    generate(rng) {
      const mu = rng.pick([60, 100, 150, 170, 500]);
      const sigma = rng.pick([5, 8, 10, 12, 20]);
      const offset = rng.int(-2 * sigma, Math.round(2.5 * sigma));
      const x = mu + offset;
      const z = Math.round((offset / sigma) * 100) / 100;
      const greater = rng.int(0, 1) === 1;
      const value = greater ? 1 - normalCdf(z) : normalCdf(z);
      return {
        statement: `La variable $X$ sigue una normal $N(${mu}, ${sigma})$. Calcula $P(X ${greater ? '\\ge' : '\\le'} ${x})$.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0.005 } }),
        hints: ['Tipifica: pasa a la normal estándar $Z = \\dfrac{X - \\mu}{\\sigma}$.', `$z = \\dfrac{${x} - ${mu}}{${sigma}} = ${t(z, 3)}$`, greater ? '$P(Z \\ge z) = 1 - P(Z \\le z)$, y si $z < 0$ usa la simetría de la campana.' : 'Si $z < 0$, usa $P(Z \\le -a) = 1 - P(Z \\le a)$.'],
        solution: `$P(X ${greater ? '\\ge' : '\\le'} ${x}) = P(Z ${greater ? '\\ge' : '\\le'} ${t(z, 3)}) = \\boxed{${t(value, 4)}}$ (mirando la tabla de la $N(0,1)$).`,
      };
    },
  },
];
