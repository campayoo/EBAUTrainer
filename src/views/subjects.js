/**
 * Vista "Mis asignaturas": lo que estudias, tu progreso en cada una,
 * el temario completo y la opción de añadir o quitar asignaturas.
 */

import { html, cls } from '../ui/html.js';
import { icon } from '../ui/icons.js';
import { progressBar, subjectBadge, classPicker, unitIdsOfBlock } from '../ui/components.js';
import { content, subjectsById } from '../data/content.js';
import { addSubject, removeSubject, setSubjectWeight, setClassProgress, classSeenIds, getState, WEIGHT_LABELS } from '../data/store.js';
import { progressTree } from '../core/stats.js';
import { formatShort } from '../core/dates.js';

const open = new Set(); // bloques desplegados
let confirmRemove = null;
let adding = null;
// Editor "Por dónde voy en clase": { subjectId, seen: Set } mientras está abierto.
let editing = null;

const WEIGHTS = [0.75, 1, 1.5];

function unitRow(unit, state, nextDate) {
  const p = state.progress[unit.id];
  const status = p?.completed && p.source === 'clase' && (p.lastScore ?? null) === null
    ? html`<span class="tag">Vista en clase</span>`
    : p?.completed
    ? html`<span class="tag ok">${icon('check', 14)} ${Math.round(p.mastery * 100)} %</span>`
    : nextDate ? html`<span class="tag">${formatShort(nextDate)}</span>` : html`<span class="tag muted">Pendiente</span>`;
  return html`
    <li class="unit-row">
      <div>
        <span class="unit-title">${unit.title}</span>
        <span class="${cls('tag', unit.hasLesson ? 'full' : 'express')}" title="${unit.hasLesson ? 'Teoría, ejemplos y ejercicios escritos' : 'Ejercicios generados con pistas y solución'}">${unit.hasLesson ? 'Clase completa' : 'Clase exprés'}</span>
        <span class="muted small">${unit.minutes} min · dificultad ${unit.difficulty}/5</span>
      </div>
      <div class="unit-actions">${status}
        <a class="btn btn-sm btn-ghost" href="#/clase/${encodeURIComponent(unit.id)}/${p?.completed ? 'review' : 'lesson'}">${p?.completed ? 'Repasar' : 'Estudiar ya'}</a>
      </div>
    </li>`;
}

/** Unidades completadas en la app (no "de clase"): no se pueden desmarcar. */
function lockedUnits(subject, state) {
  const ids = subject.blocks.flatMap((b) => b.topics.flatMap((t) => t.units.map((u) => u.id)));
  return new Set(ids.filter((u) => state.progress[u]?.completed && state.progress[u].source !== 'clase'));
}

