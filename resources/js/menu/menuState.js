currentScreen = "menu";
currentLevel = 1;
app = null;

function renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app) {
    console.log(currentScreen);

    updateCursorStyle(currentScreen, canvas);

    const menuMusic = document.getElementById("menuMusic");
    const gameMusic = document.getElementById("gameMusic");

    if (currentScreen === "menu") {
        if (app) {
            app.stopTimer();
        }
        canvas.width = initialCanvasWidth;
        canvas.height = initialCanvasHeight;
        drawMainMenu(ctx, canvas, heartImage, backButtonImage);

        // Jouer la musique du menu, arrêter celle du jeu
        menuMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du menu :", error);
        });
        gameMusic.pause();
        gameMusic.currentTime = 0;

    } else if (currentScreen === "play") {
        drawButton(ctx, backButton, heartImage, backButtonImage);

        // Jouer la musique du jeu, arrêter celle du menu
        gameMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du jeu :", error);
        });
        menuMusic.pause();
        menuMusic.currentTime = 0;

    } else if (currentScreen === "stats") {
        drawButton(ctx, backButton, heartImage, backButtonImage);

        //appelle de l'affichage des stats
        displayStats();

    } else if (["rules"].includes(currentScreen)) {
        if (app) {
            app.stopTimer();
            // app.screenTransitions.disableInterception(); // Désactiver l'interception
        }
        drawScreen(ctx, canvas, currentScreen, heartImage, backButtonImage, instructionsImage);
    }
}