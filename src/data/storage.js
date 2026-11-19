/**
 * storage.js — Persistencia en el navegador (localStorage).
 *
 * localStorage guarda texto por clave y sobrevive al cerrar el navegador.
 * Lo envolvemos en try/catch porque puede fallar: modo privado, cuota llena,
 * o navegadores que lo bloquean al abrir archivos locales.
 * Si falla, la app sigue funcionando en memoria y avisa al usuario.
 */

const KEY = 'pauta:v1';
let available = true;

export function loadState() {
  try {
    const text = localStorage.getItem(KEY);
    return text ? JSON.parse(text) : null;
  } catch {
    available = false;
    return null;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    available = true;
  } catch {
    available = false;
  }
}

export function clearState() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* nada que borrar */
  }
}

/** ¿Se está guardando de verdad? (para avisar al usuario si no). */
export const storageAvailable = () => available;

/** Descarga un texto como archivo (copia de seguridad, .ics, informes...). */
export function downloadFile(filename, text, mime = 'application/json') {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Lee un archivo elegido por el usuario y devuelve su texto. */
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
