/**
 * biology.js — Generadores de Biología (2.º de Bachillerato).
 * Dos generadores numéricos (genética mendeliana y regla de Chargaff) y
 * bancos de preguntas tipo test escritas a mano para cada unidad.
 */

import { t, numeric } from './helpers.js';
import { bankGenerator } from './bank.js';

export const biology = [
  {
    id: 'mendel-prob',
    title: 'Probabilidades en genética mendeliana',
    generate(rng) {
      const cases = [
        { cross: 'Aa \\times Aa', q: 'que un descendiente muestre el fenotipo recesivo', p: 1 / 4, why: 'Del cuadro de Punnett: AA, Aa, Aa, aa. Solo $aa$ (1 de 4) muestra el recesivo.' },
        { cross: 'Aa \\times Aa', q: 'que un descendiente con fenotipo dominante sea heterocigoto', p: 2 / 3, why: 'Entre los de fenotipo dominante (AA, Aa, Aa), 2 de 3 son $Aa$.' },
        { cross: 'Aa \\times aa', q: 'que un descendiente sea homocigoto recesivo', p: 1 / 2, why: 'Es un cruzamiento prueba: la mitad $Aa$ y la mitad $aa$.' },
        { cross: 'AaBb \\times AaBb', q: 'que un descendiente sea $aabb$', p: 1 / 16, why: 'Los genes se heredan de forma independiente: $\\frac14\\cdot\\frac14 = \\frac{1}{16}$.' },
        { cross: 'AaBb \\times AaBb', q: 'que un descendiente muestre los dos caracteres dominantes', p: 9 / 16, why: '$\\frac34\\cdot\\frac34 = \\frac{9}{16}$ (proporción 9:3:3:1).' },
        { cross: 'AaBb \\times aabb', q: 'que un descendiente sea $Aabb$', p: 1 / 4, why: '$\\frac12\\cdot\\frac12 = \\frac14$.' },
      ];
      const c = rng.pick(cases);
      return {
        statement: `En el cruce $${c.cross}$ (genes autosómicos con dominancia completa y, si hay dos, independientes), ¿cuál es la probabilidad de ${c.q}? Responde con una fracción o un decimal.`,
        answer: numeric(c.p, undefined, { tolerance: { absolute: 0.01 } }),
        hints: ['Dibuja el cuadro de Punnett con los gametos de cada progenitor.', 'Con dos genes independientes, calcula cada gen por separado y multiplica las probabilidades.', 'Un heterocigoto $Aa$ produce gametos $A$ y $a$ al 50 %.'],
        solution: `${c.why} Probabilidad: $\\boxed{${t(c.p, 3)}}$.`,
      };
    },
  },
  {
    id: 'chargaff',
    title: 'Composición de bases del ADN',
    generate(rng) {
      const A = rng.int(15, 35);
      const value = (100 - 2 * A) / 2;
      return {
        statement: `En una muestra de ADN de doble cadena, el ${A} % de las bases son adenina. ¿Qué porcentaje son guanina?`,
        answer: numeric(value, undefined, { tolerance: { absolute: 0.5 }, commonErrors: [{ value: 100 - A, message: 'Olvidas que la timina va emparejada con la adenina: también es el ' + A + ' %.' }] }),
        hints: ['Regla de Chargaff: en el ADN de doble cadena, A = T y G = C.', `Si A = ${A} %, entonces T = ${A} %.`, 'Lo que queda (100 − A − T) se reparte a partes iguales entre G y C.'],
        solution: `A = T = ${A} %, así que G + C = ${100 - 2 * A} % y G = $\\boxed{${t(value)}\\ \\%}$.`,
      };
    },
  },

  bankGenerator('bio-agua', 'Bioelementos, agua y sales minerales', [
    { q: 'La elevada capacidad calorífica del agua se debe a...', o: ['los puentes de hidrógeno entre sus moléculas', 'su carácter apolar', 'su baja densidad', 'los enlaces iónicos'], c: 0, h: 'Para calentar el agua hay que romper primero ciertos enlaces entre moléculas.', s: 'Parte del calor se emplea en romper puentes de hidrógeno: el agua amortigua los cambios de temperatura.' },
    { q: '¿Por qué el hielo flota sobre el agua líquida?', o: ['Porque es menos denso', 'Porque es más denso', 'Porque no tiene puentes de hidrógeno', 'Porque es apolar'], c: 0, h: 'Al congelarse, las moléculas forman una red ordenada con huecos.', s: 'El hielo es menos denso: aísla el agua de debajo y permite la vida en lagos helados.' },
    { q: 'Un medio en el que una célula animal pierde agua y se arruga es...', o: ['hipertónico', 'hipotónico', 'isotónico', 'neutro'], c: 0, h: 'El agua pasa por ósmosis hacia donde hay más concentración de solutos.', s: 'En un medio hipertónico la célula pierde agua (plasmólisis o crenación).' },
    { q: 'Los sistemas tampón (como el bicarbonato) sirven para...', o: ['mantener el pH constante', 'aumentar la temperatura', 'almacenar energía', 'transportar oxígeno'], c: 0, h: 'Neutralizan pequeñas cantidades de ácido o de base.', s: 'Amortiguan los cambios de pH del medio interno.' },
  ]),
  bankGenerator('bio-glucidos-lipidos', 'Glúcidos y lípidos', [
    { q: '¿Cuál de estos glúcidos es un polisacárido de reserva en los animales?', o: ['Glucógeno', 'Celulosa', 'Sacarosa', 'Ribosa'], c: 0, h: 'Se almacena en el hígado y los músculos.', s: 'El glucógeno es el polisacárido de reserva animal; el almidón, el vegetal.' },
    { q: 'El enlace que une dos monosacáridos se llama...', o: ['O-glucosídico', 'peptídico', 'éster', 'fosfodiéster'], c: 0, h: 'Se forma entre grupos OH con pérdida de una molécula de agua.', s: 'Enlace O-glucosídico.' },
    { q: 'Los fosfolípidos forman bicapas en el agua porque son...', o: ['anfipáticos', 'totalmente apolares', 'totalmente polares', 'proteínas'], c: 0, h: 'Tienen una cabeza que "quiere" agua y colas que la "rechazan".', s: 'Cabeza polar hidrófila y colas apolares hidrófobas.' },
    { q: 'La reacción de un triglicérido con NaOH que produce jabón se llama...', o: ['saponificación', 'esterificación', 'hidrogenación', 'fermentación'], c: 0, h: 'Es una hidrólisis en medio básico.', s: 'Saponificación: se obtienen glicerina y sales de ácidos grasos (jabones).' },
    { q: 'La celulosa es indigerible para los humanos porque...', o: ['tiene enlaces β que nuestras enzimas no rompen', 'es una proteína', 'no contiene glucosa', 'es soluble en agua'], c: 0, h: 'Almidón y celulosa están hechos del mismo monosacárido.', s: 'Sus enlaces β(1→4) no los rompe ninguna enzima humana.' },
  ]),
  bankGenerator('bio-proteinas', 'Proteínas y enzimas', [
    { q: 'La estructura primaria de una proteína es...', o: ['la secuencia de aminoácidos', 'la hélice α', 'el plegamiento tridimensional', 'la unión de varias cadenas'], c: 0, h: 'Es el nivel más básico y lo determina el ADN.', s: 'La secuencia de aminoácidos unidos por enlaces peptídicos.' },
    { q: 'La desnaturalización de una proteína afecta a...', o: ['su estructura secundaria, terciaria y cuaternaria', 'solo su estructura primaria', 'sus enlaces peptídicos', 'su secuencia de aminoácidos'], c: 0, h: 'Al desnaturalizarse, la secuencia de aminoácidos se conserva.', s: 'Se pierde la conformación tridimensional, pero no los enlaces peptídicos.' },
    { q: 'Una enzima acelera una reacción porque...', o: ['disminuye la energía de activación', 'aumenta la energía de activación', 'se consume en la reacción', 'cambia el equilibrio'], c: 0, h: 'Es un catalizador biológico.', s: 'Disminuye la energía de activación y se recupera intacta.' },
    { q: 'Un inhibidor competitivo...', o: ['se une al centro activo compitiendo con el sustrato', 'destruye la enzima', 'se une siempre a otra zona de la enzima', 'aumenta la velocidad máxima'], c: 0, h: 'Se parece al sustrato.', s: 'Ocupa el centro activo; su efecto se puede superar aumentando la concentración de sustrato.' },
    { q: 'El enlace peptídico une...', o: ['el grupo carboxilo de un aminoácido con el amino del siguiente', 'dos grupos amino', 'dos grupos carboxilo', 'dos cadenas laterales'], c: 0, h: 'Es un enlace de tipo amida.', s: 'Carboxilo + amino, con pérdida de una molécula de agua.' },
  ]),
  bankGenerator('bio-nucleicos', 'Ácidos nucleicos', [
    { q: '¿Qué base nitrogenada aparece en el ARN pero no en el ADN?', o: ['Uracilo', 'Timina', 'Adenina', 'Guanina'], c: 0, h: 'En el ARN sustituye a la timina.', s: 'El uracilo sustituye a la timina en el ARN.' },
    { q: 'En el ADN, la adenina se empareja con...', o: ['timina, mediante dos puentes de hidrógeno', 'guanina', 'citosina, mediante tres puentes de hidrógeno', 'uracilo'], c: 0, h: 'Regla de complementariedad de bases.', s: 'A=T (dos puentes de hidrógeno) y G≡C (tres).' },
    { q: 'Las dos cadenas del ADN son antiparalelas, lo que significa que...', o: ['una va en sentido 5\'→3\' y la otra 3\'→5\'', 'son idénticas', 'no se tocan', 'tienen las mismas bases en el mismo orden'], c: 0, h: 'Fíjate en los extremos de cada cadena.', s: 'Están orientadas en sentidos opuestos.' },
    { q: 'Un nucleótido está formado por...', o: ['una pentosa, una base nitrogenada y un grupo fosfato', 'un aminoácido y una base', 'glicerina y ácidos grasos', 'dos pentosas'], c: 0, h: 'Un nucleósido + fosfato.', s: 'Pentosa + base nitrogenada + ácido fosfórico.' },
  ]),
  bankGenerator('bio-celula', 'La célula y sus orgánulos', [
    { q: '¿Qué orgánulo es el responsable de la respiración celular?', o: ['La mitocondria', 'El ribosoma', 'El aparato de Golgi', 'El lisosoma'], c: 0, h: 'Es "la central energética" de la célula.', s: 'En la mitocondria tienen lugar el ciclo de Krebs y la cadena respiratoria.' },
    { q: '¿Cuál de estas estructuras tienen TANTO procariotas como eucariotas?', o: ['Ribosomas', 'Núcleo', 'Mitocondrias', 'Retículo endoplasmático'], c: 0, h: 'Todas las células sintetizan proteínas.', s: 'Los ribosomas (70S en procariotas y 80S en eucariotas).' },
    { q: 'La teoría endosimbiótica explica el origen de...', o: ['mitocondrias y cloroplastos', 'el núcleo', 'la membrana plasmática', 'los ribosomas citoplasmáticos'], c: 0, h: 'Estos orgánulos tienen ADN propio y ribosomas 70S.', s: 'Proceden de bacterias que fueron englobadas por una célula ancestral.' },
    { q: '¿Qué orgánulo modifica, empaqueta y distribuye proteínas?', o: ['El aparato de Golgi', 'La vacuola', 'El centrosoma', 'El peroxisoma'], c: 0, h: 'Recibe vesículas del retículo endoplasmático rugoso.', s: 'El aparato de Golgi.' },
    { q: '¿Qué estructura es exclusiva de las células vegetales (frente a las animales)?', o: ['La pared de celulosa', 'La membrana plasmática', 'El ribosoma', 'La mitocondria'], c: 0, h: 'Da rigidez a la célula.', s: 'La pared celular de celulosa (además de los cloroplastos).' },
  ]),
  bankGenerator('bio-membrana', 'Membrana y transporte', [
    { q: 'El modelo actual de la membrana plasmática es el de...', o: ['mosaico fluido', 'bicapa rígida', 'pared celular', 'doble hélice'], c: 0, h: 'Los lípidos y las proteínas se pueden desplazar lateralmente.', s: 'Modelo de mosaico fluido (Singer y Nicolson).' },
    { q: 'La bomba de sodio-potasio es un ejemplo de transporte...', o: ['activo, con gasto de ATP', 'pasivo por difusión simple', 'pasivo facilitado', 'por endocitosis'], c: 0, h: 'Mueve iones en contra de su gradiente.', s: 'Saca 3 Na⁺ y mete 2 K⁺ con gasto de ATP.' },
    { q: 'La entrada de partículas sólidas grandes en una célula se llama...', o: ['fagocitosis', 'pinocitosis', 'exocitosis', 'ósmosis'], c: 0, h: '"Fago" significa comer.', s: 'La fagocitosis es un tipo de endocitosis.' },
    { q: 'El oxígeno atraviesa la membrana por...', o: ['difusión simple', 'transporte activo', 'canales iónicos', 'exocitosis'], c: 0, h: 'Es una molécula pequeña y apolar.', s: 'Difusión simple a través de la bicapa, a favor de gradiente.' },
  ]),
  bankGenerator('bio-division', 'Ciclo celular, mitosis y meiosis', [
    { q: '¿En qué fase del ciclo celular se replica el ADN?', o: ['Fase S de la interfase', 'Profase', 'Anafase', 'Telofase'], c: 0, h: 'S de "síntesis".', s: 'Durante la fase S de la interfase.' },
    { q: 'La meiosis produce...', o: ['cuatro células haploides genéticamente distintas', 'dos células diploides idénticas', 'cuatro células diploides', 'dos células haploides idénticas'], c: 0, h: 'Es la división que origina los gametos.', s: 'Cuatro células haploides (n) distintas, gracias al sobrecruzamiento y al reparto al azar de los cromosomas.' },
    { q: 'El sobrecruzamiento (crossing-over) ocurre en...', o: ['la profase I de la meiosis', 'la anafase de la mitosis', 'la interfase', 'la telofase II'], c: 0, h: 'Ocurre cuando los cromosomas homólogos están emparejados.', s: 'En la profase I, al formarse las tétradas.' },
    { q: 'En la anafase de la mitosis...', o: ['se separan las cromátidas hermanas hacia polos opuestos', 'se forma la placa metafásica', 'se replica el ADN', 'se separan los cromosomas homólogos'], c: 0, h: 'Los microtúbulos del huso "tiran" de los centrómeros.', s: 'Se separan las cromátidas hermanas.' },
  ]),
  bankGenerator('bio-catabolismo', 'Catabolismo', [
    { q: '¿Dónde tiene lugar la glucólisis?', o: ['En el citosol', 'En la matriz mitocondrial', 'En el tilacoide', 'En el núcleo'], c: 0, h: 'Es la primera etapa y la comparten todas las células.', s: 'En el citosol (hialoplasma).' },
    { q: 'El aceptor final de electrones en la respiración aerobia es...', o: ['el oxígeno', 'el NAD⁺', 'el piruvato', 'el CO₂'], c: 0, h: 'Al aceptarlos se forma agua.', s: 'El O₂, que se reduce a H₂O.' },
    { q: 'La fermentación láctica produce, por cada glucosa...', o: ['2 ATP', '36-38 ATP', '0 ATP', '10 ATP'], c: 0, h: 'Solo se obtiene ATP en la glucólisis.', s: '2 ATP netos, procedentes de la glucólisis.' },
    { q: 'El ciclo de Krebs tiene lugar en...', o: ['la matriz mitocondrial', 'el citosol', 'la membrana plasmática', 'el estroma del cloroplasto'], c: 0, h: 'Dentro de la mitocondria.', s: 'En la matriz mitocondrial.' },
  ]),
  bankGenerator('bio-fotosintesis', 'Anabolismo y fotosíntesis', [
    { q: 'En la fase luminosa de la fotosíntesis se produce...', o: ['ATP, NADPH y O₂', 'glucosa', 'CO₂', 'piruvato'], c: 0, h: 'Ocurre en los tilacoides y necesita luz.', s: 'Fotólisis del agua (O₂), y síntesis de ATP y NADPH.' },
    { q: 'El ciclo de Calvin tiene lugar en...', o: ['el estroma del cloroplasto', 'los tilacoides', 'la mitocondria', 'el citosol'], c: 0, h: 'Es la fase "oscura" o biosintética.', s: 'En el estroma, donde se fija el CO₂.' },
    { q: 'La enzima que fija el CO₂ en el ciclo de Calvin es...', o: ['la RuBisCO', 'la ATP sintasa', 'la ADN polimerasa', 'la amilasa'], c: 0, h: 'Es la proteína más abundante de la Tierra.', s: 'La ribulosa-1,5-bisfosfato carboxilasa/oxigenasa (RuBisCO).' },
    { q: 'El oxígeno que liberan las plantas procede...', o: ['del agua', 'del CO₂', 'de la glucosa', 'del suelo'], c: 0, h: 'Fotólisis.', s: 'De la fotólisis del agua en la fase luminosa.' },
  ]),
  bankGenerator('bio-expresion', 'Replicación y expresión génica', [
    { q: 'La replicación del ADN es semiconservativa porque...', o: ['cada molécula hija tiene una cadena antigua y una nueva', 'se conserva la mitad de las bases', 'solo se copia una cadena', 'las dos cadenas hijas son nuevas'], c: 0, h: 'Lo demostraron Meselson y Stahl.', s: 'Cada doble hélice nueva conserva una de las cadenas originales.' },
    { q: 'La transcripción consiste en...', o: ['sintetizar ARN a partir de ADN', 'sintetizar proteínas a partir de ARN', 'copiar ADN a partir de ADN', 'sintetizar ADN a partir de ARN'], c: 0, h: 'La realiza la ARN polimerasa.', s: 'Se copia un gen de ADN en una molécula de ARN.' },
    { q: 'Un codón es...', o: ['un triplete de bases del ARNm que codifica un aminoácido', 'una proteína', 'un gen completo', 'un tipo de ribosoma'], c: 0, h: 'El código genético se lee de tres en tres.', s: 'Tres nucleótidos del ARNm; el anticodón está en el ARNt.' },
    { q: 'Que el código genético sea "degenerado" significa que...', o: ['varios codones codifican el mismo aminoácido', 'cambia de una especie a otra', 'tiene errores', 'cada codón codifica varios aminoácidos'], c: 0, h: 'Hay 64 codones y solo 20 aminoácidos.', s: 'Un mismo aminoácido puede estar codificado por varios codones.' },
    { q: 'La traducción tiene lugar en...', o: ['los ribosomas', 'el núcleo', 'el aparato de Golgi', 'los lisosomas'], c: 0, h: 'Allí se unen los aminoácidos.', s: 'En los ribosomas, libres o en el retículo endoplasmático rugoso.' },
  ]),
  bankGenerator('bio-mutaciones', 'Mutaciones y evolución', [
    { q: 'Una mutación que cambia una base por otra se llama...', o: ['sustitución (mutación puntual)', 'deleción cromosómica', 'poliploidía', 'translocación'], c: 0, h: 'Afecta a un solo nucleótido.', s: 'Es una mutación génica o puntual por sustitución.' },
    { q: 'El síndrome de Down es un ejemplo de mutación...', o: ['genómica (trisomía del 21)', 'génica', 'cromosómica estructural', 'puntual silenciosa'], c: 0, h: 'Cambia el número de cromosomas.', s: 'Aneuploidía: tres copias del cromosoma 21.' },
    { q: 'Una mutación silenciosa es aquella que...', o: ['no cambia el aminoácido codificado', 'provoca cáncer', 'elimina un cromosoma', 'cambia muchos aminoácidos'], c: 0, h: 'Relaciónalo con la degeneración del código genético.', s: 'El nuevo codón codifica el mismo aminoácido.' },
    { q: 'Según el neodarwinismo, la fuente de la variabilidad sobre la que actúa la selección natural es...', o: ['la mutación y la recombinación genética', 'el uso y desuso de los órganos', 'la herencia de caracteres adquiridos', 'la voluntad del individuo'], c: 0, h: 'Integra la teoría de Darwin con la genética.', s: 'Mutaciones y recombinación generan variabilidad; la selección natural la filtra.' },
  ]),
  bankGenerator('bio-herencia', 'Herencia mendeliana', [
    { q: 'Un individuo heterocigoto es aquel que...', o: ['tiene dos alelos distintos para un gen', 'tiene dos alelos iguales', 'solo tiene un alelo', 'no expresa el gen'], c: 0, h: '"Hetero" significa distinto.', s: 'Tiene dos alelos diferentes (Aa).' },
    { q: 'Para saber si un individuo de fenotipo dominante es AA o Aa se hace un...', o: ['cruzamiento prueba con un homocigoto recesivo', 'cruce con otro dominante', 'análisis de sangre', 'cruce entre hermanos'], c: 0, h: 'El recesivo "deja ver" los alelos del otro progenitor.', s: 'Si aparece algún descendiente aa, el individuo era Aa.' },
    { q: 'La hemofilia es más frecuente en hombres porque...', o: ['está ligada al cromosoma X', 'es dominante', 'está en el cromosoma Y', 'depende del ambiente'], c: 0, h: 'Los hombres son XY.', s: 'Con un único X, un solo alelo recesivo basta para que la manifiesten.' },
    { q: 'En la herencia intermedia, el cruce de flores rojas (RR) y blancas (BB) da en la F1 flores...', o: ['rosas', 'rojas', 'blancas', 'mitad rojas y mitad blancas'], c: 0, h: 'Ningún alelo domina sobre el otro.', s: 'El heterocigoto RB muestra un fenotipo intermedio: rosa.' },
  ]),
  bankGenerator('bio-microbiologia', 'Microbiología y biotecnología', [
    { q: 'Los virus se consideran formas acelulares porque...', o: ['no tienen estructura celular ni metabolismo propio', 'son procariotas', 'tienen pared de celulosa', 'son hongos'], c: 0, h: 'Necesitan una célula hospedadora para replicarse.', s: 'Son parásitos obligados formados por ácido nucleico y una cápsida.' },
    { q: 'En la tecnología del ADN recombinante, las enzimas de restricción sirven para...', o: ['cortar el ADN en secuencias concretas', 'unir fragmentos de ADN', 'copiar ARN en ADN', 'traducir proteínas'], c: 0, h: 'Son "tijeras moleculares".', s: 'Cortan en secuencias específicas; la ADN ligasa une los fragmentos.' },
    { q: 'La PCR permite...', o: ['amplificar millones de copias de un fragmento de ADN', 'secuenciar proteínas', 'cultivar bacterias', 'eliminar virus'], c: 0, h: 'Reacción en cadena de la polimerasa.', s: 'Ciclos de desnaturalización, hibridación y extensión que multiplican el ADN.' },
    { q: '¿Qué microorganismo se usa para fabricar pan y cerveza?', o: ['Levaduras (Saccharomyces)', 'Virus', 'Bacterias del género Rhizobium', 'Protozoos'], c: 0, h: 'Realizan fermentación alcohólica.', s: 'La levadura Saccharomyces cerevisiae.' },
  ]),
  bankGenerator('bio-inmuno', 'Inmunología', [
    { q: 'Los anticuerpos son producidos por...', o: ['las células plasmáticas (linfocitos B)', 'los linfocitos T citotóxicos', 'los eritrocitos', 'las plaquetas'], c: 0, h: 'Son parte de la respuesta humoral.', s: 'Los linfocitos B activados se transforman en células plasmáticas.' },
    { q: 'Una vacuna proporciona inmunidad...', o: ['activa artificial', 'pasiva natural', 'pasiva artificial', 'innata'], c: 0, h: 'Es el propio organismo el que fabrica los anticuerpos.', s: 'Se estimula la respuesta y se generan células de memoria.' },
    { q: 'La respuesta secundaria es más rápida e intensa porque...', o: ['existen células de memoria', 'el antígeno es distinto', 'hay más glóbulos rojos', 'los anticuerpos duran siempre'], c: 0, h: 'El sistema inmunitario "recuerda".', s: 'Las células de memoria de la primera exposición responden enseguida.' },
    { q: 'Una alergia es...', o: ['una respuesta inmunitaria exagerada frente a un antígeno inofensivo', 'una inmunodeficiencia', 'una enfermedad autoinmune', 'una vacuna'], c: 0, h: 'Interviene la IgE y la liberación de histamina.', s: 'Es una hipersensibilidad frente a un alérgeno.' },
  ]),
];
