function startGame(canvas, ctx, heartImage, backButtonImage, instructionsImage) {
    console.log("Starting game...");

    const levelData = getLevelData(currentLevel);
    if (!levelData) {
        console.error("Invalid level data");
        return;
    }

    // Références aux éléments audio
    const menuMusic = document.getElementById("menuMusic");
    const gameMusic = document.getElementById("gameMusic");

    try {
        window.pixelSizeTable = { 2: 32 };
        window.WidthTable = { 2: 20 };
        window.HeightTable = { 2: 20 };

        console.log("Setting skins...");
        const outsideSkin = new OutsideSkin(levelData.world);
        const waySkin = new WaySkin(levelData.world);
        const treeSkin = new TreeSkin(levelData.world);

        app = new Motor(2, levelData.map, outsideSkin, waySkin, treeSkin, levelData.gameEntities);
        console.log("Creating Cursor instance...");
        const cursorSkinNumber = 1;
        const onWinCallback = () => {
            console.log("Player wins!");
            currentScreen = "stats";
            app.screenTransitions.disableInterception();
            gameMusic.pause();
            gameMusic.currentTime = 0;
            renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
        };
        const onGameOverCallback = () => {
            console.log("Game Over triggered!");
            currentScreen = "gameOver";
            app.screenTransitions.disableInterception();
            gameMusic.pause();
            gameMusic.currentTime = 0;
            renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
        };
        const cursor = new Cursor(cursorSkinNumber, canvas, levelData.map, 2, onWinCallback, ctx,
            app, levelData.gameEntities);
        console.log("Creating Motor...");

        app.gameStart();
        currentScreen = "play";
        console.log("Game started successfully");

        menuMusic.pause();
        menuMusic.currentTime = 0;
        gameMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du jeu :", error);
        });

    } catch (error) {
        console.error("Error while starting the game:", error);
        currentScreen = "menu";
        if (app) app.screenTransitions.disableInterception();
        gameMusic.pause();
        gameMusic.currentTime = 0;
        menuMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du menu :", error);
        });
        renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
    }
}