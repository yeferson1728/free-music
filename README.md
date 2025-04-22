# 🎧 FreeFlow Music - Extensión de Navegador

FreeFlow Music es una extensión minimalista para Chrome que permite reproducir música libre directamente desde tu navegador, sin tener que abrir otras pestañas ni iniciar sesión. La música se reproduce en segundo plano y sin interrupciones.

Diseñado con un enfoque **moderno**, **oscuro**, con acentos rojos y una estética ultra limpia.

---

## 🚀 Características actuales

- ✅ Interfaz popup simple y hermosa.
- ✅ Reproducción de música en segundo plano.
- ✅ Botón flotante para acceso rápido.
- ✅ Uso de canciones de ejemplo (pronto integración con APIs).
- ✅ Compatible con Chrome (Manifest V3).
- ✅ Diseño adaptable y elegante.

---

## 🛠️ Estructura del proyecto

```bash
freeflow-music/
├── background.js            # Lógica de reproducción en segundo plano
├── content.js               # (Pendiente de uso completo)
├── popup.html               # Interfaz principal de la extensión
├── popup.js                 # Lógica de interacción del popup
├── styles.css               # Estilos modernos y responsivos
├── manifest.json            # Configuración de la extensión (V3)
├── icon.png                 # Ícono de la extensión
├── offscreen.html           # (Opcional) Para mantener el audio en segundo plano