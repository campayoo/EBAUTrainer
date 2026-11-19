# Diseño visual de Pauta

## La idea

Pauta es un profesor. Lo más reconocible de una clase no es un panel de control, sino **el cuaderno del alumno corregido por su profe**. Por eso toda la interfaz parte de esa imagen:

| Elemento del cuaderno | En la app |
|---|---|
| Papel de cuadrícula de 4 mm | Fondo de todas las pantallas (`--square: 16px`) |
| Doble línea roja del margen | Borde izquierdo de la zona de contenido (`.main::before`) |
| Bolígrafo azul (lo que escribe el alumno) | Botones principales, respuestas del alumno, campo de respuesta como un renglón |
| Bolígrafo rojo (lo que escribe el profe) | Notas del profe en cursiva al margen, nota final rodeada, cuenta atrás de la PAU |
| Fosforito | Sección activa del menú, ideas clave, subrayado de los títulos de la teoría |
| Pestañas de colores del archivador | Color de cada asignatura (borde superior de su ficha) |
| Pizarra y tiza | Modo oscuro |

## Colores

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--paper` | `#fbfcfd` | `#1e2925` | Fondo |
| `--grid` | `#e3eaf1` | `#26332e` | Cuadrícula |
| `--ink` | `#1d3a8a` | `#9fc0ff` | Acciones del alumno |
| `--pen` | `#c42b2b` | `#ff9a8f` | Voz del profe y correcciones |
| `--marker` | `#ffeb6b` | `#f2dd77` | Fosforito |
| `--text` | `#23262d` | `#ecefe7` | Texto (grafito / tiza) |

Contraste: el texto principal y la tinta azul superan 4,5:1 sobre el papel (WCAG AA). El rojo se usa sobre fondo blanco y en tamaño de lectura normal o mayor.

## Tipografía

- **Bitter** (slab serif, licencia OFL): títulos, números grandes y, en cursiva, la voz del profe. Recuerda a los libros de texto.
- **Fira Sans** (licencia OFL): texto de lectura e interfaz. Muy legible en pantalla y con buenos números.
- Las fuentes van **dentro del proyecto** (`vendor/fonts/`, recortadas a los caracteres latinos y matemáticos que usamos, en WOFF). No se descargan de Google Fonts: la app funciona sin internet y no comparte datos con terceros. Licencias en `vendor/fonts/OFL-*.txt`.

## Decisiones conscientes

- **Nada de etiquetas en MAYÚSCULAS espaciadas** ni de sombras iguales en todas las tarjetas. Los antetítulos (fecha, ruta del tema) van en cursiva, como se escribe la fecha en la esquina de una hoja.
- **Solo un momento animado**: en la portada, el profe "corrige" el ejercicio (tics, nota rodeada y comentario). Se desactiva si el sistema pide movimiento reducido.
- **Numeración solo donde hay secuencia**: los pasos de la clase y "Cómo funciona" van numerados porque son un orden real.
- **Accesibilidad**: foco visible en todo, enlace "Saltar al contenido", los selectores usan `aria-pressed`, las tablas usan `<th scope="col">`, y el diseño se adapta hasta 360 px de ancho (en móvil el menú pasa abajo).

## Archivos

- `src/styles/main.css`: estilos de la app, comentados por secciones.
- `site/index.html` y `site/landing.css`: portada de GitHub Pages. La lista de asignaturas la genera `tools/build.mjs` a partir del contenido.
- `assets/icons/icon.svg`: el icono (una "P" de tinta sobre cuadrícula, subrayada con fosforito). Los PNG se generan a partir de él.
