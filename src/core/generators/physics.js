/**
 * physics.js — Generadores de ejercicios de Física (2.º de Bachillerato).
 *
 * Constantes con las cifras habituales en la PAU. Las respuestas se
 * calculan con estas mismas constantes, y se aceptan con una tolerancia
 * (normalmente ±2 %) para no penalizar redondeos razonables.
 */

import { t, numeric, choice, datos, rad, deg } from './helpers.js';

export const CONST = {
  G: 6.67e-11, // N·m²/kg²
  MT: 5.97e24, // masa de la Tierra (kg)
  RT: 6.37e6, // radio de la Tierra (m)
  k: 9.0e9, // constante de Coulomb (N·m²/C²)
  eps0: 8.85e-12, // permitividad del vacío (C²/(N·m²))
  e: 1.6e-19, // carga elemental (C)
  mp: 1.67e-27, // masa del protón (kg)
  me: 9.11e-31, // masa del electrón (kg)
  h: 6.63e-34, // constante de Planck (J·s)
  c: 3.0e8, // velocidad de la luz (m/s)
  I0: 1e-12, // intensidad umbral de audición (W/m²)
};
const { G, MT, RT, k, eps0, e, mp, me, h, c, I0 } = CONST;

const dataTierra = ['G = 6{,}67\\cdot10^{-11}\\ \\mathrm{N\\,m^2/kg^2}', 'M_T = 5{,}97\\cdot10^{24}\\ \\mathrm{kg}', 'R_T = 6{,}37\\cdot10^{6}\\ \\mathrm{m}'];
const alturas = [400, 600, 800, 1200, 2000, 5000, 10000, 20000, 35800]; // km

/* ======================= A. CAMPO GRAVITATORIO ======================= */

