/**
 * grading.js — Corrección automática de respuestas.
 *
 * Responsabilidades:
 *   1. Entender lo que escribe el alumno: "8,69 N/kg", "6.67e-11", "6,67·10^-11", "3/4"...
 *   2. Comparar con la respuesta correcta usando una TOLERANCIA (en física
 *      nunca se exige el valor exacto: 8,688 y 8,69 son la misma respuesta).
 *   3. Comprobar las UNIDADES y convertirlas (12 km/s = 12000 m/s).
 *   4. Si falla, intentar explicar el error más probable.
 *
 * Todo es lógica pura: entra texto, sale un objeto con el resultado.
 */

/* ------------------------------------------------------------------ */
/* 1. Tabla de unidades                                                */
/* ------------------------------------------------------------------ */

/**
 * Cada fila: [dimensión, factor para pasar a la unidad del SI, ...alias].
 * Dos unidades son compatibles si tienen la misma "dimensión".
 * Los alias se escriben en minúsculas y sin espacios (ver normalizeUnit).
 */
const UNIT_TABLE = [
  ['longitud', 1, 'm', 'metros', 'metro'],
  ['longitud', 1e3, 'km'],
  ['longitud', 1e-2, 'cm'],
  ['longitud', 1e-3, 'mm'],
  ['longitud', 1e-6, 'um', 'μm', 'µm'],
  ['longitud', 1e-9, 'nm'],
  ['longitud', 1e-12, 'pm'],
  ['tiempo', 1, 's', 'seg', 'segundos'],
  ['tiempo', 1e-3, 'ms'],
  ['tiempo', 60, 'min', 'minutos'],
  ['tiempo', 3600, 'h', 'horas'],
  ['tiempo', 86400, 'dias', 'días', 'dia', 'día'],
  ['tiempo', 31557600, 'años', 'anos', 'año', 'a'],
  ['masa', 1, 'kg'],
  ['masa', 1e-3, 'g'],
  ['velocidad', 1, 'm/s', 'm*s^-1'],
  ['velocidad', 1e3, 'km/s'],
  ['velocidad', 1 / 3.6, 'km/h'],
  ['aceleracion', 1, 'm/s^2', 'm*s^-2', 'n/kg'],
  ['fuerza', 1, 'n', 'newton', 'newtons'],
  ['fuerza', 1e3, 'kn'],
  ['energia', 1, 'j', 'julios', 'julio'],
  ['energia', 1e3, 'kj'],
  ['energia', 1.602e-19, 'ev'],
  ['energia', 1.602e-16, 'kev'],
  ['energia', 1.602e-13, 'mev'], // ojo: "mev" se interpreta como MeV (megaelectronvoltio)
  ['energia', 1.602e-10, 'gev'],
  ['potencia', 1, 'w', 'vatios'],
  ['potencia', 1e3, 'kw'],
  ['carga', 1, 'c', 'culombios'],
  ['carga', 1e-6, 'uc', 'μc', 'µc'],
  ['carga', 1e-9, 'nc'],
  ['campo_electrico', 1, 'n/c', 'v/m'],
  ['flujo_electrico', 1, 'n*m^2/c', 'nm^2/c', 'v*m', 'vm'],
  ['fuerza_por_longitud', 1, 'n/m'],
  ['potencial_electrico', 1, 'v', 'voltios'],
  ['potencial_electrico', 1e3, 'kv'],
  ['potencial_grav', 1, 'j/kg', 'm^2/s^2', 'm^2*s^-2'],
  ['campo_magnetico', 1, 't', 'teslas', 'tesla'],
  ['campo_magnetico', 1e-3, 'mt'],
  ['campo_magnetico', 1e-6, 'ut', 'μt', 'µt'],
  ['flujo_magnetico', 1, 'wb', 't*m^2'],
  ['frecuencia', 1, 'hz', 's^-1', '1/s'],
  ['frecuencia', 1e3, 'khz'],
  ['frecuencia', 1e6, 'mhz'],
  ['intensidad_onda', 1, 'w/m^2', 'w*m^-2'],
  ['nivel_sonoro', 1, 'db', 'decibelios'],
  ['angulo', 1, 'º', '°', 'grados', 'deg'],
  ['angulo', 180 / Math.PI, 'rad'],
  ['potencia_optica', 1, 'dioptrias', 'dioptrías', 'dp'],
  ['area', 1, 'm^2', 'u^2', 'u2'],
  ['volumen', 1, 'm^3', 'u^3', 'u3'],
  ['cantidad', 1, 'u', 'unidades'],
];

