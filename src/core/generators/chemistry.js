/**
 * chemistry.js — Generadores de Química (2.º de Bachillerato).
 * Datos termodinámicos y potenciales: valores tabulados habituales en los
 * libros de texto (a 25 °C). Se indican en cada enunciado.
 */

import { t, numeric, datos } from './helpers.js';
import { bankGenerator } from './bank.js';

const F = 96500; // constante de Faraday (C/mol)

/* --------------------------- Termoquímica --------------------------- */

const FUELS = [
  { name: 'metano', formula: 'CH_4', hf: -74.8, M: 16, co2: 1, h2o: 2, o2: 2 },
  { name: 'etano', formula: 'C_2H_6', hf: -84.7, M: 30, co2: 2, h2o: 3, o2: 3.5 },
  { name: 'propano', formula: 'C_3H_8', hf: -103.8, M: 44, co2: 3, h2o: 4, o2: 5 },
  { name: 'etanol', formula: 'C_2H_5OH', hf: -277.7, M: 46, co2: 2, h2o: 3, o2: 3 },
];
const HF_CO2 = -393.5;
const HF_H2O = -285.8;

const coef = (n) => (n === 1 ? '' : String(n).replace('.5', '{,}5').replace(/^0\{,\}5$/, '\\tfrac12'));

