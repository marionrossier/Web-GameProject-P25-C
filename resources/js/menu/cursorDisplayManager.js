/**
 * Updates the cursor style of the canvas based on the current screen.
 *
 * @param {string} currentScreen - The current screen identifier, e.g., "play".
 * @param {HTMLCanvasElement} canvas - The canvas element whose cursor style needs to be updated.
 * @return {void} This function does not return a value.
 */
function updateCursorStyle(currentScreen, canvas) {
    if (!window.canvas) {
        return;
    }

    if (currentScreen === "play") {
        window.canvas.style.cursor = "none"; // Cacher la souris en jeu
    } else {
        window.canvas.style.cursor = "default"; // Souris visible ailleurs
    }
}