/** Índice: alias -> { dim, factor }. Se construye una sola vez. */
const UNIT_INDEX = new Map();
for (const [dim, factor, ...aliases] of UNIT_TABLE) {
  for (const alias of aliases) UNIT_INDEX.set(alias, { dim, factor });
}

/** Normaliza cómo se escribe una unidad: "m·s⁻²" -> "m*s^-2", "N / kg" -> "n/kg". */
export function normalizeUnit(raw) {
  return String(raw ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁻¹/g, '^-1')
    .replace(/⁻²/g, '^-2')
    .replace(/[·⋅]/g, '*')
    .replace(/\.$/, '');
}

/** Busca una unidad. Devuelve { dim, factor } o null si no la conocemos. */
export function lookupUnit(raw) {
  return UNIT_INDEX.get(normalizeUnit(raw)) ?? null;
}

/* ------------------------------------------------------------------ */
/* 2. Interpretar el número que escribe el alumno                      */
/* ------------------------------------------------------------------ */

const SUPERSCRIPTS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' };

/**
 * Convierte el texto del alumno en { value, unit } o { error }.
 * Acepta coma o punto decimal, notación científica (e, ·10^, x10^, ×10^),
 * superíndices (10⁻¹¹), fracciones (3/4) y una unidad opcional al final.
 */
export function parseAnswer(input) {
  let text = String(input ?? '').trim();
  if (text === '') return { error: 'Escribe una respuesta.' };

  // 10⁻¹¹  ->  10^-11
  text = text.replace(/10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+)/g, (_, sup) => '10^' + [...sup].map((c) => SUPERSCRIPTS[c]).join(''));
  text = text.replace(/[−–]/g, '-'); // signos menos "tipográficos"

  // Fracción al principio: "-3/4 ..." (solo si hay dígitos a ambos lados de la barra)
  const frac = text.match(/^([+-]?\d+)\s*\/\s*(\d+)(?![\d.,])\s*(.*)$/);
  if (frac) {
    const den = Number(frac[2]);
    if (den === 0) return { error: 'No se puede dividir entre 0.' };
    return { value: Number(frac[1]) / den, unit: frac[3].trim() };
  }

  // Número con exponente opcional.
  const num = text.match(
    /^([+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+))\s*(?:(?:[eE]([+-]?\d+))|(?:[·*x×⋅]\s*10\s*\^\s*\(?\s*([+-]?\d+)\s*\)?))?\s*(.*)$/,
  );
  if (!num) return { error: 'No entiendo el número. Prueba con algo como 8,69 o 6,67·10^-11.' };

  const mantissa = Number(num[1].replace(',', '.'));
  const exponent = Number(num[2] ?? num[3] ?? 0);
  const value = mantissa * 10 ** exponent;
  if (!Number.isFinite(value)) return { error: 'El número es demasiado grande.' };
  return { value, unit: num[4].trim() };
}

/* ------------------------------------------------------------------ */
/* 3. Corrección                                                        */
/* ------------------------------------------------------------------ */

/** ¿Está `got` dentro de la tolerancia alrededor de `expected`? */
export function withinTolerance(got, expected, tolerance = {}) {
  if (tolerance.absolute !== undefined) return Math.abs(got - expected) <= tolerance.absolute + 1e-12;
  const rel = tolerance.relative ?? 0.02; // 2 % por defecto
  if (expected === 0) return Math.abs(got) <= 1e-9;
  return Math.abs(got - expected) <= rel * Math.abs(expected);
}

/**
 * Corrige una respuesta numérica.
 * @param spec  { value, unit?, tolerance?, commonErrors?: [{ value, message }] }
 * @param input texto escrito por el alumno
 * @returns { correct, score (0-1), status, message }
 */
export function gradeNumeric(spec, input) {
  const parsed = parseAnswer(input);
  if (parsed.error) return { correct: false, score: 0, status: 'invalid', message: parsed.error };

  let got = parsed.value;
  let expected = spec.value;
  let missingUnit = false;

  if (spec.unit) {
    const expUnit = lookupUnit(spec.unit);
    if (parsed.unit === '') {
      missingUnit = true; // asumimos que usa la misma unidad que la solución
    } else {
      const gotUnit = lookupUnit(parsed.unit);
      if (!gotUnit) {
        return { correct: false, score: 0, status: 'invalid', message: `No reconozco la unidad «${parsed.unit}». Usa, por ejemplo, ${spec.unit}.` };
      }
      if (expUnit && gotUnit.dim !== expUnit.dim) {
        return { correct: false, score: 0, status: 'wrong-unit', message: `Esa unidad no mide lo que se pide. Aquí la respuesta va en ${spec.unit} o equivalente.` };
      }
      if (expUnit) {
        // Pasamos ambos valores al SI para compararlos.
        got *= gotUnit.factor;
        expected *= expUnit.factor;
      }
    }
  }

  if (withinTolerance(got, expected, spec.tolerance)) {
    if (missingUnit) {
      return { correct: true, score: 0.75, status: 'missing-unit', message: `¡El número es correcto! Pero falta la unidad (${spec.unit}). En la PAU te restarían puntos.` };
    }
    return { correct: true, score: 1, status: 'correct', message: '¡Correcto!' };
  }

  return { correct: false, score: 0, status: 'incorrect', message: diagnose(spec, got, expected) };
}

