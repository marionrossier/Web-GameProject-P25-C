function startGame(canvas, ctx, heartImage, backButtonImage, instructionsImage) {
console.log("Starting game...");

    const levelData = getLevelData(currentLevel);
    if (!levelData) {
        console.error("Invalid level data");
        return;
    }

    try {
        window.pixelSizeTable = { 2: 32 };
        window.WidthTable = { 2: 20 };
        window.HeightTable = { 2: 20 };

        console.log("Setting skins...");
        const outsideSkin = new OutsideSkin(levelData.world);
        const waySkin = new WaySkin(levelData.world);
        const treeSkin = new TreeSkin(levelData.world);

        app = new Motor(2, levelData.map, outsideSkin, waySkin, treeSkin, levelData.gameEntities, 0);
        console.log("Creating Cursor instance...");
        const cursorSkinNumber = 1;
        const onWinCallback = () => {
            console.log("Player wins!");
            let currentScreen = "stats";
            renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
        };
        const onGameOverCallback = () => {
            console.log("Game Over triggered!");
            let currentScreen = "gameOver";
            renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
        };
        const cursor = new Cursor(cursorSkinNumber, canvas, levelData.map, 2, onWinCallback, ctx,
            app, levelData.gameEntities);
        console.log("Creating Motor...");

        app.gameStart();
        currentScreen = "play";
        console.log("Game started successfully");

    } catch (error) {
        console.error("Error while starting the game:", error);
        currentScreen = "menu";
        renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
    }
}
