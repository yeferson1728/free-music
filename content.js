// Función para crear y mostrar el botón
function createFloatingButton() {
  if (document.getElementById('freeflow-button')) {
    return;
  }
  
  const button = document.createElement('div');
  button.id = 'freeflow-button';
  button.innerText = '🎵';
  button.style.position = 'fixed';
  button.style.bottom = '200px';
  button.style.right = '20px';
  button.style.width = '50px';
  button.style.height = '50px';
  button.style.background = '#111';
  button.style.color = '#FFFFFF';
  button.style.borderRadius = '15%';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.fontSize = '24px';
  button.style.cursor = 'pointer';
  button.style.zIndex = '2147483647';
  button.style.boxShadow = '0 0 3px rgba(219, 217, 219, 0.7)';
  button.style.filter = 'hue-rotate(40deg) saturate(300%)';
  button.title = 'Abrir FreeFlow Music';
  
  document.body.appendChild(button);

  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'open_popup' });
  });
}

// Función para mostrar u ocultar el botón
function toggleButtonVisibility(show) {
  const button = document.getElementById('freeflow-button');
  if (button) {
    button.style.display = show ? 'flex' : 'none';
  } else if (show) {
    createFloatingButton();
  }
  chrome.storage.sync.set({showFloatingButton: show});
}

// Escuchar mensajes para mostrar/ocultar el botón
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleFloatingButton') {
    toggleButtonVisibility(message.show);
  }
  return true;
});

// Función condicional para crear el botón según las preferencias
function conditionalCreateFloatingButton() {
  chrome.storage.sync.get(['showFloatingButton'], function(result) {
    const showButton = result.showFloatingButton !== false;
    if (showButton && !document.getElementById('freeflow-button')) {
      createFloatingButton();
    }
  });
}

// Actualizar los eventos de recarga de página
window.addEventListener('load', conditionalCreateFloatingButton);
window.addEventListener('DOMContentLoaded', conditionalCreateFloatingButton);
window.addEventListener('popstate', conditionalCreateFloatingButton);

// Observar cambios en el DOM para mantener el botón visible
const observer = new MutationObserver(function(mutations) {
  chrome.storage.sync.get(['showFloatingButton'], function(result) {
    const shouldShow = result.showFloatingButton !== false;
    if (!document.getElementById('freeflow-button') && shouldShow) {
      createFloatingButton();
    }
  });
});

observer.observe(document.body, { 
  childList: true,
  subtree: true
});
