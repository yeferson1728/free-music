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

