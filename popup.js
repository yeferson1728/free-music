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
