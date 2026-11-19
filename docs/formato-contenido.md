# Contenido: estructura curricular y formato de los archivos

## 1. Estructura curricular propuesta (Comunitat Valenciana)

Referencias: currículo LOMLOE (RD 243/2022, desarrollado en la Comunitat Valenciana por el **Decreto 108/2022**) y los documentos de las comisiones de materia de la PAU 2026. En la Fase 2 revisaré el anexo del decreto tema por tema antes de escribir contenido.

### Física — 4 bloques (no 7)

El currículo LOMLOE y la PAU valenciana organizan Física en **4 bloques**. El examen tiene un apartado por bloque:

| Bloque | Puntos en la PAU | Temas |
|---|---|---|
| **A. Campo gravitatorio** | 2 | A1 Ley de gravitación e intensidad de campo (superposición) · A2 Potencial, energía potencial y carácter conservativo · A3 Órbitas: velocidad orbital y de escape, energía de satélites, leyes de Kepler y momento angular |
| **B. Campo electromagnético** | 3 | B1 Campo eléctrico (Coulomb, superposición, líneas) · B2 Potencial, energía y movimiento de cargas · B3 Flujo y teorema de Gauss · B4 Fuerza de Lorentz y movimiento de cargas · B5 Campos creados por corrientes y fuerza entre conductores · B6 Inducción (Faraday-Lenz, alternadores, transformadores) |
| **C. Vibraciones y ondas** | 3 | C1 MAS y energía · C2 Ondas: ecuación y magnitudes · C3 Sonido: intensidad, nivel sonoro y fenómenos ondulatorios · C4 Naturaleza de la luz y espectro EM · C5 **Óptica geométrica**: refracción, espejos, lentes delgadas, prismas, el ojo e instrumentos |
| **D. Física relativista, cuántica, nuclear y de partículas** | 2 | D1 Relatividad especial · D2 Cuántica: efecto fotoeléctrico, De Broglie, incertidumbre · D3 Nuclear: radiactividad, energía de enlace, fisión y fusión · D4 Modelo estándar, interacciones y aceleradores |

**Cambios respecto a tu propuesta:** eléctrico, magnético e inducción se juntan en el bloque B; la óptica pasa a estar dentro de ondas; se añaden el teorema de Gauss y la física de partículas, que están en el currículo actual.

> Optatividad: un apartado es obligatorio y en los otros tres se elige entre dos opciones. Esto se modela en `exam.yaml`, no en el código.

### Matemáticas II — 5 bloques de estudio, 4 apartados de examen

En la PAU valenciana hay **4 ejercicios de 2,5 puntos**. El de **Probabilidad y Estadística es obligatorio**; en los otros tres se elige entre opciones. Para el planning, Análisis se divide en dos bloques, porque es mucho temario:

| Bloque de estudio | Apartado PAU | Temas |
|---|---|---|
| **Álgebra lineal** | Álgebra | Matrices y operaciones · Determinantes · Rango e inversa · Ecuaciones matriciales · Sistemas: Gauss, Rouché-Frobenius y discusión con parámetros |
| **Geometría en el espacio** | Geometría *(a confirmar)* | Vectores y productos escalar, vectorial y mixto · Rectas y planos · Posiciones relativas · Ángulos y distancias · Áreas y volúmenes |
| **Análisis: funciones y derivadas** | Análisis | Límites y continuidad · Bolzano · Derivabilidad y reglas · Rolle y valor medio · Monotonía, extremos y optimización · Representación gráfica |
| **Análisis: integrales** | Análisis | Primitivas · Por partes y cambio de variable · Integral definida y teorema fundamental · Áreas |
| **Probabilidad y estadística** | Probabilidad (obligatorio) | Probabilidad condicionada y total · Bayes · Variable aleatoria · Binomial · Normal y tipificación |

**Cambio respecto a tu propuesta:** quito **intervalos de confianza y contraste de hipótesis**. Por lo que he comprobado, pertenecen a *Matemáticas Aplicadas a las CC. SS. II*, no a Matemáticas II. Lo confirmaré con el anexo del decreto en la Fase 2. Si un día se añade MACS II como asignatura, irán allí.

