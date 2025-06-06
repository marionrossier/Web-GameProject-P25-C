/**
 * Renders the game's menu or appropriate screen based on the current screen state.
 * Handles background music and screen updates accordingly.
 *
 * @param {Object} heartImage - The image object used for the heart graphic on the screen.
 * @param {Object} backButtonImage - The image object used for the back button graphic on the screen.
 * @param {Object} instructionsImage - The image object for the instructions screen graphic.
 * @param {Object} app - The application instance, used for controlling timers and other app-level actions.
 * @return {void} This method does not return a value.
 */
function renderMenu(heartImage, backButtonImage, instructionsImage, app) {
    console.log(currentScreen);

    updateCursorStyle(currentScreen);

    const menuMusic = document.getElementById("menuMusic");
    const gameMusic = document.getElementById("gameMusic");

    if (currentScreen === "menu") {
        if (app) app.stopTimer();

        drawMainMenu(heartImage, backButtonImage);

        menuMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du menu :", error);
        });
        gameMusic.pause();
        gameMusic.currentTime = 0;

    } else if (currentScreen === "play") {

        gameMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du jeu :", error);
        });
        menuMusic.pause();
        menuMusic.currentTime = 0;

    } else if (currentScreen === "stats") {
        displayStatsScreen();

    } else if (currentScreen === "rules") {
        if (app) app.stopTimer();
        drawScreen(currentScreen, heartImage, backButtonImage, instructionsImage);
    }
}
