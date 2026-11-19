# ADR-0001 · App de escritorio descargable en Kotlin

- **Estado:** ❌ sustituido por el [ADR-0002](0002-web-estatica-github-pages.md). Aparecieron dos requisitos nuevos, publicar en GitHub Pages y que se pudiera descargar, y Pages solo sirve webs estáticas.
- **Fecha:** 2026-11-18

> Un ADR (*Architecture Decision Record*) es un documento corto que explica **una** decisión importante: el contexto, las opciones que había y por qué se eligió una. Es una práctica habitual en empresas y queda muy bien en un portfolio, porque demuestra que las decisiones fueron pensadas.

## Contexto

- La app debe poder **descargarse e instalarse** en un ordenador ("un ejecutable o algo parecido").
- El autor domina **Java/Kotlin y C/SQL**, no TypeScript ni Python, y tiene que poder defender el código en una entrevista.
- El contenido ya viene dentro de la app: el alumno no descarga nada aparte.
- Más adelante habrá funciones que sí necesitan servidor (modo profesor y tutor IA con clave protegida).

## Opciones

### A · Kotlin + Compose Multiplatform (escritorio) ⭐ recomendada

Una aplicación nativa de escritorio hecha con Compose (el mismo sistema de interfaz que Jetpack Compose en Android). Compose genera instaladores `.msi`, `.dmg` y `.deb`. Los datos se guardan en SQLite en el ordenador del alumno.

| Ventajas | Inconvenientes |
|---|---|
| Instalador real, sin dependencias para el usuario (incluye su propio Java) | No hay "enlace web" para enseñarla en 5 segundos (se compensa con GIF y vídeo en el README) |
| Un solo lenguaje, Kotlin, el que estás aprendiendo | No hay KaTeX: las fórmulas hay que renderizarlas con una librería Java (prueba de concepto en la Fase 1) |
| La lógica (`core`) se reutiliza en el servidor (Fase 7) y en Android | Hay que compilar el instalador en cada sistema operativo (CI con matriz Windows/macOS/Linux) |
| Funciona sin conexión | Instaladores sin firmar → avisos de seguridad del sistema |
| SQL escrito a mano con SQLDelight (aprovechas lo que sabes de SQL) | Menos tutoriales que React |

### B · Web en Kotlin (Ktor) empaquetada como ejecutable

Un servidor Ktor que sirve una web. Se distribuye como un `.jar` o un instalador que arranca el servidor en local y abre el navegador, y además se puede desplegar online.

| Ventajas | Inconvenientes |
|---|---|
| Hay enlace web **y** versión descargable | El frontend exige HTML/CSS/JS (o TypeScript), que no dominas |
| KaTeX, gráficas y calendarios web listos para usar | Dos mundos que mantener (servidor + cliente web) |
| Backend en Kotlin, muy valorado en prácticas | "Abrir el navegador en localhost" es menos natural para un alumno |

### C · Stack original (React + TypeScript + FastAPI + PostgreSQL + Docker)

| Ventajas | Inconvenientes |
|---|---|
| Stack muy demandado, con muchísimos tutoriales | Dos lenguajes que no dominas |
| Ecosistema web maduro | **No es descargable** para un usuario normal (requiere Docker) |
| | Más piezas, más difícil de explicar a fondo |

## Decisión propuesta

**Opción A.** Es la única que cumple a la vez "descargable", "en un lenguaje que domino" y "reutilizable". Las piezas de servidor (Ktor, PostgreSQL, Docker, despliegue en Render) llegan en la Fase 7, así que el portfolio también enseña backend.

Si en el futuro quieres una demo web, Compose Multiplatform tiene un destino web (Kotlin/Wasm). No lo he comprobado para producción, así que lo trataríamos como experimento opcional, no como promesa.

## Consecuencias

- Estructura Gradle multimódulo (`core`, `content-loader`, `data`, `desktop-app` y, más adelante, `server`).
- CI con matriz de sistemas operativos para generar los instaladores al crear una etiqueta `v*`.
- La prueba de concepto de fórmulas LaTeX es lo primero de la Fase 1: si falla, se reevalúa esta decisión antes de escribir más código.