export const gravitation = [
  {
    id: 'grav-fuerza',
    title: 'Fuerza gravitatoria sobre un satélite',
    generate(rng) {
      const m = rng.int(5, 40) * 100;
      const hk = rng.pick(alturas);
      const r = RT + hk * 1e3;
      const value = (G * MT * m) / r ** 2;
      return {
        statement: `Un satélite de ${m} kg orbita a ${hk} km de altura sobre la superficie terrestre. ¿Con qué fuerza lo atrae la Tierra?\n\n${datos(dataTierra)}`,
        answer: numeric(value, 'N', { commonErrors: [{ value: (G * MT * m) / (hk * 1e3) ** 2, message: 'Has usado la altura como distancia. En la ley de gravitación, $r$ se mide desde el CENTRO de la Tierra: $r = R_T + h$.' }] }),
        hints: ['Ley de gravitación universal de Newton.', '$F = G\\dfrac{M_T\\,m}{r^2}$ con $r = R_T + h$', `$r = 6{,}37\\cdot10^6 + ${t(hk * 1e3)} = ${t(r)}\\ \\mathrm{m}$`],
        solution: `$F = \\dfrac{6{,}67\\cdot10^{-11}\\cdot 5{,}97\\cdot10^{24}\\cdot ${m}}{(${t(r)})^2} = \\boxed{${t(value)}\\ \\mathrm{N}}$`,
      };
    },
  },
  {
    id: 'grav-campo-altura',
    title: 'Intensidad del campo gravitatorio',
    generate(rng) {
      const hk = rng.pick(alturas);
      const r = RT + hk * 1e3;
      const value = (G * MT) / r ** 2;
      return {
        statement: `Calcula la intensidad del campo gravitatorio terrestre a ${hk} km de altura.\n\n${datos(dataTierra)}`,
        answer: numeric(value, 'N/kg', { commonErrors: [{ value: (G * MT) / (hk * 1e3) ** 2, message: 'Has usado $h$ como distancia: hay que medir desde el centro, $r = R_T + h$.' }] }),
        hints: ['El campo gravitatorio de una masa esférica es como el de una masa puntual situada en su centro.', '$g = G\\dfrac{M_T}{r^2}$, con $r = R_T + h$', `$r = ${t(r)}\\ \\mathrm{m}$`],
        solution: `$g = \\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}}{(${t(r)})^2} = \\boxed{${t(value)}\\ \\mathrm{N/kg}}$`,
      };
    },
  },
  {
    id: 'grav-superposicion',
    title: 'Principio de superposición',
    generate(rng) {
      let m1, m2;
      do { m1 = rng.int(1, 9) * 1000; m2 = rng.int(1, 9) * 1000; } while (m1 === m2);
      const d = rng.int(2, 10);
      const half = d / 2;
      const value = (G * Math.abs(m2 - m1)) / half ** 2;
      return {
        statement: `Dos esferas de ${m1} kg y ${m2} kg tienen sus centros separados ${d} m. Calcula el módulo del campo gravitatorio en el punto medio entre ambas.\n\n${datos(['G = 6{,}67\\cdot10^{-11}\\ \\mathrm{N\\,m^2/kg^2}'])}`,
        answer: numeric(value, 'N/kg', { commonErrors: [{ value: (G * (m1 + m2)) / half ** 2, message: 'En el punto medio los dos campos tienen SENTIDOS OPUESTOS (cada uno apunta hacia su masa): hay que restarlos, no sumarlos.' }] }),
        hints: ['El campo total es la suma VECTORIAL de los campos de cada masa.', 'Cada campo apunta hacia la masa que lo crea: en el punto medio tienen sentidos opuestos.', `Distancia de cada masa al punto medio: ${t(half)} m.`],
        solution: `$g_1 = G\\dfrac{${m1}}{${t(half)}^2} = ${t((G * m1) / half ** 2)}$ y $g_2 = G\\dfrac{${m2}}{${t(half)}^2} = ${t((G * m2) / half ** 2)}$ N/kg, en sentidos opuestos.\n\n$g = |g_2 - g_1| = \\boxed{${t(value)}\\ \\mathrm{N/kg}}$, dirigido hacia la esfera de ${Math.max(m1, m2)} kg.`,
      };
    },
  },
  {
    id: 'grav-potencial',
    title: 'Potencial gravitatorio',
    generate(rng) {
      const hk = rng.pick(alturas);
      const r = RT + hk * 1e3;
      const value = (-G * MT) / r;
      return {
        statement: `Calcula el potencial gravitatorio terrestre en un punto situado a ${hk} km de altura.\n\n${datos(dataTierra)}`,
        answer: numeric(value, 'J/kg', { commonErrors: [{ value: (-G * MT) / (hk * 1e3), message: 'La distancia se mide desde el centro de la Tierra: $r = R_T + h$.' }] }),
        hints: ['El potencial gravitatorio es una magnitud escalar y siempre negativa.', '$V = -G\\dfrac{M_T}{r}$', `$r = ${t(r)}\\ \\mathrm{m}$`],
        solution: `$V = -\\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}}{${t(r)}} = \\boxed{${t(value)}\\ \\mathrm{J/kg}}$`,
      };
    },
  },
  {
    id: 'grav-energia-potencial',
    title: 'Energía potencial gravitatoria',
    generate(rng) {
      const m = rng.int(2, 30) * 100;
      const hk = rng.pick(alturas);
      const r = RT + hk * 1e3;
      const value = (-G * MT * m) / r;
      return {
        statement: `Calcula la energía potencial gravitatoria de un satélite de ${m} kg situado a ${hk} km de altura (tomando $E_p = 0$ en el infinito).\n\n${datos(dataTierra)}`,
        answer: numeric(value, 'J', { commonErrors: [{ value: m * 9.8 * hk * 1e3, message: '$E_p = mgh$ solo vale cerca de la superficie, donde $g$ es constante. A estas alturas hay que usar $E_p = -GMm/r$.' }] }),
        hints: ['Lejos de la superficie no vale $mgh$.', '$E_p = -G\\dfrac{M_T\\,m}{r}$', `$r = R_T + h = ${t(r)}\\ \\mathrm{m}$`],
        solution: `$E_p = -\\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}\\cdot${m}}{${t(r)}} = \\boxed{${t(value)}\\ \\mathrm{J}}$`,
      };
    },
  },
  {
    id: 'grav-velocidad-orbital',
    title: 'Velocidad orbital',
    generate(rng) {
      const hk = rng.pick(alturas);
      const r = RT + hk * 1e3;
      const value = Math.sqrt((G * MT) / r);
      return {
        statement: `¿A qué velocidad se mueve un satélite en órbita circular a ${hk} km de altura?\n\n${datos(dataTierra)}`,
        answer: numeric(value, 'm/s', { commonErrors: [{ value: Math.sqrt((G * MT) / (hk * 1e3)), message: 'Has usado $h$ en lugar de $r = R_T + h$.' }, { value: Math.sqrt((2 * G * MT) / r), message: 'Esa es la velocidad de ESCAPE desde esa altura, no la orbital.' }] }),
        hints: ['En órbita circular, la fuerza gravitatoria hace de fuerza centrípeta.', '$G\\dfrac{M_T m}{r^2} = m\\dfrac{v^2}{r} \\Rightarrow v = \\sqrt{\\dfrac{GM_T}{r}}$', `$r = ${t(r)}\\ \\mathrm{m}$`],
        solution: `$v = \\sqrt{\\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}}{${t(r)}}} = \\boxed{${t(value)}\\ \\mathrm{m/s}}$`,
      };
    },
  },
  {
    id: 'grav-periodo',
    title: 'Periodo orbital',
    generate(rng) {
      const hk = rng.pick(alturas);
      const r = RT + hk * 1e3;
      const T = 2 * Math.PI * Math.sqrt(r ** 3 / (G * MT));
      const value = T / 3600;
      return {
        statement: `Calcula el periodo (en horas) de un satélite en órbita circular a ${hk} km de altura.\n\n${datos(dataTierra)}`,
        answer: numeric(value, 'h'),
        hints: ['El periodo es el tiempo de una vuelta: $T = 2\\pi r / v$.', '$T = 2\\pi\\sqrt{\\dfrac{r^3}{GM_T}}$ (tercera ley de Kepler)', 'Recuerda pasar de segundos a horas al final (÷ 3600).'],
        solution: `$T = 2\\pi\\sqrt{\\dfrac{(${t(r)})^3}{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}}} = ${t(T)}\\ \\mathrm{s} = \\boxed{${t(value)}\\ \\mathrm{h}}$`,
      };
    },
  },
  {
    id: 'grav-kepler',
    title: 'Tercera ley de Kepler',
    generate(rng) {
      const TA = rng.int(20, 400);
      const ratio = rng.pick([0.5, 1.5, 2, 3, 4]);
      const value = TA * ratio ** 1.5;
      return {
        statement: `Un planeta A tarda ${TA} días en dar una vuelta a su estrella. Otro planeta B orbita la misma estrella a una distancia ${String(ratio).replace('.', ',')} veces la de A. ¿Cuál es el periodo de B (en días)?`,
        answer: numeric(value, 'días', { commonErrors: [{ value: TA * ratio, message: 'El periodo NO es proporcional al radio: $T^2$ es proporcional a $r^3$.' }] }),
        hints: ['Tercera ley de Kepler: para cuerpos que orbitan la misma estrella, $T^2/r^3$ es constante.', '$\\dfrac{T_B^2}{T_A^2} = \\dfrac{r_B^3}{r_A^3} \\Rightarrow T_B = T_A\\left(\\dfrac{r_B}{r_A}\\right)^{3/2}$', `$r_B/r_A = ${t(ratio)}$`],
        solution: `$T_B = ${TA}\\cdot ${t(ratio)}^{3/2} = \\boxed{${t(value)}\\ \\text{días}}$`,
      };
    },
  },
  {
    id: 'grav-escape',
    title: 'Velocidad de escape',
    generate(rng) {
      const M = rng.decimal(1, 9.9, 1) * 1e23;
      const R = rng.decimal(1.5, 7, 1) * 1e6;
      const value = Math.sqrt((2 * G * M) / R);
      return {
        statement: `Calcula la velocidad de escape desde la superficie de un planeta de masa $${t(M, 2)}\\ \\mathrm{kg}$ y radio $${t(R, 2)}\\ \\mathrm{m}$.\n\n${datos(['G = 6{,}67\\cdot10^{-11}\\ \\mathrm{N\\,m^2/kg^2}'])}`,
        answer: numeric(value, 'm/s', { commonErrors: [{ value: Math.sqrt((G * M) / R), message: 'Esa es la velocidad orbital rasante. La de escape es $\\sqrt2$ veces mayor.' }] }),
        hints: ['Para escapar, la energía mecánica debe llegar a 0 en el infinito.', '$\\frac12 mv_e^2 - G\\dfrac{Mm}{R} = 0 \\Rightarrow v_e = \\sqrt{\\dfrac{2GM}{R}}$', 'Fíjate en que no depende de la masa del objeto que escapa.'],
        solution: `$v_e = \\sqrt{\\dfrac{2\\cdot6{,}67\\cdot10^{-11}\\cdot${t(M, 2)}}{${t(R, 2)}}} = \\boxed{${t(value)}\\ \\mathrm{m/s}}$`,
      };
    },
  },
  {
    id: 'grav-energia-satelite',
    title: 'Energía mecánica de un satélite',
    generate(rng) {
      const m = rng.int(2, 30) * 100;
      const hk = rng.pick(alturas);
      const r = RT + hk * 1e3;
      const value = (-G * MT * m) / (2 * r);
      return {
        statement: `Calcula la energía mecánica de un satélite de ${m} kg en órbita circular a ${hk} km de altura.\n\n${datos(dataTierra)}`,
        answer: numeric(value, 'J', { commonErrors: [{ value: (-G * MT * m) / r, message: 'Esa es solo la energía potencial. Falta sumar la cinética: $E_m = E_c + E_p = -\\frac{GMm}{2r}$.' }] }),
        hints: ['$E_m = E_c + E_p$', 'En órbita circular $E_c = \\dfrac{GMm}{2r}$, así que $E_m = -\\dfrac{GMm}{2r}$.', `$r = ${t(r)}\\ \\mathrm{m}$`],
        solution: `$E_m = -\\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}\\cdot${m}}{2\\cdot${t(r)}} = \\boxed{${t(value)}\\ \\mathrm{J}}$`,
      };
    },
  },
];

