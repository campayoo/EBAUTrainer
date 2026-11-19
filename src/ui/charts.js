/**
 * charts.js — Gráficas SVG dibujadas a mano (sin librerías).
 *
 * Un SVG es un dibujo vectorial descrito con texto: líneas, rectángulos...
 * Calculamos las coordenadas con una "escala" lineal: valor -> píxel.
 */

import { html, raw } from './html.js';
import { escapeHtml } from './markdown.js';

const W = 560;
const H = 200;
const PAD = { top: 16, right: 12, bottom: 28, left: 36 };

/** Escala lineal: transforma el intervalo [d0, d1] en [r0, r1]. */
const scale = (d0, d1, r0, r1) => (v) => (d1 === d0 ? (r0 + r1) / 2 : r0 + ((v - d0) / (d1 - d0)) * (r1 - r0));

/** Líneas horizontales de referencia con su etiqueta. */
function gridLines(y, max, steps, format) {
  let out = '';
  for (let i = 0; i <= steps; i++) {
    const v = (max / steps) * i;
    out += `<line x1="${PAD.left}" x2="${W - PAD.right}" y1="${y(v)}" y2="${y(v)}" class="grid"/>`;
    out += `<text x="${PAD.left - 6}" y="${y(v) + 4}" text-anchor="end" class="axis">${format(v)}</text>`;
  }
  return out;
}

/**
 * Gráfica de líneas.
 * @param points [{ label, value }]
 */
export function lineChart(points, { max = 1, format = (v) => `${Math.round(v * 100)}%`, title = 'Gráfica', color = 'var(--primary)' } = {}) {
  if (points.length === 0) return html`<p class="muted">Aún no hay datos.</p>`;
  const x = scale(0, Math.max(1, points.length - 1), PAD.left + 8, W - PAD.right - 8);
  const y = scale(0, max, H - PAD.bottom, PAD.top);
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const dots = points.map((p, i) => `<circle cx="${x(i)}" cy="${y(p.value)}" r="3.5" fill="${color}"><title>${escapeHtml(p.label)}: ${escapeHtml(format(p.value))}</title></circle>`).join('');
  const every = Math.ceil(points.length / 8);
  const labels = points.map((p, i) => (i % every === 0 ? `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" class="axis">${escapeHtml(p.label)}</text>` : '')).join('');
  return html`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">
    ${raw(gridLines(y, max, 4, format))}
    <path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>
    ${raw(dots)}${raw(labels)}
  </svg>`;
}

/**
 * Gráfica de barras.
 * @param bars [{ label, value }]
 */
export function barChart(bars, { format = (v) => String(Math.round(v)), title = 'Gráfica', color = 'var(--primary)' } = {}) {
  const max = Math.max(1, ...bars.map((b) => b.value)) * 1.1;
  const y = scale(0, max, H - PAD.bottom, PAD.top);
  const slot = (W - PAD.left - PAD.right) / bars.length;
  const width = Math.min(40, slot * 0.6);
  const rects = bars.map((b, i) => {
    const cx = PAD.left + slot * i + slot / 2;
    return `<rect x="${cx - width / 2}" y="${y(b.value)}" width="${width}" height="${Math.max(0, H - PAD.bottom - y(b.value))}" rx="4" fill="${color}"><title>${escapeHtml(b.label)}: ${escapeHtml(format(b.value))}</title></rect>
      <text x="${cx}" y="${H - 8}" text-anchor="middle" class="axis">${escapeHtml(b.label)}</text>`;
  }).join('');
  return html`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">
    ${raw(gridLines(y, max, 4, format))}${raw(rects)}
  </svg>`;
}
