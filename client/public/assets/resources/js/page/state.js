// Références des écrans
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

// Fonction utilitaire : affiche un seul écran, cache les autres
function showScreen(screen) {
    console.log("Affichage écran :", screen?.id);
    startScreen.style.display = "none";
    endScreen.style.display = "none";
    gameOverScreen.style.display = "none";

    if (screen) {
        screen.style.display = "flex"; // très important !
    }
}

// État du jeu
let gameState = "start";
showScreen(startScreen);

// ▶️ Démarrer le jeu depuis l'écran d'accueil
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
    gameState = "playing";
    showScreen(null);
    startGame(canvas, ctx, heartImage(), backButtonImage(), instructionsImage());
});

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
    showScreen(gameOverScreen);
}

// 🔁 Rejouer depuis écran de victoire
const replayButton = document.getElementById("replayButton");
replayButton.addEventListener("click", () => {
    gameState = "start";
    showScreen(startScreen);
});

// 🔁 Rejouer depuis écran de game over
const replayButton2 = document.getElementById("replayButton2");
replayButton2.addEventListener("click", () => {
    gameState = "start";
    showScreen(startScreen);
});
