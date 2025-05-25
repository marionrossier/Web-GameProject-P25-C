currentScreen = "menu";
app = null;

class Motor {
    constructor(cursorSkin, mapTable, outsideSkin, waySkin, treeSkin, gameEntities) {
        this.mapTable = mapTable;
        this.outsideSkin = outsideSkin;
        this.waySkin = waySkin;
        this.treeSkin = treeSkin;
        this.cursorSkin = cursorSkin;
        this.gameEntities = gameEntities;
        this.screenTransitions = new ingameState(this);

        this.cursor = new Cursor(
            this.cursorSkin,

            this.mapTable,
            null,
            this,
            this.gameEntities
        );

        this.gameEntities = gameEntities;

        this.gameMap = new DrawMap(this.mapTable, this.outsideSkin, this.waySkin, this.treeSkin, this.gameEntities);

        this.interval = 1000 / 24;
        this.timerState = null;
        this.timer = 0;

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
        if (window.currentScreen === "play") {
            window.ctx.font = "10px Arial";
            window.ctx.fillStyle = "cyan";
            window.ctx.textAlign = "left";
            window.ctx.fillText(`Play Score: ${window.finalScore}`, 2, window.canvas.height - 2);
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
        this.screenTransitions.drawGameOverScreen();
    }

    endLevel(){
        this.stopTimer();
        this.screenTransitions.drawEndLevelScreen();
    }

    endGame(){
        this.stopTimer();
        this.screenTransitions.drawEndGameScreen();
    }

    drawLives() {
        const heartSize = 10;
        const padding = 1;

        for (let i = 0; i < window.currentLives; i++) {
            window.ctx.drawImage(
                heartImage,
                padding + i * (heartSize + padding), // Position X
                padding, // Position Y
                heartSize, // Largeur
                heartSize // Hauteur
            );
        }
    }
}