export const chemistry = [
  {
    id: 'entalpia-combustion',
    title: 'Entalpía de combustión (ley de Hess)',
    generate(rng) {
      const f = rng.pick(FUELS);
      const dH = f.co2 * HF_CO2 + f.h2o * HF_H2O - f.hf;
      const m = rng.int(1, 20) * 10;
      const n = m / f.M;
      const value = n * Math.abs(dH);
      const eq = `${f.formula} + ${coef(f.o2)}O_2 \\rightarrow ${coef(f.co2)}CO_2 + ${coef(f.h2o)}H_2O(l)`;
      return {
        statement: `Calcula la energía (en kJ) que se desprende al quemar ${m} g de ${f.name}: $${eq}$.\n\n${datos([`\\Delta H_f^\\circ(${f.formula}) = ${t(f.hf, 4)}`, `\\Delta H_f^\\circ(CO_2) = -393{,}5`, `\\Delta H_f^\\circ(H_2O,l) = -285{,}8\\ \\mathrm{kJ/mol}`, `M(${f.formula}) = ${f.M}\\ \\mathrm{g/mol}`])}`,
        answer: numeric(value, 'kJ', { commonErrors: [{ value: Math.abs(dH), message: 'Esa es la energía de 1 mol. Te piden la de la masa del enunciado: multiplica por los moles.' }] }),
        hints: ['Primero calcula $\\Delta H$ de la reacción y después multiplica por los moles que se queman.', '$\\Delta H_r = \\sum n\\,\\Delta H_f(\\text{productos}) - \\sum n\\,\\Delta H_f(\\text{reactivos})$. El $O_2$ tiene $\\Delta H_f = 0$.', `$\\Delta H_r = ${t(dH, 4)}$ kJ/mol y $n = ${m}/${f.M} = ${t(n)}$ mol.`],
        solution: `$\\Delta H_r = ${f.co2}(-393{,}5) + ${f.h2o}(-285{,}8) - (${t(f.hf, 4)}) = ${t(dH, 4)}$ kJ/mol.\n\n$Q = ${t(n)}\\cdot${t(Math.abs(dH), 4)} = \\boxed{${t(value)}\\ \\mathrm{kJ}}$ desprendidos.`,
      };
    },
  },
  {
    id: 'gibbs',
    title: 'Espontaneidad (energía libre de Gibbs)',
    generate(rng) {
      const exo = rng.int(0, 1) === 1;
      const dH = (exo ? -1 : 1) * rng.int(20, 180);
      const dS = (exo ? -1 : 1) * rng.int(40, 300);
      const Teq = (dH * 1000) / dS;
      if (rng.int(0, 1) === 0) {
        return {
          statement: `Para una reacción, $\\Delta H^\\circ = ${dH}$ kJ y $\\Delta S^\\circ = ${dS}$ J/K. ¿A qué temperatura (en K) cambia de espontánea a no espontánea? Suponiendo $\\Delta H$ y $\\Delta S$ constantes.`,
          answer: numeric(Teq, 'K', { commonErrors: [{ value: dH / dS, message: 'Cuidado con las unidades: pasa $\\Delta H$ a julios (o $\\Delta S$ a kJ/K).' }] }),
          hints: ['Una reacción es espontánea si $\\Delta G < 0$.', '$\\Delta G = \\Delta H - T\\Delta S$. En el límite, $\\Delta G = 0$.', '$T = \\Delta H/\\Delta S$, con las mismas unidades de energía.'],
          solution: `$T = \\dfrac{${dH * 1000}\\ \\mathrm{J}}{${dS}\\ \\mathrm{J/K}} = \\boxed{${t(Teq)}\\ \\mathrm{K}}$. ${exo ? 'Como $\\Delta H < 0$ y $\\Delta S < 0$, es espontánea por DEBAJO de esa temperatura.' : 'Como $\\Delta H > 0$ y $\\Delta S > 0$, es espontánea por ENCIMA de esa temperatura.'}`,
        };
      }
      const T = rng.pick([273, 298, 350, 400, 500, 800]);
      const dG = dH - (T * dS) / 1000;
      return {
        statement: `Calcula $\\Delta G^\\circ$ (en kJ) a ${T} K para una reacción con $\\Delta H^\\circ = ${dH}$ kJ y $\\Delta S^\\circ = ${dS}$ J/K. ¿Es espontánea?`,
        answer: numeric(dG, 'kJ', { commonErrors: [{ value: dH - T * dS, message: 'No has pasado $\\Delta S$ de J/K a kJ/K (divide entre 1000).' }] }),
        hints: ['Ecuación de Gibbs-Helmholtz.', '$\\Delta G = \\Delta H - T\\Delta S$', `$T\\Delta S = ${T}\\cdot${t(dS / 1000)} = ${t((T * dS) / 1000)}$ kJ`],
        solution: `$\\Delta G = ${dH} - ${T}\\cdot(${t(dS / 1000)}) = \\boxed{${t(dG)}\\ \\mathrm{kJ}}$: ${dG < 0 ? 'negativa, así que ES espontánea' : 'positiva, así que NO es espontánea'} a esa temperatura.`,
      };
    },
  },
  {
    id: 'kc-equilibrio',
    title: 'Constante de equilibrio Kc',
    generate(rng) {
      const n0 = rng.pick([0.5, 1, 1.5, 2]);
      const frac = rng.pick([0.5, 0.6, 0.7, 0.75, 0.8]);
      const x = n0 * frac;
      const nHI = 2 * x;
      const V = rng.pick([1, 2, 5, 10]);
      const value = nHI ** 2 / (n0 - x) ** 2;
      return {
        statement: `En un recipiente de ${V} L se introducen ${t(n0)} mol de $H_2$ y ${t(n0)} mol de $I_2$. Al alcanzar el equilibrio $H_2(g) + I_2(g) \\rightleftharpoons 2HI(g)$ hay ${t(nHI)} mol de $HI$. Calcula $K_c$.`,
        answer: numeric(value, undefined, { tolerance: { relative: 0.01 }, commonErrors: [{ value: nHI / (n0 - x) ** 2, message: 'El coeficiente 2 del $HI$ pasa a ser un exponente: $[HI]^2$.' }] }),
        hints: ['Haz la tabla inicial / cambio / equilibrio (ICE).', `Si reaccionan $x$ mol de $H_2$, se forman $2x$ de $HI$. Aquí $2x = ${t(nHI)}$.`, '$K_c = \\dfrac{[HI]^2}{[H_2][I_2]}$. El volumen se simplifica porque hay los mismos moles a cada lado.'],
        solution: `$x = ${t(x)}$ mol, así que quedan ${t(n0 - x)} mol de $H_2$ y de $I_2$.\n\n$K_c = \\dfrac{(${t(nHI)}/${V})^2}{(${t(n0 - x)}/${V})^2} = \\boxed{${t(value)}}$`,
      };
    },
  },
  {
    id: 'ph-fuerte',
    title: 'pH de un ácido o una base fuerte',
    generate(rng) {
      const a = rng.pick([1, 2, 5]);
      const b = rng.int(1, 4);
      const c = a * 10 ** -b;
      const acid = rng.int(0, 1) === 1;
      const value = acid ? -Math.log10(c) : 14 + Math.log10(c);
      return {
        statement: `Calcula el pH de una disolución ${acid ? 'de $HCl$' : 'de $NaOH$'} de concentración $${t(c)}$ M.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0.05 }, commonErrors: acid ? [] : [{ value: -Math.log10(c), message: 'Ese es el pOH. Para una base: pH = 14 − pOH.' }] }),
        hints: [`${acid ? 'El $HCl$' : 'El $NaOH$'} es ${acid ? 'un ácido' : 'una base'} fuerte: se disocia totalmente.`, acid ? '$[H_3O^+] = c$ y $\\mathrm{pH} = -\\log[H_3O^+]$.' : '$[OH^-] = c$, $\\mathrm{pOH} = -\\log[OH^-]$ y $\\mathrm{pH} = 14 - \\mathrm{pOH}$.', `$\\log(${t(c)}) = ${t(Math.log10(c))}$`],
        solution: acid ? `$\\mathrm{pH} = -\\log(${t(c)}) = \\boxed{${t(value)}}$` : `$\\mathrm{pOH} = -\\log(${t(c)}) = ${t(-Math.log10(c))}$, así que $\\mathrm{pH} = 14 - ${t(-Math.log10(c))} = \\boxed{${t(value)}}$`,
      };
    },
  },
  {
    id: 'ph-debil',
    title: 'pH de un ácido débil',
    generate(rng) {
      const Ka = 1.8e-5;
      const c = rng.pick([0.01, 0.05, 0.1, 0.2, 0.5]);
      const x = (-Ka + Math.sqrt(Ka * Ka + 4 * Ka * c)) / 2;
      const value = -Math.log10(x);
      return {
        statement: `Calcula el pH de una disolución de ácido acético ($CH_3COOH$) ${t(c)} M. Dato: $K_a = 1{,}8\\cdot10^{-5}$.`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0.05 }, commonErrors: [{ value: -Math.log10(c), message: 'Lo has tratado como un ácido fuerte. El acético es débil: solo se disocia una pequeña parte.' }] }),
        hints: ['Es un ácido débil: plantea el equilibrio con $x$ = concentración disociada.', '$K_a = \\dfrac{x^2}{c - x}$. Como $K_a$ es pequeña, puedes aproximar $c - x \\approx c$.', `$x \\approx \\sqrt{K_a\\,c} = \\sqrt{1{,}8\\cdot10^{-5}\\cdot${t(c)}}$`],
        solution: `$x = [H_3O^+] \\approx ${t(x)}$ M, así que $\\mathrm{pH} = -\\log(${t(x)}) = \\boxed{${t(value)}}$.`,
      };
    },
  },
  {
    id: 'fem-pila',
    title: 'Potencial de una pila',
    generate(rng) {
      const pairs = [
        { ion: 'Mg^{2+}/Mg', e: -2.37 }, { ion: 'Zn^{2+}/Zn', e: -0.76 }, { ion: 'Fe^{2+}/Fe', e: -0.44 },
        { ion: 'Ni^{2+}/Ni', e: -0.25 }, { ion: 'Pb^{2+}/Pb', e: -0.13 }, { ion: 'Cu^{2+}/Cu', e: 0.34 }, { ion: 'Ag^{+}/Ag', e: 0.8 },
      ];
      const [a, b] = rng.shuffle(pairs).slice(0, 2);
      const cat = a.e > b.e ? a : b;
      const an = a.e > b.e ? b : a;
      const value = cat.e - an.e;
      return {
        statement: `Se construye una pila con los electrodos $${a.ion}$ ($E^\\circ = ${t(a.e)}$ V) y $${b.ion}$ ($E^\\circ = ${t(b.e)}$ V). Calcula su fuerza electromotriz estándar.`,
        answer: numeric(value, 'V', { tolerance: { absolute: 0.01 }, commonErrors: [{ value: a.e + b.e, message: 'No se suman los potenciales: es $E^\\circ_{\\text{cátodo}} - E^\\circ_{\\text{ánodo}}$.' }] }),
        hints: ['En el cátodo se produce la reducción: es el electrodo con mayor potencial.', '$E^\\circ_{\\text{pila}} = E^\\circ_{\\text{cátodo}} - E^\\circ_{\\text{ánodo}}$ (siempre sale positiva).', `Cátodo: $${cat.ion}$. Ánodo: $${an.ion}$.`],
        solution: `$E^\\circ = ${t(cat.e)} - (${t(an.e)}) = \\boxed{${t(value)}\\ \\mathrm{V}}$. Se reduce el $${cat.ion.split('/')[0]}$ y se oxida el $${an.ion.split('/')[1]}$.`,
      };
    },
  },
  {
    id: 'faraday',
    title: 'Electrólisis (leyes de Faraday)',
    generate(rng) {
      const metal = rng.pick([{ s: 'Cu', ion: 'Cu^{2+}', M: 63.5, z: 2 }, { s: 'Ag', ion: 'Ag^{+}', M: 107.9, z: 1 }, { s: 'Zn', ion: 'Zn^{2+}', M: 65.4, z: 2 }, { s: 'Ni', ion: 'Ni^{2+}', M: 58.7, z: 2 }]);
      const I = rng.pick([0.5, 1, 2, 2.5, 5]);
      const tmin = rng.pick([10, 20, 30, 45, 60, 90]);
      const q = I * tmin * 60;
      const value = (q * metal.M) / (metal.z * F);
      return {
        statement: `Se hace pasar una corriente de ${t(I)} A durante ${tmin} minutos por una disolución de $${metal.ion}$. ¿Cuántos gramos de ${metal.s} se depositan en el cátodo?\n\n${datos([`M(${metal.s}) = ${t(metal.M, 4)}\\ \\mathrm{g/mol}`, 'F = 96\\,500\\ \\mathrm{C/mol}'])}`,
        answer: numeric(value, 'g', { commonErrors: [{ value: (q * metal.M) / F, message: `Te falta dividir entre los ${metal.z} electrones que necesita cada ion.` }, { value: (I * tmin * metal.M) / (metal.z * F), message: 'Pasa los minutos a segundos.' }] }),
        hints: ['Carga que circula: $Q = I\\cdot t$ (con $t$ en segundos).', `Cada ion $${metal.ion}$ necesita ${metal.z} electrón(es): $n_e = Q/F$ y $n_{metal} = n_e/${metal.z}$.`, `$Q = ${t(I)}\\cdot${tmin * 60} = ${q}$ C.`],
        solution: `$m = \\dfrac{Q\\,M}{z\\,F} = \\dfrac{${q}\\cdot${t(metal.M, 4)}}{${metal.z}\\cdot96\\,500} = \\boxed{${t(value)}\\ \\mathrm{g}}$`,
      };
    },
  },
];

/* --------------------------- Bancos de preguntas --------------------------- */

chemistry.push(
  bankGenerator('qui-atomo', 'Estructura atómica', [
    { q: '¿Qué combinación de números cuánticos $(n, l, m_l)$ es **imposible**?', o: ['$(2, 2, 0)$', '$(3, 1, -1)$', '$(2, 1, 0)$', '$(4, 3, 3)$'], c: 0, h: 'El número $l$ va de 0 a $n - 1$.', s: 'Con $n = 2$, $l$ solo puede valer 0 o 1.' },
    { q: '¿Cuántos electrones caben como máximo en un orbital?', o: ['2', '6', '8', '10'], c: 0, h: 'Principio de exclusión de Pauli.', s: 'Dos electrones, con espines opuestos.' },
    { q: 'Un orbital con $l = 2$ es de tipo...', o: ['d', 's', 'p', 'f'], c: 0, h: '$l$ = 0, 1, 2, 3 corresponde a s, p, d, f.', s: '$l = 2$ son los orbitales d.' },
    { q: 'La configuración electrónica del sodio ($Z = 11$) es:', o: ['$1s^2\\,2s^2\\,2p^6\\,3s^1$', '$1s^2\\,2s^2\\,2p^7$', '$1s^2\\,2s^2\\,2p^6\\,3p^1$', '$1s^2\\,2s^2\\,3s^2\\,3p^5$'], c: 0, h: 'Llena los orbitales por orden de energía (diagrama de Moeller).', s: 'Tras el $2p^6$ viene el $3s$.' },
    { q: 'El principio de máxima multiplicidad de Hund dice que...', o: ['los electrones ocupan orbitales de igual energía de uno en uno y con espines paralelos', 'no puede haber dos electrones con los cuatro números cuánticos iguales', 'los orbitales se llenan por orden de energía creciente', 'el electrón se comporta como una onda'], c: 0, h: 'Piensa en cómo se reparten 3 electrones en los tres orbitales p.', s: 'Primero se semiocupan todos los orbitales degenerados.' },
  ]),
  bankGenerator('qui-periodica', 'Propiedades periódicas', [
    { q: '¿Qué elemento tiene MAYOR radio atómico?', o: ['Cs', 'Li', 'F', 'Ne'], c: 0, h: 'El radio aumenta al bajar en un grupo y al ir hacia la izquierda en un periodo.', s: 'El cesio está abajo a la izquierda: tiene más capas y menos carga nuclear efectiva.' },
    { q: '¿Qué elemento tiene la MAYOR energía de ionización?', o: ['He', 'Na', 'K', 'Ca'], c: 0, h: 'Cuanto más cerca está el electrón del núcleo y más carga efectiva, más cuesta arrancarlo.', s: 'El helio: es pequeño y tiene la capa completa.' },
    { q: '¿Cuál es el elemento MÁS electronegativo?', o: ['F', 'O', 'Cl', 'N'], c: 0, h: 'La electronegatividad crece hacia arriba y a la derecha (sin contar los gases nobles).', s: 'El flúor es el más electronegativo de la tabla (4,0 en la escala de Pauling).' },
    { q: 'Al recorrer un periodo de izquierda a derecha, el radio atómico...', o: ['disminuye', 'aumenta', 'no cambia', 'aumenta y después disminuye'], c: 0, h: 'Aumenta la carga nuclear, pero los electrones entran en la misma capa.', s: 'Disminuye porque la carga nuclear efectiva aumenta y atrae más a los electrones.' },
    { q: 'El ion $Na^+$ comparado con el átomo $Na$ es...', o: ['más pequeño', 'más grande', 'igual de grande', 'más electronegativo que el flúor'], c: 0, h: 'Al perder el electrón $3s$, ¿cuántas capas le quedan?', s: 'Pierde la capa externa: el catión es más pequeño que el átomo neutro.' },
  ]),
  bankGenerator('qui-enlace', 'Enlace químico y geometría', [
    { q: 'Según la TRPECV, ¿qué geometría tiene la molécula de agua?', o: ['Angular', 'Lineal', 'Plana triangular', 'Tetraédrica regular'], c: 0, h: 'El oxígeno tiene 2 pares enlazantes y 2 pares solitarios.', s: 'Cuatro pares alrededor del O (disposición tetraédrica), pero dos son solitarios: la molécula es angular (unos 104,5°).' },
    { q: '¿Qué geometría tiene el $CO_2$?', o: ['Lineal', 'Angular', 'Piramidal', 'Tetraédrica'], c: 0, h: 'El carbono forma dos dobles enlaces y no tiene pares solitarios.', s: 'Dos zonas de densidad electrónica: geometría lineal (180°).' },
    { q: '¿Cuál de estas moléculas es APOLAR aunque sus enlaces sean polares?', o: ['$CH_4$', '$H_2O$', '$NH_3$', '$HCl$'], c: 0, h: 'Fíjate en la simetría: ¿se anulan los momentos dipolares?', s: 'En el metano tetraédrico los cuatro momentos dipolares se anulan.' },
    { q: 'El $NaCl$ sólido NO conduce la electricidad porque...', o: ['sus iones no pueden moverse', 'no tiene iones', 'es una molécula covalente', 'tiene electrones libres'], c: 0, h: 'Para conducir hacen falta cargas que se puedan desplazar.', s: 'En el cristal los iones están fijos; fundido o disuelto sí conduce.' },
    { q: '¿Qué hibridación tiene el carbono en el metano?', o: ['$sp^3$', '$sp^2$', '$sp$', '$sp^3d$'], c: 0, h: 'Forma cuatro enlaces sencillos iguales.', s: 'Cuatro orbitales híbridos $sp^3$ dirigidos a los vértices de un tetraedro.' },
  ]),
  bankGenerator('qui-fuerzas', 'Fuerzas intermoleculares', [
    { q: '¿Por qué el agua tiene un punto de ebullición tan alto para su masa molecular?', o: ['Por los enlaces (puentes) de hidrógeno', 'Porque es una molécula apolar', 'Por las fuerzas de London únicamente', 'Porque es un compuesto iónico'], c: 0, h: 'El H está unido a un átomo muy electronegativo y pequeño (O).', s: 'Los puentes de hidrógeno son las fuerzas intermoleculares más intensas.' },
    { q: '¿Qué sustancia tiene un punto de ebullición MÁS alto?', o: ['$I_2$', '$F_2$', '$Cl_2$', '$Br_2$'], c: 0, h: 'Son moléculas apolares: solo hay fuerzas de London, que crecen con el tamaño.', s: 'El yodo es la molécula más grande y polarizable.' },
    { q: 'Las fuerzas de dispersión (London) se dan...', o: ['en todas las moléculas', 'solo entre moléculas polares', 'solo entre iones', 'solo cuando hay puentes de hidrógeno'], c: 0, h: 'Se deben a dipolos instantáneos de la nube electrónica.', s: 'Existen siempre, aunque son las más débiles.' },
    { q: 'El diamante tiene un punto de fusión muy alto porque es...', o: ['un sólido covalente (red tridimensional)', 'un sólido molecular', 'un metal', 'un compuesto iónico'], c: 0, h: 'Para fundirlo hay que romper enlaces covalentes, no fuerzas intermoleculares.', s: 'Es una red covalente: cada carbono está unido a otros cuatro.' },
  ]),
  bankGenerator('qui-cinetica', 'Cinética química', [
    { q: 'Un catalizador aumenta la velocidad de reacción porque...', o: ['disminuye la energía de activación', 'aumenta la constante de equilibrio', 'aumenta la entalpía de reacción', 'se consume en la reacción'], c: 0, h: 'Ofrece un camino de reacción alternativo.', s: 'Baja $E_a$ y no modifica $\\Delta H$ ni el equilibrio, y se recupera al final.' },
    { q: 'Según la ecuación de Arrhenius, al aumentar la temperatura la constante de velocidad...', o: ['aumenta', 'disminuye', 'no cambia', 'se anula'], c: 0, h: '$k = A\\,e^{-E_a/RT}$', s: 'Más temperatura, más moléculas con energía suficiente: $k$ aumenta.' },
    { q: 'Si $v = k[A]^2[B]$, el orden total de la reacción es...', o: ['3', '2', '1', '0'], c: 0, h: 'El orden total es la suma de los exponentes.', s: '$2 + 1 = 3$.' },
    { q: '¿Qué NO aumenta la velocidad de una reacción entre un sólido y un líquido?', o: ['Usar el sólido en un solo trozo grande', 'Calentar', 'Triturar el sólido', 'Aumentar la concentración del líquido'], c: 0, h: 'Piensa en la superficie de contacto.', s: 'Un trozo grande tiene menos superficie de contacto que el sólido triturado.' },
  ]),
  bankGenerator('qui-equilibrio', 'Principio de Le Chatelier', [
    { q: 'En $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$, al aumentar la presión el equilibrio...', o: ['se desplaza hacia la derecha', 'se desplaza hacia la izquierda', 'no se desplaza', 'desaparece'], c: 0, h: 'El sistema se desplaza hacia donde hay menos moles de gas.', s: '4 moles de gas a la izquierda y 2 a la derecha: se desplaza hacia el $NH_3$.' },
    { q: 'En una reacción exotérmica en equilibrio, al aumentar la temperatura...', o: ['se desplaza hacia los reactivos', 'se desplaza hacia los productos', 'aumenta $K$', 'no pasa nada'], c: 0, h: 'Trata el calor como si fuera un producto.', s: 'El sistema absorbe calor desplazándose en sentido endotérmico (hacia los reactivos), y $K$ disminuye.' },
    { q: 'Añadir un catalizador a un sistema en equilibrio...', o: ['no lo desplaza', 'lo desplaza hacia los productos', 'lo desplaza hacia los reactivos', 'cambia el valor de $K$'], c: 0, h: 'El catalizador acelera por igual las reacciones directa e inversa.', s: 'Solo hace que se alcance antes el equilibrio.' },
    { q: 'Si en un equilibrio se retira parte de un producto, el sistema...', o: ['produce más de ese producto', 'consume más producto', 'no reacciona', 'cambia su constante de equilibrio'], c: 0, h: 'Se opone a la perturbación.', s: 'Se desplaza hacia la derecha para reponer lo que se ha retirado; $K$ no cambia.' },
  ]),
  bankGenerator('qui-acidobase', 'Ácidos, bases e hidrólisis', [
    { q: 'Según Brønsted-Lowry, un ácido es una especie que...', o: ['cede protones', 'acepta protones', 'cede electrones', 'libera iones $OH^-$'], c: 0, h: 'Piensa en el $H^+$.', s: 'El ácido cede un protón; la base lo acepta.' },
    { q: 'Una disolución de acetato de sodio ($CH_3COONa$) es...', o: ['básica', 'ácida', 'neutra', 'no se puede saber'], c: 0, h: 'El anión acetato es la base conjugada de un ácido débil.', s: 'El acetato se hidroliza y genera $OH^-$: la disolución es básica.' },
    { q: 'La base conjugada del $NH_4^+$ es...', o: ['$NH_3$', '$NH_2^-$', '$H_3O^+$', '$OH^-$'], c: 0, h: 'Quítale un protón.', s: '$NH_4^+ \\rightarrow NH_3 + H^+$.' },
    { q: 'A 25 °C, si $[H_3O^+] = 10^{-9}$ M, la disolución es...', o: ['básica (pH = 9)', 'ácida (pH = 9)', 'neutra', 'ácida (pH = 5)'], c: 0, h: '$\\mathrm{pH} = -\\log[H_3O^+]$.', s: 'pH = 9 > 7: básica.' },
  ]),
  bankGenerator('qui-redox', 'Reacciones redox', [
    { q: 'En una reacción redox, el oxidante es la especie que...', o: ['gana electrones y se reduce', 'pierde electrones y se oxida', 'gana electrones y se oxida', 'no cambia su número de oxidación'], c: 0, h: 'El oxidante "provoca" la oxidación del otro.', s: 'El oxidante capta electrones: se reduce.' },
    { q: '¿Cuál es el número de oxidación del Mn en $KMnO_4$?', o: ['+7', '+4', '+2', '+6'], c: 0, h: 'K vale +1 y cada O vale −2; la suma total es 0.', s: '$1 + x - 8 = 0 \\Rightarrow x = +7$.' },
    { q: 'En una pila galvánica, la oxidación tiene lugar en...', o: ['el ánodo', 'el cátodo', 'el puente salino', 'los dos electrodos a la vez'], c: 0, h: 'Regla mnemotécnica: Ánodo-Oxidación (dos vocales); Cátodo-Reducción (dos consonantes).', s: 'Oxidación en el ánodo, reducción en el cátodo.' },
    { q: 'Una reacción redox es espontánea si...', o: ['$E^\\circ > 0$', '$E^\\circ < 0$', '$E^\\circ = 0$', '$\\Delta G > 0$'], c: 0, h: '$\\Delta G = -nFE$.', s: 'Con $E^\\circ > 0$ resulta $\\Delta G < 0$: espontánea.' },
  ]),
  bankGenerator('qui-organica', 'Química orgánica', [
    { q: '¿A qué grupo funcional pertenece el $CH_3-CHO$?', o: ['Aldehído', 'Cetona', 'Alcohol', 'Ácido carboxílico'], c: 0, h: 'El grupo $-CHO$ está en un extremo de la cadena.', s: 'Es el etanal, un aldehído.' },
    { q: 'El nombre del $CH_3-CO-CH_3$ es...', o: ['propanona', 'propanal', 'propan-1-ol', 'ácido propanoico'], c: 0, h: 'El carbonilo está en el carbono central.', s: 'Es una cetona de tres carbonos: propanona (acetona).' },
    { q: 'El but-2-eno presenta isomería...', o: ['geométrica (cis/trans)', 'óptica', 'de función', 'no presenta isomería'], c: 0, h: 'Cada carbono del doble enlace tiene dos sustituyentes distintos.', s: 'Existen el cis-but-2-eno y el trans-but-2-eno.' },
    { q: 'Un carbono asimétrico (quiral) es el que...', o: ['tiene cuatro sustituyentes distintos', 'forma un doble enlace', 'tiene dos hidrógenos', 'forma parte de un anillo aromático'], c: 0, h: 'Es el origen de la isomería óptica.', s: 'Con cuatro sustituyentes distintos aparecen dos enantiómeros.' },
    { q: 'La reacción de un ácido carboxílico con un alcohol da...', o: ['un éster y agua', 'un éter', 'una amina', 'un aldehído'], c: 0, h: 'Es una reacción de condensación (esterificación).', s: 'Ácido + alcohol ⇌ éster + agua.' },
  ]),
  bankGenerator('qui-reacciones-org', 'Reacciones orgánicas y polímeros', [
    { q: 'La reacción $CH_2=CH_2 + H_2O \\rightarrow CH_3-CH_2OH$ es de...', o: ['adición', 'sustitución', 'eliminación', 'combustión'], c: 0, h: 'El doble enlace desaparece y la molécula "gana" átomos.', s: 'Adición de agua (hidratación) al doble enlace.' },
    { q: 'La deshidratación de un alcohol para obtener un alqueno es una reacción de...', o: ['eliminación', 'adición', 'sustitución', 'redox'], c: 0, h: 'Se pierde una molécula pequeña ($H_2O$) y se forma un doble enlace.', s: 'Es una eliminación.' },
    { q: 'El polietileno se obtiene mediante una polimerización de...', o: ['adición', 'condensación', 'eliminación', 'hidrólisis'], c: 0, h: 'Los monómeros (eteno) se unen abriendo el doble enlace, sin perder átomos.', s: 'Polimerización por adición de muchas moléculas de eteno.' },
    { q: 'La oxidación suave de un alcohol primario produce...', o: ['un aldehído', 'una cetona', 'un éter', 'un alcano'], c: 0, h: 'El OH está en un carbono del extremo.', s: 'Alcohol primario → aldehído (y si se oxida más, ácido carboxílico).' },
  ]),
);
