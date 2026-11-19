/**
 * components.js — Piezas de interfaz reutilizables (funciones que devuelven HTML).
 * Las vistas las combinan como si fueran "componentes".
 */

import { html, raw, cls } from './html.js';
import { renderMarkdown, renderInline } from './markdown.js';
import { icon } from './icons.js';
import { subjectsById, unitsById } from '../data/content.js';
import { formatShort } from '../core/dates.js';

export const KIND_LABELS = { lesson: 'Clase', review: 'Repaso', reinforce: 'Refuerzo', mock: 'Simulacro' };

/** Etiqueta de color de una asignatura. */
export function subjectBadge(subjectId, { short = true } = {}) {
  const s = subjectsById.get(subjectId);
  if (!s) return '';
  return html`<span class="badge" style="--c:${s.color}"><span aria-hidden="true">${s.icon}</span> ${short ? s.short : s.name}</span>`;
}

/** Barra de progreso accesible. */
export function progressBar(fraction, { color, label } = {}) {
  const pct = Math.round(Math.max(0, Math.min(1, fraction)) * 100);
  return html`<div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${label ?? 'Progreso'}" style="${color ? `--c:${color}` : ''}"><span style="width:${pct}%"></span></div>`;
}

/** Título legible de una sesión del planning. */
export function sessionTitle(session) {
  if (session.kind === 'mock') return `Simulacro de ${subjectsById.get(session.subjectId)?.name ?? ''}`;
  const unit = unitsById.get(session.unitId);
  const part = session.parts > 1 ? ` (parte ${session.part}/${session.parts})` : '';
  return (unit?.title ?? session.unitId) + part;
}

/** Ruta de la página donde se estudia una sesión. */
export function sessionHref(session) {
  if (session.kind === 'mock') return `#/simulacro/${encodeURIComponent(session.subjectId)}/${encodeURIComponent(session.id)}`;
  return `#/clase/${encodeURIComponent(session.unitId)}/${session.kind}/${encodeURIComponent(session.id ?? '')}`;
}

/** Tarjeta compacta de una sesión. */
export function sessionCard(session, { status, showDate = false, action = true } = {}) {
  const s = subjectsById.get(session.subjectId);
  const done = status === 'done';
  const missed = status === 'missed';
  return html`
    <article class="${cls('session', `kind-${session.kind}`, done && 'is-done', missed && 'is-missed')}" style="--c:${s?.color ?? '#888'}">
      <div class="session-main">
        <div class="session-meta">
          <span class="kind">${KIND_LABELS[session.kind]}</span>
          ${subjectBadge(session.subjectId)}
          <span class="muted">${icon('clock', 14)} ${session.minutes} min</span>
          ${showDate ? html`<span class="muted">${formatShort(session.date)}</span>` : ''}
        </div>
        <h3 class="session-title">${sessionTitle(session)}</h3>
      </div>
      ${done ? html`<span class="status ok">${icon('check', 16)} Hecha${session.score !== undefined ? ` · ${Math.round(session.score * 100)} %` : ''}</span>`
        : missed ? html`<span class="status bad">${icon('x', 16)} No hecha</span>`
          : action ? html`<a class="btn btn-primary btn-sm" href="${sessionHref(session)}">${icon('play', 14)} Empezar</a>` : ''}
    </article>`;
}

/** Bocadillo del profesor virtual. */
export function teacherSays(content, { title } = {}) {
  const body = Array.isArray(content)
    ? html`<ul class="teacher-list">${content.map((m) => html`<li>${raw(renderInline(m))}</li>`)}</ul>`
    : raw(renderMarkdown(content));
  return html`
    <div class="teacher">
      <div class="avatar" aria-hidden="true">P</div>
      <div class="bubble">${title ? html`<strong class="bubble-title">${title}</strong>` : ''}${body}</div>
    </div>`;
}

/** Tarjeta de estadística. */
export function statCard(label, value, { iconName, hint } = {}) {
  return html`
    <div class="stat">
      ${iconName ? html`<span class="stat-icon">${icon(iconName, 18)}</span>` : ''}
      <span class="stat-value">${value}</span>
      <span class="stat-label">${label}</span>
      ${hint ? html`<span class="stat-hint">${hint}</span>` : ''}
    </div>`;
}

/**
 * Ejercicio interactivo (práctica, test, calentamiento, simulacro).
 * @param ex      ejercicio normalizado
 * @param result  estado del alumno en este ejercicio (de lesson.resultOf)
 * @param opts    { mode: 'practice' | 'test' | 'warmup' | 'exam', examAnswer }
 */
