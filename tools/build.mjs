#!/usr/bin/env node
/**
 * build.mjs — Prepara la versión publicable y la versión DESCARGABLE.
 *
 * Uso:  npm run build
 *
 * Genera:
 *   dist/Pauta.html   Un ÚNICO archivo con todo dentro (JS, CSS, fórmulas y
 *                     fuentes). Se abre con doble clic, sin internet y sin
 *                     instalar nada.
 *   _site/            La web lista para GitHub Pages (la usa el workflow
 *                     .github/workflows/pages.yml), que incluye también
 *                     Pauta.html para que se pueda descargar desde la web.
 *
 * Usa esbuild para "empaquetar" (bundle): junta todos los módulos en uno y
 * los minimiza, y convierte las fuentes de KaTeX en datos incrustados.
 */
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadContent, validateContent, compileContent } from './content-lib.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const site = join(root, '_site');

// 1. Contenido: validar y regenerar (por si alguien olvidó hacerlo).
const content = loadContent(join(root, 'content'));
const errors = validateContent(content);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
writeFileSync(
  join(root, 'src/content/content.generated.js'),
  `// AUTO-GENERADO por tools/build-content.mjs a partir de content/*.yaml.\n// NO lo edites a mano: edita los YAML y ejecuta "npm run build:content".\nexport default ${JSON.stringify(compileContent(content), null, 1)};\n`,
);

// 2. JavaScript: todos los módulos en uno, formato IIFE (funciona sin servidor).
const js = await build({
  entryPoints: [join(root, 'src/main.js')],
  bundle: true,
  format: 'iife',
  minify: true,
  write: false,
  target: ['es2020'],
  legalComments: 'none',
});
const jsCode = js.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');

// 3. CSS: estilos de KaTeX + los nuestros, con las fuentes incrustadas.
const css = await build({
  stdin: {
    contents: '@import "./vendor/katex/katex.min.css";\n@import "./src/styles/main.css";',
    resolveDir: root,
    loader: 'css',
  },
  bundle: true,
  minify: true,
  write: false,
  loader: { '.woff2': 'dataurl' },
});
const cssCode = css.outputFiles[0].text;

// 4. HTML: sustituimos los enlaces externos por el código incrustado.
const icon = `data:image/svg+xml;base64,${readFileSync(join(root, 'assets/icons/icon.svg')).toString('base64')}`;
const page = readFileSync(join(root, 'index.html'), 'utf8')
  .replace(/<!-- build:css -->[\s\S]*?<!-- \/build:css -->/, () => `<style>${cssCode}</style>`)
  .replace(/<!-- build:js -->[\s\S]*?<!-- \/build:js -->/, '')
  .replace(/<link rel="manifest"[^>]*>\s*/, '')
  .replace(/<link rel="apple-touch-icon"[^>]*>\s*/, '')
  .replace(/href="assets\/icons\/icon.svg"/, `href="${icon}"`)
  .replace('</body>', () => `<script>${jsCode}</script>\n</body>`);

mkdirSync(dist, { recursive: true });
writeFileSync(join(dist, 'Pauta.html'), page);
const kb = Math.round(Buffer.byteLength(page) / 1024);
console.log(`✓ dist/Pauta.html (${kb} KB): ábrelo con doble clic.`);

// 5. Carpeta de GitHub Pages.
if (existsSync(site)) rmSync(site, { recursive: true });
mkdirSync(site);
for (const item of ['index.html', 'manifest.webmanifest', 'sw.js', 'src', 'vendor', 'assets']) {
  cpSync(join(root, item), join(site, item), { recursive: true });
}
cpSync(join(dist, 'Pauta.html'), join(site, 'Pauta.html'));
writeFileSync(join(site, '.nojekyll'), ''); // que GitHub Pages no procese la web con Jekyll
console.log('✓ _site/ listo para GitHub Pages.');
