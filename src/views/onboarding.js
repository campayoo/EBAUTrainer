/**
 * Vista "Bienvenida": la conversación inicial con el profesor virtual.
 *
 * Es un pequeño flujo de preguntas y respuestas. El estado de la conversación
 * (`ob`) vive solo en esta vista; al terminar, se guarda todo de golpe con
 * completeOnboarding() y se genera el primer planning.
 */

import { html, raw, cls } from '../ui/html.js';
import { icon } from '../ui/icons.js';
import { exerciseView } from '../ui/components.js';
import { renderInline } from '../ui/markdown.js';
import { content, subjectsById, subjectNames } from '../data/content.js';
import { completeOnboarding, getState, LEVEL_WEIGHTS } from '../data/store.js';
import { todayISO, defaultExamDate, diffDays, WEEKDAY_NAMES } from '../core/dates.js';
import { generateExercise } from '../core/generators/index.js';
import { createRng, freshSeed } from '../core/random.js';
import { grade } from '../core/grading.js';
import { recordAnswer, resultOf, showSolution } from '../core/lesson.js';

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // lunes primero
const LEVELS = [
  { id: 'bajo', label: 'Me cuesta', hint: 'le dedicaré más tiempo' },
  { id: 'medio', label: 'Normal', hint: 'ritmo estándar' },
  { id: 'alto', label: 'Se me da bien', hint: 'iremos algo más rápido' },
];

let ob = null;

/** Estado inicial de la conversación (precargado si el alumno ya existía). */
function start() {
  const st = getState();
  const availability = [...st.profile.availability];
  return {
    step: 'welcome',
    log: [],
    name: st.student?.name ?? '',
    selected: new Set(st.subjects.map((s) => s.id)),
    levels: Object.fromEntries(st.subjects.map((s) => [s.id, s.level ?? 'medio'])),
    levelIdx: 0,
    days: new Set(DAY_ORDER.filter((d) => availability[d] > 0)),
    minutes: Math.max(...availability, 60),
    examDate: st.profile.examDate ?? defaultExamDate(todayISO()),
    targetGrade: st.student?.targetGrade ?? 8,
    diag: null,
    diagnostic: {},
  };
}

const say = (text) => ob.log.push({ from: 'teacher', text });
const answer = (text) => ob.log.push({ from: 'me', text });
const chosenList = () => content.subjects.filter((s) => ob.selected.has(s.id));

/** Prepara la prueba inicial: 2 ejercicios por asignatura, de bloques distintos. */
function buildDiagnostic() {
  const rng = createRng(freshSeed());
  const items = [];
  for (const s of chosenList()) {
    const candidates = s.blocks.map((b) => b.topics[0].units.find((u) => u.generators.length > 0)).filter(Boolean);
    for (const unit of rng.shuffle(candidates).slice(0, 2)) {
      items.push({ unit, ex: generateExercise(rng.pick(unit.generators), rng.int(1, 2 ** 31 - 1)) });
    }
  }
  return { items, index: 0, results: {} };
}

/** Pregunta del profesor según el paso. */
function teacherPrompt(step) {
  switch (step) {
    case 'name': return '¿Cómo te llamas?';
    case 'subjects': return '¿Qué asignaturas quieres preparar? Todo el contenido ya está dentro de la app: no tienes que descargar nada.';
    case 'level': return `¿Qué tal llevas **${subjectNames[chosenList()[ob.levelIdx].id]}**?`;
    case 'diag-offer': return '¿Hacemos una **prueba rápida** de 2 preguntas por asignatura? Me ayuda a ajustar el tiempo de cada tema. Es opcional.';
    case 'days': return '¿Qué días puedes estudiar y cuánto tiempo cada día? (Luego podrás afinarlo día a día en Ajustes.)';
    case 'exam': return '¿Cuándo es tu examen? Si aún no hay fecha oficial, deja la estimada y cámbiala cuando se publique.';
    case 'target': return '¿Qué nota te gustaría sacar en estas asignaturas?';
    default: return '';
  }
}

function go(step) {
  ob.step = step;
  const prompt = teacherPrompt(step);
  if (prompt) say(prompt);
}

