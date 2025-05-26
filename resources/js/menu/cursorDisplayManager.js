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