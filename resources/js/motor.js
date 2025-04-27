class Motor {
    constructor(cursorSkin, mapTable, outsideSkin, waySkin, treeSkin, gameEntities, Size) {
        this.mapTable = mapTable;
        this.outsideSkin = outsideSkin;
        this.waySkin = waySkin;
        this.treeSkin = treeSkin;
        this.size = Size;
        this.cursorSkin = cursorSkin;
        this.lives = 2; // Nombre initial de vies
        this.heartImage = new Image();
        this.heartImage.src = "resources/images/game/Heart.png"; // Chemin vers votre sprite

        const canvas = document.getElementById("gameCanvas");
        this.ctx = canvas.getContext("2d");

        this.canvas = canvas;

        this.cursor = new Cursor(
            this.cursorSkin,
            canvas,
            this.mapTable,
            this.size,
            null, // ← pas de onWin pour l’instant
            this.ctx,
            this
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
        this.count = 0;
        this.gameState = 0;

        this.timerDisplay = document.getElementById("timerDisplay");
        this.calculatedScore = 1000; // Score utilisé pour les calculs
        this.displayedScore = 0; // Score affiché au joueur
        this.scoreDisplay = document.getElementById("scoreDisplay");
        this.gameStart();
    }

    gameStart(){
        console.log("start");
        this.gameMap.draw();
        this.startTimer();
        this.gameState = 1;
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
            this.calculateScore(); // Mise à jour du score
        }

        this.gameMap.draw();
        // Correction : Utiliser this.gameEntities au lieu de gameEntities
        for (const entityType in this.gameEntities) {
            for (const entity in this.gameEntities[entityType]) {
                this.gameEntities[entityType][entity].draw();
            }
        }

        this.drawLives();
        this.cursor.touch();
        this.cursor.drawMouse();

        // Affichage du score en bas à gauche
        this.ctx.font = "10px Arial"; // Police et taille du texte
        this.ctx.fillStyle = "cyan"; // Couleur du texte
        this.ctx.textAlign = "left"; // Alignement du texte
        this.ctx.fillText(`Score: ${this.displayedScore}`, 2, this.canvas.height - 2); // Position du texte

        this.count++;
    }

    startTimer() {
        if (this.timerState === null) {
            console.log("début de partie");
            this.count = 0;
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
            this.gameOver();
        }
    }

    gameOver(){
        this.stopTimer();
        this.gameState = 0;
    }

    buttonRestart() {
        const map = new RandomMap();
        const generated = map.generateMaze();
        this.changeMap(generated, this.outsideSkin, this.waySkin, this.treeSkin, this.size);
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

    calculateScore() {
        const elapsedTime = this.count / 24; // Correction : Utiliser this.count au lieu de this.scoreTimer
        const levelScore = Math.max(1000 - Math.floor(elapsedTime * 10), 0); // Calcul du score pour le niveau
        this.calculatedScore = levelScore; // Met à jour le score calculé
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = `Score: ${this.displayedScore + this.calculatedScore}`;
        }
    }

    handleLevelComplete() {
        console.log("Niveau terminé !");
        this.displayedScore += Math.max(1000 - Math.floor(this.count / 24 * 10), 0); // Correction : Utiliser this.count
        this.count = 0; // Remise à zéro du timer pour le score
        this.gameState = "won"; // Change l'état du jeu
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = `Score: ${this.displayedScore}`;
        }
    }
}