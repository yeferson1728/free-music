if (!document.getElementById('freeflow-button')) {
  const button = document.createElement('div');
  button.id = 'freeflow-button';
  button.innerText = '🎵';
  button.style.position = 'fixed';
  button.style.bottom = '120px';
  button.style.right = '20px';
  button.style.width = '50px';
  button.style.height = '50px';
  button.style.background = '#111';
  button.style.color = '#e60012';
  button.style.borderRadius = '15%';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.fontSize = '24px';
  button.style.cursor = 'pointer';
  button.style.zIndex = '999999';
  button.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.5)';
 /* button.style.filter = 'invert(0%) sepia(10%) saturate(1000%) hue-rotate(-50deg)'; // Aplicar filtro para cambiar el color a rojo
  button.title = 'Abrir FreeFlow Music';*/

  document.body.appendChild(button);

  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'open_popup' });
  });
}
