/**
 * Vista "Tutor IA": dudas puntuales respondidas por Claude (API de Anthropic).
 *
 * Es OPCIONAL: el profesor "base" de Pauta funciona sin IA, con contenido y
 * reglas preparadas. Para activarlo, el alumno pega SU PROPIA clave de API
 * en Ajustes. La clave:
 *   - se guarda solo en este navegador (localStorage), nunca en el repositorio;
 *   - viaja únicamente a api.anthropic.com.
 * Nunca debe incluirse una clave dentro del código publicado: cualquiera
 * podría leerla y gastar tu saldo.
 */

import { html, raw, cls } from '../ui/html.js';
import { icon } from '../ui/icons.js';
import { renderMarkdown } from '../ui/markdown.js';
import { teacherSays } from '../ui/components.js';
import { subjectNames, unitsById } from '../data/content.js';

const messages = []; // conversación (solo en memoria: no se guarda)
let busy = false;
let topic = '';

/** Instrucciones para el modelo: es un tutor que guía, no que resuelve. */
function systemPrompt(state) {
  const subjects = state.subjects.map((s) => subjectNames[s.id]).join(' y ');
  const unit = topic ? unitsById.get(topic)?.title : null;
  return [
    'Eres el tutor de Pauta, una app que prepara la PAU (antes EBAU) de 2.º de Bachillerato en la Comunitat Valenciana.',
    `El alumno estudia ${subjects || 'asignaturas de 2.º de Bachillerato'}.${unit ? ` Ahora está con la unidad «${unit}».` : ''}`,
    'Responde en castellano, con tono cercano y frases cortas, como un buen profesor de bachillerato.',
    'Tu objetivo es que el alumno aprenda: da PISTAS progresivas y pregunta qué ha intentado. No des la solución completa a un ejercicio a no ser que el alumno ya lo haya intentado y te la pida explícitamente.',
    'Si el alumno comparte un resultado, comprueba los cálculos, las unidades y las cifras significativas, y explica el error concreto si lo hay.',
    'Usa notación LaTeX entre $...$ para las fórmulas. Sé breve: como máximo unos 150 palabras salvo que te pidan más.',
    'Si no estás seguro de algo, dilo.',
  ].join('\n');
}

async function ask(state, ctx) {
  const { aiKey, aiModel } = state.settings;
  busy = true;
  ctx.rerender();
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': aiKey,
        'anthropic-version': '2023-06-01',
        // Necesario para llamar a la API directamente desde el navegador.
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: aiModel || 'claude-sonnet-5-5',
        max_tokens: 800,
        system: systemPrompt(state),
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message ?? `Error ${res.status}`);
    const text = (data.content ?? []).filter((b) => b.type === 'text').map((b) => b.text).join('\n');
    messages.push({ role: 'assistant', content: text || '(sin respuesta)' });
  } catch (err) {
    messages.push({ role: 'assistant', content: `No he podido conectar con el tutor: ${err.message}. Revisa la clave y el modelo en Ajustes y tu conexión.`, error: true });
  } finally {
    busy = false;
    ctx.rerender();
  }
}

export default {
  title: 'Tutor IA',
  render({ state }) {
    const configured = Boolean(state.settings.aiKey);
    const myUnits = [...unitsById.values()].filter((u) => state.subjects.some((s) => s.id === u.subjectId));
    return html`
      <header class="page-head"><div><p class="eyebrow">Opcional · con la API de Claude</p><h1>Tutor IA</h1></div></header>
      ${!configured ? html`
        ${teacherSays('Aquí puedes preguntar dudas concretas a un tutor con IA. Te dará **pistas**, no la solución directa, y te explicará tus errores. Para activarlo necesitas tu propia **clave de la API de Anthropic**: pégala en *Ajustes → Tutor IA*. La clave se queda solo en este navegador.')}
        <a class="btn btn-primary" href="#/ajustes">${icon('settings', 16)} Ir a Ajustes</a>
        <p class="small muted section">Sin clave, Pauta funciona igual: las clases, pistas y soluciones ya están preparadas.</p>` : html`
        <label class="field inline">Unidad (opcional, para dar contexto)
          <select class="input" data-change="tutor-topic">
            <option value="">— Ninguna —</option>
            ${myUnits.map((u) => html`<option value="${u.id}" ${u.id === topic ? 'selected' : ''}>${subjectNames[u.subjectId]} · ${u.title}</option>`)}
          </select></label>
        <div class="chat tutor-chat" aria-live="polite">
          ${messages.length === 0 ? teacherSays('¿En qué te atascas? Cuéntame el ejercicio y lo que has intentado.') : ''}
          ${messages.map((m) => m.role === 'user'
            ? html`<div class="me"><div class="bubble">${m.content}</div></div>`
            : html`<div class="teacher"><div class="avatar" aria-hidden="true">IA</div><div class="${cls('bubble', m.error && 'bubble-error')}">${raw(renderMarkdown(m.content))}</div></div>`)}
          ${busy ? html`<div class="teacher"><div class="avatar" aria-hidden="true">IA</div><div class="bubble typing">Pensando…</div></div>` : ''}
        </div>
        <form class="answer-row" data-form="tutor-send">
          <label class="sr-only" for="tutor-input">Tu pregunta</label>
          <textarea id="tutor-input" name="q" class="input" rows="2" maxlength="2000" placeholder="Escribe tu duda…" ${busy ? 'disabled' : ''} data-autofocus></textarea>
          <button class="btn btn-primary" ${busy ? 'disabled' : ''} aria-label="Enviar">${icon('send', 18)}</button>
        </form>
        <p class="small muted">Las respuestas las genera una IA y pueden contener errores. La conversación no se guarda.
          ${messages.length ? html`<button class="btn btn-ghost btn-sm" data-action="tutor-clear">Borrar conversación</button>` : ''}</p>`}`;
  },
  actions: {
    'tutor-topic': (el, ctx) => { topic = el.value; ctx.rerender(); },
    'tutor-send': (form, ctx) => {
      const q = new FormData(form).get('q').toString().trim();
      if (!q || busy) return;
      messages.push({ role: 'user', content: q });
      ask(ctx.state, ctx);
    },
    'tutor-clear': (el, ctx) => { messages.length = 0; ctx.rerender(); },
  },
};
