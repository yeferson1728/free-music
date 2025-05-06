let audio = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "play") {
    if (audio) {
      audio.pause();
    }
    audio = new Audio(message.url);
    audio.play();
    sendResponse({ status: "playing" });
  }
  async function ensureOffscreen() {
    const exists = await chrome.offscreen.hasDocument();
    if (!exists) {
      await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'Reproducir música en segundo plano',
      });
    }
  }
  
  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "play" || message.action === "pause" || message.action === "resume") {
      await ensureOffscreen();
      chrome.runtime.sendMessage({ ...message }); // reenvía a offscreen.js
      sendResponse({ status: "forwarded" });
    }
    return true;
  });
  

  if (message.action === "pause") {
    if (audio) {
      audio.pause();
      sendResponse({ status: "paused" });
    }
  }

  if (message.action === "resume") {
    if (audio) {
      audio.play();
      sendResponse({ status: "resumed" });
    }
  }
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'open_popup') {
      chrome.action.openPopup();
    }
  });
});
async function ensureOffscreen() {
  const exists = await chrome.offscreen.hasDocument();
  if (!exists) {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'Necesitamos reproducir música en segundo plano',
    });
  }
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  await ensureOffscreen();
  chrome.runtime.sendMessage(message, sendResponse);
  return true; // Para mantener el canal abierto
});

// Función para gestionar el límite diario de canciones
function manageDailyLimit() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['playCount', 'lastResetDate'], function(data) {
      const today = new Date().toDateString();
      
      // Si es un nuevo día o no hay datos previos, reiniciar el contador
      if (!data.lastResetDate || data.lastResetDate !== today) {
        chrome.storage.sync.set({
          playCount: 0,
          lastResetDate: today
        }, function() {
          resolve({
            playCount: 0,
            canPlay: true,
            remaining: 25 // Cambiado de 22 a 25
          });
        });
      } else {
        // Verificar si se ha alcanzado el límite
        const playCount = data.playCount || 0;
        const canPlay = playCount < 25; // Cambiado de 22 a 25
        const remaining = 25 - playCount; // Cambiado de 22 a 25
        
        resolve({
          playCount: playCount,
          canPlay: canPlay,
          remaining: remaining
        });
      }
    });
  });
}
let isPlaying = false;
let currentAudio = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "play") {
    // Detener cualquier reproducción actual
    if (currentAudio) {
      // Lógica para detener la reproducción actual
    }
    
    // Iniciar nueva reproducción
    isPlaying = true;
    
    // Lógica para reproducir la nueva URL
    // ...
    
    sendResponse({ status: "playing", isPlaying: true });
  } 
  else if (message.action === "togglePlayback") {
    if (isPlaying) {
      // Pausar reproducción
      isPlaying = false;
    } else {
      // Reanudar reproducción
      isPlaying = true;
    }
    
    sendResponse({ isPlaying: isPlaying });
  }
  
  return true; // Mantener el canal de comunicación abierto para respuesta asíncrona
});
// ... existing code ...
