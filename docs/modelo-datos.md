# Modelo de datos

Pauta no tiene base de datos en un servidor: todo el estado del alumno es **un objeto JSON** guardado en el `localStorage` del navegador (clave `pauta:v1`) y exportable como copia de seguridad. El contenido educativo es de solo lectura y viene compilado desde los YAML.

Aun así, el modelo está pensado como si fueran tablas. El día que se añada un backend, este diagrama se traduce casi directamente a SQL.

```mermaid
erDiagram
    %% ---------- CATÁLOGO (solo lectura, desde content/*.yaml) ----------
    SUBJECT ||--o{ BLOCK : tiene
    BLOCK ||--o{ TOPIC : tiene
    TOPIC ||--o{ UNIT : tiene
    UNIT }o--o{ UNIT : "requiere (requires)"
    UNIT ||--o| LESSON : "clase completa (opcional)"
    LESSON ||--o{ EXERCISE : "practice / test"
    UNIT }o--o{ GENERATOR : "generators"
    SUBJECT ||--o| EXAM_DEF : "exam.yaml"

    %% ---------- ESTADO DEL ALUMNO (localStorage) ----------
    STUDENT ||--|| PROFILE : tiene
    STUDENT ||--o{ STUDENT_SUBJECT : estudia
    SUBJECT ||--o{ STUDENT_SUBJECT : "elegida en"
    STUDENT ||--o{ UNIT_PROGRESS : lleva
    UNIT ||--o{ UNIT_PROGRESS : "medida en"
    STUDENT ||--|| PLAN : "plan actual"
    PLAN ||--o{ PLANNED_SESSION : contiene
    STUDENT ||--o{ HISTORY_ENTRY : "sesiones hechas o perdidas"
    STUDENT ||--o{ PLAN_CHANGE : "explicaciones del profesor"
    STUDENT ||--o{ SCORE : notas
    STUDENT ||--o{ EXAM_RESULT : simulacros

    UNIT {
        string id PK "mat2.alg.determinantes.u01"
        string title
        int minutes
        int difficulty "1-5"
        string[] requires
        string[] generators
        float examWeight
    }
    EXERCISE {
        string id PK
        string kind "numeric | choice"
        string statement "Markdown + LaTeX"
        object answer "value, unit, tolerance, commonErrors"
        string check "expresión que valida la respuesta"
        string[] hints "exactamente 3"
        string solution
    }
    STUDENT_SUBJECT {
        string id FK
        float weight "0.75 | 1 | 1.5"
        string level "alto | medio | bajo"
    }
    UNIT_PROGRESS {
        string unitId FK
        float mastery "0-1"
        bool completed
        float ef "SM-2"
        int interval "SM-2"
        int reps "SM-2"
        date nextReview
        date reinforcedAt
    }
    PLANNED_SESSION {
        string id PK "fecha|tipo|unidad|parte"
        date date
        string kind "lesson | review | reinforce | mock"
        string unitId FK
        int minutes
        int part
    }
    HISTORY_ENTRY {
        string id PK
        date date
        string status "done | missed"
        float score
        bool planned
    }
    PLAN_CHANGE {
        date at
        string trigger "onboarding | subject-added | missed..."
        string[] messages
    }
```

## Decisiones

1. **IDs de texto estables** (`mat2.alg.determinantes.u01`) en lugar de números autoincrementales. El contenido puede cambiar entre versiones; con IDs estables, el progreso del alumno sigue apuntando a la unidad correcta.
2. **Catálogo separado del estado.** Al actualizar la app cambia el contenido, pero el estado del alumno no se toca. `content.generated.js` lleva un hash (`version`) para saber si está al día.
3. **El plan se regenera, no se edita.** Las sesiones pasadas viven en `history` y las futuras en `plan`. Cada replanificación sustituye el plan y añade una entrada a `changes` con la explicación.
4. **El estado SM-2 se guarda junto al dominio** (`UNIT_PROGRESS`): una sola estructura por unidad.
5. **Los ejercicios generados no se guardan**: basta con `(generador, semilla)` para reconstruirlos.
6. **Migración**: `migrate()` en `store.js` completa los estados antiguos con valores por defecto, así que una copia de una versión anterior se puede seguir importando.
