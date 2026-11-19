/**
 * Configuración de ESLint (analizador estático): detecta errores típicos
 * antes de ejecutar el código, como variables sin usar o sin declarar.
 */
const browser = ['window', 'document', 'localStorage', 'location', 'navigator', 'matchMedia', 'getComputedStyle',
  'requestAnimationFrame', 'cancelAnimationFrame', 'performance', 'fetch', 'FormData', 'FileReader', 'Blob', 'URL',
  'setTimeout', 'TextEncoder', 'setInterval', 'clearInterval', 'console', 'self', 'caches', 'Date', 'Math', 'JSON', 'Promise', 'Set', 'Map'];
const node = ['process', 'Buffer', 'console', 'URL'];

export default [
  { ignores: ['vendor/**', 'dist/**', '_site/**', 'node_modules/**', 'src/content/content.generated.js'] },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: Object.fromEntries([...browser, ...node].map((g) => [g, 'readonly'])),
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
    },
  },
];