function controls() {
  switch (ob.step) {
    case 'welcome':
      return html`<button class="btn btn-primary btn-lg" data-action="ob-start" data-autofocus>Empezar ${icon('right', 18)}</button>`;
    case 'name':
      return html`<form class="answer-row" data-form="ob-name">
        <label class="sr-only" for="ob-name">Tu nombre</label>
        <input id="ob-name" name="name" class="input" maxlength="40" required value="${ob.name}" placeholder="Tu nombre" data-autofocus autocomplete="given-name">
        <button class="btn btn-primary">Siguiente</button></form>`;
    case 'subjects':
      return html`<div class="chips" role="group" aria-label="Asignaturas">
          ${content.subjects.map((s) => html`<button class="${cls('chip', ob.selected.has(s.id) && 'on')}" style="--c:${s.color}" aria-pressed="${ob.selected.has(s.id)}" data-action="ob-toggle-subject" data-id="${s.id}"><span aria-hidden="true">${s.icon}</span> ${s.name}</button>`)}
        </div>
        <p class="help">Más asignaturas (Química, Biología...) llegarán en futuras versiones.</p>
        <button class="btn btn-primary" data-action="ob-subjects-next" ${ob.selected.size === 0 ? 'disabled' : ''}>Siguiente</button>`;
    case 'level':
      return html`<div class="chips">${LEVELS.map((l) => html`<button class="chip" data-action="ob-level" data-level="${l.id}">${l.label} <small class="muted">· ${l.hint}</small></button>`)}</div>`;
    case 'diag-offer':
      return html`<div class="chips"><button class="btn btn-primary" data-action="ob-diag-yes">Sí, hagamos la prueba</button><button class="btn" data-action="ob-diag-no">Ahora no</button></div>`;
    case 'diag': {
      const { items, index, results } = ob.diag;
      const { unit, ex } = items[index];
      const r = resultOf({ results }, ex.id);
      return html`<div class="card">
          <p class="eyebrow">Pregunta ${index + 1} de ${items.length} · ${subjectsById.get(unit.subjectId).short} · ${unit.title}</p>
          ${exerciseView(ex, r, { mode: 'test' })}
          <button class="btn ${r.attempts ? 'btn-primary' : ''}" data-action="ob-diag-next">${r.attempts ? 'Siguiente' : 'No lo sé, saltar'}</button>
        </div>`;
    }
    case 'days':
      return html`<div class="chips" role="group" aria-label="Días de estudio">
          ${DAY_ORDER.map((d) => html`<button class="${cls('chip', ob.days.has(d) && 'on')}" aria-pressed="${ob.days.has(d)}" data-action="ob-toggle-day" data-day="${d}">${WEEKDAY_NAMES[d]}</button>`)}
        </div>
        <label class="field">Minutos cada día
          <select class="input" data-change="ob-minutes">${[30, 45, 60, 90, 120, 150, 180, 240].map((m) => html`<option value="${m}" ${m === ob.minutes ? 'selected' : ''}>${m} min</option>`)}</select>
        </label>
        <p class="help">Total: ${ob.days.size * ob.minutes} minutos a la semana (${Math.round((ob.days.size * ob.minutes) / 6) / 10} h).</p>
        <button class="btn btn-primary" data-action="ob-days-next" ${ob.days.size === 0 ? 'disabled' : ''}>Siguiente</button>`;
    case 'exam':
      return html`<form class="answer-row" data-form="ob-exam">
        <label class="sr-only" for="ob-exam">Fecha del examen</label>
        <input id="ob-exam" type="date" name="date" class="input" required min="${todayISO()}" value="${ob.examDate}" data-autofocus>
        <button class="btn btn-primary">Siguiente</button></form>`;
    case 'target':
      return html`<div class="chips">${[5, 6, 7, 8, 9, 10].map((g) => html`<button class="chip" data-action="ob-target" data-grade="${g}">${g}</button>`)}</div>`;
    case 'summary':
      return html`<button class="btn btn-primary btn-lg" data-action="ob-finish" data-autofocus>${icon('calendar', 18)} Crear mi planning</button>`;
    default:
      return '';
  }
}

