/**
 * Vista "Ajustes": perfil, horario día a día, fecha de examen, tema,
 * tutor IA y gestión de datos (copias de seguridad, informe, borrar todo).
 */

import { html } from '../ui/html.js';
import { icon } from '../ui/icons.js';
import { teacherSays } from '../ui/components.js';
import { WEEKDAY_NAMES, todayISO } from '../core/dates.js';
import { updateProfile, updateStudent, updateSettings, exportBackup, importBackup, buildReport, resetAll } from '../data/store.js';
import { downloadFile, readFileAsText } from '../data/storage.js';

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const MINUTES = [0, 30, 45, 60, 75, 90, 120, 150, 180, 240];
let confirmReset = false;

export default {
  title: 'Ajustes',
  render({ state }) {
    const { profile, settings, student } = state;
    return html`
      <header class="page-head"><div><p class="eyebrow">Configuración</p><h1>Ajustes</h1></div></header>

      <section class="card section">
        <h2>Perfil</h2>
        <form class="form-grid" data-form="save-student">
          <label class="field">Nombre<input class="input" name="name" maxlength="40" required value="${student.name}"></label>
          <label class="field">Nota objetivo<input class="input" name="target" type="number" min="5" max="10" step="0.5" value="${student.targetGrade}"></label>
          <button class="btn btn-primary">Guardar</button>
        </form>
        <a class="link" href="#/bienvenida">${icon('refresh', 14)} Repetir la conversación inicial con el profesor</a>
      </section>

      <section class="card section">
        <h2>Horario y examen</h2>
        <p class="muted small">Al guardar, el profesor replanifica y te explica qué cambia.</p>
        <form data-form="save-schedule">
          <div class="schedule">
            ${DAY_ORDER.map((d) => html`<label class="field">${WEEKDAY_NAMES[d]}
              <select class="input" name="day${d}">${MINUTES.map((m) => html`<option value="${m}" ${profile.availability[d] === m ? 'selected' : ''}>${m ? `${m} min` : 'Libre'}</option>`)}
              ${MINUTES.includes(profile.availability[d]) ? '' : html`<option value="${profile.availability[d]}" selected>${profile.availability[d]} min</option>`}</select></label>`)}
          </div>
          <div class="form-grid">
            <label class="field">Fecha del examen<input class="input" type="date" name="examDate" min="${todayISO()}" value="${profile.examDate}" required></label>
            <label class="field">Hora a la que sueles estudiar (para el calendario)<input class="input" type="time" name="startTime" value="${profile.startTime}"></label>
          </div>
          <p class="small muted">Total semanal: ${profile.availability.reduce((a, b) => a + b, 0)} minutos.</p>
          <button class="btn btn-primary">Guardar horario</button>
        </form>
      </section>

      <section class="card section">
        <h2>Apariencia</h2>
        <div class="chips" role="radiogroup" aria-label="Tema">
          ${[['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([v, l]) => html`<button class="chip ${settings.theme === v ? 'on' : ''}" aria-pressed="${settings.theme === v}" data-action="theme" data-theme="${v}">${l}</button>`)}
        </div>
      </section>

      <section class="card section">
        <h2>Tutor IA (opcional)</h2>
        ${teacherSays('Pega tu clave de la **API de Anthropic** para activar el tutor. Se guarda **solo en este navegador** y solo se envía a api.anthropic.com. No la compartas ni la subas a GitHub: quien la tenga puede gastar tu saldo.')}
        <form class="form-grid" data-form="save-ai">
          <label class="field">Clave de API<input class="input" name="key" type="password" autocomplete="off" placeholder="sk-ant-..." value="${settings.aiKey}"></label>
          <label class="field">Modelo<input class="input" name="model" value="${settings.aiModel}" placeholder="claude-sonnet-5-5"></label>
          <button class="btn btn-primary">Guardar</button>
        </form>
        ${settings.aiKey ? html`<button class="btn btn-ghost btn-sm" data-action="remove-key">${icon('trash', 14)} Borrar la clave</button>` : ''}
      </section>

      <section class="card section">
        <h2>Tus datos</h2>
        <p class="muted small">Todo se guarda en este navegador. Exporta una copia para pasar tu progreso a otro ordenador o para no perderlo.</p>
        <div class="toolbar">
          <button class="btn" data-action="export">${icon('download', 16)} Exportar copia de seguridad</button>
          <label class="btn file-btn">${icon('upload', 16)} Importar copia<input type="file" accept=".json,application/json" class="sr-only" data-change="import"></label>
          <button class="btn" data-action="report">${icon('teacher', 16)} Informe para el profesor</button>
          ${location.protocol.startsWith('http') ? html`<a class="btn" href="./Pauta.html" download>${icon('download', 16)} Descargar Pauta (un solo archivo, sin conexión)</a>` : ''}
        </div>
        <p class="small muted">Para instalarla como aplicación: en Chrome o Edge, menú ⋮ → «Instalar Pauta». Funcionará sin conexión.</p>
        <div class="danger-zone">
          ${confirmReset
            ? html`<p><strong>¿Seguro?</strong> Se borrará todo tu progreso de este navegador.</p><button class="btn btn-danger" data-action="reset">Sí, borrar todo</button> <button class="btn" data-action="cancel-reset">Cancelar</button>`
            : html`<button class="btn btn-ghost" data-action="ask-reset">${icon('trash', 16)} Borrar todos mis datos</button>`}
        </div>
      </section>

      <p class="small muted">Pauta · código bajo licencia MIT · contenido educativo CC BY-SA 4.0 · fórmulas con KaTeX (MIT).</p>`;
  },

  actions: {
    'save-student': (form, ctx) => {
      const data = new FormData(form);
      updateStudent({ name: data.get('name').toString().trim() || ctx.state.student.name, targetGrade: Number(data.get('target')) });
      ctx.toast('Perfil guardado.');
    },
    'save-schedule': (form, ctx) => {
      const data = new FormData(form);
      const availability = [0, 1, 2, 3, 4, 5, 6].map((d) => Number(data.get(`day${d}`)));
      const examDate = data.get('examDate').toString();
      if (examDate <= todayISO()) return ctx.toast('La fecha del examen debe ser posterior a hoy.');
      const messages = updateProfile({ availability, examDate, startTime: data.get('startTime').toString() || '17:00' });
      if (messages.length) ctx.teacherToast(messages);
      else ctx.toast('Guardado.');
    },
    theme: (el) => updateSettings({ theme: el.dataset.theme }),
    'save-ai': (form, ctx) => {
      const data = new FormData(form);
      updateSettings({ aiKey: data.get('key').toString().trim(), aiModel: data.get('model').toString().trim() || 'claude-sonnet-5-5' });
      ctx.toast('Configuración del tutor guardada.');
    },
    'remove-key': (el, ctx) => { updateSettings({ aiKey: '' }); ctx.toast('Clave borrada.'); },
    export: () => downloadFile(`pauta-copia-${todayISO()}.json`, exportBackup()),
    import: async (el, ctx) => {
      const file = el.files[0];
      if (!file) return;
      try {
        importBackup(await readFileAsText(file));
        ctx.toast('Copia importada correctamente.');
      } catch (err) {
        ctx.toast(`No se pudo importar: ${err.message}`);
      }
    },
    report: (el, ctx) => {
      const report = buildReport(ctx.state);
      downloadFile(`pauta-informe-${todayISO()}.json`, JSON.stringify(report, null, 1));
      ctx.toast('Informe descargado. Envíaselo a tu profesor: lo podrá abrir en «Modo profesor».');
    },
    'ask-reset': (el, ctx) => { confirmReset = true; ctx.rerender(); },
    'cancel-reset': (el, ctx) => { confirmReset = false; ctx.rerender(); },
    reset: (el, ctx) => { confirmReset = false; resetAll(); ctx.navigate('bienvenida'); },
  },
};
