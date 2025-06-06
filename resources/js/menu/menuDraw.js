/**
 * Renders the background with a specified color and overlays it onto the entire canvas.
 *
 * @return {void} Does not return a value.
 */
function drawBackgroundAndOverlay() {
    window.ctx.fillStyle = "rgb(60, 60, 60)";
    window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);
}

/**
 * Renders a button on the canvas. Depending on the button's `id` and availability of images,
 * the button is drawn with specific styles or images.
 *
 * @param {Object} button - The button object containing properties for rendering.
 * @param {string} button.id - The identifier for the button (e.g., "back").
 * @param {number} button.x - The x-coordinate of the button's position on the canvas.
 * @param {number} button.y - The y-coordinate of the button's position on the canvas.
 * @param {number} button.width - The width of the button.
 * @param {number} button.height - The height of the button.
 * @param {string} button.text - The text to be displayed within the button.
 * @param {HTMLImageElement} heartImage - The image element for the heart icon, used for decoration.
 * @param {HTMLImageElement} backButtonImage - The image element for the back button icon.
 * @return {void} Does not return a value.
 */
function drawButton(button, heartImage, backButtonImage) {
    if (button.id === "back" && backButtonImage.complete && backButtonImage.naturalWidth !== 0) {
        window.ctx.drawImage(backButtonImage, button.x, button.y, button.width, button.height);
    } else {
        window.ctx.fillStyle = "#ff5722";
        window.ctx.fillRect(button.x, button.y, button.width, button.height);

        window.ctx.strokeStyle = "white";
        window.ctx.strokeRect(button.x, button.y, button.width, button.height);

        if (heartImage.complete && heartImage.naturalWidth !== 0) {
            window.ctx.drawImage(heartImage, button.x - 40, button.y, 32, 32);
            window.ctx.drawImage(heartImage, button.x + button.width + 10, button.y, 32, 32);
        }

        window.ctx.font = "20px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.textAlign = "center";
        window.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
    }
}

/**
 * Renders the main menu onto the canvas, including the background, title text,
 * and menu buttons.
 *
 * @param {Object} heartImage - The image used for the heart icon on buttons.
 * @param {Object} backButtonImage - The image used for the back button icon on buttons.
 * @return {void} This function does not return a value.
 */
function drawMainMenu(heartImage, backButtonImage) {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    drawBackgroundAndOverlay(window.canvas);

    window.ctx.font = "48px Arial";
    window.ctx.fillStyle = "white";
    window.ctx.textAlign = "center";
    window.ctx.fillText("Mouse Rush", window.canvas.width / 2, 200);

    menuButtons.forEach(button => drawButton(button, heartImage, backButtonImage));
}

/**
 * Draws the appropriate content on the screen based on the current screen state and provided images.
 *
 * @param {string} currentScreen - The current screen to be displayed. Possible values include "rules", "gameOver", or others.
 * @param {Object} heartImage - The image used for the heart in buttons.
 * @param {Object} backButtonImage - The image used for the back button.
 * @param {Object} instructionsImage - The image displayed when the current screen is "rules".
 * @return {void} Does not return a value.
 */
function drawScreen(currentScreen, heartImage, backButtonImage, instructionsImage) {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    drawBackgroundAndOverlay(window.canvas);

    if (currentScreen === "rules" && instructionsImage.complete && instructionsImage.naturalWidth !== 0) {
        window.ctx.drawImage(instructionsImage, 0, 25, window.canvas.width, window.canvas.height);
    } else if (currentScreen === "gameOver") {
        ctx.font = "48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", window.canvas.width / 2, 300);

        gameOverButtons.forEach(button => drawButton(button, heartImage, backButtonImage));
    } else {
        ctx.font = "48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Screen not loaded", window.canvas.width / 2, window.canvas.height / 2);
    }

    if (currentScreen !== "gameOver") {
        drawButton(backButton, heartImage, backButtonImage);
    }
}