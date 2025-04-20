class Motor {
    constructor(cursorSkin, mapTable, texturePack, gameEntities, Size) {
        this.mapTable = mapTable;
        this.texturePack = texturePack;
        this.Size = Size;
        this.cursorSkin = cursorSkin;
        this.lives = 2; // Nombre initial de vies
        this.heartImage = new Image();
        this.heartImage.src = "resources/images/game/Heart.png"; // Chemin vers votre sprite


        const canvas = document.getElementById("gameCanvas");
        this.ctx = canvas.getContext("2d");

        this.canvas = canvas;

        this.cursor = new Cursor(
            cursorSkin,
            canvas,
            mapTable,
            Size,
            null, // ← pas de onWin pour l’instant
            this.ctx
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

        this.gameMap = new DrawMap(mapTable, texturePack, gameEntities, Size);

        this.interval = 1000 / 24;
        this.timerState = null;
        this.count = 0;
        this.gameState = 0;

        this.timerDisplay = document.getElementById("timerDisplay"); //pour afficher le timer

        this.gameStart();
    }

    gameStart(){
        console.log("start")
        this.gameMap.draw();
        this.startTimer();
        this.gameState = 1;
    }

    changeMap(mapTable, texturePack, Size) {
        this.mapTable = mapTable;
        this.texturePack = texturePack;
        this.Size = Size;
    }

    getMap() {
        return this.mapTable;
        //redonne la map quand appelé
    }

    getTime(){
        //retourne le nombre de seconde écoulé (enlever le /24 si on veut les frame)
        return this.count/24;
    }

    tick() {
        if (this.count % 24 === 0){
            console.log("timer tick");

            // Affichage temps écoulé
            if (this.timerDisplay) {
                const secondsElapsed = this.count / 24;
                this.timerDisplay.textContent = `${secondsElapsed} s`;
            }
        }
        //a appeler ici toute les métode necessaire au fonctionnement du jeux
        //appel gestion collion
        //appel game Over si necessaire

        this.gameMap.draw();
        this.gameEntities = gameEntities;
        for (const entityType in this.gameEntities) {
            for (const entity in this.gameEntities[entityType]) {
                this.gameEntities[entityType][entity].draw();
            }
        }
        this.drawLives();
        this.cursor.touch();
        this.cursor.drawMouse();
        this.count++;
    }

    startTimer() {
        if (this.timerState === null) {
            console.log("début de partie");
            this.count =0;
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

    testGameOver(){
        if (this.count >= 240) {
            this.gameOver()
        }
    }
    gameOver(){
        this.stopTimer();
        this.gameState = 0;
    }

    buttonRestart() {
        const map = new RandomMap();
        const generated = map.generateMaze();
        this.changeMap(generated, this.texturePack, this.Size);
    }

    drawLives() {
        const heartSize = 10; // Taille des cœurs (en pixels)
        const padding = 1; // Espacement entre les cœurs et le bord

        for (let i = 0; i < this.lives; i++) {
            this.ctx.drawImage(
                this.heartImage,
                padding + i * (heartSize + padding), // Position X
                padding, // Position Y
                heartSize, // Largeur
                heartSize // Hauteur
            );
        }
    }
}




