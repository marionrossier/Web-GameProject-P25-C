let currentScreen = "menu";

function renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app) {
    if (currentScreen === "menu") {
        if (app) app.stopTimer();
        canvas.width = initialCanvasWidth;
        canvas.height = initialCanvasHeight;
        drawMainMenu(ctx, canvas, heartImage, backButtonImage);
    } else if (currentScreen === "play") {
        drawButton(ctx, backButton, heartImage, backButtonImage);
    } else if (currentScreen === "rules") {
        if (app) app.stopTimer();
        drawScreen(ctx, canvas, currentScreen, heartImage, backButtonImage, instructionsImage);
    } else if (currentScreen === "stats") {
        if (app) app.stopTimer();
        drawScreen(ctx, canvas, currentScreen, heartImage, backButtonImage, instructionsImage);
    } else if (currentScreen === "gameOver") {
        if (app) app.stopTimer();
        drawScreen(ctx, canvas, currentScreen, heartImage, backButtonImage, instructionsImage);
    }
}
