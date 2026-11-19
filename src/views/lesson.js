/**
 * Vista "Clase": el profesor guía al alumno paso a paso.
 * Ruta: #/clase/<unitId>/<tipo>/<idSesión?>   (tipo = lesson | review | reinforce)
 *
 * Toda la lógica (qué paso toca, cuánto puntúa cada ejercicio...) está en
 * core/lesson.js. Esta vista solo DIBUJA el estado y traduce los clics en
 * llamadas a esas funciones.
 */

import { html, raw, cls } from '../ui/html.js';
import { icon } from '../ui/icons.js';
import { renderMarkdown, renderInline } from '../ui/markdown.js';
import { exerciseView, subjectBadge, teacherSays, KIND_LABELS } from '../ui/components.js';
import { unitsById, lessonOf, topicsById, blocksById } from '../data/content.js';
import { getState, finishSession } from '../data/store.js';
import * as L from '../core/lesson.js';
import { grade } from '../core/grading.js';
import { generateExercise, hasGenerator } from '../core/generators/index.js';
import { createRng, freshSeed } from '../core/random.js';

let s = null; // sesión de clase en curso

/** Calentamiento: 1 pregunta de cada una de las 2 unidades ya vistas que más urge repasar. */
function buildWarmup(unit, rng) {
  const st = getState();
  const seen = Object.entries(st.progress)
    .filter(([id, p]) => p.completed && id !== unit.id && unitsById.get(id)?.subjectId === unit.subjectId)
    .sort(([, a], [, b]) => (a.nextReview ?? '9999') < (b.nextReview ?? '9999') ? -1 : 1)
    .slice(0, 2)
    .map(([id]) => unitsById.get(id));
  const items = [];
  for (const u of seen) {
    const gens = u.generators.filter(hasGenerator);
    if (gens.length) items.push(generateExercise(rng.pick(gens), rng.int(1, 2 ** 31 - 1)));
    else if (lessonOf(u.id)?.test?.length) items.push(L.normalizeExercise(rng.pick(lessonOf(u.id).test)));
  }
  return items;
}

function startSession(params) {
  const [unitId, kind = 'lesson', sessionId = ''] = params;
  const unit = unitsById.get(unitId);
  if (!unit) return null;
  const st = getState();
  const planned = (st.plan?.sessions ?? []).find((x) => x.id === sessionId);
  const seed = freshSeed();
  const rng = createRng(seed);
  const lessonDef = lessonOf(unitId);
  const lesson = kind === 'lesson'
    ? L.buildLesson({ unit, lessonDef, warmup: buildWarmup(unit, rng), seed })
    : L.buildReview({ unit, lessonDef, kind, seed });
  return {
    key: params.join('/'), unit, kind, sessionId: planned ? sessionId : null,
    plannedMinutes: planned?.minutes, startedAt: Date.now(),
    lesson, state: L.initialState(), revealed: {}, finished: null,
  };
}

function stepTracker() {
  return html`<ol class="steps" aria-label="Pasos de la clase">
    ${s.lesson.steps.map((step, i) => html`<li class="${cls(i === s.state.step && 'current', i < s.state.step && 'done')}" ${i === s.state.step ? raw('aria-current="step"') : ''}>${L.STEP_LABELS[step.type]}</li>`)}
  </ol>`;
}