/* ===================== B. CAMPO ELECTROMAGNÉTICO ===================== */

const kData = 'k = 9\\cdot10^{9}\\ \\mathrm{N\\,m^2/C^2}';

export const electromagnetism = [
  {
    id: 'coulomb-fuerza',
    title: 'Ley de Coulomb',
    generate(rng) {
      const q1 = rng.nonZero(-9, 9); const q2 = rng.nonZero(-9, 9);
      const rcm = rng.int(5, 50);
      const value = (k * Math.abs(q1 * 1e-6 * q2 * 1e-6)) / (rcm / 100) ** 2;
      return {
        statement: `Dos cargas puntuales de ${q1} μC y ${q2} μC están separadas ${rcm} cm en el vacío. Calcula el módulo de la fuerza entre ellas. ¿Es atractiva o repulsiva?\n\n${datos([kData])}`,
        answer: numeric(value, 'N'),
        hints: ['Ley de Coulomb.', '$F = k\\dfrac{|q_1 q_2|}{r^2}$', 'Pasa todo al SI: μC → C ($\\cdot10^{-6}$) y cm → m.'],
        solution: `$F = 9\\cdot10^9\\dfrac{|${q1}\\cdot10^{-6}\\cdot ${q2}\\cdot10^{-6}|}{(${t(rcm / 100)})^2} = \\boxed{${t(value)}\\ \\mathrm{N}}$. Es ${q1 * q2 > 0 ? 'repulsiva (cargas del mismo signo)' : 'atractiva (cargas de signo opuesto)'}.`,
      };
    },
  },
  {
    id: 'campo-electrico',
    title: 'Campo eléctrico de una carga puntual',
    generate(rng) {
      const q = rng.nonZero(-9, 9);
      const rcm = rng.int(2, 30);
      const value = (k * Math.abs(q) * 1e-9) / (rcm / 100) ** 2;
      return {
        statement: `Calcula el módulo del campo eléctrico creado por una carga de ${q} nC a ${rcm} cm de distancia.\n\n${datos([kData])}`,
        answer: numeric(value, 'N/C'),
        hints: ['$E = k\\dfrac{|q|}{r^2}$', '1 nC $= 10^{-9}$ C.', `$r = ${t(rcm / 100)}$ m.`],
        solution: `$E = 9\\cdot10^9\\dfrac{${Math.abs(q)}\\cdot10^{-9}}{(${t(rcm / 100)})^2} = \\boxed{${t(value)}\\ \\mathrm{N/C}}$, ${q > 0 ? 'hacia fuera de la carga' : 'hacia la carga'}.`,
      };
    },
  },
  {
    id: 'potencial-electrico',
    title: 'Potencial eléctrico',
    generate(rng) {
      const q = rng.nonZero(-9, 9);
      const rcm = rng.int(2, 50);
      const value = (k * q * 1e-6) / (rcm / 100);
      return {
        statement: `Calcula el potencial eléctrico creado por una carga de ${q} μC en un punto a ${rcm} cm de ella.\n\n${datos([kData])}`,
        answer: numeric(value, 'V'),
        hints: ['El potencial es un escalar: conserva el signo de la carga.', '$V = k\\dfrac{q}{r}$', `$q = ${q}\\cdot10^{-6}$ C, $r = ${t(rcm / 100)}$ m.`],
        solution: `$V = 9\\cdot10^9\\dfrac{${q}\\cdot10^{-6}}{${t(rcm / 100)}} = \\boxed{${t(value)}\\ \\mathrm{V}}$`,
      };
    },
  },
  {
    id: 'flujo-gauss',
    title: 'Teorema de Gauss',
    generate(rng) {
      const q = rng.nonZero(-20, 20);
      const value = (q * 1e-9) / eps0;
      return {
        statement: `Una superficie cerrada encierra una carga neta de ${q} nC. ¿Cuál es el flujo eléctrico a través de ella?\n\n${datos(['\\varepsilon_0 = 8{,}85\\cdot10^{-12}\\ \\mathrm{C^2/(N\\,m^2)}'])}`,
        answer: numeric(value, 'N*m^2/C'),
        hints: ['El teorema de Gauss relaciona el flujo con la carga encerrada.', '$\\Phi = \\dfrac{Q_{\\text{int}}}{\\varepsilon_0}$', 'El flujo no depende de la forma de la superficie, solo de la carga de dentro.'],
        solution: `$\\Phi = \\dfrac{${q}\\cdot10^{-9}}{8{,}85\\cdot10^{-12}} = \\boxed{${t(value)}\\ \\mathrm{N\\,m^2/C}}$`,
      };
    },
  },
  {
    id: 'lorentz-radio',
    title: 'Carga en un campo magnético',
    generate(rng) {
      const v = rng.decimal(1, 9, 1) * 1e5;
      const B = rng.decimal(0.1, 1.5, 2);
      const value = (mp * v) / (e * B);
      return {
        statement: `Un protón entra con velocidad $${t(v, 2)}\\ \\mathrm{m/s}$ perpendicular a un campo magnético uniforme de ${String(B).replace('.', ',')} T. Calcula el radio de su trayectoria.\n\n${datos(['m_p = 1{,}67\\cdot10^{-27}\\ \\mathrm{kg}', 'e = 1{,}6\\cdot10^{-19}\\ \\mathrm{C}'])}`,
        answer: numeric(value, 'm'),
        hints: ['La fuerza de Lorentz es perpendicular a la velocidad: el protón describe una circunferencia.', '$|q|vB = m\\dfrac{v^2}{r} \\Rightarrow r = \\dfrac{mv}{|q|B}$', `$mv = ${t(mp * v)}\\ \\mathrm{kg\\,m/s}$`],
        solution: `$r = \\dfrac{1{,}67\\cdot10^{-27}\\cdot${t(v, 2)}}{1{,}6\\cdot10^{-19}\\cdot${t(B)}} = \\boxed{${t(value)}\\ \\mathrm{m}}$`,
      };
    },
  },
  {
    id: 'campo-hilo',
    title: 'Campo magnético de un hilo',
    generate(rng) {
      const I = rng.int(1, 20);
      const dcm = rng.int(1, 20);
      const value = (2e-7 * I) / (dcm / 100);
      return {
        statement: `Por un hilo recto y muy largo circula una corriente de ${I} A. Calcula el campo magnético a ${dcm} cm del hilo.\n\n${datos(['\\mu_0 = 4\\pi\\cdot10^{-7}\\ \\mathrm{T\\,m/A}'])}`,
        answer: numeric(value, 'T'),
        hints: ['Ley de Biot-Savart para un hilo infinito.', '$B = \\dfrac{\\mu_0 I}{2\\pi d}$', `$d = ${t(dcm / 100)}$ m`],
        solution: `$B = \\dfrac{4\\pi\\cdot10^{-7}\\cdot${I}}{2\\pi\\cdot${t(dcm / 100)}} = \\boxed{${t(value)}\\ \\mathrm{T}}$. Sus líneas son circunferencias alrededor del hilo (regla de la mano derecha).`,
      };
    },
  },
  {
    id: 'fuerza-conductores',
    title: 'Fuerza entre conductores paralelos',
    generate(rng) {
      const I1 = rng.int(1, 15); const I2 = rng.int(1, 15);
      const dcm = rng.int(2, 30);
      const same = rng.int(0, 1) === 1;
      const value = (2e-7 * I1 * I2) / (dcm / 100);
      return {
        statement: `Dos hilos paralelos separados ${dcm} cm transportan corrientes de ${I1} A y ${I2} A en ${same ? 'el mismo sentido' : 'sentidos opuestos'}. Calcula la fuerza por unidad de longitud entre ellos (en N/m).\n\n${datos(['\\mu_0 = 4\\pi\\cdot10^{-7}\\ \\mathrm{T\\,m/A}'])}`,
        answer: numeric(value, 'N/m'),
        hints: ['Cada hilo está dentro del campo magnético del otro.', '$\\dfrac{F}{L} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}$', 'Corrientes del mismo sentido se atraen; de sentido opuesto se repelen.'],
        solution: `$\\dfrac{F}{L} = \\dfrac{4\\pi\\cdot10^{-7}\\cdot${I1}\\cdot${I2}}{2\\pi\\cdot${t(dcm / 100)}} = \\boxed{${t(value)}\\ \\mathrm{N/m}}$, ${same ? 'atractiva' : 'repulsiva'}.`,
      };
    },
  },
  {
    id: 'fem-inducida',
    title: 'Ley de Faraday-Lenz',
    generate(rng) {
      const N = rng.pick([50, 100, 200, 250, 500]);
      const Acm = rng.int(10, 100);
      const B1 = rng.decimal(0, 0.5, 2); const B2 = rng.decimal(0.6, 1.2, 2);
      const dt = rng.pick([0.05, 0.1, 0.2, 0.5]);
      const value = (N * (Acm * 1e-4) * Math.abs(B2 - B1)) / dt;
      return {
        statement: `Una bobina de ${N} espiras de ${Acm} cm² está en un campo magnético perpendicular a sus espiras que pasa de ${String(B1).replace('.', ',')} T a ${String(B2).replace('.', ',')} T en ${String(dt).replace('.', ',')} s. Calcula la fem media inducida (en valor absoluto).`,
        answer: numeric(value, 'V', { commonErrors: [{ value: value / N, message: 'Te falta multiplicar por el número de espiras $N$.' }] }),
        hints: ['La fem aparece porque cambia el flujo magnético.', '$|\\varepsilon| = N\\dfrac{|\\Delta\\Phi|}{\\Delta t}$, con $\\Phi = BS$', `$S = ${Acm}\\ \\mathrm{cm^2} = ${t(Acm * 1e-4)}\\ \\mathrm{m^2}$`],
        solution: `$|\\varepsilon| = ${N}\\cdot\\dfrac{${t(Acm * 1e-4)}\\cdot|${t(B2)} - ${t(B1)}|}{${t(dt)}} = \\boxed{${t(value)}\\ \\mathrm{V}}$. Por la ley de Lenz, la corriente inducida se opone al aumento del flujo.`,
      };
    },
  },
  {
    id: 'transformador',
    title: 'Transformador',
    generate(rng) {
      const V1 = rng.pick([230, 120, 400, 12000]);
      const N1 = rng.pick([100, 200, 500, 1000, 2000]);
      const N2 = rng.pick([20, 50, 100, 300, 4000]);
      const value = (V1 * N2) / N1;
      return {
        statement: `Un transformador ideal tiene ${N1} espiras en el primario y ${N2} en el secundario. Si el primario se conecta a ${V1} V, ¿qué tensión hay en el secundario?`,
        answer: numeric(value, 'V', { commonErrors: [{ value: (V1 * N1) / N2, message: 'Has invertido la relación: la tensión es proporcional al número de espiras, $V_2/V_1 = N_2/N_1$.' }] }),
        hints: ['En un transformador ideal la tensión es proporcional al número de espiras.', '$\\dfrac{V_2}{V_1} = \\dfrac{N_2}{N_1}$', `$V_2 = ${V1}\\cdot\\dfrac{${N2}}{${N1}}$`],
        solution: `$V_2 = ${V1}\\cdot\\dfrac{${N2}}{${N1}} = \\boxed{${t(value)}\\ \\mathrm{V}}$`,
      };
    },
  },
];

