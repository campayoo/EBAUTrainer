/**
 * main.js — Punto de entrada de Pauta.
 *
 * Responsabilidades:
 *   1. Dibujar el "esqueleto" (menú lateral + zona de contenido).
 *   2. ROUTER: según la URL (#/planning, #/clase/...), mostrar una vista u otra.
 *      Usamos el "hash" (#) porque funciona en GitHub Pages y abriendo el
 *      archivo con doble clic, sin configurar ningún servidor.
 *   3. DELEGACIÓN DE EVENTOS: en vez de poner un listener en cada botón,
 *      ponemos uno solo en la raíz y miramos el atributo data-action del
 *      elemento pulsado. Así no hay que volver a enganchar eventos cada vez
 *      que se redibuja la pantalla.
 *   4. Avisos (toasts), tema claro/oscuro y registro del service worker (PWA).
 */

import { html, raw, cls } from './ui/html.js';
import { icon } from './ui/icons.js';
import { teacherSays } from './ui/components.js';
import { getState, subscribe, checkMissed } from './data/store.js';
import { storageAvailable } from './data/storage.js';

import today from './views/today.js';
import onboarding from './views/onboarding.js';
import planning from './views/planning.js';
import subjects from './views/subjects.js';
import lesson from './views/lesson.js';
import progress from './views/progress.js';
import exam from './views/exam.js';
import lab from './views/lab.js';
import tutor from './views/tutor.js';
import teacher from './views/teacher.js';
import settings from './views/settings.js';

/** Tabla de rutas: primer segmento de la URL -> vista. */
const ROUTES = {
  '': today,
  hoy: today,
  bienvenida: onboarding,
  planning,
  asignaturas: subjects,
  clase: lesson,
  progreso: progress,
  simulacro: exam,
  laboratorio: lab,
  tutor,
  profesor: teacher,
  ajustes: settings,
};

/** Entradas del menú. */
const NAV = [
  { path: 'hoy', label: 'Hoy', icon: 'today' },
  { path: 'planning', label: 'Planning', icon: 'calendar' },
  { path: 'asignaturas', label: 'Asignaturas', icon: 'book' },
  { path: 'progreso', label: 'Progreso', icon: 'chart' },
  { path: 'simulacro', label: 'Simulacros', icon: 'exam' },
  { path: 'laboratorio', label: 'Laboratorio', icon: 'flask' },
  { path: 'tutor', label: 'Tutor IA', icon: 'chat' },
  { path: 'profesor', label: 'Modo profesor', icon: 'teacher' },
  { path: 'ajustes', label: 'Ajustes', icon: 'settings' },
];

const root = document.getElementById('app');
let current = { view: null, path: '', params: [], cleanup: null };

/** Lee la ruta actual: "#/clase/a/b" -> { path: 'clase', params: ['a', 'b'] } */
function parseHash() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  return { path: parts[0] ?? '', params: parts.slice(1) };
}

export function navigate(path) {
  location.hash = path.startsWith('#') ? path : `#/${path}`;
}

/* ------------------------------ Avisos ------------------------------ */

const toastBox = document.getElementById('toasts');

/** Muestra un aviso. `content` puede ser texto o una lista de mensajes del profesor. */
export function toast(content, { title, kind = 'info', timeout = 7000 } = {}) {
  const el = document.createElement('div');
  el.className = `toast toast-${kind}`;
  el.innerHTML = String(html`${Array.isArray(content) ? teacherSays(content, { title }) : html`<p>${content}</p>`}<button class="toast-close" aria-label="Cerrar aviso">${icon('x', 16)}</button>`);
  el.querySelector('.toast-close').addEventListener('click', () => el.remove());
  toastBox.appendChild(el);
  if (timeout) setTimeout(() => el.remove(), timeout);
}

/** Atajo para enseñar los mensajes del profesor tras una replanificación. */
export function teacherToast(messages, title = 'Tu profe ha ajustado el planning') {
  if (messages?.length) toast(messages, { title, timeout: 9000 });
}

/* ------------------------------ Dibujo ------------------------------ */

