#!/usr/bin/env node
/**
 * serve.mjs — Servidor local mínimo para desarrollar (sin dependencias).
 * Uso: npm start   ->   http://localhost:5173
 *
 * Hace falta un servidor (y no abrir index.html con doble clic) porque los
 * módulos de JavaScript (import/export) no se cargan desde file://.
 * Para usar la app sin servidor, está la versión de un solo archivo
 * (npm run build -> dist/Pauta.html).
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)), process.argv[2] ?? '.');
const port = Number(process.env.PORT ?? 5173);
const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.woff2': 'font/woff2', '.ics': 'text/calendar',
};

createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = normalize(join(root, path));
    if (!file.startsWith(root)) throw new Error('fuera de la carpeta'); // evita "../../" (path traversal)
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': `${TYPES[extname(file)] ?? 'application/octet-stream'}; charset=utf-8`, 'cache-control': 'no-cache' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('No encontrado');
  }
}).listen(port, () => console.log(`Pauta en http://localhost:${port}`));