export default {
  title: 'Asignaturas',
  render({ state }) {
    const mine = state.subjects.map((s) => ({ ...s, subject: subjectsById.get(s.id) }));
    const available = content.subjects.filter((s) => !state.subjects.some((m) => m.id === s.id));
    // Próxima fecha planificada de cada unidad
    const nextDate = new Map();
    for (const s of state.plan?.sessions ?? []) if (s.kind === 'lesson' && !nextDate.has(s.unitId)) nextDate.set(s.unitId, s.date);

    return html`
      <header class="page-head"><div><p class="eyebrow">Tu vida de estudiante</p><h1>Mis asignaturas</h1></div></header>

      <div class="stack">
        ${mine.map(({ id, weight, subject }) => {
          const tree = progressTree(subject, state.progress);
          return html`
          <article class="card subject-card" style="--c:${subject.color}">
            <div class="subject-head">
              <div class="subject-icon" aria-hidden="true">${subject.icon}</div>
              <div class="grow">
                <h2>${subject.name}</h2>
                <p class="muted">${subject.description}</p>
                ${progressBar(tree.stats.pct, { color: subject.color, label: `Progreso en ${subject.name}` })}
                <p class="small muted">${tree.stats.completed} de ${tree.stats.total} unidades · dominio medio ${Math.round(tree.stats.mastery * 100)} %</p>
              </div>
            </div>
            <div class="subject-controls">
              <label class="field inline">¿Cómo la llevas?
                <select class="input" data-change="weight" data-id="${id}">
                  ${WEIGHTS.map((w) => html`<option value="${w}" ${w === weight ? 'selected' : ''}>${WEIGHT_LABELS[w]}</option>`)}
                </select>
              </label>
              <button class="btn btn-sm" data-action="class-edit" data-id="${id}" aria-expanded="${editing?.subjectId === id}">${icon('flag', 16)} Por dónde voy en clase</button>
              ${confirmRemove === id
                ? html`<span class="confirm">¿Quitar ${subject.short}? <button class="btn btn-danger btn-sm" data-action="remove" data-id="${id}">Sí, quitar</button><button class="btn btn-sm" data-action="cancel-remove">No</button></span>`
                : html`<button class="btn btn-ghost btn-sm" data-action="ask-remove" data-id="${id}">${icon('trash', 16)} Quitar</button>`}
            </div>
            ${editing?.subjectId === id ? html`
              <div class="class-editor">
                <p class="small">Marca lo que ya habéis dado en clase. Lo que ya has estudiado aquí no cambia.</p>
                ${classPicker(subject, editing.seen, lockedUnits(subject, state))}
                <div class="row-end">
                  <button class="btn btn-ghost btn-sm" data-action="class-cancel">Cancelar</button>
                  <button class="btn btn-primary btn-sm" data-action="class-save">Guardar y replanificar</button>
                </div>
              </div>` : ''}
            <div class="blocks">
              ${tree.blocks.map((b) => html`
                <div class="block">
                  <button class="block-head" data-action="toggle-block" data-id="${b.id}" aria-expanded="${open.has(b.id)}">
                    <span>${icon(open.has(b.id) ? 'left' : 'right', 14)}</span>
                    <span class="grow">${b.title}</span>
                    <span class="small muted">${b.stats.completed}/${b.stats.total}</span>
                    <span class="mini-bar">${progressBar(b.stats.pct, { color: subject.color, label: b.title })}</span>
                  </button>
                  ${open.has(b.id) ? html`<div class="block-body">${b.topics.map((t) => html`<h4>${t.title}</h4><ul class="units">${t.units.map((u) => unitRow(u, state, nextDate.get(u.id)))}</ul>`)}</div>` : ''}
                </div>`)}
            </div>
          </article>`;
        })}
        ${mine.length === 0 ? html`<p class="muted">Aún no estudias ninguna asignatura.</p>` : ''}
      </div>

      ${available.length ? html`
      <section class="section">
        <h2>Añadir asignatura</h2>
        <div class="stack">
          ${available.map((s) => html`
            <div class="card add-card" style="--c:${s.color}">
              <div>${subjectBadge(s.id, { short: false })}<p class="muted">${s.description}</p></div>
              ${adding === s.id
                ? html`<div class="chips"><span class="small">¿Cómo la llevas?</span>${WEIGHTS.map((w) => html`<button class="chip" data-action="add" data-id="${s.id}" data-weight="${w}">${WEIGHT_LABELS[w]}</button>`)}</div>`
                : html`<button class="btn btn-primary" data-action="ask-add" data-id="${s.id}">${icon('plus', 16)} Añadir</button>`}
            </div>`)}
        </div>
      </section>` : html`<p class="muted section">Ya estudias todas las asignaturas disponibles. Cada asignatura es un conjunto de archivos YAML: añadir una nueva no exige tocar el código.</p>`}`;
  },

  actions: {
    'toggle-block': (el, ctx) => { const id = el.dataset.id; if (open.has(id)) open.delete(id); else open.add(id); ctx.rerender(); },
    'ask-remove': (el, ctx) => { confirmRemove = el.dataset.id; ctx.rerender(); },
    'cancel-remove': (el, ctx) => { confirmRemove = null; ctx.rerender(); },
    remove: (el, ctx) => { confirmRemove = null; ctx.teacherToast(removeSubject(el.dataset.id)); },
    'ask-add': (el, ctx) => { adding = el.dataset.id; ctx.rerender(); },
    add: (el, ctx) => { adding = null; ctx.teacherToast(addSubject(el.dataset.id, Number(el.dataset.weight))); },
    weight: (el, ctx) => ctx.teacherToast(setSubjectWeight(el.dataset.id, Number(el.value))),
    'class-edit': (el, ctx) => {
      const id = el.dataset.id;
      editing = editing?.subjectId === id ? null : { subjectId: id, seen: new Set(classSeenIds(getState(), id)) };
      ctx.rerender();
    },
    'class-toggle': (el, ctx) => {
      const u = el.dataset.unit;
      if (editing.seen.has(u)) editing.seen.delete(u); else editing.seen.add(u);
      ctx.rerender();
    },
    'class-block': (el, ctx) => {
      for (const u of unitIdsOfBlock(subjectsById.get(editing.subjectId), el.dataset.block)) {
        if (el.dataset.on === '1') editing.seen.add(u); else editing.seen.delete(u);
      }
      ctx.rerender();
    },
    'class-cancel': (el, ctx) => { editing = null; ctx.rerender(); },
    'class-save': (el, ctx) => {
      const { subjectId, seen } = editing;
      editing = null;
      ctx.teacherToast(setClassProgress(subjectId, [...seen]), 'Planning actualizado');
    },
  },
};
