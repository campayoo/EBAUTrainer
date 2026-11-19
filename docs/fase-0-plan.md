# Fase 0 · Planificación

> Proyecto: **Pauta** (nombre provisional; antes "EBAU Trainer")
> Autor: Pablo Campayo Viñes · Estado: **cerrada**. La plataforma cambió después: ver [ADR-0002](adr/0002-web-estatica-github-pages.md) y el [estado del proyecto](estado-del-proyecto.md).

Este documento recoge las decisiones de la Fase 0. Va acompañado de:

| Documento | Contenido |
|---|---|
| [`arquitectura.md`](arquitectura.md) | Diagrama de arquitectura, módulos, stack y algoritmo de planning |
| [`modelo-datos.md`](modelo-datos.md) | Diagrama entidad-relación (Mermaid) y por qué está diseñado así |
| [`formato-contenido.md`](formato-contenido.md) | Estructura curricular propuesta y formato YAML del contenido |
| [`adr/0001-app-escritorio-kotlin.md`](adr/0001-app-escritorio-kotlin.md) | Decisión de plataforma (escritorio descargable vs. web) |

---

## 1. Lo que me has respondido y cómo lo interpreto

| Pregunta | Respuesta | Consecuencia |
|---|---|---|
| Comunidad | Comunitat Valenciana | Formato y bloques de la **PAU valenciana** (desde 2025 se llama PAU, no EBAU) |
| Lenguajes | Java/Kotlin, C/SQL | Cambio el stack propuesto: **todo en Kotlin**, con SQL escrito a mano |
| Plataforma | Web responsive + "un ejecutable o algo **descargable**" | Recomiendo **app de escritorio con instalador** (ver ADR-0001) |
| Plazo | Sin fecha fija | Fase a fase, pero con un MVP claro (v0.1) para tener algo enseñable pronto |

### Por qué cambio el stack de tu propuesta original

Tu propuesta (React + TypeScript + FastAPI + PostgreSQL + Docker) es un stack profesional, pero tiene dos problemas para **ti**:

1. **No dominas ni TypeScript ni Python.** En una entrevista te preguntarán por el código; tienes que poder defender cada línea.
2. **No es descargable.** Para usarla, un alumno tendría que instalar Docker y ejecutar comandos. Eso no es un ejecutable.

Con **Kotlin + Compose Multiplatform** consigues un instalador de verdad (`.msi` para Windows, `.dmg` para macOS, `.deb` para Linux), en el lenguaje que estás aprendiendo en DAM, y reutilizable más adelante para Android. El backend, Docker y PostgreSQL no desaparecen: llegan en la Fase 7 (modo profesor y tutor IA), donde sí hacen falta.

---

## 2. Nombre

| Opción | Comentario |
|---|---|
| **Pauta** ⭐ | Juego de palabras: *pauta* (plan, guía) + **PAU**. Corto, en castellano y valenciano |
| Profe PAU | Muy descriptivo, menos elegante |
| EBAU Trainer | Ya no se llama EBAU en tu comunidad y suena genérico |

Recomendación: **Pauta**, con el subtítulo *"tu profesor virtual para la PAU"*. Antes de crear el repo, comprueba que el nombre del repositorio está libre (finalmente: `EBAUTrainer`).

---

## 3. Alcance del MVP (versión 0.1, Fases 1-4)

**Objetivo de la v0.1:** un alumno descarga el instalador, hace el onboarding, recibe su planning semanal y puede dar **una clase completa** de Matemáticas II (matrices y determinantes) y otra de Física (campo gravitatorio).

### Entra en el MVP

- Instalador para Windows (y macOS/Linux generados por CI) publicado en GitHub Releases.
- Un único alumno por instalación, con todos los datos en local (SQLite).
- Onboarding conversacional: nombre, asignaturas, nivel declarado, días y horas, fecha de examen y nota objetivo. Se puede editar.
- "Mis asignaturas": Física y Matemáticas II; añadir o quitar asignaturas y cambiar su peso.
- **Esqueleto curricular completo**: todos los bloques, temas y unidades con título, duración estimada, dificultad y prerrequisitos (así el planning es realista para todo el curso).
- **Contenido completo** solo en:
  - Mat. II → Álgebra → *Matrices* y *Determinantes* (≈ 6 unidades).
  - Física → *Campo gravitatorio* (≈ 5 unidades).
  - El resto de unidades muestran "contenido en preparación".
- Algoritmo de planning (funciones puras + tests) y vista semanal y diaria.
- Replanificación al **añadir o quitar asignatura** o al cambiar horario o fecha de examen.
- Clase diaria completa: calentamiento → explicación → ejemplo resuelto → práctica guiada con pistas por niveles → mini test → cierre.
- Ejercicios tipo test y numéricos con tolerancia y unidades; corrección automática.
- Exportación del planning a `.ics`.
- Fórmulas renderizadas (LaTeX).

