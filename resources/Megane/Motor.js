//test en l'appelant dans ton main et dans ton la page html


class Motor {
    constructor(maptable, texturePack, Size) {
        this.maptable = maptable;
        this.texturePack = texturePack;
        this.Size = Size;
        //on crée une drawmap pour afficher la map
        this.gameMap = new DrawMap(maptable, texturePack, Size);

        this.interval = 1000 / 24; // 24 FPS
        this.timerState = null;
        this.count = 0;
        this.gameState = 0;

        this.gameStart();

    }

    gameStart(){
        console.log("start")
        this.gameMap.draw();
        this.startTimer()

        this.gameState = 1;
    }

    changeMap(maptable, texturePack, Size){
        this.maptable = maptable;
        this.texturePack = texturePack;
        this.Size = Size;
    }

    getMap() {
        return this.maptable;
        //redonne la map quand appelé
    }

    getTime(){
        //retourne le nombre de seconde écoulé (enlever le /24 si on veut les frame)
        return this.count/24;
    }

    tick() {
        if (this.count % 24 === 0){
            console.log("timer tick");
        }
        //a appeler ici toute les métode necessaire au fonctionnement du jeux
        //appel gestion collion
        //appel game Over si necessaire
        this.testGameOver();
        this.gameMap.draw();
        //appel draw ennemies
        //appel draw souris
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
}




