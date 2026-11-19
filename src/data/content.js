/**
 * content.js — Acceso cómodo al contenido educativo.
 *
 * El contenido viene de src/content/content.generated.js (generado a partir de
 * los YAML). Aquí construimos ÍNDICES (mapas por id) para no tener que recorrer
 * todo el temario cada vez que buscamos una unidad: como un HashMap en Java.
 */

import CONTENT from '../content/content.generated.js';

export const content = CONTENT;

/** Asignaturas por id. */
export const subjectsById = new Map(CONTENT.subjects.map((s) => [s.id, s]));

/** Todas las unidades, en el orden del temario. */
export const allUnits = CONTENT.subjects.flatMap((s) => s.blocks.flatMap((b) => b.topics.flatMap((t) => t.units)));

/** Unidades por id. */
export const unitsById = new Map(allUnits.map((u) => [u.id, u]));

/** Bloques y temas por id (para mostrar rutas como "Álgebra › Determinantes"). */
export const blocksById = new Map(CONTENT.subjects.flatMap((s) => s.blocks.map((b) => [b.id, b])));
export const topicsById = new Map(CONTENT.subjects.flatMap((s) => s.blocks.flatMap((b) => b.topics.map((t) => [t.id, t]))));

export const subjectName = (id) => subjectsById.get(id)?.name ?? id;
export const unitsOfSubject = (subjectId) => allUnits.filter((u) => u.subjectId === subjectId);
export const lessonOf = (unitId) => CONTENT.lessons[unitId] ?? null;
export const examOf = (subjectId) => CONTENT.exams[subjectId] ?? null;

/** Diccionario id -> nombre de todas las asignaturas (lo usa diffPlans). */
export const subjectNames = Object.fromEntries(CONTENT.subjects.map((s) => [s.id, s.name]));