### No entra en el MVP (fases posteriores)

| Funcionalidad | Fase |
|---|---|
| Repaso espaciado SM-2 completo, replanificación por rendimiento o por faltar, estadísticas | 5 |
| Simulacros cronometrados, generador de ejercicios con parámetros, visualizadores | 6 |
| Tutor IA (Claude), modo profesor, servidor Ktor + PostgreSQL + Docker | 7 |
| Valenciano en la interfaz, cliente Android | Extra |

---

## 4. Fases revisadas

| Fase | Entregable ejecutable | Tamaño |
|---|---|---|
| 0 · Planificación | Estos documentos | — |
| 1 · Esqueleto | Repo Gradle multimódulo, ventana Compose que arranca, SQLite conectado, **prueba de concepto de LaTeX**, CI (lint + tests) y primer instalador en Releases | M |
| 2 · Contenido | Formato YAML, validador, carga en SQLite, pantalla "Mis asignaturas", primer lote de contenido | M |
| 3 · Onboarding y planning | Conversación inicial, algoritmo de planning con tests, calendario semanal y diario, `.ics` | L |
| 4 · Clase diaria | Flujo completo de sesión con contenido real de matrices, determinantes y campo gravitatorio | L |
| 5 · Progreso y repaso | SM-2, replanificación automática con explicación, estadísticas | M |
| 6 · Simulacros y generador | Modo examen PAU, plantillas con parámetros, 3 visualizadores | L |
| 7 · Tutor IA y profesor | Servidor Ktor + PostgreSQL en Docker, sincronización opcional, tutor IA | L |
| 8 · Pulido | Accesibilidad, rendimiento, docs en inglés, GIF de demo, guion de entrevista | M |

---

## 5. Avisos antes de seguir (seguridad, licencias, datos)

1. **Contenido original y correcto.** Escribiré explicaciones y ejercicios propios. Los exámenes oficiales solo se **enlazan** (universitats.gva.es). Cada solución numérica se comprobará con un test que la recalcule. Aun así, puedo equivocarme: revisa cada lote y, si dudo de algo, te lo marcaré.
2. **Licencias.**
   - Código: **MIT**. Contenido educativo: **CC BY-SA 4.0** (otros pueden reutilizarlo citándote y compartiendo igual). Si no quieres uso comercial, CC BY-NC-SA 4.0.
   - Revisaré la licencia de cada dependencia antes de añadirla. Ojo con JLaTeXMath (renderizado de fórmulas): creo que es GPL con excepción de enlace y lo verificaremos en la Fase 1.
3. **Datos personales.** En el MVP no sale nada del ordenador del alumno. En la Fase 7 (modo profesor) habría datos de alumnos de bachillerato, muchos menores de edad. Para el portfolio usaremos **solo datos ficticios** y lo dejaremos documentado.
4. **Clave de la API de Claude.** **Nunca** irá dentro del ejecutable, porque cualquiera podría extraerla. O la introduce cada usuario (y se guarda en local) o se usa a través del servidor de la Fase 7. Los `.env` irán en `.gitignore` desde el primer commit.
5. **Instaladores sin firmar.** Windows (SmartScreen) y macOS (Gatekeeper) avisarán de que la app es "de un desarrollador desconocido". Firmar cuesta dinero; lo explicaremos en el README con instrucciones para abrirla.
6. **Riesgo técnico: fórmulas en Compose Desktop.** No existe un KaTeX nativo. Haremos una **prueba de concepto en la Fase 1** antes de construir encima.
7. **El formato de la PAU cambia.** La estructura del examen irá en el contenido (`exam.yaml`), no en el código.
8. **Alcance.** El proyecto es grande. La regla: cada fase termina con algo ejecutable, y lo que no cabe se apunta para más adelante.

---

## 6. Lo que necesito que confirmes

1. **Plataforma:** app de escritorio Kotlin (opción A del ADR-0001), ¿sí o prefieres B o C?
2. **Nombre:** ¿Pauta?
3. **Estructura curricular** de [`formato-contenido.md`](formato-contenido.md), en especial:
   - Física pasa de 7 a **4 bloques** (los del currículo LOMLOE y la PAU valenciana).
   - Quito **intervalos de confianza y contraste de hipótesis** de Matemáticas II (son de Matemáticas Aplicadas a las CC. SS. II).
4. **Idioma de la interfaz:** castellano, preparada para añadir valenciano después (los textos irán en ficheros de recursos desde el principio).
5. **Licencia del contenido:** CC BY-SA 4.0 o CC BY-NC-SA 4.0.

Con tu OK empezamos la **Fase 1**.
