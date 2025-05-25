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

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//Elements Constants :
const cursorDestinationWidth = 12;
const cursorDestinationHeight = 12;
const cursorHitBoxWidth = 16;
const cursorHitBoxHeight = 16;

const enemyDestinationWidth = 16;
const enemyDestinationHeight = 16;
const enemyHitBoxWidth = 20;
const enemyHitBoxHeight = 20;

const lifeDestinationWidth = 12;
const lifeDestinationHeight = 12;
const lifeHitBoxWidth = 16;
const lifeHitBoxHeight = 16;

const outsideDestinationWidth = 16;
const outsideDestinationHeight = 16;

const treeDestinationWidth = 16-4;
const treeDestinationHeight = 16;

const wayDestinationWidth = 16;
const wayDestinationHeight = 16;

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

window.wayDestinationWidth = wayDestinationWidth;
window.wayDestinationHeight = wayDestinationHeight;
window.treeDestinationWidth = treeDestinationWidth;
window.treeDestinationHeight = treeDestinationHeight;
window.cursorDestinationWidth = cursorDestinationWidth;
window.cursorDestinationHeight = cursorDestinationHeight;
window.enemyDestinationWidth = enemyDestinationWidth;
window.enemyDestinationHeight = enemyDestinationHeight;
window.lifeDestinationWidth = lifeDestinationWidth;
window.lifeDestinationHeight = lifeDestinationHeight;
window.outsideDestinationWidth = outsideDestinationWidth;
window.outsideDestinationHeight = outsideDestinationHeight;

window.cursorHitBoxHeight = cursorHitBoxHeight;
window.cursorHitBoxWidth = cursorHitBoxWidth;
window.enemyHitBoxHeight = enemyHitBoxHeight;
window.enemyHitBoxWidth = enemyHitBoxWidth;
window.lifeHitBoxHeight = lifeHitBoxHeight;
window.lifeHitBoxWidth = lifeHitBoxWidth;

function gameInitialisation() {
    window.currentScreen = "play";
    window.currentLevel = 1; // Réinitialiser le niveau
    window.finalScore = window.startScore; // Réinitialiser le score
    window.finalTime = 0; // Réinitialiser le temps
    window.currentLives = window.startLives; // Réinitialiser les vies
}

window.gameInitialisation = gameInitialisation;