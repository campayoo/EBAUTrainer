#!/usr/bin/env node
/**
 * build-content.mjs — Valida content/ y genera src/content/content.generated.js
 *
 * Uso:  npm run build:content
 *
 * El archivo generado se SUBE al repositorio: así la web funciona en GitHub
 * Pages sin ningún paso de compilación. Si cambias un YAML, vuelve a ejecutar
 * este script (el CI comprueba que no se te haya olvidado).
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadContent, validateContent, compileContent } from './content-lib.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const content = loadContent(join(root, 'content'));
const errors = validateContent(content);

if (errors.length > 0) {
  console.error(`\n✗ El contenido tiene ${errors.length} error(es):\n`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}

const compiled = compileContent(content);
const units = compiled.subjects.flatMap((s) => s.blocks.flatMap((b) => b.topics.flatMap((t) => t.units)));
const out = `// AUTO-GENERADO por tools/build-content.mjs a partir de content/*.yaml.
// NO lo edites a mano: edita los YAML y ejecuta "npm run build:content".
export default ${JSON.stringify(compiled, null, 1)};
`;
writeFileSync(join(root, 'src/content/content.generated.js'), out);
console.log(`✓ Contenido válido (versión ${compiled.version}): ${compiled.subjects.length} asignaturas, ${units.length} unidades, ${Object.keys(compiled.lessons).length} clases completas.`);
