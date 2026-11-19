/**
 * Vista "Planning": calendario semanal y diario, avisos y el historial de
 * cambios que ha hecho el profesor (y por qué).
 */

import { html, cls } from '../ui/html.js';
import { icon } from '../ui/icons.js';
import { sessionCard, sessionTitle, teacherSays, KIND_LABELS } from '../ui/components.js';
import { todayISO, startOfWeek, addDays, formatShort, formatLong, weekday, WEEKDAY_NAMES } from '../core/dates.js';
import { buildICS } from '../core/ics.js';
import { subjectsById, subjectName } from '../data/content.js';
import { replan } from '../data/store.js';
import { downloadFile } from '../data/storage.js';

let weekStart = null;
let selectedDay = null;

const TRIGGERS = {
  onboarding: 'Plan inicial', 'subject-added': 'Asignatura añadida', 'subject-removed': 'Asignatura quitada',
  weight: 'Cambio de peso', schedule: 'Cambio de horario', missed: 'Sesiones perdidas', 'lesson-done': 'Clase terminada',
  'review-done': 'Repaso terminado', 'reinforce-done': 'Refuerzo terminado', manual: 'Recalculado a mano',
  'class-progress': 'Por dónde vas en clase',
};

/** Sesiones de un día: lo ya ocurrido (historial) + lo planificado pendiente. */
function sessionsOfDay(state, date) {
  const history = state.history.filter((h) => h.date === date);
  const recorded = new Set(history.map((h) => h.id));
  const planned = (state.plan?.sessions ?? []).filter((s) => s.date === date && !recorded.has(s.id));
  return [...history, ...planned];
}

export default {
  title: 'Planning',
  render({ state }) {
    const today = todayISO();
    weekStart ??= startOfWeek(today);
    selectedDay ??= today;
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const plan = state.plan;
    const total = plan?.sessions.length ?? 0;

    return html`
      <header class="page-head">
        <div><p class="eyebrow">Tu calendario de estudio</p><h1>Planning</h1></div>
        <div class="toolbar">
          <button class="btn btn-sm" data-action="export-ics">${icon('download', 16)} Exportar a calendario</button>
          <button class="btn btn-sm" data-action="replan">${icon('refresh', 16)} Recalcular</button>
        </div>
      </header>

      ${plan ? html`<p class="muted">Versión ${plan.version} del plan · ${total} sesiones hasta el examen (${formatLong(state.profile.examDate)})${plan.stats?.finalPhaseStart ? html` · repaso final y simulacros desde el ${formatShort(plan.stats.finalPhaseStart)}` : ''}.</p>` : ''}
      ${(plan?.warnings ?? []).map((w) => html`<div class="banner warn">${icon('info', 16)} ${w}</div>`)}

      <div class="week-nav">
        <button class="btn btn-icon" data-action="week" data-delta="-7" aria-label="Semana anterior">${icon('left')}</button>
        <strong>Semana del ${formatShort(weekStart)} al ${formatShort(addDays(weekStart, 6))}</strong>
        <button class="btn btn-icon" data-action="week" data-delta="7" aria-label="Semana siguiente">${icon('right')}</button>
        <button class="btn btn-sm btn-ghost" data-action="week-today">Hoy</button>
      </div>

      <div class="week" role="list">
        ${days.map((d) => {
          const sessions = sessionsOfDay(state, d);
          const minutes = sessions.reduce((a, s) => a + s.minutes, 0);
          const available = state.profile.availability[weekday(d)];
          return html`
            <button role="listitem" class="${cls('day', d === today && 'is-today', d === selectedDay && 'is-selected', d < today && 'is-past')}" data-action="select-day" data-day="${d}" aria-label="${formatLong(d)}: ${sessions.length} sesiones">
              <span class="day-head"><span>${WEEKDAY_NAMES[weekday(d)].slice(0, 3)}</span><strong>${Number(d.slice(8))}</strong></span>
              <span class="day-sessions">
                ${sessions.map((s) => html`<span class="${cls('mini', `kind-${s.kind}`, s.status === 'done' && 'is-done', s.status === 'missed' && 'is-missed')}" style="--c:${subjectsById.get(s.subjectId)?.color}">
                  <span class="mini-kind">${KIND_LABELS[s.kind]}${s.status === 'done' ? ' ✓' : s.status === 'missed' ? ' ✗' : ''}</span>
                  <span class="mini-title">${sessionTitle(s)}</span></span>`)}
                ${sessions.length === 0 ? html`<span class="muted small">${available ? '—' : 'Libre'}</span>` : ''}
              </span>
              <span class="day-foot">${minutes ? `${minutes} min` : ''}</span>
            </button>`;
        })}
      </div>

      <section class="section">
        <h2>${formatLong(selectedDay)}</h2>
        <div class="stack">
          ${sessionsOfDay(state, selectedDay).map((s) => sessionCard(s, { status: s.status, action: selectedDay >= today }))}
          ${sessionsOfDay(state, selectedDay).length === 0 ? html`<p class="muted">No hay sesiones este día.</p>` : ''}
        </div>
      </section>

      <section class="section">
        <h2>Lo que ha cambiado y por qué</h2>
        ${state.changes.length === 0 ? html`<p class="muted">Todavía no hay cambios.</p>` : ''}
        <div class="stack">
          ${state.changes.slice(0, 12).map((c) => teacherSays(c.messages, { title: `${formatShort(c.at)} · ${TRIGGERS[c.trigger] ?? c.trigger}` }))}
        </div>
      </section>`;
  },

  actions: {
    week: (el, ctx) => { weekStart = addDays(weekStart, Number(el.dataset.delta)); selectedDay = weekStart; ctx.rerender(); },
    'week-today': (el, ctx) => { weekStart = startOfWeek(todayISO()); selectedDay = todayISO(); ctx.rerender(); },
    'select-day': (el, ctx) => { selectedDay = el.dataset.day; ctx.rerender(); },
    replan: (el, ctx) => ctx.teacherToast(replan('manual', ['He recalculado tu planning con los datos actuales.'])),
    'export-ics': (el, ctx) => {
      const sessions = (ctx.state.plan?.sessions ?? []).filter((s) => s.date >= todayISO());
      const ics = buildICS(sessions, (s) => ({
        title: `Pauta · ${KIND_LABELS[s.kind]}: ${sessionTitle(s)}`,
        description: `${subjectName(s.subjectId)} · ${s.minutes} minutos. Abre Pauta para empezar la sesión.`,
      }), { startTime: ctx.state.profile.startTime });
      downloadFile('pauta-planning.ics', ics, 'text/calendar');
      ctx.toast(`Calendario exportado con ${sessions.length} sesiones. Ábrelo con Google Calendar, Outlook o el calendario del móvil.`);
    },
  },
};
