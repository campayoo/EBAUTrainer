/**
 * Vista "Laboratorio": visualizadores interactivos dibujados con <canvas>.
 *   1. Campo gravitatorio / eléctrico de dos cuerpos (principio de superposición).
 *   2. Movimiento armónico simple de un muelle, con gráficas x(t) y v(t) y energías.
 *   3. Una función, su derivada y la recta tangente en un punto.
 *
 * <canvas> es un "lienzo" donde se dibuja con código (líneas, círculos...).
 * Para que se vea nítido en pantallas de alta densidad, el lienzo interno
 * se multiplica por devicePixelRatio.
 */

import { html, cls } from '../ui/html.js';
import { teacherSays } from '../ui/components.js';

let tab = 'campo';
let frame = null; // id de requestAnimationFrame (para pararlo al salir)
const params = {
  campo: { mode: 'grav', a: 5, b: 2 },
  mas: { A: 10, k: 40, m: 0.5 },
  deriv: { fn: 'cubica', x0: 0.5 },
};

const FUNCTIONS = {
  cubica: { label: 'f(x) = x³ − 3x', f: (x) => x ** 3 - 3 * x, range: [-3, 3] },
  seno: { label: 'f(x) = sen x', f: (x) => Math.sin(x), range: [-6.3, 6.3] },
  exp: { label: 'f(x) = eˣ / 4', f: (x) => Math.exp(x) / 4, range: [-3, 3] },
  racional: { label: 'f(x) = 4x / (x² + 1)', f: (x) => (4 * x) / (x * x + 1), range: [-5, 5] },
  parabola: { label: 'f(x) = −x² + 2x + 3', f: (x) => -x * x + 2 * x + 3, range: [-2, 4] },
};

/** Coma decimal a la española: "0.89" -> "0,89". */
const es = (text) => text.replace(/(\d)\.(\d)/g, '$1,$2');

/** Colores del tema actual (claro u oscuro), leídos de las variables CSS. */
function palette() {
  const css = getComputedStyle(document.documentElement);
  const v = (name) => css.getPropertyValue(name).trim();
  return { text: v('--text'), muted: v('--text-muted'), border: v('--border'), primary: v('--primary'), accent: v('--accent'), danger: v('--danger'), ok: v('--ok'), surface: v('--surface') };
}

/** Prepara el canvas a la resolución del dispositivo. Devuelve { ctx, w, h }. */
function setupCanvas(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.parentElement.clientWidth;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h: height };
}

function arrow(ctx, x, y, dx, dy, color, width = 1.5) {
  const len = Math.hypot(dx, dy);
  if (len < 1) return;
  const ux = dx / len;
  const uy = dy / len;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + dx, y + dy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + dx, y + dy);
  ctx.lineTo(x + dx - ux * 6 - uy * 3.5, y + dy - uy * 6 + ux * 3.5);
  ctx.lineTo(x + dx - ux * 6 + uy * 3.5, y + dy - uy * 6 - ux * 3.5);
  ctx.closePath();
  ctx.fill();
}

/* ---------------------- 1. Campo de dos cuerpos ---------------------- */

