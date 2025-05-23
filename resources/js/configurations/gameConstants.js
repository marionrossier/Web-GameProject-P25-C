let currentLevel = 1;
let startLives = 3;
let currentLives = startLives;
let finalTime = 0;
let startScore = 1000;
let finalScore = startScore;

window.currentLevel = currentLevel;
window.startLives = startLives;
window.currentLevel = currentLevel;
window.currentLives = startLives;
window.finalTime = finalTime;
window.startScore = startScore;
window.finalScore = startScore;


function gameInitialisation() {
    window.currentScreen = "play";
    window.currentLevel = 1; // Réinitialiser le niveau
    window.finalScore = window.startScore; // Réinitialiser le score
    window.finalTime = 0; // Réinitialiser le temps
    window.currentLives = window.startLives; // Réinitialiser les vies
}

window.gameInitialisation = gameInitialisation;