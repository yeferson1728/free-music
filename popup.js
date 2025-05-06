document.querySelectorAll(".play-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const trackName = btn.previousElementSibling.textContent;

    const url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    chrome.runtime.sendMessage({ action: "play", url }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError.message);
      } else {
        console.log("Estado:", response?.status || "sin respuesta");
      }
    });
  });
});

// Función para actualizar el contador de reproducciones en la interfaz

function updatePlayCountDisplay(remaining) {
  const playCountElement = document.getElementById('play-count-display');
  if (playCountElement) {
    playCountElement.textContent = remaining;
    
    // Quitar todas las clases existentes
    playCountElement.classList.remove('warning', 'danger');
    
    // Aplicar clase según la cantidad restante
    if (remaining <= 5) {
      playCountElement.classList.add('danger');
    } else if (remaining <= 10) {
      playCountElement.classList.add('warning');
    }
  }
}
// Manejar el interruptor del botón flotante
document.addEventListener('DOMContentLoaded', function() {
  const floatingButtonToggle = document.getElementById('floating-button-toggle');
  
  // Cargar el estado guardado
  chrome.storage.sync.get(['showFloatingButton'], function(result) {
    // Si no hay un valor guardado, por defecto es true (mostrar)
    const showButton = result.showFloatingButton !== undefined ? result.showFloatingButton : true;
    floatingButtonToggle.checked = showButton;
    
    // Enviar el estado actual a todas las pestañas
    updateFloatingButtonVisibility(showButton);
  });
  
  // Escuchar cambios en el interruptor
  floatingButtonToggle.addEventListener('change', function() {
    const showButton = this.checked;
    
    // Guardar la preferencia
    chrome.storage.sync.set({showFloatingButton: showButton});
    
    // Actualizar la visibilidad en todas las pestañas
    updateFloatingButtonVisibility(showButton);
  });
});

// Función para actualizar la visibilidad del botón en todas las pestañas
function updateFloatingButtonVisibility(show) {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'toggleFloatingButton',
        show: show
      }).catch(() => {
        // Ignorar errores en pestañas donde el content script no está cargado
      });
    });
  });
}

// En el content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);
  if (message.action === 'toggleFloatingButton') {
    toggleButtonVisibility(message.show);
  }
  return true;
});

document.addEventListener('DOMContentLoaded', function() {
  const playPauseButton = document.getElementById('play-pause');
  const progressBar = document.getElementById('progress-bar');
  let isPlaying = false;

  playPauseButton.addEventListener('click', function() {
    if (isPlaying) {
      // Lógica para pausar la canción
      playPauseButton.textContent = 'Play';
      progressBar.style.display = 'none';
    } else {
      // Lógica para reproducir la canción
      playPauseButton.textContent = 'Pause';
      progressBar.style.display = 'block';
    }
    isPlaying = !isPlaying;
  });
});
