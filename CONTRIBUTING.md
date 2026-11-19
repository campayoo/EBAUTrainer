# Cómo contribuir

¡Gracias por querer mejorar Pauta! La forma más útil de ayudar es **escribir contenido**: clases completas para las unidades que aún son "exprés".

## Añadir o mejorar contenido

1. Lee [docs/formato-contenido.md](docs/formato-contenido.md).
2. Crea `content/<asignatura>/units/<id-de-la-unidad>.yaml` (copia uno existente como plantilla).
3. Reglas:
   - **Ejercicios originales.** No copies enunciados de exámenes oficiales ni de libros.
   - Cada respuesta numérica lleva un `check` (la expresión que la calcula) y su unidad.
   - Exactamente **3 pistas**: idea general → fórmula o método → primer paso.
   - Usa las constantes habituales de la PAU (por ejemplo, $G = 6{,}67\cdot10^{-11}$).
4. Ejecuta `npm run build:content`: si hay errores de cálculo, de LaTeX o de formato, te dirá dónde.
5. Ejecuta `npm test` y abre un pull request.

## Añadir una asignatura

Crea `content/<carpeta>/subject.yaml` (temario) y `exam.yaml` (simulacro). Si necesitas ejercicios generados nuevos, añade generadores en `src/core/generators/` y regístralos en `index.js`.

## Código

- JavaScript con módulos ES, sin frameworks. Comentarios en castellano.
- La lógica va en `src/core/` como **funciones puras** con tests.
- Commits convencionales: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `content:`.
- Antes de subir: `npm run lint && npm test && npm run build`.
