# ADR-0002 · Web estática en JavaScript, publicable en GitHub Pages

- **Estado:** aceptado (sustituye al [ADR-0001](0001-app-escritorio-kotlin.md))
- **Fecha:** 2026-11-18

## Contexto

Después de la Fase 0 aparecieron dos requisitos nuevos:

1. Que la app se pueda **publicar en GitHub Pages**.
2. Que se pueda **descargar e iniciar** en un ordenador ("un ejecutable, una web o algo parecido").

GitHub Pages **solo sirve archivos estáticos** (HTML, CSS, JavaScript, imágenes): no ejecuta Java, Kotlin, Python ni bases de datos. Una app de escritorio Kotlin no se puede alojar allí, y una web con backend propio tampoco.

## Decisión

Pauta es una **aplicación web estática**, escrita en **JavaScript moderno (módulos ES) sin frameworks** y sin paso de compilación obligatorio:

| Necesidad | Solución |
|---|---|
| Publicar en internet | GitHub Pages (workflow `pages.yml`) |
| "Instalar" como una app | **PWA**: manifiesto + service worker → Chrome/Edge permiten instalarla, con su propia ventana y uso sin conexión |
| Descargar y abrir sin nada más | **`Pauta.html`**: un único archivo con todo dentro (generado con esbuild). Se abre con doble clic |
| Guardar el progreso | `localStorage` del navegador + copia de seguridad exportable en JSON |
| Contenido educativo | YAML en `content/` → validado y compilado a `src/content/content.generated.js` |
| Fórmulas | KaTeX incluido en `vendor/` (funciona sin conexión) |
| Modo profesor sin servidor | Cada alumno exporta un informe JSON y el profesor lo carga en su navegador |
| Tutor IA | Opcional: la API de Claude se llama desde el navegador con la clave del propio usuario |

### ¿Por qué JavaScript "a pelo" y no React, TypeScript o Kotlin/Wasm?

- **Sin compilación obligatoria**: GitHub Pages sirve el repositorio tal cual. Menos piezas = menos cosas que pueden fallar y más fácil de explicar.
- **El autor no domina TypeScript ni React**: con JavaScript sencillo, cuya sintaxis se parece a la de Java, cada línea es defendible en una entrevista. Todo el código está comentado en castellano.
- **Kotlin/Wasm (Compose para web)** sería coherente con DAM, pero no se podía compilar en el entorno donde se construyó el proyecto (sin acceso a los repositorios de Gradle) y su soporte web era reciente. Queda como posible evolución.

## Consecuencias

- ✅ Web, PWA instalable y archivo descargable con el **mismo código**.
- ✅ Cero coste de alojamiento y sin servidor que mantener.
- ✅ La privacidad es sencilla: los datos del alumno nunca salen de su navegador.
- ⚠️ Sin servidor no hay sincronización entre dispositivos: se compensa con exportar/importar la copia de seguridad.
- ⚠️ El modo profesor funciona con archivos, no en tiempo real.
- ⚠️ Con el tutor IA, la clave de API vive en el navegador del usuario. Por eso es **opcional** y cada uno usa **su propia** clave. Nunca se publica una clave en el repositorio.
- ⚠️ Se pierde la parte de backend (Spring/Ktor, PostgreSQL, Docker) del plan inicial. Si en el futuro se quiere sincronización o un modo profesor en tiempo real, se añadiría un backend aparte sin tocar el núcleo (`src/core/`), que no depende del navegador.