function renderStep() {
  const step = L.currentStep(s.lesson, s.state);
  const item = L.currentItem(s.lesson, s.state);
  const count = step.items.length;
  const counter = count > 1 ? html`<p class="eyebrow">${L.STEP_LABELS[step.type]} · ${s.state.item + 1} de ${count}</p>` : html`<p class="eyebrow">${L.STEP_LABELS[step.type]}</p>`;

  switch (step.type) {
    case 'warmup':
      return html`${counter}${teacherSays(s.state.item === 0 ? 'Antes de empezar, calentamos con algo que ya viste. **No cuenta para la nota.**' : 'Una más para activar la memoria.')}
        ${exerciseView(item, L.resultOf(s.state, item.id), { mode: 'warmup' })}`;
    case 'explanation':
      return html`${counter}<article class="card lesson-card"><h2>${item.title}</h2>${raw(renderMarkdown(item.body))}</article>`;
    case 'example': {
      const shown = s.revealed[s.state.item] ?? 1;
      return html`${counter}<article class="card lesson-card">
        <h2>${item.title}</h2>
        <div class="statement">${raw(renderMarkdown(item.statement))}</div>
        <ol class="example-steps">${item.steps.slice(0, shown).map((st) => html`<li>${raw(renderMarkdown(st))}</li>`)}</ol>
        ${shown < item.steps.length
          ? html`<button class="btn" data-action="reveal" data-autofocus>${icon('right', 16)} Siguiente paso (${shown}/${item.steps.length})</button>`
          : item.result ? teacherSays(item.result) : ''}
      </article>`;
    }
    case 'practice':
    case 'test':
      return html`${counter}
        ${step.type === 'test' && s.state.item === 0 ? teacherSays('Mini test final: **un solo intento** por pregunta y sin pistas. ¡Tú puedes!') : ''}
        ${step.type === 'practice' && s.state.item === 0 && s.lesson.mode !== 'review' ? teacherSays('Ahora te toca a ti. Si te atascas, pide una pista: van de la idea general al primer paso. Cada pista resta un poco de nota, pero es mejor que quedarse bloqueado.') : ''}
        <div class="card">${item.title ? html`<p class="eyebrow">${item.title}</p>` : ''}${exerciseView(item, L.resultOf(s.state, item.id), { mode: step.type })}</div>`;
    case 'self':
      return html`${counter}<div class="card">
        <p>¿Qué tal te ha ido estudiando <strong>${s.unit.title}</strong>?</p>
        <div class="chips">${['Me ha costado mucho', 'Regular', 'Lo tengo claro'].map((t, i) => html`<button class="${cls('chip', L.resultOf(s.state, item.id).score === [0.4, 0.7, 0.95][i] && 'on')}" data-action="self" data-level="${i}">${t}</button>`)}</div>
      </div>`;
    case 'summary':
      return renderSummary();
    default:
      return '';
  }
}

function renderSummary() {
  const { score, practice, test, hintsUsed } = L.computeScore(s.lesson, s.state);
  const pct = Math.round(score * 100);
  return html`
    <div class="card summary-card">
      <div class="score-ring" style="--p:${pct}"><span>${pct}<small>%</small></span></div>
      <div>
        <h2>${s.finished ? 'Clase guardada' : 'Resumen de la clase'}</h2>
        <p class="muted">${practice !== null ? `Práctica: ${Math.round(practice * 100)} %` : ''}${test !== null ? ` · Test: ${Math.round(test * 100)} %` : ''} · Pistas usadas: ${hintsUsed}</p>
      </div>
    </div>
    ${teacherSays(L.closingMessage(score))}
    ${s.lesson.summary.length ? html`<section class="card"><h3>Lo que has aprendido</h3><ul>${s.lesson.summary.map((x) => html`<li>${raw(renderInline(x))}</li>`)}</ul></section>` : ''}
    ${s.lesson.commonErrors.length ? html`<section class="card"><h3>Errores frecuentes</h3><ul>${s.lesson.commonErrors.map((x) => html`<li>${raw(renderInline(x))}</li>`)}</ul></section>` : ''}
    ${s.finished
      ? html`${s.finished.length ? teacherSays(s.finished, { title: 'Cómo cambia tu planning' }) : ''}<div class="toolbar"><a class="btn btn-primary" href="#/hoy">Volver a Hoy</a><a class="btn" href="#/planning">Ver planning</a></div>`
      : html`<button class="btn btn-primary btn-lg" data-action="finish" data-autofocus>${icon('check', 18)} Terminar y guardar</button>`}`;
}

