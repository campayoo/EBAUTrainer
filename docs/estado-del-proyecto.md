# Estado del proyecto (v1.0.0)

## Qué está hecho

| Fase | Estado | Detalle |
|---|---|---|
| 0 · Planificación | ✅ | [Plan](fase-0-plan.md), [ADR-0001](adr/0001-app-escritorio-kotlin.md) (descartado) y [ADR-0002](adr/0002-web-estatica-github-pages.md) |
| 1 · Esqueleto | ✅ | Web estática, CI con GitHub Actions, PWA, servidor local, build de un solo archivo |
| 2 · Contenido y asignaturas | ✅ | Formato YAML con validación automática; 5 asignaturas (Matemáticas II, Física, Química, Biología y MACS II), 97 unidades; «¿Por dónde vas en clase?» para marcar lo ya dado en el instituto; pantalla "Mis asignaturas" para añadir, quitar y cambiar el peso |
| 3 · Onboarding y planning | ✅ | Conversación inicial con prueba opcional; planificador puro con 15 tests (uno de ellos con 300 escenarios aleatorios); vista semanal y diaria; exportación `.ics` |
| 4 · Clase diaria | ✅ | Calentamiento → explicación → ejemplo → práctica con pistas → test → cierre. **97 clases completas**: todo el temario de las cinco asignaturas. Las primeras 9 llevan además ejercicios escritos a mano; el resto practica con ejercicios generados |
| 5 · Progreso y replanificación | ✅ | SM-2, refuerzos, faltas, ritmo y consolidación; estadísticas y gráficas |
| 6 · Simulacros, generador, visualizadores | ✅ | 66 generadores; simulacros con estructura PAU; 3 visualizadores |
| 7 · Tutor IA y modo profesor | ✅* | Tutor con la API de Claude (clave propia); modo profesor con informes JSON (sin servidor) |
| 8 · Pulido | 🟡 | Documentación, capturas, accesibilidad básica y modo oscuro hechos. Falta el GIF de demo y una auditoría de accesibilidad con lector de pantalla |

\* Ver "Qué no se ha podido probar".

## Cómo probarlo

```bash
node tools/serve.mjs            # abre http://localhost:5173
npm install && npm test         # 45 tests
npm run build                   # dist/Pauta.html → doble clic
```

Recorrido recomendado:
1. Haz la bienvenida con varias asignaturas; en alguna, responde «Sí, ya hemos dado temas» y marca un bloque. Comprueba que esas unidades salen como repasos y no como clases.
2. En **Hoy**, empieza la primera clase. Falla un ejercicio a propósito, pide pistas y mira la solución.
3. Termina la clase y mira en **Planning → Lo que ha cambiado** cómo se ha replanificado.
4. En **Asignaturas**, cambia una asignatura a "Me cuesta más" y lee la explicación del profesor.
5. Haz un **Simulacro** y mira el análisis de errores.

## Qué falta (trabajo futuro)

- **Más ejercicios escritos a mano.** Las 97 unidades tienen teoría, ejemplo resuelto y resumen; 9 tienen además ejercicios propios, y el resto practica con los 105 generadores. Los exámenes de Química, Biología y MACS II tienen una estructura orientativa que hay que confirmar con la guía oficial. Siguiente paso: añadir ejercicios tipo PAU de redacción propia, en lotes pequeños, y revisar la teoría con un profesor.
- **Pendiente de confirmar con la guía oficial de la PAU:** la duración exacta de cada examen (está puesta a 90 min) y qué bloques corresponden a los apartados 2 y 3 de Matemáticas II. Se cambia en `content/*/exam.yaml`, sin tocar código.
- Confirmar con el anexo del Decreto 108/2022 que intervalos de confianza y contraste de hipótesis **no** entran en Matemáticas II (por eso no están en el temario).
- Valenciano en la interfaz.
- Sincronización entre dispositivos (necesitaría un backend; hoy se hace con exportar/importar).
- GIF de demostración para el README.

## Qué no se ha podido probar (y cómo hacerlo)

- **Tutor IA:** el código sigue el formato documentado de la API de Mensajes de Anthropic, pero no se ha llamado a la API real (el entorno de desarrollo no tenía acceso). Pruébalo con tu clave en *Ajustes*. Si el modelo por defecto (`claude-sonnet-5-5`) no está disponible en tu cuenta, cambia el nombre del modelo en *Ajustes*.
- **Workflows de GitHub Actions:** están escritos con las acciones oficiales (`actions/checkout@v4`, `setup-node@v4`, `upload-pages-artifact@v3`, `deploy-pages@v4`), pero se ejecutarán por primera vez cuando subas el repositorio. Si alguno falla, el mensaje del log indica qué versión cambiar.
- **`npm install`:** las versiones de `package.json` son las que había disponibles en el entorno de desarrollo. Al instalar se generará `package-lock.json`: súbelo al repositorio.
- **Instalación PWA:** probada la carga, el registro del service worker y el funcionamiento sin conexión del archivo único; la instalación desde el menú de Chrome hay que probarla a mano.

## Qué podría salir mal

| Riesgo | Mitigación |
|---|---|
| El alumno borra los datos del navegador y pierde su progreso | Aviso en Ajustes y copia de seguridad exportable. Si el navegador no deja guardar, aparece un aviso |
| Una solución del contenido es incorrecta | Cada respuesta tiene un `check` que se recalcula en el CI. Aun así, conviene revisar las explicaciones |
| Cambia el formato de la PAU | La estructura está en `exam.yaml`, no en el código |
| Alguien sube una clave de API al repositorio | La clave solo se escribe en la interfaz, nunca en archivos; `.env` está en `.gitignore` |
