/**
 * Vista "Modo profesor": un docente ve el progreso de sus alumnos.
 *
 * Como Pauta no tiene servidor (es una web estática), el flujo es:
 *   1. Cada alumno exporta su informe (Ajustes → "Informe para el profesor").
 *   2. El docente abre esta vista y carga los archivos recibidos.
 * Los datos se procesan SOLO en el navegador del profesor: no se suben a
 * ningún sitio ni se guardan. El informe contiene lo mínimo necesario
 * (minimización de datos): nombre, porcentajes, notas y puntos débiles.
 *
 * SEGURIDAD: los archivos vienen de fuera, así que se VALIDAN y todo lo que
 * se muestra pasa por html``, que escapa el texto (protección contra XSS).
 */

import { html } from '../ui/html.js';
import { icon } from '../ui/icons.js';
import { teacherSays } from '../ui/components.js';
import { readFileAsText, downloadFile } from '../data/storage.js';
import { buildReport } from '../data/store.js';

let students = [];
let errors = [];
let sortBy = 'student';

/** Comprueba que un objeto tiene la forma de un informe de Pauta y lo limpia. */
export function sanitizeReport(data) {
  if (data?.app !== 'pauta-report' || typeof data.student !== 'string' || !Array.isArray(data.subjects)) {
    throw new Error('no es un informe de Pauta');
  }
  const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);
  const str = (v, max = 80) => (typeof v === 'string' ? v.slice(0, max) : '');
  return {
    student: str(data.student, 60) || 'Sin nombre',
    generatedAt: str(data.generatedAt, 10),
    examDate: str(data.examDate, 10),
    subjects: data.subjects.slice(0, 10).map((s) => ({ name: str(s.name, 40), pct: num(s.pct) ?? 0, mastery: num(s.mastery) ?? 0, completed: num(s.completed) ?? 0, total: num(s.total) ?? 0 })),
    avgScore: num(data.avgScore),
    lastActivity: str(data.lastActivity, 10),
    streak: num(data.streak) ?? 0,
    compliance: num(data.compliance),
    weakPoints: (Array.isArray(data.weakPoints) ? data.weakPoints : []).slice(0, 6).map((w) => str(w)),
    exams: (Array.isArray(data.exams) ? data.exams : []).slice(-10).map((e) => ({ date: str(e.date, 10), subject: str(e.subject, 40), grade: num(e.grade) })),
  };
}

const avgPct = (s) => (s.subjects.length ? s.subjects.reduce((a, x) => a + x.pct, 0) / s.subjects.length : 0);

export default {
  title: 'Modo profesor',
  render() {
    const sorted = [...students].sort((a, b) => {
      if (sortBy === 'progress') return avgPct(b) - avgPct(a);
      if (sortBy === 'score') return (b.avgScore ?? -1) - (a.avgScore ?? -1);
      return a.student.localeCompare(b.student);
    });
    return html`
      <header class="page-head"><div><p class="eyebrow">Para docentes</p><h1>Modo profesor</h1></div>
        <button class="btn btn-sm" data-action="my-report">${icon('download', 16)} Exportar mi informe (alumno)</button></header>
      ${teacherSays('Cada alumno exporta su informe desde **Ajustes** y te lo envía. Cárgalos aquí (puedes elegir varios a la vez) para ver la clase de un vistazo. **Nada se sube a internet**: todo se procesa en este navegador y se olvida al cerrar la pestaña.')}
      <label class="btn btn-primary file-btn">${icon('upload', 16)} Cargar informes (.json)
        <input type="file" accept=".json,application/json" multiple data-change="load-reports" class="sr-only"></label>
      ${errors.map((e) => html`<div class="banner warn">${e}</div>`)}
      ${students.length ? html`
        <div class="toolbar section">
          <label class="field inline">Ordenar por
            <select class="input" data-change="sort">
              ${[['student', 'Nombre'], ['progress', 'Progreso'], ['score', 'Nota media']].map(([v, l]) => html`<option value="${v}" ${sortBy === v ? 'selected' : ''}>${l}</option>`)}
            </select></label>
          <button class="btn btn-ghost btn-sm" data-action="clear-reports">${icon('trash', 16)} Vaciar</button>
        </div>
        <div class="table-wrap"><table class="table">
          <thead><tr><th>Alumno</th><th>Asignaturas</th><th>Nota media</th><th>Racha</th><th>Cumplimiento</th><th>Última actividad</th><th>Puntos débiles</th></tr></thead>
          <tbody>${sorted.map((s) => html`<tr>
            <td><strong>${s.student}</strong><br><span class="small muted">informe del ${s.generatedAt}</span></td>
            <td>${s.subjects.map((x) => html`<div class="small">${x.name}: <strong>${x.pct} %</strong> (${x.completed}/${x.total})</div>`)}</td>
            <td>${s.avgScore === null ? '—' : `${s.avgScore} %`}</td>
            <td>${s.streak} días</td>
            <td>${s.compliance === null ? '—' : `${s.compliance} %`}</td>
            <td>${s.lastActivity || '—'}</td>
            <td class="small">${s.weakPoints.join(' · ') || '—'}</td>
          </tr>`)}</tbody>
        </table></div>` : html`<p class="muted section">Todavía no has cargado ningún informe.</p>`}
      <p class="small muted section">Datos personales: si usas Pauta con alumnos reales, informa a las familias y sigue la normativa de protección de datos de tu centro. Para hacer pruebas, usa datos ficticios.</p>`;
  },
  actions: {
    'load-reports': async (el, ctx) => {
      errors = [];
      for (const file of el.files) {
        try {
          if (file.size > 200_000) throw new Error('archivo demasiado grande');
          const report = sanitizeReport(JSON.parse(await readFileAsText(file)));
          students = [...students.filter((s) => s.student !== report.student), report];
        } catch (err) {
          errors.push(`${file.name}: ${err.message}`);
        }
      }
      ctx.rerender();
    },
    sort: (el, ctx) => { sortBy = el.value; ctx.rerender(); },
    'clear-reports': (el, ctx) => { students = []; errors = []; ctx.rerender(); },
    'my-report': (el, ctx) => {
      const report = buildReport(ctx.state);
      downloadFile(`pauta-informe-${report.student.replace(/[^\p{L}\p{N}]+/gu, '-').toLowerCase()}.json`, JSON.stringify(report, null, 1));
    },
  },
};