export function exerciseView(ex, result, { mode = 'practice' } = {}) {
  const answered = result.attempts > 0;
  const locked = result.correct || result.solutionShown || (mode !== 'practice' && answered);
  const hintsAllowed = mode === 'practice' || mode === 'warmup';
  const feedback = result.lastMessage
    ? html`<div class="${cls('feedback', result.correct ? 'ok' : 'bad', result.lastStatus === 'missing-unit' && 'warn')}" role="status">${raw(renderInline(result.lastMessage))}</div>`
    : '';

  let input;
  if (ex.answer.kind === 'choice') {
    input = html`<div class="choices" role="group" aria-label="Opciones">
      ${ex.answer.options.map((o, i) => html`<button type="button" class="${cls('choice', locked && i === ex.answer.correct && 'right')}" data-action="choose" data-ex="${ex.id}" data-index="${i}" ${locked ? 'disabled' : ''}>
        <span class="choice-letter">${'ABCDEFG'[i]}</span><span>${raw(renderInline(o.text))}</span></button>`)}
    </div>`;
  } else {
    input = html`<form class="answer-row" data-form="answer" data-ex="${ex.id}">
      <label class="sr-only" for="ans-${ex.id}">Tu respuesta</label>
      <input id="ans-${ex.id}" name="answer" class="input" autocomplete="off" inputmode="text" placeholder="${ex.answer.unit ? `Respuesta (en ${ex.answer.unit})` : 'Tu respuesta'}" ${locked ? 'disabled' : ''} data-autofocus>
      <button class="btn btn-primary" ${locked ? 'disabled' : ''}>Comprobar</button>
    </form>
    <p class="help">Puedes escribir 8,69 · 6,67·10^-11 · 6.67e-11 · 3/4${ex.answer.unit ? ' y añadir la unidad.' : '.'}</p>`;
  }

  const hints = ex.hints.slice(0, result.hintsUsed);
  return html`
    <div class="exercise">
      <div class="statement">${raw(renderMarkdown(ex.statement))}</div>
      ${input}
      ${feedback}
      ${hints.length ? html`<ol class="hints">${hints.map((h, i) => html`<li><strong>Pista ${i + 1}.</strong> ${raw(renderInline(h))}</li>`)}</ol>` : ''}
      <div class="exercise-tools">
        ${hintsAllowed && !locked && result.hintsUsed < ex.hints.length
          ? html`<button class="btn btn-ghost btn-sm" data-action="hint" data-ex="${ex.id}">${icon('bulb', 16)} ${result.hintsUsed === 0 ? 'Necesito una pista' : 'Otra pista'} (${result.hintsUsed}/${ex.hints.length})</button>` : ''}
        ${!result.solutionShown && (mode === 'practice' || mode === 'warmup' || answered)
          ? html`<button class="btn btn-ghost btn-sm" data-action="solution" data-ex="${ex.id}" title="${mode === 'practice' && !result.correct ? 'Si la ves antes de acertar, el ejercicio no puntúa' : ''}">${icon('eye', 16)} Ver solución</button>` : ''}
      </div>
      ${result.solutionShown ? html`<div class="solution"><strong>Solución</strong>${raw(renderMarkdown(ex.solution))}${ex.commonError ? html`<p class="muted"><strong>Error frecuente:</strong> ${raw(renderInline(ex.commonError))}</p>` : ''}</div>` : ''}
    </div>`;
}

/** Contenedor vacío con mensaje. */
export function emptyState(text, actionHtml = '') {
  return html`<div class="empty">${raw(renderMarkdown(text))}${actionHtml}</div>`;
}

/**
 * Selector "¿Por dónde vais en clase?": las unidades de una asignatura,
 * agrupadas por bloque, como botones que se marcan y desmarcan.
 * Lo usan la bienvenida y la vista Asignaturas (cada una maneja las acciones
 * `class-toggle` y `class-block`, que reciben data-unit / data-block).
 * @param subject   asignatura del contenido
 * @param seen      Set con los ids marcados
 * @param locked    Set con los ids ya completados en la app (no se pueden desmarcar)
 */
export function classPicker(subject, seen, locked = new Set()) {
  return html`<div class="class-picker" style="--c:${subject.color}">
    ${subject.blocks.map((b) => {
      const units = b.topics.flatMap((t) => t.units);
      const all = units.every((u) => seen.has(u.id) || locked.has(u.id));
      return html`<fieldset class="cp-block">
        <legend>${b.title}</legend>
        <div class="cp-units">
          ${units.map((u) => locked.has(u.id)
            ? html`<span class="cp-unit done" title="Ya la has estudiado en Pauta">${icon('check', 14)} ${u.title}</span>`
            : html`<button type="button" class="${cls('cp-unit', seen.has(u.id) && 'on')}" aria-pressed="${seen.has(u.id)}" data-action="class-toggle" data-unit="${u.id}">${seen.has(u.id) ? icon('check', 14) : ''} ${u.title}</button>`)}
        </div>
        <button type="button" class="link-btn" data-action="class-block" data-block="${b.id}" data-on="${all ? '0' : '1'}">${all ? 'Desmarcar el bloque' : 'Ya hemos dado todo este bloque'}</button>
      </fieldset>`;
    })}
  </div>`;
}

/** Ids de las unidades de un bloque (para el botón "todo el bloque"). */
export function unitIdsOfBlock(subject, blockId) {
  const b = subject.blocks.find((x) => x.id === blockId);
  return b ? b.topics.flatMap((t) => t.units.map((u) => u.id)) : [];
}
