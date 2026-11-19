/**
 * Vista "Simulacros": examen cronometrado con el formato de la PAU,
 * nota estimada y análisis de errores.
 * Rutas: #/simulacro   y   #/simulacro/<asignatura>/<idSesión?>
 */

import { html, raw, cls } from '../ui/html.js';
import { icon } from '../ui/icons.js';
import { renderMarkdown, renderInline } from '../ui/markdown.js';
import { subjectBadge, teacherSays } from '../ui/components.js';
import { subjectsById, examOf } from '../data/content.js';
import { recordExam, getState } from '../data/store.js';
import { buildMockExam, gradeMockExam } from '../core/exam.js';
import { freshSeed } from '../core/random.js';
import { plainNumber } from '../core/grading.js';

let m = null; // simulacro en curso
let timer = null;

const fmtTime = (ms) => {
  const total = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(total / 3600);
  const min = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  return `${h}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

function start(subjectId, sessionId) {
  const def = examOf(subjectId);
  if (!def) return null;
  const exam = buildMockExam(def, freshSeed());
  const planned = (getState().plan?.sessions ?? []).find((s) => s.id === sessionId);
  return {
    key: `${subjectId}/${sessionId ?? ''}`, subjectId, sessionId: planned ? sessionId : null, exam,
    answers: {}, chosen: {}, startedAt: Date.now(), deadline: Date.now() + exam.durationMinutes * 60000, result: null,
  };
}

function submit(ctx) {
  const result = gradeMockExam(m.exam, m.answers, m.chosen);
  m.result = result;
  clearInterval(timer);
  const minutes = Math.round((Date.now() - m.startedAt) / 60000);
  recordExam({
    subjectId: m.subjectId, grade: result.grade, minutes: Math.max(5, minutes), sessionId: m.sessionId,
    sections: result.sections.map((sct) => ({ id: sct.id, title: sct.title, points: sct.points, max: sct.max })),
  });
  ctx.rerender();
  window.scrollTo(0, 0);
}

function renderQuestion(ex, n) {
  const value = m.answers[ex.id] ?? '';
  return html`<div class="exam-q">
    <p class="eyebrow">Pregunta ${n}</p>
    <div class="statement">${raw(renderMarkdown(ex.statement))}</div>
    ${ex.answer.kind === 'choice'
      ? html`<div class="choices" role="radiogroup">${ex.answer.options.map((o, i) => html`
          <label class="choice"><input type="radio" name="${ex.id}" value="${i}" data-change="exam-choice" data-ex="${ex.id}" ${value === i ? 'checked' : ''}><span>${raw(renderInline(o.text))}</span></label>`)}</div>`
      : html`<label class="sr-only" for="q-${ex.id}">Respuesta</label><input id="q-${ex.id}" class="input" autocomplete="off" value="${value}" data-input="exam-answer" data-ex="${ex.id}" placeholder="${ex.answer.unit ? `Respuesta (en ${ex.answer.unit})` : 'Respuesta'}">`}
  </div>`;
}

function renderExam() {
  const subject = subjectsById.get(m.subjectId);
  let n = 0;
  return html`
    <header class="page-head sticky-head">
      <div><p class="eyebrow">Simulacro PAU</p><h1>${subject.name}</h1></div>
      <div class="timer" aria-live="off">${icon('clock', 18)} <span id="timer">${fmtTime(m.deadline - Date.now())}</span></div>
    </header>
    ${teacherSays(`Examen de **${m.exam.durationMinutes} minutos** con el formato de la PAU valenciana. En los apartados con dos propuestas, **elige una** y responde solo a esa. Cuando termines, pulsa *Entregar*: te corregiré al momento.`)}
    <form data-form="submit-exam" class="stack">
      ${m.exam.sections.map((sec) => {
        const opt = m.chosen[sec.id] ?? 0;
        return html`<section class="card exam-section">
          <h2>${sec.id}. ${sec.title} <span class="tag">${String(sec.points).replace('.', ',')} puntos</span></h2>
          ${sec.options.length > 1 ? html`<div class="tabs" role="tablist">${sec.options.map((_, i) => html`<button type="button" role="tab" aria-selected="${i === opt}" class="${cls('tab', i === opt && 'on')}" data-action="exam-option" data-sec="${sec.id}" data-opt="${i}">Propuesta ${'AB'[i]}</button>`)}</div>` : html`<p class="small muted">Apartado obligatorio.</p>`}
          ${sec.options[opt].map((ex) => renderQuestion(ex, ++n))}
        </section>`;
      })}
      <button class="btn btn-primary btn-lg">${icon('check', 18)} Entregar examen</button>
    </form>`;
}

function renderResult() {
  const r = m.result;
  const subject = subjectsById.get(m.subjectId);
  const lost = r.sections.flatMap((sec) => sec.items.filter((it) => !it.result.correct).map((it) => ({ sec, it })));
  const verdict = r.grade >= 8 ? '¡Excelente! Vas muy bien encaminado.' : r.grade >= 5 ? 'Aprobado. Revisa los fallos: ahí están los puntos que te faltan.' : 'Todavía no llega al aprobado, pero para eso son los simulacros. Repasa los apartados con menos nota.';
  return html`
    <header class="page-head"><div><p class="eyebrow">Resultado del simulacro</p><h1>${subject.name}</h1></div></header>
    <div class="card summary-card">
      <div class="score-ring" style="--p:${r.grade * 10}"><span>${String(r.grade).replace('.', ',')}<small>/10</small></span></div>
      <div class="grow">
        <h2>Nota estimada</h2>
        <ul class="block-stats">${r.sections.map((sec) => html`<li><span>${sec.id}. ${sec.title}</span><strong>${String(sec.points).replace('.', ',')} / ${String(sec.max).replace('.', ',')}</strong></li>`)}</ul>
      </div>
    </div>
    ${teacherSays(verdict)}
    ${lost.length ? html`<section class="section"><h2>Análisis de errores</h2><div class="stack">
      ${lost.map(({ sec, it }) => html`<details class="card">
        <summary><strong>${sec.id}.</strong> ${it.exercise.title} — ${it.result.status === 'blank' ? 'sin responder' : `tu respuesta: ${it.exercise.answer.kind === 'choice' ? 'ABCD'[it.answer] : it.answer}`}</summary>
        <div class="statement">${raw(renderMarkdown(it.exercise.statement))}</div>
        ${it.result.status !== 'blank' ? html`<div class="feedback bad">${raw(renderInline(it.result.message))}</div>` : ''}
        <div class="solution"><strong>Solución</strong>${raw(renderMarkdown(it.exercise.solution))}
        ${it.exercise.answer.kind === 'numeric' ? html`<p class="muted">Resultado: ${plainNumber(it.exercise.answer.value)} ${it.exercise.answer.unit ?? ''}</p>` : ''}</div>
      </details>`)}</div></section>` : html`<p class="section">¡Ningún fallo! 🎉</p>`}
    <div class="toolbar"><a class="btn btn-primary" href="#/simulacro">Volver a simulacros</a><a class="btn" href="#/progreso">Ver mi progreso</a></div>`;
}

function renderIndex(state) {
  return html`
    <header class="page-head"><div><p class="eyebrow">Practica como en el examen real</p><h1>Simulacros</h1></div></header>
    ${teacherSays('Cada simulacro se genera al momento con ejercicios distintos y el **formato de la PAU de la Comunitat Valenciana** (apartados, puntos y optatividad). Los exámenes oficiales de otros años están en la web de la Conselleria (enlace abajo): no se copian en la app.')}
    <div class="grid-2 section">
      ${state.subjects.map(({ id }) => {
        const def = examOf(id);
        const past = state.exams.filter((e) => e.subjectId === id);
        return html`<article class="card">
          <h2>${subjectBadge(id, { short: false })}</h2>
          ${def ? html`<ul class="small">${def.sections.map((sec) => html`<li>${sec.id}. ${sec.title} — ${String(sec.points).replace('.', ',')} p ${sec.options > 1 ? '(a elegir entre 2)' : '(obligatorio)'}</li>`)}</ul>
          <p class="small muted">${def.duration_minutes} minutos · duración pendiente de confirmar con la guía oficial.</p>
          ${past.length ? html`<p class="small">Último: <strong>${String(past.at(-1).grade).replace('.', ',')}</strong> · media ${String(Math.round((past.reduce((a, e) => a + e.grade, 0) / past.length) * 100) / 100).replace('.', ',')}</p>` : ''}
          <a class="btn btn-primary" href="#/simulacro/${id}">${icon('play', 16)} Empezar simulacro</a>` : html`<p class="muted">Esta asignatura aún no tiene simulacro.</p>`}
        </article>`;
      })}
    </div>
    <p class="small muted">Exámenes oficiales de años anteriores: <a class="link" href="https://universitats.gva.es" target="_blank" rel="noopener">universitats.gva.es</a></p>`;
}

export default {
  title: 'Simulacros',
  render({ state, params }) {
    if (params.length === 0) return renderIndex(state);
    const key = `${params[0]}/${params[1] ?? ''}`;
    if (!m || m.key !== key) m = start(params[0], params[1]);
    if (!m) return html`<p>Esta asignatura no tiene simulacro. <a href="#/simulacro">Volver</a></p>`;
    return m.result ? renderResult() : renderExam();
  },
  mount(root, ctx) {
    clearInterval(timer);
    if (m && !m.result) {
      timer = setInterval(() => {
        if (!m || m.result) return clearInterval(timer);
        const left = m.deadline - Date.now();
        const el = document.getElementById('timer');
        if (el) el.textContent = fmtTime(left);
        if (left <= 0) {
          ctx.toast('¡Se acabó el tiempo! Entrego tu examen.');
          submit(ctx);
        }
      }, 1000);
    }
    return () => { clearInterval(timer); m = null; };
  },
  actions: {
    'exam-option': (el, ctx) => { m.chosen[el.dataset.sec] = Number(el.dataset.opt); ctx.rerender(); },
    'exam-answer': (el) => { m.answers[el.dataset.ex] = el.value; },
    'exam-choice': (el) => { m.answers[el.dataset.ex] = Number(el.value); },
    'submit-exam': (form, ctx) => submit(ctx),
  },
};
