// Références des écrans
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const gameOverScreenElement = document.getElementById("gameOverScreen");

// Fonction utilitaire : affiche un seul écran, cache les autres
function showScreen(screen) {
    console.log("Affichage écran :", screen?.id);
    if (startScreen) startScreen.style.display = "none";
    if (endScreen) endScreen.style.display = "none";
    if (gameOverScreenElement) gameOverScreenElement.style.display = "none";

    if (screen) {
        screen.style.display = "flex";
    }
}

// État du jeu
let gameState = "start";
showScreen(startScreen);

// ▶️ Démarrer le jeu depuis l'écran d'accueil
const startButton = document.getElementById("startButton");
if (startButton) {
    startButton.addEventListener("click", () => {
        gameState = "playing";
        showScreen(null);
        startGame(canvas, ctx, heartImage(), backButtonImage(), instructionsImage());
    });
}

// 🎯 Quand le joueur gagne
function handleLevelComplete() {
    console.log("handleLevelComplete()");
    gameState = "won";
    showScreen(endScreen);
}

// 💀 Quand le joueur perd
function handleGameOver() {
    console.log("handleGameOver()");
    gameState = "lost";
    showScreen(gameOverScreenElement);
}

// 🔁 Rejouer depuis écran de victoire
const replayButton = document.getElementById("replayButton");
if (replayButton) {
    replayButton.addEventListener("click", () => {
        gameState = "start";
        showScreen(startScreen);
    });
}

// 🔁 Rejouer depuis écran de game over
const replayButton2 = document.getElementById("replayButton2");
if (replayButton2) {
    replayButton2.addEventListener("click", () => {
        gameState = "start";
        showScreen(startScreen);
    });
}