export default {
  title: 'Clase',
  render({ params }) {
    if (!s || s.key !== params.join('/')) s = startSession(params);
    if (!s) return html`<p>No encuentro esa unidad. <a href="#/asignaturas">Volver a asignaturas</a></p>`;
    const step = L.currentStep(s.lesson, s.state);
    const canBack = s.state.step > 0 || s.state.item > 0;
    const canNext = L.canAdvance(s.lesson, s.state);
    const unit = s.unit;
    return html`
      <header class="lesson-head">
        <a class="link" href="#/hoy">${icon('left', 14)} Salir</a>
        <div>
          <p class="eyebrow">${subjectBadge(unit.subjectId)} ${blocksById.get(unit.blockId)?.title} › ${topicsById.get(unit.topicId)?.title}</p>
          <h1>${unit.title} <span class="tag">${KIND_LABELS[s.kind]}${s.lesson.mode === 'express' ? ' exprés' : ''}</span></h1>
        </div>
        ${stepTracker()}
      </header>
      <div class="lesson-body">${renderStep()}</div>
      ${step.type !== 'summary' ? html`
      <footer class="lesson-nav">
        <button class="btn" data-action="prev" ${canBack && ['explanation', 'example'].includes(step.type) ? '' : 'disabled'}>${icon('left', 16)} Anterior</button>
        <button class="btn btn-primary" data-action="next" ${canNext ? '' : 'disabled'} title="${canNext ? '' : 'Responde (o mira la solución) para continuar'}">Siguiente ${icon('right', 16)}</button>
      </footer>` : ''}`;
  },
  mount() {
    // Al salir de la vista, se descarta la clase (si no se terminó, no se guarda nada).
    return () => { s = null; };
  },

  actions: {
    answer: (form, ctx) => {
      const ex = L.currentItem(s.lesson, s.state);
      const step = L.currentStep(s.lesson, s.state);
      const res = grade(ex.answer, new FormData(form).get('answer'));
      s.state = L.recordAnswer(s.state, ex.id, res, { stepType: step.type });
      ctx.rerender();
    },
    choose: (el, ctx) => {
      const ex = L.currentItem(s.lesson, s.state);
      const step = L.currentStep(s.lesson, s.state);
      s.state = L.recordAnswer(s.state, ex.id, grade(ex.answer, Number(el.dataset.index)), { stepType: step.type });
      ctx.rerender();
    },
    hint: (el, ctx) => { s.state = L.revealHint(s.state, el.dataset.ex); ctx.rerender(); },
    solution: (el, ctx) => { s.state = L.showSolution(s.state, el.dataset.ex); ctx.rerender(); },
    reveal: (el, ctx) => { s.revealed[s.state.item] = (s.revealed[s.state.item] ?? 1) + 1; ctx.rerender(); },
    self: (el, ctx) => { s.state = L.selfAssess(s.state, L.currentItem(s.lesson, s.state).id, Number(el.dataset.level)); ctx.rerender(); },
    next: (el, ctx) => { s.state = L.advance(s.lesson, s.state); ctx.rerender(); window.scrollTo(0, 0); },
    prev: (el, ctx) => { s.state = L.back(s.lesson, s.state); ctx.rerender(); },
    finish: (el, ctx) => {
      const { score, hintsUsed } = L.computeScore(s.lesson, s.state);
      const elapsed = Math.round((Date.now() - s.startedAt) / 60000 / 5) * 5;
      const minutes = s.plannedMinutes ?? Math.min(90, Math.max(10, elapsed));
      // finishSession provoca un redibujado: marcamos antes la clase como terminada
      // para que no se pueda guardar dos veces, y después añadimos los mensajes.
      const session = s;
      session.finished = [];
      session.finished = finishSession({ sessionId: s.sessionId, unitId: s.unit.id, kind: s.kind, minutes, score, hintsUsed });
      ctx.rerender();
    },
  },
};
