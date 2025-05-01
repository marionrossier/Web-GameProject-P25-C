currentScreen = "menu";
currentLevel = 1;
app = null;

function renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app) {
    console.log("Rendering screen:", currentScreen);

    updateCursorStyle(currentScreen, canvas);

    if (currentScreen === "menu") {
        if (app) app.stopTimer();
        canvas.width = initialCanvasWidth;
        canvas.height = initialCanvasHeight;
        drawMainMenu(ctx, canvas, heartImage, backButtonImage);

    } else if (currentScreen === "play") {
        drawButton(ctx, backButton, heartImage, backButtonImage);

    } else if (["rules", "stats", "gameOver"].includes(currentScreen)) {
        if (app) app.stopTimer();
        drawScreen(ctx, canvas, currentScreen, heartImage, backButtonImage, instructionsImage);
    }
}
