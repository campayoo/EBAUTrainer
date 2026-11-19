/**
 * Vista "Progreso": porcentajes por asignatura y bloque, puntos débiles,
 * gráficas de evolución, racha y cumplimiento del planning.
 */

import { html } from '../ui/html.js';
import { icon } from '../ui/icons.js';
import { progressBar, statCard, subjectBadge, teacherSays } from '../ui/components.js';
import { lineChart, barChart } from '../ui/charts.js';
import { subjectsById, allUnits } from '../data/content.js';
import { progressTree, weakPoints, streak, compliance, minutesPerWeek } from '../core/stats.js';
import { todayISO, formatShort } from '../core/dates.js';

export default {
  title: 'Progreso',
  render({ state }) {
    const today = todayISO();
    const chosen = new Set(state.subjects.map((s) => s.id));
    const myUnits = allUnits.filter((u) => chosen.has(u.subjectId));
    const done = state.history.filter((h) => h.status === 'done');
    const totalMinutes = done.reduce((a, h) => a + (h.minutes ?? 0), 0);
    const recent = state.scores.slice(-10);
    const avg = recent.length ? recent.reduce((a, x) => a + x.score, 0) / recent.length : null;
    const comp = compliance(state.history);
    const weak = weakPoints(myUnits, state.progress, 6);
    const scorePoints = state.scores.slice(-20).map((x) => ({ label: formatShort(x.date), value: x.score }));
    const weeks = minutesPerWeek(state.history, today, 8).map((w) => ({ label: formatShort(w.week), value: w.minutes }));

    let advice;
    if (done.length === 0) advice = 'Cuando hagas tus primeras clases, aquí verás cómo evolucionas.';
    else if (weak.length) advice = `Tu punto más débil ahora mismo es **${weak[0].unit.title}** (${Math.round(weak[0].mastery * 100)} % de dominio). Ya lo tengo en el planning, pero si te sobra tiempo, repásalo.`;
    else advice = '¡No tienes puntos débiles destacables! Sigue con el ritmo del planning.';

    return html`
      <header class="page-head"><div><p class="eyebrow">Tus estadísticas</p><h1>Progreso</h1></div></header>
      ${teacherSays(advice)}

      <div class="stats section">
        ${statCard('días de racha', streak(state.history, today), { iconName: 'flame' })}
        ${statCard('cumplimiento', comp === null ? '—' : `${Math.round(comp * 100)} %`, { iconName: 'target', hint: 'sesiones hechas / planificadas' })}
        ${statCard('horas estudiadas', Math.round((totalMinutes / 60) * 10) / 10, { iconName: 'clock' })}
        ${statCard('nota media (últimas 10)', avg === null ? '—' : `${Math.round(avg * 100)} %`, { iconName: 'chart' })}
      </div>

      <section class="section">
        <h2>Por asignatura</h2>
        <div class="grid-2">
          ${state.subjects.map(({ id }) => {
            const tree = progressTree(subjectsById.get(id), state.progress);
            return html`<article class="card">
              <h3>${subjectBadge(id, { short: false })}</h3>
              ${progressBar(tree.stats.pct, { color: subjectsById.get(id).color, label: subjectsById.get(id).name })}
              <p class="small muted">${Math.round(tree.stats.pct * 100)} % completado · dominio ${Math.round(tree.stats.mastery * 100)} %</p>
              <ul class="block-stats">
                ${tree.blocks.map((b) => html`<li><span>${b.title}</span><span class="mini-bar">${progressBar(b.stats.pct, { color: subjectsById.get(id).color, label: b.title })}</span><span class="small muted">${b.stats.completed}/${b.stats.total}</span></li>`)}
              </ul>
            </article>`;
          })}
        </div>
      </section>

      <section class="section grid-2">
        <article class="card"><h3>Nota de las últimas sesiones</h3>${lineChart(scorePoints, { title: 'Nota de las últimas sesiones' })}</article>
        <article class="card"><h3>Minutos de estudio por semana</h3>${barChart(weeks, { title: 'Minutos por semana' })}</article>
      </section>

      <section class="section">
        <h2>Puntos débiles</h2>
        ${weak.length === 0 ? html`<p class="muted">Ninguno por ahora.</p>` : html`
        <ul class="weak-list">
          ${weak.map((w) => html`<li class="card row">
            <div class="grow">${subjectBadge(w.unit.subjectId)} <strong>${w.unit.title}</strong>
              ${progressBar(w.mastery, { color: 'var(--danger)', label: `Dominio de ${w.unit.title}` })}</div>
            <a class="btn btn-sm" href="#/clase/${encodeURIComponent(w.unit.id)}/review">${icon('refresh', 14)} Repasar</a>
          </li>`)}
        </ul>`}
      </section>

      <section class="section">
        <h2>Simulacros</h2>
        ${state.exams.length === 0 ? html`<p class="muted">Aún no has hecho ningún simulacro. <a class="link" href="#/simulacro">Hacer uno</a></p>` : html`
        <table class="table"><thead><tr><th>Fecha</th><th>Asignatura</th><th>Nota</th></tr></thead>
          <tbody>${[...state.exams].reverse().map((e) => html`<tr><td>${formatShort(e.date)}</td><td>${subjectBadge(e.subjectId)}</td><td><strong>${String(e.grade).replace('.', ',')}</strong> / 10</td></tr>`)}</tbody></table>`}
      </section>`;
  },
};
