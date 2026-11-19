/**
 * markdown.js — Convierte el texto del contenido (Markdown sencillo + fórmulas
 * LaTeX) en HTML seguro.
 *
 * Soporta: párrafos, listas (- y 1.), **negrita**, *cursiva*, `código`,
 * fórmulas en línea $...$ y fórmulas destacadas $$...$$ (con KaTeX).
 *
 * SEGURIDAD (XSS): todo el texto se ESCAPA antes de convertirlo en HTML,
 * así que aunque alguien escribiera <script> en un YAML, se mostraría como
 * texto y no se ejecutaría. Solo se genera el HTML que este archivo controla.
 */

import katex from '../../vendor/katex/katex.mjs';

/** Escapa los caracteres con significado especial en HTML. */
export function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Fórmula LaTeX -> HTML. Si la fórmula tiene un error, se muestra en rojo en vez de romper la página. */
export function renderMath(tex, display = false) {
  return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: 'ignore' });
}

const MATH_DISPLAY = /\$\$([\s\S]+?)\$\$/g;
const MATH_INLINE = /\$([^$\n]+?)\$/g;

/** Lista de fórmulas de un texto (la usa el validador de contenido). */
export function extractMath(text) {
  const out = [];
  const rest = String(text ?? '').replace(MATH_DISPLAY, (_, tex) => {
    out.push({ tex, display: true });
    return ' ';
  });
  rest.replace(MATH_INLINE, (_, tex) => {
    out.push({ tex, display: false });
    return ' ';
  });
  return out;
}

/** Formato en línea: negrita, cursiva y código (sobre texto YA escapado). */
function inline(html) {
  return html
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(¡¿])\*([^*\s](?:[^*]*[^*\s])?)\*(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>');
}

/**
 * Markdown -> HTML.
 * Paso 1: se sacan las fórmulas y se sustituyen por marcas (así los * de una
 *         fórmula no se confunden con negritas).
 * Paso 2: se escapa el texto y se interpretan párrafos, listas y formato.
 * Paso 3: se devuelven las fórmulas a su sitio, ya renderizadas con KaTeX.
 */
export function renderMarkdown(text) {
  const formulas = [];
  const token = (i) => `\u0000${i}\u0000`;
  let src = String(text ?? '')
    .replace(MATH_DISPLAY, (_, tex) => token(formulas.push(renderMath(tex.trim(), true)) - 1))
    .replace(MATH_INLINE, (_, tex) => token(formulas.push(renderMath(tex.trim(), false)) - 1));

  src = escapeHtml(src);
  const html = src.split(/\n\s*\n/).map(renderBlock).join('');
  return html.replace(/\u0000(\d+)\u0000/g, (_, i) => formulas[Number(i)]);
}

const UL = /^\s*[-*] /;
const OL = /^\s*\d+\. /;

/**
 * Un bloque (texto entre líneas en blanco) puede mezclar texto y listas.
 * Lo recorremos línea a línea agrupando "tramos" del mismo tipo.
 */
function renderBlock(block) {
  const lines = block.split('\n').map((l) => l.trimEnd()).filter((l) => l.trim() !== '');
  const runs = []; // [{ type: 'p' | 'ul' | 'ol', items: [] }]
  for (const line of lines) {
    const type = UL.test(line) ? 'ul' : OL.test(line) ? 'ol' : 'p';
    const last = runs[runs.length - 1];
    const isContinuation = type === 'p' && /^\s{2,}/.test(line) && last && last.type !== 'p';
    if (isContinuation) {
      last.items[last.items.length - 1] += ' ' + line.trim();
    } else if (last && last.type === type && type === 'p') {
      last.items[0] += ' ' + line.trim();
    } else if (last && last.type === type) {
      last.items.push(line.replace(type === 'ul' ? UL : OL, ''));
    } else {
      runs.push({ type, items: [type === 'p' ? line.trim() : line.replace(type === 'ul' ? UL : OL, '')] });
    }
  }
  return runs.map((run) => {
    if (run.type !== 'p') return `<${run.type}>${run.items.map((it) => `<li>${inline(it)}</li>`).join('')}</${run.type}>`;
    const text = run.items[0];
    // Una fórmula destacada sola no va dentro de <p>.
    if (/^\u0000\d+\u0000$/.test(text)) return `<div class="math-block">${text}</div>`;
    return `<p>${inline(text)}</p>`;
  }).join('');
}

/** Atajo para fórmulas o textos cortos en una sola línea (sin <p>). */
export function renderInline(text) {
  const html = renderMarkdown(text);
  return html.startsWith('<p>') && html.endsWith('</p>') && html.indexOf('<p>', 1) === -1 ? html.slice(3, -4) : html;
}
