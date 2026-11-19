/**
 * sw.js — Service worker: permite INSTALAR Pauta y usarla SIN CONEXIÓN.
 *
 * Un service worker es un script que el navegador ejecuta aparte de la página
 * y que puede interceptar las peticiones de red. Estrategia:
 *   - Al instalarse, guarda en caché lo imprescindible para arrancar.
 *   - En cada petición del propio sitio: responde con la caché si la tiene
 *     y, en paralelo, la actualiza desde la red ("stale-while-revalidate").
 * Al publicar una versión nueva, cambia CACHE para que se descarte la antigua.
 */

const CACHE = 'pauta-v1';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './src/main.js',
  './src/styles/main.css',
  './src/content/content.generated.js',
  './vendor/katex/katex.mjs',
  './vendor/katex/katex.min.css',
  './assets/icons/icon.svg',
  './assets/icons/icon-192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Solo GET del propio sitio (la API del tutor IA nunca se cachea).
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request, { ignoreSearch: true });
      const network = fetch(request)
        .then((response) => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        })
        .catch(() => cached);
      return cached ?? network;
    }),
  );
});