function drawField(canvas, readout) {
  const { ctx, w, h } = setupCanvas(canvas, 380);
  const c = palette();
  const p = params.campo;
  const electric = p.mode === 'elec';
  const bodies = [
    { x: w * 0.35, y: h / 2, q: p.a },
    { x: w * 0.65, y: h / 2, q: p.b },
  ];
  // Campo en un punto (unidades arbitrarias): superposición de los dos cuerpos.
  const fieldAt = (x, y) => {
    let ex = 0; let ey = 0; let pot = 0;
    for (const b of bodies) {
      const dx = x - b.x; const dy = y - b.y;
      const r = Math.max(12, Math.hypot(dx, dy));
      // Eléctrico: E = kq r̂ / r² (hacia fuera si q > 0). Gravitatorio: g = −Gm r̂ / r² (siempre hacia la masa).
      const s = electric ? b.q : -Math.abs(b.q);
      ex += (s * dx) / r ** 3;
      ey += (s * dy) / r ** 3;
      pot += (electric ? b.q : -Math.abs(b.q)) / r;
    }
    return { ex, ey, pot };
  };

  ctx.clearRect(0, 0, w, h);
  const step = 30;
  for (let x = step / 2; x < w; x += step) {
    for (let y = step / 2; y < h; y += step) {
      const { ex, ey } = fieldAt(x, y);
      const mag = Math.hypot(ex, ey);
      if (mag === 0) continue;
      const len = Math.min(18, 4 + 3 * Math.log10(1 + mag * 1e6));
      const alpha = Math.min(1, 0.25 + Math.log10(1 + mag * 1e6) / 4);
      ctx.globalAlpha = alpha;
      arrow(ctx, x - ((ex / mag) * len) / 2, y - ((ey / mag) * len) / 2, (ex / mag) * len, (ey / mag) * len, c.primary, 1.7);
    }
  }
  ctx.globalAlpha = 1;
  for (const b of bodies) {
    const positive = b.q > 0;
    ctx.fillStyle = electric ? (positive ? c.danger : c.primary) : c.accent;
    ctx.beginPath();
    ctx.arc(b.x, b.y, 10 + Math.abs(b.q) * 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(electric ? (positive ? `+${b.q}` : `${b.q}`) : `${Math.abs(b.q)}`, b.x, b.y);
  }

  canvas.onmousemove = (ev) => {
    const rect = canvas.getBoundingClientRect();
    const { ex, ey, pot } = fieldAt(ev.clientX - rect.left, ev.clientY - rect.top);
    readout.textContent = es(`|${electric ? 'E' : 'g'}| = ${(Math.hypot(ex, ey) * 1e4).toFixed(2)} u.a. · ${electric ? 'V' : 'potencial'} = ${(pot * 100).toFixed(2)} u.a.`);
  };
}

/* ---------------------- 2. Movimiento armónico simple ---------------------- */

function animateMAS(canvas, readout) {
  const { ctx, w, h } = setupCanvas(canvas, 380);
  const c = palette();
  const { A, k, m } = params.mas;
  const omega = Math.sqrt(k / m);
  const T = (2 * Math.PI) / omega;
  const vmax = (A / 100) * omega;
  readout.textContent = es(`ω = ${omega.toFixed(2)} rad/s · T = ${T.toFixed(2)} s · v máx = ${vmax.toFixed(2)} m/s · E = ${(0.5 * k * (A / 100) ** 2).toFixed(3)} J`);
  const t0 = performance.now();
  const trail = [];

  const draw = (now) => {
    const t = (now - t0) / 1000;
    const x = A * Math.cos(omega * t); // cm
    const v = -A * omega * Math.sin(omega * t); // cm/s
    trail.push({ t, x, v });
    while (trail.length && t - trail[0].t > 4) trail.shift();

    ctx.clearRect(0, 0, w, h);
    // Muelle y bloque (parte superior)
    const top = 70;
    const scale = (w * 0.3) / 20; // 20 cm -> 30 % del ancho
    const eq = w / 2;
    const bx = eq + x * scale;
    ctx.strokeStyle = c.muted;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, top - 30); ctx.lineTo(20, top + 30); ctx.stroke();
    ctx.beginPath();
    const coils = 14;
    for (let i = 0; i <= coils; i++) {
      const px = 20 + ((bx - 25 - 20) * i) / coils;
      const py = top + (i === 0 || i === coils ? 0 : i % 2 ? -10 : 10);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.fillStyle = c.accent;
    ctx.fillRect(bx - 25, top - 22, 50, 44);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = c.border;
    ctx.beginPath(); ctx.moveTo(eq, top - 40); ctx.lineTo(eq, top + 40); ctx.stroke();
    ctx.setLineDash([]);

    // Gráficas x(t) y v(t)
    const gTop = 140; const gH = 150; const gMid = gTop + gH / 2;
    ctx.strokeStyle = c.border; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, gMid); ctx.lineTo(w - 20, gMid); ctx.stroke();
    const plot = (key, color, maxVal) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
      trail.forEach((p, i) => {
        const px = 40 + ((p.t - (t - 4)) / 4) * (w - 60);
        const py = gMid - (p[key] / maxVal) * (gH / 2 - 6);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
    };
    plot('x', c.primary, A);
    plot('v', c.danger, A * omega);
    ctx.font = '12px system-ui'; ctx.textAlign = 'left';
    ctx.fillStyle = c.primary; ctx.fillText('x(t)', 44, gTop + 12);
    ctx.fillStyle = c.danger; ctx.fillText('v(t)', 84, gTop + 12);

    // Barras de energía
    const ep = (x / A) ** 2; // fracción de energía potencial
    const barY = 320; const barW = w - 160;
    ctx.fillStyle = c.muted; ctx.fillText('Ep', 40, barY + 10); ctx.fillText('Ec', 40, barY + 34);
    ctx.fillStyle = c.primary; ctx.fillRect(70, barY, barW * ep, 14);
    ctx.fillStyle = c.danger; ctx.fillRect(70, barY + 24, barW * (1 - ep), 14);
    ctx.strokeStyle = c.border; ctx.strokeRect(70, barY, barW, 14); ctx.strokeRect(70, barY + 24, barW, 14);

    frame = requestAnimationFrame(draw);
  };
  frame = requestAnimationFrame(draw);
}

/* ---------------------- 3. Función y derivada ---------------------- */

function drawDerivative(canvas, readout) {
  const { ctx, w, h } = setupCanvas(canvas, 380);
  const c = palette();
  const { f, range } = FUNCTIONS[params.deriv.fn];
  const [x0r, x1r] = range;
  const d = (x) => (f(x + 1e-5) - f(x - 1e-5)) / 2e-5; // derivada numérica
  // Rango vertical a partir de los valores de f y f'
  let ymin = Infinity; let ymax = -Infinity;
  for (let i = 0; i <= 200; i++) {
    const x = x0r + ((x1r - x0r) * i) / 200;
    ymin = Math.min(ymin, f(x), d(x)); ymax = Math.max(ymax, f(x), d(x));
  }
  const pad = (ymax - ymin) * 0.1 || 1;
  ymin -= pad; ymax += pad;
  const X = (x) => 40 + ((x - x0r) / (x1r - x0r)) * (w - 60);
  const Y = (y) => h - 30 - ((y - ymin) / (ymax - ymin)) * (h - 50);

  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = c.border; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(X(x0r), Y(0)); ctx.lineTo(X(x1r), Y(0)); ctx.stroke();
  if (x0r < 0 && x1r > 0) { ctx.beginPath(); ctx.moveTo(X(0), Y(ymin)); ctx.lineTo(X(0), Y(ymax)); ctx.stroke(); }

  const curve = (fn, color, dash = []) => {
    ctx.setLineDash(dash); ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.beginPath();
    for (let i = 0; i <= 400; i++) {
      const x = x0r + ((x1r - x0r) * i) / 400;
      if (i === 0) ctx.moveTo(X(x), Y(fn(x))); else ctx.lineTo(X(x), Y(fn(x)));
    }
    ctx.stroke(); ctx.setLineDash([]);
  };
  curve(f, c.primary);
  curve(d, c.danger, [6, 5]);

  const x0 = x0r + (x1r - x0r) * params.deriv.x0;
  const y0 = f(x0); const m = d(x0);
  ctx.strokeStyle = c.accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(X(x0r), Y(y0 + m * (x0r - x0))); ctx.lineTo(X(x1r), Y(y0 + m * (x1r - x0))); ctx.stroke();
  ctx.fillStyle = c.accent; ctx.beginPath(); ctx.arc(X(x0), Y(y0), 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = c.danger; ctx.beginPath(); ctx.arc(X(x0), Y(m), 4, 0, Math.PI * 2); ctx.fill();

  const trend = Math.abs(m) < 0.02 ? 'tangente horizontal: posible máximo o mínimo' : m > 0 ? 'f es creciente aquí' : 'f es decreciente aquí';
  readout.textContent = es(`x₀ = ${x0.toFixed(2)} · f(x₀) = ${y0.toFixed(2)} · f'(x₀) = ${m.toFixed(2)} → ${trend}`);
}

/* ---------------------- Vista ---------------------- */

const TABS = { campo: 'Campos gravitatorio y eléctrico', mas: 'Movimiento armónico simple', deriv: 'Función y derivada' };

function controls() {
  if (tab === 'campo') {
    const p = params.campo;
    const elec = p.mode === 'elec';
    return html`
      <label class="field inline">Tipo de campo
        <select class="input" data-change="lab-param" data-key="mode">
          <option value="grav" ${!elec ? 'selected' : ''}>Gravitatorio (masas)</option>
          <option value="elec" ${elec ? 'selected' : ''}>Eléctrico (cargas)</option>
        </select></label>
      <label class="field inline">${elec ? 'Carga 1' : 'Masa 1'}: <output>${p.a}</output>
        <input type="range" min="${elec ? -5 : 1}" max="${elec ? 5 : 10}" step="1" value="${p.a}" data-input="lab-param" data-key="a"></label>
      <label class="field inline">${elec ? 'Carga 2' : 'Masa 2'}: <output>${p.b}</output>
        <input type="range" min="${elec ? -5 : 1}" max="${elec ? 5 : 10}" step="1" value="${p.b}" data-input="lab-param" data-key="b"></label>`;
  }
  if (tab === 'mas') {
    const p = params.mas;
    return html`
      <label class="field inline">Amplitud A: <output>${p.A} cm</output><input type="range" min="2" max="20" value="${p.A}" data-input="lab-param" data-key="A"></label>
      <label class="field inline">Constante k: <output>${p.k} N/m</output><input type="range" min="5" max="100" value="${p.k}" data-input="lab-param" data-key="k"></label>
      <label class="field inline">Masa m: <output>${String(p.m).replace('.', ',')} kg</output><input type="range" min="0.1" max="2" step="0.1" value="${p.m}" data-input="lab-param" data-key="m"></label>`;
  }
  const p = params.deriv;
  return html`
    <label class="field inline">Función
      <select class="input" data-change="lab-param" data-key="fn">${Object.entries(FUNCTIONS).map(([id, fn]) => html`<option value="${id}" ${id === p.fn ? 'selected' : ''}>${fn.label}</option>`)}</select></label>
    <label class="field inline">Punto x₀<input type="range" min="0" max="1" step="0.005" value="${p.x0}" data-input="lab-param" data-key="x0"></label>
    <p class="small"><span class="legend" style="--c:var(--primary)">f(x)</span> <span class="legend dashed" style="--c:var(--danger)">f'(x)</span> <span class="legend" style="--c:var(--accent)">recta tangente</span></p>`;
}

const EXPLAIN = {
  campo: 'Cada flecha indica la dirección del campo en ese punto; su opacidad, la intensidad. El campo gravitatorio siempre apunta **hacia** las masas; el eléctrico sale de las cargas positivas y entra en las negativas. Prueba a poner dos cargas de distinto signo, o dos masas distintas, y busca el punto donde el campo se anula. Pasa el ratón por encima para ver los valores (en unidades arbitrarias).',
  mas: 'La masa oscila alrededor de la posición de equilibrio (línea discontinua). Fíjate en que $v$ es máxima donde $x = 0$, y que la energía pasa de potencial a cinética sin perderse. Cambia $k$ o $m$ y observa cómo cambia el periodo $T = 2\\pi\\sqrt{m/k}$; la amplitud no lo cambia.',
  deriv: 'La derivada en un punto es la **pendiente de la recta tangente**. Mueve $x_0$: donde $f\'(x) > 0$ la función crece, donde $f\'(x) < 0$ decrece, y donde $f\'(x) = 0$ la tangente es horizontal (posible extremo).',
};

function initCanvas(root) {
  cancelAnimationFrame(frame);
  const canvas = root.querySelector('#lab-canvas');
  const readout = root.querySelector('#lab-readout');
  if (!canvas) return;
  if (tab === 'campo') drawField(canvas, readout);
  else if (tab === 'mas') animateMAS(canvas, readout);
  else drawDerivative(canvas, readout);
}

let resizeHandler = null;

export default {
  title: 'Laboratorio',
  render() {
    return html`
      <header class="page-head"><div><p class="eyebrow">Visualizadores interactivos</p><h1>Laboratorio</h1></div></header>
      <div class="tabs" role="tablist">${Object.entries(TABS).map(([id, label]) => html`<button role="tab" aria-selected="${tab === id}" class="${cls('tab', tab === id && 'on')}" data-action="lab-tab" data-tab="${id}">${label}</button>`)}</div>
      <section class="card lab">
        <div class="lab-controls">${controls()}</div>
        <div class="canvas-wrap"><canvas id="lab-canvas" role="img" aria-label="${TABS[tab]}"></canvas></div>
        <p id="lab-readout" class="readout" aria-live="polite"></p>
      </section>
      ${teacherSays(EXPLAIN[tab])}`;
  },
  afterRender(root) {
    initCanvas(root);
  },
  mount(root) {
    resizeHandler = () => initCanvas(root);
    window.addEventListener('resize', resizeHandler);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resizeHandler);
    };
  },
  actions: {
    'lab-tab': (el, ctx) => { tab = el.dataset.tab; ctx.rerender(); },
    'lab-param': (el, ctx) => {
      const p = params[tab];
      const key = el.dataset.key;
      p[key] = el.tagName === 'SELECT' ? el.value : Number(el.value);
      if (key === 'mode') { params.campo.a = 5; params.campo.b = params.campo.mode === 'elec' ? -3 : 2; }
      // Los deslizadores no redibujan toda la página (perderían el foco): solo el lienzo y la etiqueta.
      if (el.type === 'range') {
        const out = el.parentElement.querySelector('output');
        if (out) out.textContent = es(key === 'A' ? `${p[key]} cm` : key === 'k' ? `${p[key]} N/m` : key === 'm' ? `${p[key]} kg` : String(p[key]));
        initCanvas(document.getElementById('app'));
      } else {
        ctx.rerender();
      }
    },
  },
};
