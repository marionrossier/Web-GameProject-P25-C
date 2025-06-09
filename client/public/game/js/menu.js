document.addEventListener("DOMContentLoaded", () => {
    this.heartImage = heartImage();
    this.backButtonImage = backButtonImage();
    this.instructionsImage = instructionsImage();

    Promise.all([
        new Promise(resolve => { this.heartImage.onload = resolve; this.heartImage.onerror = resolve; }),
        new Promise(resolve => { this.backButtonImage.onload = resolve; this.backButtonImage.onerror = resolve; }),
        new Promise(resolve => { this.instructionsImage.onload = resolve; this.instructionsImage.onerror = resolve; })
    ]).then(() => {
        currentScreen = "menu";
        renderMenu(this.heartImage, this.backButtonImage, this.instructionsImage, app);
    });

    window.canvas.addEventListener("click", (event) => handleCanvasClick
            (event, this.heartImage, this.backButtonImage, this.instructionsImage));
    document.addEventListener("keydown", (event) => handleKeydown
            (event, this.heartImage, this.backButtonImage, this.instructionsImage));
});
