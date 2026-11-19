/**
 * dates.js — Utilidades de fechas.
 *
 * En toda la app las fechas se guardan como texto "AAAA-MM-DD" (formato ISO).
 * ¿Por qué texto y no objetos Date?
 *   - Se guardan y comparan fácilmente ("2026-11-18" < "2026-12-01" funciona
 *     comparando cadenas, igual que en SQL).
 *   - Evitamos los problemas de zona horaria y del cambio de hora (DST):
 *     internamente operamos siempre en UTC, donde todos los días duran 24 h.
 *
 * Todas las funciones son "puras": no leen el reloj del sistema salvo todayISO().
 */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Nombres de los días, empezando en domingo (igual que Date.getUTCDay()). */
export const WEEKDAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
export const WEEKDAY_SHORT = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
  'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** Convierte "AAAA-MM-DD" en milisegundos UTC (medianoche). */
function toUTC(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Convierte milisegundos UTC en "AAAA-MM-DD". */
function fromUTC(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

/** Comprueba que un texto tiene formato de fecha ISO válido. */
export function isISODate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return fromUTC(toUTC(value)) === value; // descarta fechas imposibles como 2026-02-31
}

/** Fecha de hoy según el reloj LOCAL del usuario (no UTC). */
export function todayISO(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Suma (o resta, si n < 0) días a una fecha. */
export function addDays(iso, n) {
  return fromUTC(toUTC(iso) + n * MS_PER_DAY);
}

/** Días que van de a hasta b (b - a). Puede ser negativo. */
export function diffDays(a, b) {
  return Math.round((toUTC(b) - toUTC(a)) / MS_PER_DAY);
}

/** Día de la semana: 0 = domingo ... 6 = sábado. */
export function weekday(iso) {
  return new Date(toUTC(iso)).getUTCDay();
}

/** Lunes de la semana a la que pertenece la fecha (en España la semana empieza en lunes). */
export function startOfWeek(iso) {
  const wd = weekday(iso);
  const offset = wd === 0 ? -6 : 1 - wd; // domingo -> retrocede 6 días
  return addDays(iso, offset);
}

/** Lista de fechas desde `from` (incluida) hasta `to` (excluida). */
export function rangeDays(from, to) {
  const out = [];
  for (let d = from; d < to; d = addDays(d, 1)) out.push(d);
  return out;
}

/** "miércoles, 18 de noviembre" */
export function formatLong(iso) {
  const [, m, d] = iso.split('-').map(Number);
  return `${WEEKDAY_NAMES[weekday(iso)].toLowerCase()}, ${d} de ${MONTHS[m - 1]}`;
}

/** "18 nov" */
export function formatShort(iso) {
  const [, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1].slice(0, 3)}`;
}

/**
 * Fecha de examen por defecto: el primer martes de junio siguiente.
 * Es solo una ESTIMACIÓN para no dejar el campo vacío; el alumno debe
 * cambiarla cuando se publiquen las fechas oficiales.
 */
export function defaultExamDate(today) {
  const year = Number(today.slice(0, 4));
  const target = today.slice(5) > '05-15' ? year + 1 : year;
  let d = `${target}-06-01`;
  while (weekday(d) !== 2) d = addDays(d, 1);
  return d;
}
