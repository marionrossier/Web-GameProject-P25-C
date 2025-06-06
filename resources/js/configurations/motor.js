/**
 * Represents the currently active screen in the application.
 * Typically used to keep track of the user's current view or interface.
 *
 * @type {string}
 */
currentScreen = "menu";
/**
 * Represents the main application.
 * Provides functionality for initializing and managing the overall application lifecycle.
 */
app = null;

/**
 * The Motor class manages the core game elements and state, including
 * the game map, player interactions, timers, and screen transitions.
 * It is responsible for the game's main logic, such as rendering,
 * updating entities, and handling game events.
 */
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
        console.trace("tick called");

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
        savePlayerScore(window.finalScore);

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
                padding,
                heartSize,
                heartSize
            );
        }
    }
}