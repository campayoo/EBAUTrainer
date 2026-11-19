# Guion para presentar Pauta en una entrevista (5-7 minutos)

## 1. El problema (30 s)
> "Preparar la PAU es, sobre todo, un problema de organización: muchas asignaturas, poco tiempo y planes que se rompen en cuanto faltas un día. Quise hacer un profesor virtual que planifique por ti, te dé clase y **se replanifique solo**."

## 2. Demo (2 min)
1. Bienvenida → elegir Matemáticas II, Física y Química, "Matemáticas me cuesta", y en Química «ya hemos dado el bloque A» → se genera el planning (lo dado en clase aparece como repasos).
2. **Hoy** → empezar una clase → fallar a propósito → la corrección detecta el error ("has usado *h* en lugar de *R + h*") → pedir una pista.
3. Terminar la clase → **Planning → Lo que ha cambiado**: el profesor explica qué ha movido.
4. **Laboratorio** (30 s) y **Simulacro** con nota estimada.
5. Enseñar que funciona **sin conexión** con un único archivo `Pauta.html`.

## 3. Decisiones técnicas (2 min)
- **Arquitectura por capas:** `core/` es lógica **pura** sin navegador → se testea con Node. Las vistas solo dibujan el estado.
- **El planificador** es una función pura. Replanificar = volver a llamarla con el estado nuevo, y otra función compara el plan viejo con el nuevo para explicar los cambios. Ordenación topológica para los prerrequisitos, reparto proporcional entre asignaturas, ritmo, y SM-2 para los repasos.
- **Tests de propiedades:** 300 escenarios aleatorios con semilla. En todos se comprueba que nunca se supera el tiempo del día, que se respetan los prerrequisitos y que el plan es determinista. Gracias a ellos encontré dos errores reales (unidades que nunca se llegaban a planificar y repasos duplicados).
- **Contenido como datos:** YAML validado en el CI: fórmulas compiladas con KaTeX, respuestas recalculadas, prerrequisitos sin ciclos. Añadir una asignatura no requiere tocar código.
- **Cambio de plataforma documentado (ADR):** empecé con una app Kotlin de escritorio y cambié a web estática al aparecer el requisito de GitHub Pages. Lo dejé escrito en un ADR.

## 4. Seguridad y datos (45 s)
- Plantillas que **escapan** todo el texto (XSS), validación de archivos importados, nada de `eval` en la app.
- Privacidad por diseño: los datos no salen del navegador. El modo profesor usa informes con lo mínimo imprescindible.
- La clave de la IA la pone cada usuario y nunca está en el código.

## 5. Qué mejoraría (30 s)
- Añadir más ejercicios escritos a mano (las 97 unidades tienen teoría, pero solo 9 tienen ejercicios propios además de los generados).
- Un backend opcional para sincronizar entre dispositivos y un modo profesor en tiempo real (el núcleo ya es independiente del navegador).
- Interfaz en valenciano.

## Preguntas que te pueden hacer
- **¿Por qué sin framework?** No hacía falta para este tamaño, evita un paso de compilación y puedo explicar cada línea. Si creciera, migraría las vistas a un framework sin tocar `core/`.
- **¿Cómo sabes que el planificador funciona?** Por los tests de propiedades y por los casos concretos (refuerzo, peso, fechas pasadas...).
- **¿Qué pasa si el alumno borra el navegador?** Hay copia de seguridad exportable y un aviso si no se puede guardar.
- **¿Qué es SM-2?** El algoritmo de repaso espaciado de SuperMemo: si aciertas, el intervalo hasta el siguiente repaso crece; si fallas, vuelve a 1 día.
