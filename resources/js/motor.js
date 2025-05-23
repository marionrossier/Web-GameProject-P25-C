currentScreen = "menu";
window.currentLevel = 1;
app = null;
window.startLives = 3;
window.currentLives = startLives;
window.finalTime = 0;
window.startScore = 1000;
window.finalScore = startScore;
window.gameState = 0;

class Motor {
    constructor(cursorSkin, mapTable, outsideSkin, waySkin, treeSkin, gameEntities, Size) {
        this.mapTable = mapTable;
        this.outsideSkin = outsideSkin;
        this.waySkin = waySkin;
        this.treeSkin = treeSkin;
        this.size = Size;
        this.cursorSkin = cursorSkin;
        this.gameEntities = gameEntities;
        this.screenTransitions = new ingameState(this);

        const canvas = document.getElementById("gameCanvas");
        this.ctx = canvas.getContext("2d");

        this.canvas = canvas;

        this.cursor = new Cursor(
            this.cursorSkin,
            this.canvas,
            this.mapTable,
            this.size,
            null,
            this.ctx,
            this,
            this.gameEntities
        );

        this.gameEntities = gameEntities;
        for (const entityType in this.gameEntities) {
            for (const entity in this.gameEntities[entityType]) {
                this.gameEntities[entityType][entity].draw();
            }
        }
        for (const enemy in this.gameEntities.enemies) {
            this.gameEntities.enemies[enemy].enemiesMove();
        }

        this.gameMap = new DrawMap(this.mapTable, this.outsideSkin, this.waySkin, this.treeSkin, this.gameEntities, this.size);

        this.interval = 1000 / 24;
        this.timerState = null;
        this.timer = 0;
        window.gameState = 0;

        this.timerDisplay = document.getElementById("timerDisplay");
    }

    tick() {
        console.trace("tick called"); // Voir d'où vient l'appel

        //Afficher le temps écoulé et le score
        if (this.timer % 24 === 0) {
            console.log("timer tick");
            window.finalScore = Math.max(window.finalScore - 5, 0);

            if (this.timerDisplay) {
                const secondsElapsed = this.timer / 24;
                this.timerDisplay.textContent = `${secondsElapsed} s`;
            }
        }
        this.gameMap.draw();
        for (const entityType in this.gameEntities) {
            for (const entity in this.gameEntities[entityType]) {
                this.gameEntities[entityType][entity].draw();
            }
        }
        this.drawLives();
        this.cursor.touch();
        this.cursor.drawMouse();

        // Affichage du score en bas à gauche sur l'écran de jeu
        if (gameState === 1) {
            this.ctx.font = "10px Arial";
            this.ctx.fillStyle = "cyan";
            this.ctx.textAlign = "left";
            this.ctx.fillText(`Play Score: ${window.finalScore}`, 2, this.canvas.height - 2);
        }
        this.timer++;
    }

    startTimer() {
        if (this.timerState === null) {
            console.log("début de partie");
            this.timer = 0;
            this.timerState = setInterval(() => this.tick(), this.interval);
        }
    }

    stopTimer() {
        if (this.timerState !== null) {
            clearInterval(this.timerState);
            this.timerState = null;
            console.log("partie arrêté");
        }
    }

    gameOver(){
        this.stopTimer();
        this.gameState = 0;
        this.screenTransitions.drawGameOverScreen();
    }

    endLevel(){
        this.stopTimer();
        this.gameState = 0;
        this.screenTransitions.drawEndLevelScreen();
    }

    endGame(){
        this.stopTimer();
        this.gameState = 0;
        this.screenTransitions.drawEndGameScreen();
    }

    drawLives() {
        const heartSize = 10;
        const padding = 1;

        for (let i = 0; i < window.currentLives; i++) {
            this.ctx.drawImage(
                heartImage,
                padding + i * (heartSize + padding), // Position X
                padding, // Position Y
                heartSize, // Largeur
                heartSize // Hauteur
            );
        }
    }
}