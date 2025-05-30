// Variable pour suivre si le formulaire a déjà été complété
let playerSetupCompleted = false;

function handleCanvasClick(event, heartImage, backButtonImage, instructionsImage) {
    const rect = window.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if ((currentScreen === "play" || currentScreen === "rules" || currentScreen === "stats") &&
        x >= backButton.x && x <= backButton.x + backButton.width &&
        y >= backButton.y && y <= backButton.y + backButton.height) {
        if (currentScreen === "play" && app) {
            app.stopTimer();
        }
        currentScreen = "menu";
        renderMenu(heartImage, backButtonImage, instructionsImage, app);
        return;
    }

    if (currentScreen === "menu") {
        menuButtons.forEach(button => {
            if (x >= button.x && x <= button.x + button.width &&
                y >= button.y && y <= button.y + button.height) {
                currentScreen = button.id;
                if (button.id === "play") {
                    // N'afficher le formulaire que si pas encore complété
                    if (!playerSetupCompleted) {
                        const setupScreen = new playerSetupScreen();
                        setupScreen.show();
                        playerSetupCompleted = true;
                    } else {
                        window.gameInitialisation();
                        startGame(heartImage, backButtonImage, instructionsImage);
                    }
                } else {
                    renderMenu(heartImage, backButtonImage, instructionsImage, app);
                }
            }
        });
    }
}

function handleKeydown(event, heartImage, backButtonImage, instructionsImage) {
    if (event.key === "Escape" && currentScreen === "play") {
        if (app) app.stopTimer();
        currentScreen = "menu";
        renderMenu(heartImage, backButtonImage, instructionsImage, app);
    }
}