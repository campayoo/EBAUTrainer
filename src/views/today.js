/**
 * Vista "Hoy": lo que toca estudiar hoy, explicado por el profesor.
 */

import { html } from '../ui/html.js';
import { icon } from '../ui/icons.js';
import { sessionCard, teacherSays, statCard } from '../ui/components.js';
import { todayISO, formatLong, formatShort, diffDays } from '../core/dates.js';
import { streak, compliance } from '../core/stats.js';
import { allUnits } from '../data/content.js';

function greeting() {
  const h = new Date().getHours();
  return h < 13 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches';
}

export default {
  title: 'Hoy',
  render({ state }) {
    const today = todayISO();
    const doneToday = state.history.filter((h) => h.date === today && h.status === 'done');
    const doneIds = new Set(doneToday.map((h) => h.id));
    const pending = (state.plan?.sessions ?? []).filter((s) => s.date === today && !doneIds.has(s.id));
    const upcoming = (state.plan?.sessions ?? []).filter((s) => s.date > today).slice(0, 3);
    const minutesLeft = pending.reduce((a, s) => a + s.minutes, 0);
    const daysLeft = diffDays(today, state.profile.examDate);
    const chosen = new Set(state.subjects.map((s) => s.id));
    const myUnits = allUnits.filter((u) => chosen.has(u.subjectId));
    const completed = myUnits.filter((u) => state.progress[u.id]?.completed).length;
    const comp = compliance(state.history);
    const lastChange = state.changes[0];

    let message;
    if (pending.length > 0) {
      message = `Hoy toca **${pending.length} sesi${pending.length === 1 ? 'ón' : 'ones'}**, unos **${minutesLeft} minutos**. Empieza por la primera: te guiaré paso a paso.`;
    } else if (doneToday.length > 0) {
      message = '¡Has terminado lo de hoy! Si te apetece, puedes adelantar algo de los próximos días.';
    } else {
      message = 'Hoy no tienes sesiones en tu horario. Descansa, o adelanta trabajo si te apetece.';
    }

    return html`
      <header class="page-head">
        <div>
          <p class="eyebrow">${formatLong(today)}</p>
          <h1>${greeting()}, ${state.student.name}</h1>
        </div>
        <div class="countdown" title="Fecha del examen: ${state.profile.examDate}">
          <span class="countdown-n">${Math.max(0, daysLeft)}</span><span>días para la PAU</span>
        </div>
      </header>

      ${teacherSays(message)}

      ${(state.plan?.warnings ?? []).map((w) => html`<div class="banner warn">${icon('info', 16)} ${w}</div>`)}

      <section class="section">
        <h2>Tu plan de hoy</h2>
        <div class="stack">
          ${doneToday.map((h) => sessionCard(h, { status: 'done' }))}
          ${pending.map((s) => sessionCard(s))}
          ${pending.length === 0 && doneToday.length === 0 ? html`<p class="muted">No hay nada planificado para hoy.</p>` : ''}
        </div>
      </section>

      ${upcoming.length ? html`
      <section class="section">
        <h2>Adelantar trabajo</h2>
        <p class="muted">Si te sobra tiempo, puedes hacer ya las próximas sesiones. El planning se recolocará solo.</p>
        <div class="stack">${upcoming.map((s) => sessionCard(s, { showDate: true }))}</div>
      </section>` : ''}

      <section class="section">
        <h2>Cómo vas</h2>
        <div class="stats">
          ${statCard('días de racha', streak(state.history, today), { iconName: 'flame' })}
          ${statCard('unidades vistas', `${completed}/${myUnits.length}`, { iconName: 'book' })}
          ${statCard('cumplimiento del planning', comp === null ? '—' : `${Math.round(comp * 100)} %`, { iconName: 'target' })}
          ${statCard('días para el examen', Math.max(0, daysLeft), { iconName: 'calendar' })}
        </div>
      </section>

      ${lastChange ? html`
      <section class="section">
        <h2>Último ajuste del profesor</h2>
        ${teacherSays(lastChange.messages, { title: `${formatShort(lastChange.at)}` })}
        <a class="link" href="#/planning">Ver el planning completo ${icon('right', 14)}</a>
      </section>` : ''}
    `;
  },
};
