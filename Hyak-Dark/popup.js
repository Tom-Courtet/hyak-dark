document.addEventListener("DOMContentLoaded", function() {
  var toggleDarkModeButton = document.getElementById("toggleDarkMode");
  
  // Mettez à jour le texte du bouton en fonction de l'état du mode sombre
  chrome.storage.sync.get("darkMode", function (items) {
    updateButtonText(items["darkMode"]);
  });

  toggleDarkModeButton.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "toggle_dark_mode" }, function(response) {
        // Mettez à jour le texte du bouton après le basculement
        updateButtonText(response.darkMode);
      });
    });
  });

  // Fonction pour mettre à jour le texte du bouton
  function updateButtonText(isDarkMode) {
    toggleDarkModeButton.textContent = isDarkMode ? "ON" : "OFF";
  }
});
