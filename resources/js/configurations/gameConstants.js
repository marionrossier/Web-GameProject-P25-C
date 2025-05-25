// --- DOM access ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// --- Constantes figées par domaine ---
const MAP = Object.freeze({
    width: 25,
    height: 17,
    pixelSize: 16
});

const CANVAS = Object.freeze({
    screenWidth: 1000,
    screenHeight: 700
});

const CURSOR = Object.freeze({
    destinationWidth: 12,
    destinationHeight: 12,
    hitBoxWidth: 16,
    hitBoxHeight: 16
});

const ENEMY = Object.freeze({
    destinationWidth: 16,
    destinationHeight: 16,
    hitBoxWidth: 20,
    hitBoxHeight: 20
});

const LIFE = Object.freeze({
    destinationWidth: 12,
    destinationHeight: 12,
    hitBoxWidth: 16,
    hitBoxHeight: 16
});

const OUTSIDE = Object.freeze({
    destinationWidth: 16,
    destinationHeight: 16
});

const TREE = Object.freeze({
    destinationWidth: 12, // 16 - 4
    destinationHeight: 16
});

const WAY = Object.freeze({
    destinationWidth: 16,
    destinationHeight: 16
});

const GAMEPLAY = Object.freeze({
    startLives: 3,
    startScore: 1000
});

// --- États de jeu dynamiques ---
let currentLevel = 1;
let currentLives = GAMEPLAY.startLives;
let finalTime = 0;
let finalScore = GAMEPLAY.startScore;

// --- Exposition globale ---
Object.assign(window, {
    canvas,
    ctx,
    MAP,
    CANVAS,
    CURSOR,
    ENEMY,
    LIFE,
    OUTSIDE,
    TREE,
    WAY,
    GAMEPLAY,
    currentLevel,
    currentLives,
    finalTime,
    finalScore
});

// --- Initialisation du jeu ---
function gameInitialisation() {
    window.currentScreen = "play";
    window.currentLevel = 1;
    window.currentLives = GAMEPLAY.startLives;
    window.finalTime = 0;
    window.finalScore = GAMEPLAY.startScore;
}
window.gameInitialisation = gameInitialisation;