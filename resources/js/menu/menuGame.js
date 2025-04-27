// MenuGame.js
function startGame(canvas, ctx) {
    try {
        const map = new RandomMap();
        const generated = map.generateMaze();

        const enemySkin = new Image();
        enemySkin.src = "resources/images/game/mouse.png";

        window.gameEntities = {
            enemies: {
                enemy1: new Enemy(1, 5, 5, 5, 5, enemySkin, 0, 20, 20),
                enemy2: new Enemy(2, 10, 10, 10, 10, enemySkin, 0, 20, 20)
            },
            lives: {
                life1: new Life(0, 19, 7, null)
            }
        };

        window.pixelSizeTable = { 2: 32 };
        window.WidthTable = { 2: 20 };
        window.HeightTable = { 2: 20 };

        app = new Motor(2, generated, ["white", "green", "red", "black", "yellow"], window.gameEntities, 0);
        app.gameStart();
        currentScreen = "play";
    } catch (error) {
        console.error("Error starting game:", error);
        currentScreen = "menu";
    }
}