> **Por confirmar en la Fase 2:** la duración exacta de cada examen y qué bloque corresponde a los apartados 2 y 3 de Matemáticas II. Lo sacaré de los documentos oficiales de universitats.gva.es.

## 2. Organización de los archivos

```
content/
├── LICENSE                         # CC BY-SA 4.0
├── fisica/
│   ├── subject.yaml                # bloques, temas y unidades (todo el temario)
│   ├── exam.yaml                   # estructura del simulacro PAU
│   └── units/
│       └── fis.grav.campo.u01.yaml # clase completa de una unidad
└── matematicas-ii/
    ├── subject.yaml
    ├── exam.yaml
    └── units/…
```

- **`subject.yaml`** define TODO el temario. Cada unidad tiene: `id`, `title`, `minutes`, `difficulty` (1-5), `requires` (prerrequisitos) y `generators` (plantillas de ejercicios de `src/core/generators/`).
- **`units/<id>.yaml`** es opcional. Si existe, la unidad tiene **clase completa**; si no, Pauta ofrece una **clase exprés** con ejercicios generados.
- **Añadir una asignatura** (Química, por ejemplo) = crear `content/quimica/` con sus YAML y ejecutar `npm run build:content`. El código de la app no cambia.

## 3. Formato de una clase completa

```yaml
id: mat2.alg.determinantes.u01
objectives: [Calcular determinantes de orden 2 y 3 sin errores de signo.]

explanation:                # tarjetas de teoría (Markdown + LaTeX entre $...$)
  - title: ¿Qué es un determinante?
    body: |
      Para orden 2: $$\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$$

examples:                   # ejemplo resuelto: los pasos se muestran uno a uno
  - title: Un determinante de orden 3 con Sarrus
    statement: 'Calcula $\det(A)$ ...'
    steps: ['**Productos que suman:** ...', '**Productos que restan:** ...']
    result: 'Como $\det(A) \neq 0$, la matriz tiene inversa.'

practice:                   # práctica guiada: pistas y varios intentos
  - id: mat2.alg.determinantes.u01.p1
    kind: numeric
    statement: 'Calcula $\begin{vmatrix} 3 & -2 \\ 5 & 4 \end{vmatrix}$.'
    answer:
      value: 22
      tolerance: { absolute: 0 }       # o { relative: 0.02 }
      commonErrors:                    # errores previstos -> mensaje específico
        - { value: 2, message: 'Cuidado con el signo: $-(-2)(5) = +10$.' }
    check: '3*4 - (-2)*5'              # el validador comprueba que da 22
    hints: ['idea general', 'fórmula o método', 'primer paso']   # exactamente 3
    solution: '$3\cdot4 - (-2)\cdot5 = \boxed{22}$'

test:                       # mini test: un intento y sin pistas
  - id: ...
    kind: choice
    statement: '...'
    options:
      - { text: 'vale 0' }
      - { text: 'vale 1', why: 'Explicación de por qué esta opción está mal.' }
    correct: 0

summary: ['Orden 2: $ad - bc$.', 'Orden 3: Sarrus.']
common_errors: ['Perder un signo negativo...']
```

Las respuestas numéricas pueden llevar `unit` (por ejemplo, `N/kg`, `m/s`, `J`, `km`). El corrector acepta unidades equivalentes y convierte entre ellas (`src/core/grading.js`).

## 4. Validación automática

`npm run build:content` (y el CI en cada push) comprueba:

1. Campos obligatorios, ids únicos y con el prefijo de su tema (`mat2.alg.determinantes.u01` empieza por `mat2.alg.determinantes.`).
2. Prerrequisitos existentes y **sin ciclos**; generadores existentes.
3. Cada ejercicio con **3 pistas**, opciones válidas y unidades conocidas.
4. **Respuestas correctas**: se evalúa la expresión `check` y debe coincidir con `answer.value`. Además, la propia respuesta escrita con 4 cifras debe corregirse como buena.
5. **Fórmulas**: cada fórmula LaTeX se compila con KaTeX y se rechaza si tiene errores.
6. Simulacros: los puntos suman 10 y hay generadores suficientes para cada apartado.