export default {
  title: 'Bienvenida',
  render() {
    if (!ob) {
      ob = start();
      say(getState().student
        ? 'Vamos a repasar tus datos. Tu progreso se mantiene: solo cambiaré lo que me digas.'
        : '¡Hola! Soy **Pauta**, tu profesor virtual. Te voy a ayudar a preparar la PAU: organizaré tu semana, te daré clase cada día y ajustaré el plan según cómo te vaya. Primero, unas preguntas rápidas.');
    }
    return html`
      <div class="onboarding">
        <header class="ob-head"><span class="brand-mark" aria-hidden="true">P</span><h1>Pauta</h1><p class="muted">Tu profesor virtual para la PAU</p></header>
        <div class="chat" aria-live="polite">
          ${ob.log.map((m) => m.from === 'teacher'
            ? html`<div class="teacher"><div class="avatar" aria-hidden="true">P</div><div class="bubble">${raw(renderInline(m.text))}</div></div>`
            : html`<div class="me"><div class="bubble">${m.text}</div></div>`)}
        </div>
        <div class="ob-controls">${controls()}</div>
      </div>`;
  },
  // Tras cada redibujado, bajamos hasta la última pregunta.
  afterRender(root) {
    root.querySelector('.ob-controls')?.scrollIntoView({ block: 'nearest' });
  },
  // Al salir de la vista se olvida la conversación.
  mount() {
    return () => { ob = null; };
  },

  actions: {
    'ob-start': (el, ctx) => { go('name'); ctx.rerender(); },
    'ob-name': (form, ctx) => {
      const name = new FormData(form).get('name').toString().trim();
      if (!name) return;
      ob.name = name;
      answer(name);
      say(`¡Encantado, ${name}!`);
      go('subjects');
      ctx.rerender();
    },
    'ob-toggle-subject': (el, ctx) => {
      const id = el.dataset.id;
      if (ob.selected.has(id)) ob.selected.delete(id); else ob.selected.add(id);
      ctx.rerender();
    },
    'ob-subjects-next': (el, ctx) => {
      answer(chosenList().map((s) => s.name).join(' y '));
      ob.levelIdx = 0;
      go('level');
      ctx.rerender();
    },
    'ob-level': (el, ctx) => {
      const s = chosenList()[ob.levelIdx];
      ob.levels[s.id] = el.dataset.level;
      answer(LEVELS.find((l) => l.id === el.dataset.level).label);
      ob.levelIdx++;
      go(ob.levelIdx < chosenList().length ? 'level' : 'diag-offer');
      ctx.rerender();
    },
    'ob-diag-yes': (el, ctx) => {
      answer('Sí, hagamos la prueba');
      ob.diag = buildDiagnostic();
      ob.step = 'diag';
      ctx.rerender();
    },
    'ob-diag-no': (el, ctx) => {
      answer('Ahora no');
      say('Sin problema. Ajustaré el plan con lo que vea en las clases.');
      go('days');
      ctx.rerender();
    },
    answer: (form, ctx) => {
      const { items, index } = ob.diag;
      const ex = items[index].ex;
      const res = grade(ex.answer, new FormData(form).get('answer'));
      ob.diag.results = recordAnswer({ results: ob.diag.results }, ex.id, res, { stepType: 'test' }).results;
      ctx.rerender();
    },
    choose: (el, ctx) => {
      const ex = ob.diag.items[ob.diag.index].ex;
      const res = grade(ex.answer, Number(el.dataset.index));
      ob.diag.results = recordAnswer({ results: ob.diag.results }, ex.id, res, { stepType: 'test' }).results;
      ctx.rerender();
    },
    solution: (el, ctx) => {
      ob.diag.results = showSolution({ results: ob.diag.results }, el.dataset.ex).results;
      ctx.rerender();
    },
    'ob-diag-next': (el, ctx) => {
      const d = ob.diag;
      if (d.index + 1 < d.items.length) {
        d.index++;
      } else {
        let right = 0;
        for (const { unit, ex } of d.items) {
          const score = resultOf({ results: d.results }, ex.id).score;
          ob.diagnostic[unit.id] = score;
          if (score > 0) right++;
        }
        say(`Has acertado **${right} de ${d.items.length}**. ${right >= d.items.length * 0.75 ? '¡Muy buena base!' : 'Perfecto, ya sé por dónde empezar.'} Lo tendré en cuenta en el planning.`);
        go('days');
      }
      ctx.rerender();
    },
    'ob-toggle-day': (el, ctx) => {
      const d = Number(el.dataset.day);
      if (ob.days.has(d)) ob.days.delete(d); else ob.days.add(d);
      ctx.rerender();
    },
    'ob-minutes': (el, ctx) => { ob.minutes = Number(el.value); ctx.rerender(); },
    'ob-days-next': (el, ctx) => {
      answer(`${DAY_ORDER.filter((d) => ob.days.has(d)).map((d) => WEEKDAY_NAMES[d]).join(', ')} · ${ob.minutes} min`);
      go('exam');
      ctx.rerender();
    },
    'ob-exam': (form, ctx) => {
      const date = new FormData(form).get('date').toString();
      if (!date || date <= todayISO()) return ctx.toast('Elige una fecha posterior a hoy.');
      ob.examDate = date;
      answer(date);
      say(`Quedan **${diffDays(todayISO(), date)} días**. ¡Hay tiempo de sobra si somos constantes!`);
      go('target');
      ctx.rerender();
    },
    'ob-target': (el, ctx) => {
      ob.targetGrade = Number(el.dataset.grade);
      answer(`Un ${ob.targetGrade}`);
      const subjects = chosenList().map((s) => `${s.name} (${LEVELS.find((l) => l.id === (ob.levels[s.id] ?? 'medio')).label.toLowerCase()})`).join(' y ');
      say(`Resumen: estudiarás **${subjects}**, ${ob.days.size} días a la semana, ${ob.minutes} minutos al día, con el examen el ${ob.examDate}. ¿Creo tu planning?`);
      ob.step = 'summary';
      ctx.rerender();
    },
    'ob-finish': (el, ctx) => {
      const availability = [0, 1, 2, 3, 4, 5, 6].map((d) => (ob.days.has(d) ? ob.minutes : 0));
      const messages = completeOnboarding({
        name: ob.name,
        targetGrade: ob.targetGrade,
        subjects: chosenList().map((s) => ({ id: s.id, level: ob.levels[s.id] ?? 'medio', weight: LEVEL_WEIGHTS[ob.levels[s.id] ?? 'medio'] })),
        availability,
        examDate: ob.examDate,
        diagnostic: ob.diagnostic,
      });
      ob = null;
      ctx.navigate('hoy');
      ctx.teacherToast(messages, 'Tu planning está listo');
    },
  },
};
