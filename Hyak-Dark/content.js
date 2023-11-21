// Récupérer l'état du mode sombre depuis le stockage synchronisé
chrome.storage.sync.get("darkMode", function (items) {
  if (items["darkMode"]) {
    document.body.classList.add("dark-mode");
    modifierStyles(true);
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "toggle_dark_mode") {
    document.body.classList.toggle("dark-mode");

    // Mettez à jour l'état du mode sombre dans le stockage synchronisé
    var darkModeState = document.body.classList.contains("dark-mode");
    modifierStyles(darkModeState);
    chrome.storage.sync.set({ "darkMode": darkModeState });

    // Mettez à jour le texte du bouton dans la popup après le basculement
    sendResponse({ darkMode: darkModeState });
  }
});

function modifierStyles(darkModeState) {
  console.log("modifierStyles Debut ---");
  if (darkModeState===true){
    var tday = '#8da3ff';
    var days = 'black';
  } else {
    var tday = '#0185ff';
    var days = '#2f2f2f';
  } 
  console.log("days1 : " + days);
  var elements = document.querySelectorAll('.planning-title-day');

  var jourActuel = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });

  elements.forEach(function(element) {
    // Récupérer la valeur dans la balise
    var valeurDansBalise = element.textContent.trim();

    // Définir une couleur par défaut pour tous les jours
    element.style.color = days;
    console.log(element.style.color);

    // Si le jour correspond au jour actuel, changer la couleur
    if (valeurDansBalise.toLowerCase() === jourActuel) {
      element.style.color = tday;
      console.log("test2")
      console.log(element.style.color); // Vous pouvez choisir une autre couleur
    }
  });
}