function layout(content, path) {
  const state = getState();
  const showNav = Boolean(state.student) && path !== 'bienvenida';
  return html`
    <a class="skip-link" href="#main">Saltar al contenido</a>
    <div class="${cls('shell', !showNav && 'no-nav')}">
      ${showNav ? html`
      <nav class="sidebar" aria-label="Principal">
        <a class="brand" href="#/hoy"><span class="brand-mark" aria-hidden="true">P</span><span>Pauta</span></a>
        <ul>
          ${NAV.map((n) => html`<li><a href="#/${n.path}" class="${cls('nav-link', (path || 'hoy') === n.path && 'active')}" ${(path || 'hoy') === n.path ? raw('aria-current="page"') : ''}>${icon(n.icon)}<span>${n.label}</span></a></li>`)}
        </ul>
        <p class="sidebar-foot">Tu profesor virtual para la PAU</p>
      </nav>` : ''}
      <main id="main" class="main" tabindex="-1">
        ${!storageAvailable() ? html`<div class="banner warn">${icon('info', 16)} Tu navegador no deja guardar datos: el progreso se perderá al cerrar. Exporta una copia en Ajustes.</div>` : ''}
        ${content}
      </main>
    </div>`;
}

/** Contexto que reciben las vistas. */
function makeContext() {
  return {
    state: getState(),
    params: current.params,
    navigate,
    toast,
    teacherToast,
    rerender: () => render({ keepScroll: true }),
  };
}

function render({ keepScroll = false } = {}) {
  const { path, params } = parseHash();
  const state = getState();

  // Sin alumno -> siempre a la bienvenida.
  if (!state.student && path !== 'bienvenida') return navigate('bienvenida');

  const view = ROUTES[path] ?? today;
  const changedView = view !== current.view || params.join('/') !== current.params.join('/');
  if (changedView && current.cleanup) current.cleanup();
  current = { ...current, view, path, params };

  const scroll = window.scrollY;
  const ctx = makeContext();
  root.innerHTML = String(layout(view.render(ctx), path));
  document.title = `${view.title ?? 'Pauta'} · Pauta`;

  if (changedView) {
    current.cleanup = view.mount ? view.mount(root, ctx) : null;
    if (!keepScroll) window.scrollTo(0, 0);
  }
  if (keepScroll) window.scrollTo(0, scroll);
  view.afterRender?.(root, ctx);
  root.querySelector('[data-autofocus]:not([disabled])')?.focus({ preventScroll: true });
}

/* ------------------------- Delegación de eventos ------------------------- */

function dispatch(name, el, ev) {
  const handler = current.view?.actions?.[name];
  if (handler) handler(el, makeContext(), ev);
}

root.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-action]');
  if (el && root.contains(el) && !el.disabled) dispatch(el.dataset.action, el, ev);
});
root.addEventListener('submit', (ev) => {
  const form = ev.target.closest('form[data-form]');
  if (!form) return;
  ev.preventDefault();
  dispatch(form.dataset.form, form, ev);
});
root.addEventListener('change', (ev) => {
  const el = ev.target.closest('[data-change]');
  if (el) dispatch(el.dataset.change, el, ev);
});
root.addEventListener('input', (ev) => {
  const el = ev.target.closest('[data-input]');
  if (el) dispatch(el.dataset.input, el, ev);
});

/* ------------------------------ Tema ------------------------------ */

export function applyTheme(theme) {
  const dark = theme === 'dark' || (theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => applyTheme(getState().settings.theme));

/* ------------------------------ Arranque ------------------------------ */

subscribe((state) => {
  applyTheme(state.settings.theme);
  render({ keepScroll: true });
});
window.addEventListener('hashchange', () => render());

applyTheme(getState().settings.theme);
const missedMessages = checkMissed();
render();
if (missedMessages.length) teacherToast(missedMessages, 'Bienvenido de nuevo');

// PWA: el service worker permite instalar la app y usarla sin conexión.
// No funciona abriendo el archivo con doble clic (file://), y no pasa nada.
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => { /* sin modo offline */ });
}
