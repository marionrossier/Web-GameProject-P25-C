/**
 * Starts the game by initializing or resuming the current game level, setting up necessary assets, and managing game music.
 *
 * @param {Object} heartImage - The image asset to be used for heart/life indicators.
 * @param {Object} backButtonImage - The image asset for the back button.
 * @param {Object} instructionsImage - The image asset for the instructions or help section.
 * @return {void} Does not return a value, updates the application state and starts the game.
 */
function startGame(heartImage, backButtonImage, instructionsImage) {

    if (typeof window.currentLevel === 'undefined') {
        window.currentLevel = 1;
    }

    const levelData = getLevelData(window.currentLevel);
    if (!levelData) {

        currentScreen = "menu";
        renderMenu(heartImage, backButtonImage, instructionsImage);
        return;
    }

    const menuMusic = document.getElementById("menuMusic");
    const gameMusic = document.getElementById("gameMusic");

    try {
        const outsideSkin = new OutsideSkin(levelData.world);
        const waySkin = new WaySkin(levelData.world);
        const treeSkin = new TreeSkin(levelData.world);

        app = new Motor(2, levelData.map, outsideSkin, waySkin, treeSkin, levelData.gameEntities);

        console.log("start");
        app.gameMap.draw();
        app.startTimer();

        currentScreen = "play";

        menuMusic.pause();
        menuMusic.currentTime = 0;
        gameMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du jeu :", error);
        });

    } catch (error) {
        currentScreen = "menu";

        gameMusic.pause();
        gameMusic.currentTime = 0;

        menuMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du menu :", error);
        });

        renderMenu(heartImage, backButtonImage, instructionsImage, app);
    }
}