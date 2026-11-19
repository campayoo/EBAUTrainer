/**
 * ics.js — Exportar el planning a un calendario (.ics).
 *
 * El formato iCalendar (RFC 5545) es texto plano que entienden Google Calendar,
 * Outlook y el calendario del móvil. No hace falta ninguna librería:
 *   BEGIN:VCALENDAR
 *   BEGIN:VEVENT ... END:VEVENT   (un bloque por sesión)
 *   END:VCALENDAR
 * Las horas se escriben "flotantes" (sin zona horaria): el calendario las
 * interpreta en la hora local del usuario, que es lo que queremos.
 */

/** Escapa los caracteres especiales del formato (\ ; , y saltos de línea). */
export function escapeText(text) {
  return String(text).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/**
 * Las líneas no deben superar 75 BYTES (no caracteres: "á" ocupa 2 bytes en
 * UTF-8). Las largas se "pliegan": salto de línea + un espacio.
 */
export function foldLine(line) {
  const bytes = (ch) => new TextEncoder().encode(ch).length;
  const parts = [];
  let current = '';
  let size = 0;
  for (const ch of line) {
    const b = bytes(ch);
    if (size + b > 75) {
      parts.push(current);
      current = ' ';
      size = 1;
    }
    current += ch;
    size += b;
  }
  parts.push(current);
  return parts.join('\r\n');
}

const compactDate = (iso) => iso.replace(/-/g, '');
const pad = (n) => String(n).padStart(2, '0');

/** Suma minutos a "HH:MM" y devuelve "HHMMSS" (no cruza medianoche: se limita a 23:59). */
function addMinutes(hhmm, minutes) {
  const [h, m] = hhmm.split(':').map(Number);
  const total = Math.min(h * 60 + m + minutes, 23 * 60 + 59);
  return `${pad(Math.floor(total / 60))}${pad(total % 60)}00`;
}

/**
 * Genera el contenido del archivo .ics.
 * @param sessions   sesiones del plan
 * @param describe   función (sesión) -> { title, description }
 * @param startTime  hora a la que el alumno suele empezar a estudiar ("17:00")
 * @param now        fecha de generación (para DTSTAMP)
 */
export function buildICS(sessions, describe, { startTime = '17:00', now = new Date() } = {}) {
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Pauta//Profesor virtual PAU//ES', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:Pauta - Planning de estudio'];
  const offsetByDay = new Map(); // minutos ya ocupados cada día, para encadenar sesiones
  for (const s of sessions) {
    const used = offsetByDay.get(s.date) ?? 0;
    offsetByDay.set(s.date, used + s.minutes);
    const { title, description } = describe(s);
    lines.push(
      'BEGIN:VEVENT',
      `UID:${escapeText(s.id)}@pauta`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${compactDate(s.date)}T${addMinutes(startTime, used)}`,
      `DTEND:${compactDate(s.date)}T${addMinutes(startTime, used + s.minutes)}`,
      foldLine(`SUMMARY:${escapeText(title)}`),
      foldLine(`DESCRIPTION:${escapeText(description)}`),
      'END:VEVENT',
    );
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}
