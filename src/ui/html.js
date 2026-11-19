/**
 * html.js — Plantillas HTML seguras.
 *
 * Usamos "tagged templates" de JavaScript:
 *     html`<p>Hola, ${nombre}</p>`
 * La función html recibe los trozos fijos y los valores por separado, y
 * ESCAPA automáticamente cada valor. Así, si un alumno se llama
 * "<img onerror=...>", se muestra como texto y no se ejecuta nada (XSS).
 *
 * Cuando queremos insertar HTML que ya es seguro (por ejemplo, el que genera
 * renderMarkdown o otra plantilla html``), lo envolvemos con raw().
 */

import { escapeHtml } from './markdown.js';

/** Marca un texto como HTML de confianza (no se escapará). */
class SafeHtml {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

export const raw = (value) => new SafeHtml(String(value ?? ''));

/** Convierte cualquier valor en HTML seguro. */
function toHtml(value) {
  if (value === null || value === undefined || value === false) return '';
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(toHtml).join('');
  return escapeHtml(value);
}

/** La plantilla: une las partes fijas con los valores escapados. */
export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((v, i) => {
    out += toHtml(v) + strings[i + 1];
  });
  return new SafeHtml(out);
}

/** Atajo: aplica clases condicionales. cls('a', cond && 'b') -> "a b" */
export const cls = (...names) => names.filter(Boolean).join(' ');
