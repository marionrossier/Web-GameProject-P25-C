// 🎮 Références des écrans
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

// 🔁 Fonction utilitaire : affiche un seul écran, cache les autres
function showScreen(screen) {
    // Cache tout
    startScreen.style.display = "none";
    endScreen.style.display = "none";
    gameOverScreen.style.display = "none";

    // Affiche celui demandé
    if (screen) screen.style.display = "block";
}

// ⏱️ État de départ
let gameState = "start";
showScreen(startScreen); // Affiche l'écran d'accueil au début

// ▶️ Clique pour démarrer le jeu depuis l'écran d'accueil
startScreen.addEventListener("click", () => {
    gameState = "playing";
    showScreen(null); // cache tous les écrans
    startGame(); // ta fonction de démarrage du jeu
});

// 🔁 Bouton rejouer (réinitialisation du jeu)
const replayButton = document.getElementById("replayButton");
replayButton.addEventListener("click", () => {
    gameState = "start";
    showScreen(startScreen);
});

// 🧨 À appeler quand le joueur perd
function handleGameOver() {
    gameState = "lost";
    showScreen(gameOverScreen);
}

// 🏁 À appeler quand le joueur gagne
function handleLevelComplete() {
    gameState = "won";
    showScreen(endScreen);
}

showScreen(endScreen); // ou endScreen / gameOverScreen

