let audio = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "play") {
    if (audio) audio.pause();
    audio = new Audio(message.url);
    audio.play();
    sendResponse({ status: "playing" });
  }

  if (message.action === "pause") {
    if (audio) audio.pause();
    sendResponse({ status: "paused" });
  }
});
