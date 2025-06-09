// Variable pour suivre si le formulaire a déjà été complété
/**
 * A boolean variable indicating whether the player setup process has been completed.
 *
 * If set to `true`, it signifies that all necessary steps for initializing or configuring
 * the player's setup have been successfully finished. If `false`, it means the setup
 * process is either incomplete or has not started.
 */
let playerSetupCompleted = false;

/**
 * Handles click events on the canvas and navigates between different application screens
 * (menu, play, rules, stats) based on the click position and context.
 *
 * @param {MouseEvent} event - The mouse click event on the canvas.
 * @param {HTMLImageElement} heartImage - The image used to represent the heart icon.
 * @param {HTMLImageElement} backButtonImage - The image used to represent the back button.
 * @param {HTMLImageElement} instructionsImage - The image used to represent the instructions icon.
 * @return {void} - Does not return a value.
 */
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

/**
 * Handles the keydown event and performs actions based on the current screen and key pressed.
 *
 * @param {KeyboardEvent} event - The keyboard event object triggered by the key press.
 * @param {Object} heartImage - The image object used for the heart symbol in the menu.
 * @param {Object} backButtonImage - The image object used for the back button in the menu.
 * @param {Object} instructionsImage - The image object used for the instructions in the menu.
 * @return {void} This function does not return any value.
 */
function handleKeydown(event, heartImage, backButtonImage, instructionsImage) {
    if (event.key === "Escape" && currentScreen === "play") {
        if (app) app.stopTimer();
        currentScreen = "menu";
        renderMenu(heartImage, backButtonImage, instructionsImage, app);
    }
}