/* ======================= C. VIBRACIONES Y ONDAS ======================= */

export const waves = [
  {
    id: 'mas-vmax',
    title: 'Velocidad máxima en un MAS',
    generate(rng) {
      const Acm = rng.int(2, 20);
      const f = rng.pick([0.5, 1, 1.5, 2, 2.5, 4, 5]);
      const value = 2 * Math.PI * f * (Acm / 100);
      return {
        statement: `Un cuerpo oscila con un MAS de amplitud ${Acm} cm y frecuencia ${String(f).replace('.', ',')} Hz. Calcula su velocidad máxima.`,
        answer: numeric(value, 'm/s', { commonErrors: [{ value: f * (Acm / 100), message: 'Te falta el $2\\pi$: la pulsación es $\\omega = 2\\pi f$.' }] }),
        hints: ['La velocidad es máxima al pasar por la posición de equilibrio.', '$v_{max} = A\\omega$, con $\\omega = 2\\pi f$', `$\\omega = ${t(2 * Math.PI * f)}\\ \\mathrm{rad/s}$`],
        solution: `$v_{max} = ${t(Acm / 100)}\\cdot 2\\pi\\cdot${t(f)} = \\boxed{${t(value)}\\ \\mathrm{m/s}}$`,
      };
    },
  },
  {
    id: 'mas-periodo-muelle',
    title: 'Periodo de un oscilador',
    generate(rng) {
      const m = rng.pick([0.1, 0.2, 0.25, 0.5, 1, 1.5, 2]);
      const kk = rng.int(1, 20) * 10;
      const value = 2 * Math.PI * Math.sqrt(m / kk);
      return {
        statement: `Una masa de ${String(m).replace('.', ',')} kg cuelga de un muelle de constante ${kk} N/m. Calcula el periodo de oscilación.`,
        answer: numeric(value, 's', { commonErrors: [{ value: 2 * Math.PI * Math.sqrt(kk / m), message: 'Has invertido el cociente: es $\\sqrt{m/k}$.' }, { value: Math.sqrt(m / kk), message: 'Falta el factor $2\\pi$.' }] }),
        hints: ['Para un muelle, $\\omega = \\sqrt{k/m}$.', '$T = 2\\pi\\sqrt{\\dfrac{m}{k}}$', `$m/k = ${t(m / kk)}$`],
        solution: `$T = 2\\pi\\sqrt{\\dfrac{${t(m)}}{${kk}}} = \\boxed{${t(value)}\\ \\mathrm{s}}$`,
      };
    },
  },
  {
    id: 'onda-longitud',
    title: 'Longitud de onda',
    generate(rng) {
      const f = rng.pick([110, 220, 440, 500, 880, 1000, 2000]);
      const value = 340 / f;
      return {
        statement: `Un altavoz emite un sonido de ${f} Hz en el aire. Si el sonido viaja a 340 m/s, ¿cuál es su longitud de onda?`,
        answer: numeric(value, 'm', { commonErrors: [{ value: 340 * f, message: 'Has multiplicado. La relación es $v = \\lambda f$, así que $\\lambda = v/f$.' }] }),
        hints: ['Relaciona velocidad, frecuencia y longitud de onda.', '$v = \\lambda f$', '$\\lambda = v/f$'],
        solution: `$\\lambda = \\dfrac{340}{${f}} = \\boxed{${t(value)}\\ \\mathrm{m}}$`,
      };
    },
  },
  {
    id: 'onda-ecuacion',
    title: 'Ecuación de una onda',
    generate(rng) {
      const A = rng.decimal(0.01, 0.2, 2);
      const w = rng.int(2, 40);
      const kk = rng.decimal(0.5, 8, 1);
      const value = w / kk;
      return {
        statement: `Una onda transversal viene dada por $y(x,t) = ${t(A)}\\sin(${w}t - ${t(kk)}x)$ (unidades del SI). Calcula su velocidad de propagación.`,
        answer: numeric(value, 'm/s', { commonErrors: [{ value: kk / w, message: 'Al revés: $v = \\omega/k$.' }] }),
        hints: ['Compara con la forma general $y = A\\sin(\\omega t - kx)$.', '$v = \\dfrac{\\omega}{k}$', `$\\omega = ${w}\\ \\mathrm{rad/s}$, $k = ${t(kk)}\\ \\mathrm{rad/m}$`],
        solution: `$v = \\dfrac{${w}}{${t(kk)}} = \\boxed{${t(value)}\\ \\mathrm{m/s}}$, hacia las $x$ positivas (por el signo $-$).`,
      };
    },
  },
  {
    id: 'nivel-sonoro',
    title: 'Nivel de intensidad sonora',
    generate(rng) {
      const a = rng.int(1, 9); const b = rng.int(3, 9);
      const I = a * 10 ** -b;
      const value = 10 * Math.log10(I / I0);
      return {
        statement: `Calcula el nivel de intensidad sonora de un sonido de intensidad $${a}\\cdot10^{-${b}}\\ \\mathrm{W/m^2}$.\n\n${datos(['I_0 = 10^{-12}\\ \\mathrm{W/m^2}'])}`,
        answer: numeric(value, 'dB', { tolerance: { absolute: 0.3 }, commonErrors: [{ value: value / 10, message: 'Te falta multiplicar por 10: el decibelio es la décima parte del belio.' }] }),
        hints: ['El oído percibe la intensidad de forma logarítmica.', '$\\beta = 10\\log\\dfrac{I}{I_0}$', `$I/I_0 = ${t(I / I0)}$`],
        solution: `$\\beta = 10\\log\\dfrac{${a}\\cdot10^{-${b}}}{10^{-12}} = \\boxed{${t(value)}\\ \\mathrm{dB}}$`,
      };
    },
  },
  {
    id: 'snell',
    title: 'Ley de Snell',
    generate(rng) {
      const n2 = rng.pick([1.33, 1.5, 1.65]);
      const th1 = rng.int(15, 75);
      const value = deg(Math.asin(Math.sin(rad(th1)) / n2));
      return {
        statement: `Un rayo de luz pasa del aire ($n = 1$) a un medio de índice ${String(n2).replace('.', ',')} con un ángulo de incidencia de ${th1}°. Calcula el ángulo de refracción.`,
        answer: numeric(value, 'º', { tolerance: { absolute: 0.5 } }),
        hints: ['Ley de Snell de la refracción.', '$n_1\\sin\\theta_1 = n_2\\sin\\theta_2$', `$\\sin\\theta_2 = \\dfrac{\\sin ${th1}^\\circ}{${t(n2)}} = ${t(Math.sin(rad(th1)) / n2)}$`],
        solution: `$\\theta_2 = \\arcsin\\left(\\dfrac{\\sin ${th1}^\\circ}{${t(n2)}}\\right) = \\boxed{${t(value)}^\\circ}$. Al pasar a un medio más refringente, el rayo se acerca a la normal.`,
      };
    },
  },
  {
    id: 'angulo-limite',
    title: 'Ángulo límite',
    generate(rng) {
      const n1 = rng.pick([1.33, 1.5, 1.65, 2.42]);
      const value = deg(Math.asin(1 / n1));
      return {
        statement: `Calcula el ángulo límite para la luz que pasa de un medio de índice ${String(n1).replace('.', ',')} al aire.`,
        answer: numeric(value, 'º', { tolerance: { absolute: 0.5 } }),
        hints: ['El ángulo límite es el ángulo de incidencia para el que el refractado sale a 90°.', '$n_1\\sin\\theta_L = 1\\cdot\\sin 90^\\circ$', `$\\sin\\theta_L = 1/${t(n1)}$`],
        solution: `$\\theta_L = \\arcsin\\left(\\dfrac{1}{${t(n1)}}\\right) = \\boxed{${t(value)}^\\circ}$. Por encima de ese ángulo hay reflexión total.`,
      };
    },
  },
  {
    id: 'espejo-concavo',
    title: 'Espejo cóncavo',
    generate(rng) {
      const R = rng.pick([20, 30, 40, 60]);
      const f = -R / 2;
      const d = rng.int(Math.abs(f) + 5, 3 * Math.abs(f));
      const s = -d;
      const value = 1 / (1 / f - 1 / s);
      return {
        statement: `Un objeto se coloca a ${d} cm delante de un espejo cóncavo de radio ${R} cm. Halla la posición de la imagen $s'$ en cm, con el criterio de signos DIN (las distancias delante del espejo son negativas).`,
        answer: numeric(value, 'cm', { tolerance: { relative: 0.02 } }),
        hints: ['Ecuación de los espejos: $\\dfrac{1}{s\'} + \\dfrac{1}{s} = \\dfrac{1}{f}$.', `En un espejo cóncavo $f = -R/2 = ${f}$ cm, y el objeto está en $s = ${s}$ cm.`, `$\\dfrac{1}{s'} = \\dfrac{1}{${f}} - \\dfrac{1}{${s}}$`],
        solution: `$\\dfrac{1}{s'} = \\dfrac{1}{${f}} - \\dfrac{1}{${s}} \\Rightarrow s' = \\boxed{${t(value)}\\ \\mathrm{cm}}$. Es negativa: la imagen es real y está delante del espejo.`,
      };
    },
  },
  {
    id: 'lente-convergente',
    title: 'Lente convergente',
    generate(rng) {
      const f = rng.pick([10, 15, 20, 25]);
      const d = rng.int(f + 5, 3 * f);
      const s = -d;
      const value = 1 / (1 / f + 1 / s);
      return {
        statement: `Un objeto está a ${d} cm de una lente delgada convergente de distancia focal imagen $f' = ${f}$ cm. Calcula la posición de la imagen $s'$ (en cm, criterio DIN).`,
        answer: numeric(value, 'cm', { commonErrors: [{ value: 1 / (1 / f + 1 / d), message: 'Revisa el signo de $s$: con el criterio DIN, el objeto a la izquierda de la lente tiene $s < 0$.' }] }),
        hints: ['Ecuación de las lentes delgadas (DIN): $\\dfrac{1}{s\'} - \\dfrac{1}{s} = \\dfrac{1}{f\'}$.', `El objeto está a la izquierda: $s = ${s}$ cm.`, `$\\dfrac{1}{s'} = \\dfrac{1}{${f}} + \\dfrac{1}{${s}}$`],
        solution: `$\\dfrac{1}{s'} = \\dfrac{1}{${f}} + \\dfrac{1}{${s}} \\Rightarrow s' = \\boxed{${t(value)}\\ \\mathrm{cm}}$. Positiva: imagen real, al otro lado de la lente.`,
      };
    },
  },
  {
    id: 'potencia-lente',
    title: 'Potencia de una lente',
    generate(rng) {
      const f = rng.pick([-50, -25, -20, 10, 20, 25, 40, 50]);
      const value = 100 / f;
      return {
        statement: `Una lente tiene una distancia focal imagen de ${f} cm. Calcula su potencia en dioptrías.`,
        answer: numeric(value, 'dioptrías', { tolerance: { relative: 0.01 } }),
        hints: ['La potencia es la inversa de la distancia focal imagen.', '$P = \\dfrac{1}{f\'}$, con $f\'$ en METROS.', `$f' = ${t(f / 100)}$ m`],
        solution: `$P = \\dfrac{1}{${t(f / 100)}} = \\boxed{${t(value)}\\ \\text{dioptrías}}$ (${f > 0 ? 'convergente' : 'divergente'}).`,
      };
    },
  },
];

