function handleCanvasClick(event, canvas, ctx, heartImage, backButtonImage, instructionsImage) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if ((currentScreen === "play" || currentScreen === "rules" || currentScreen === "stats") &&
        x >= backButton.x && x <= backButton.x + backButton.width &&
        y >= backButton.y && y <= backButton.y + backButton.height) {
        if (currentScreen === "play" && app) app.stopTimer();
        currentScreen = "menu";
        renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
        return;
    }

    if (currentScreen === "menu") {
        menuButtons.forEach(button => {
            if (x >= button.x && x <= button.x + button.width &&
                y >= button.y && y <= button.y + button.height) {
                currentScreen = button.id;
                if (button.id === "play") {
                    startGame(canvas, ctx);
                }
                renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
            }
        });
    } else if (currentScreen === "gameOver") {
        gameOverButtons.forEach(button => {
            if (x >= button.x && x <= button.x + button.width &&
                y >= button.y && y <= button.y + button.height) {
                if (button.id === "continue") {
                    startGame(canvas, ctx);
                } else if (button.id === "menu") {
                    currentScreen = "menu";
                }
                renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
            }
        });
    }
}

function handleKeydown(event, ctx, canvas, heartImage, backButtonImage, instructionsImage) {
    if (event.key === "Escape" && currentScreen === "play") {
        if (app) app.stopTimer();
        currentScreen = "menu";
        renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
    }
}
