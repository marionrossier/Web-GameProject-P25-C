class Motor {
    constructor(cursorSkin, mapTable, outsideSkin, waySkin, treeSkin, gameEntities, Size) {
        this.mapTable = mapTable;
        this.outsideSkin = outsideSkin;
        this.waySkin = waySkin;
        this.treeSkin = treeSkin;
        this.size = Size;
        this.cursorSkin = cursorSkin;
        this.lives = 2; // Nombre initial de vies
        this.gameEntities = gameEntities;
        this.screenTransitions = new ingameState(this);

        const canvas = document.getElementById("gameCanvas");
        this.ctx = canvas.getContext("2d");

        this.canvas = canvas;

        this.cursor = new Cursor(
            this.cursorSkin,
            canvas,
            this.mapTable,
            this.size,
            null, // TODO : ← pas de onWin pour l’instant
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

        this.gameMap = new DrawMap(mapTable, outsideSkin, waySkin, treeSkin, gameEntities, Size);

        this.interval = 1000 / 24;
        this.timerState = null;
        this.timer = 0;
        this.gameState = 0;

        this.timerDisplay = document.getElementById("timerDisplay");
        this.score = new Score();
    }

    gameStart(){
        console.log("start");
        this.gameMap.draw();
        this.startTimer();
        this.gameState = 1;
        // this.screenTransitions.enableInterception();
    }

    changeMap(mapTable, outsideSkin, waySkin, treeSkin, Size) {
        this.mapTable = mapTable;
        this.outsideSkin = outsideSkin;
        this.waySkin = waySkin;
        this.treeSkin = treeSkin;
        this.size = Size;
    }

    getMap() {
        return this.mapTable;
    }

    getTime(){
        //retourne le nombre de secondes écoulé (enlever le /24 si on veut les frame)
        return this.timer/24;
    }

    tick() {
        console.trace("tick called"); // Voir d'où vient l'appel
        if (this.timer % 24 === 0){
            console.log("timer tick");

            if (this.timerDisplay) {
                const secondsElapsed = this.timer / 24;
                this.timerDisplay.textContent = `${secondsElapsed} s`;
            }
            this.score.calculateScore(this.timer/24);
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

        // Affichage du score en bas à gauche
        this.ctx.font = "10px Arial";
        this.ctx.fillStyle = "cyan";
        this.ctx.textAlign = "left";
        this.ctx.fillText(`Score: ${this.score.getCurrentScore()}`, 2, this.canvas.height - 2);

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

    buttonRestart() {
        const map = new RandomMap();
        const generated = map.generateMaze();
        this.changeMap(generated, this.outsideSkin, this.waySkin, this.treeSkin, this.size);
    }

    drawLives() {
        const heartSize = 10;
        const padding = 1;

        for (let i = 0; i < this.lives; i++) {
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