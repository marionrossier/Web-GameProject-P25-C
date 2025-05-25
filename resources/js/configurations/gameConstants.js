//Game Constants :
let currentLevel = 1;
const startLives = 3;
let currentLives = startLives;
let finalTime = 0;
const startScore = 1000;
let finalScore = startScore;

//Map Constants :
const mapWidth = [25];
const mapHeight = [17]; //HeightTable

//Pixel Constants :
const mapPixelSize = [16]; //pixelSizeTable

//Canvas Constants :
const screenCanvasWidth = 1000;
const screenCanvasHeight = 700;

let gameCanvasWidth = window.mapWidth * window.mapPixelSize;
let gameCanvasHeight = window.mapHeight * window.mapPixelSize;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");



//Elements Constants :





//Window creation
window.currentLevel = currentLevel;
window.startLives = startLives;
window.currentLevel = currentLevel;
window.currentLives = startLives;
window.finalTime = finalTime;
window.startScore = startScore;
window.finalScore = startScore;

window.mapWidth = mapWidth;
window.mapHeight = mapHeight;
window.mapPixelSize = mapPixelSize;

window.screenCanvasWidth = screenCanvasWidth;
window.screenCanvasHeight = screenCanvasHeight;
window.ctx = ctx;
window.canvas = canvas;

function gameInitialisation() {
    window.currentScreen = "play";
    window.currentLevel = 1; // Réinitialiser le niveau
    window.finalScore = window.startScore; // Réinitialiser le score
    window.finalTime = 0; // Réinitialiser le temps
    window.currentLives = window.startLives; // Réinitialiser les vies
}

window.gameInitialisation = gameInitialisation;