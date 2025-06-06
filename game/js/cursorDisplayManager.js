function updateCursorStyle(currentScreen, canvas) {
    if (!canvas) {
        return;
    }

    if (currentScreen === "play") {
        canvas.style.cursor = "none"; // Cacher la souris en jeu
    } else {
        canvas.style.cursor = "default"; // Souris visible ailleurs
    }
}