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
        displayStats();
    } else if (currentScreen === "rules") {
        if (app) app.stopTimer();
        drawScreen(currentScreen, heartImage, backButtonImage, instructionsImage);
    }
}
