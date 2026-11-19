# Publicar Pauta en GitHub Pages (paso a paso)

## 1. Crear el repositorio y subir el código

```bash
cd EBAUTrainer
git init
git add .
git commit -m "feat: primera versión de Pauta, profesor virtual para la PAU"
git branch -M main
git remote add origin https://github.com/campayoo/EBAUTrainer.git
git push -u origin main
```

> Crea antes el repositorio vacío `EBAUTrainer` en GitHub (sin README, para que no haya conflictos).

## 2. Activar GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. En **Source**, elige **GitHub Actions**.
3. Ve a la pestaña **Actions**: el workflow *Publicar en GitHub Pages* se ejecuta solo en cada push a `main` (o lánzalo a mano con *Run workflow*).
4. Al terminar, la web estará en **https://campayoo.github.io/EBAUTrainer/**: la portada en la raíz y la app en **/app/**.

El workflow ejecuta los tests, genera `_site/` con `npm run build` y lo publica. Estructura: `index.html` + `landing.css` (portada, desde `site/`), `app/` (la aplicación) y `Pauta.html`. En la web también estará `Pauta.html` para descargar (Ajustes → "Descargar Pauta").

> **Alternativa sin Actions:** *Source: Deploy from a branch → main → / (root)*. También funciona, porque el repositorio ya incluye `src/content/content.generated.js`, pero la versión descargable `Pauta.html` no estará en la web.

## 3. Publicar una versión descargable (Release)

```bash
git tag v1.0.0
git push --tags
```

El workflow *Release* crea una release en GitHub con `Pauta.html` adjunto. Enlázala desde tu CV o tu portfolio.

## 4. Probar en tu ordenador

```bash
node tools/serve.mjs       # http://localhost:5173 (no hace falta npm install)
npm install && npm run build
# y abre dist/Pauta.html con doble clic
```

## Problemas habituales

| Problema | Solución |
|---|---|
| La web sale en blanco al abrir `index.html` con doble clic | Normal: los módulos de JavaScript no cargan desde `file://`. Usa `node tools/serve.mjs` o el archivo `dist/Pauta.html` |
| El workflow de Pages falla con "permission denied" | Revisa que *Settings → Pages → Source* sea **GitHub Actions** |
| He cambiado un YAML y la app no lo muestra | Ejecuta `npm run build:content` (el test `content.generated.js está actualizado` te lo recuerda) |
| Tras publicar, el navegador enseña la versión vieja | Es la caché del service worker: recarga dos veces, o sube `CACHE` en `sw.js` (`pauta-v2`) |