/* =========== D. FÍSICA RELATIVISTA, CUÁNTICA, NUCLEAR Y PARTÍCULAS =========== */

export const modern = [
  {
    id: 'relatividad-tiempo',
    title: 'Dilatación del tiempo',
    generate(rng) {
      const beta = rng.pick([0.6, 0.8, 0.9, 0.95, 0.99]);
      const t0 = rng.int(1, 10);
      const gamma = 1 / Math.sqrt(1 - beta * beta);
      const value = t0 * gamma;
      return {
        statement: `Una nave viaja a $${t(beta)}c$ respecto a la Tierra. Para los astronautas el viaje dura ${t0} años. ¿Cuánto dura medido desde la Tierra?`,
        answer: numeric(value, 'años', { commonErrors: [{ value: t0 / gamma, message: 'Al revés: desde la Tierra el tiempo medido es MAYOR (el tiempo propio es el de los astronautas).' }] }),
        hints: ['El tiempo propio es el que mide el reloj que viaja con la nave.', '$\\Delta t = \\gamma\\,\\Delta t_0$, con $\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}}$', `$\\gamma = ${t(gamma)}$`],
        solution: `$\\gamma = \\dfrac{1}{\\sqrt{1 - ${t(beta)}^2}} = ${t(gamma)}$, así que $\\Delta t = ${t(gamma)}\\cdot${t0} = \\boxed{${t(value)}\\ \\text{años}}$.`,
      };
    },
  },
  {
    id: 'fotoelectrico',
    title: 'Efecto fotoeléctrico',
    generate(rng) {
      const W = rng.decimal(1.9, 3.0, 1);
      const lnm = rng.int(200, 380);
      const Ef = (h * c) / (lnm * 1e-9) / e;
      const value = Ef - W;
      return {
        statement: `Sobre un metal de trabajo de extracción ${String(W).replace('.', ',')} eV incide luz de ${lnm} nm. Calcula la energía cinética máxima de los electrones emitidos, en eV.\n\n${datos(['h = 6{,}63\\cdot10^{-34}\\ \\mathrm{J\\,s}', 'c = 3\\cdot10^{8}\\ \\mathrm{m/s}', 'e = 1{,}6\\cdot10^{-19}\\ \\mathrm{C}'])}`,
        answer: numeric(value, 'eV', { commonErrors: [{ value: Ef, message: 'Esa es la energía del fotón. Hay que restarle el trabajo de extracción.' }] }),
        hints: ['Ecuación de Einstein del efecto fotoeléctrico.', '$E_{fotón} = W + E_{c,max}$, con $E_{fotón} = \\dfrac{hc}{\\lambda}$', `$E_{fotón} = ${t(Ef)}$ eV`],
        solution: `$E_{fotón} = \\dfrac{6{,}63\\cdot10^{-34}\\cdot3\\cdot10^8}{${lnm}\\cdot10^{-9}} = ${t(Ef * e)}\\ \\mathrm{J} = ${t(Ef)}\\ \\mathrm{eV}$.\n\n$E_{c,max} = ${t(Ef)} - ${t(W)} = \\boxed{${t(value)}\\ \\mathrm{eV}}$`,
      };
    },
  },
  {
    id: 'de-broglie',
    title: 'Longitud de onda de De Broglie',
    generate(rng) {
      const v = rng.decimal(1, 9, 1) * 1e6;
      const value = h / (me * v);
      return {
        statement: `Calcula la longitud de onda asociada a un electrón que se mueve a $${t(v, 2)}\\ \\mathrm{m/s}$.\n\n${datos(['h = 6{,}63\\cdot10^{-34}\\ \\mathrm{J\\,s}', 'm_e = 9{,}11\\cdot10^{-31}\\ \\mathrm{kg}'])}`,
        answer: numeric(value, 'm'),
        hints: ['Hipótesis de De Broglie: toda partícula en movimiento tiene una onda asociada.', '$\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}$', `$p = ${t(me * v)}\\ \\mathrm{kg\\,m/s}$`],
        solution: `$\\lambda = \\dfrac{6{,}63\\cdot10^{-34}}{9{,}11\\cdot10^{-31}\\cdot${t(v, 2)}} = \\boxed{${t(value)}\\ \\mathrm{m}}$`,
      };
    },
  },
  {
    id: 'desintegracion',
    title: 'Desintegración radiactiva',
    generate(rng) {
      const m0 = rng.int(1, 20) * 10;
      const T = rng.int(2, 30);
      const tt = rng.int(1, 4) * T + rng.pick([0, 0, Math.round(T / 2)]);
      const value = m0 * 2 ** (-tt / T);
      return {
        statement: `Una muestra contiene ${m0} g de un isótopo con periodo de semidesintegración de ${T} días. ¿Cuántos gramos quedan sin desintegrar al cabo de ${tt} días?`,
        answer: numeric(value, 'g', { commonErrors: [{ value: m0 * (1 - tt / (2 * T)), message: 'La desintegración no es lineal: es exponencial, $m = m_0\\,e^{-\\lambda t}$.' }] }),
        hints: ['La masa se reduce a la mitad cada periodo de semidesintegración.', '$m = m_0\\left(\\dfrac12\\right)^{t/T_{1/2}}$ (equivale a $m_0 e^{-\\lambda t}$ con $\\lambda = \\ln2/T_{1/2}$)', `$t/T_{1/2} = ${t(tt / T)}$`],
        solution: `$m = ${m0}\\cdot\\left(\\dfrac12\\right)^{${t(tt / T)}} = \\boxed{${t(value)}\\ \\mathrm{g}}$`,
      };
    },
  },
  {
    id: 'energia-enlace',
    title: 'Defecto de masa y energía de enlace',
    generate(rng) {
      const dm = rng.decimal(0.01, 0.3, 4);
      const value = dm * 931.5;
      return {
        statement: `El defecto de masa de un núcleo es ${String(dm).replace('.', ',')} u. Calcula su energía de enlace en MeV.\n\n${datos(['1\\ \\mathrm{u} \\equiv 931{,}5\\ \\mathrm{MeV}/c^2'])}`,
        answer: numeric(value, 'MeV'),
        hints: ['La energía de enlace es la energía equivalente a la masa "perdida" al formarse el núcleo.', '$E = \\Delta m\\,c^2$', 'Con la equivalencia dada: $E\\,(\\mathrm{MeV}) = \\Delta m\\,(\\mathrm{u})\\cdot 931{,}5$.'],
        solution: `$E = ${t(dm, 4)}\\cdot931{,}5 = \\boxed{${t(value)}\\ \\mathrm{MeV}}$`,
      };
    },
  },
  {
    id: 'particulas-concepto',
    title: 'Modelo estándar',
    generate(rng) {
      const bank = [
        { q: '¿Qué partícula transmite la interacción electromagnética?', o: ['El fotón', 'El gluón', 'El bosón de Higgs', 'El neutrino'], c: 0 },
        { q: '¿De qué quarks está formado un protón?', o: ['uud', 'udd', 'uuu', 'ud̄'], c: 0 },
        { q: '¿Cuál de estas partículas es un leptón?', o: ['El protón', 'El electrón', 'El neutrón', 'El pion'], c: 1 },
        { q: '¿Qué partículas transmiten la interacción nuclear débil?', o: ['Los gluones', 'Los bosones W y Z', 'Los fotones', 'Los gravitones'], c: 1 },
        { q: '¿Qué partículas mantienen unidos a los quarks (interacción fuerte)?', o: ['Los fotones', 'Los bosones W', 'Los gluones', 'Los muones'], c: 2 },
      ];
      const item = rng.pick(bank);
      return {
        statement: item.q,
        answer: choice(item.o.map((text) => ({ text })), item.c),
        hints: ['Recuerda la tabla del modelo estándar: quarks, leptones y bosones.', 'Los bosones "de gauge" transmiten las interacciones.', 'Fotón → electromagnética, gluones → fuerte, W y Z → débil.'],
        solution: `La respuesta correcta es **${item.o[item.c]}**.`,
      };
    },
  },
];