/** Intenta adivinar el error más probable para dar una pista útil. */
export function diagnose(spec, got, expected) {
  const factor = spec.unit && lookupUnit(spec.unit) ? lookupUnit(spec.unit).factor : 1;
  // a) errores típicos que el autor del ejercicio ya previó
  for (const err of spec.commonErrors ?? []) {
    if (withinTolerance(got, err.value * factor, { relative: 0.02 })) return err.message;
  }
  // b) signo cambiado
  if (expected !== 0 && withinTolerance(-got, expected, spec.tolerance)) {
    return 'El valor absoluto es correcto, pero el signo no. Revisa el sentido o el criterio de signos.';
  }
  // c) error de potencias de 10 (p. ej., olvidar pasar km a m)
  if (got !== 0 && expected !== 0 && Math.sign(got) === Math.sign(expected)) {
    const ratio = Math.log10(Math.abs(got / expected));
    if (Math.abs(ratio) >= 0.9 && Math.abs(ratio - Math.round(ratio)) < 0.02) {
      return `Tu resultado se diferencia en un factor 10^${Math.round(ratio)}. Revisa las potencias de 10 y el paso de unidades (km → m, etc.).`;
    }
    if (withinTolerance(got, expected * 4, { relative: 0.02 }) || withinTolerance(got, expected / 4, { relative: 0.02 })) {
      return 'Te sale el cuádruple o la cuarta parte. ¿Has elevado al cuadrado lo que tocaba (por ejemplo, la distancia en $1/r^2$)?';
    }
    if (withinTolerance(got, expected * 2, { relative: 0.02 }) || withinTolerance(got, expected / 2, { relative: 0.02 })) {
      return 'Te sale el doble o la mitad. Revisa si te falta o sobra un factor 2 (por ejemplo, un ½ en la energía cinética).';
    }
  }
  return 'No es correcto. Revisa el planteamiento paso a paso o pide una pista.';
}

/** Corrige una pregunta tipo test. */
export function gradeChoice(spec, chosenIndex) {
  const correct = chosenIndex === spec.correct;
  const explanation = spec.options?.[chosenIndex]?.why;
  return {
    correct,
    score: correct ? 1 : 0,
    status: correct ? 'correct' : 'incorrect',
    message: correct ? '¡Correcto!' : explanation || 'No es la opción correcta.',
  };
}

/** Punto de entrada único: decide el tipo de corrección según el ejercicio. */
export function grade(answerSpec, input) {
  if (answerSpec.kind === 'choice') return gradeChoice(answerSpec, input);
  return gradeNumeric(answerSpec, input);
}

/* ------------------------------------------------------------------ */
/* 4. Formatear números "a la española"                                */
/* ------------------------------------------------------------------ */

/** Devuelve { mantissa, exponent } con `sig` cifras significativas. */
function splitScientific(x, sig) {
  const [m, e] = x.toExponential(sig - 1).split('e');
  return { mantissa: m.replace('.', ','), exponent: Number(e) };
}

/** Número en LaTeX: 8{,}69  ó  6{,}67\cdot 10^{-11}. */
export function texNumber(x, sig = 3) {
  if (!Number.isFinite(x)) return '\\text{?}';
  if (Number.isInteger(x) && Math.abs(x) < 1e6) return String(x);
  const abs = Math.abs(x);
  if (abs >= 1e-3 && abs < 1e5) {
    return Number(x.toPrecision(sig)).toString().replace('.', '{,}');
  }
  const { mantissa, exponent } = splitScientific(x, sig);
  return `${mantissa.replace(',', '{,}')}\\cdot 10^{${exponent}}`;
}

/** Número en texto plano: 8,69  ó  6,67·10^-11. */
export function plainNumber(x, sig = 3) {
  if (!Number.isFinite(x)) return '?';
  if (Number.isInteger(x) && Math.abs(x) < 1e6) return String(x);
  const abs = Math.abs(x);
  if (abs >= 1e-3 && abs < 1e5) return Number(x.toPrecision(sig)).toString().replace('.', ',');
  const { mantissa, exponent } = splitScientific(x, sig);
  return `${mantissa}·10^${exponent}`;
}
