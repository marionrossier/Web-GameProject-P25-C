document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");

    this.heartImage = heartImage();
    this.backButtonImage = backButtonImage();
    this.instructionsImage = instructionsImage()

    Promise.all([
        new Promise(resolve => { this.heartImage.onload = resolve; this.heartImage.onerror = resolve; }),
        new Promise(resolve => { this.backButtonImage.onload = resolve; this.backButtonImage.onerror = resolve; }),
        new Promise(resolve => { this.instructionsImage.onload = resolve; this.instructionsImage.onerror = resolve; })
    ]).then(() => {
        currentScreen = "menu";
        renderMenu(canvas, this.heartImage, this.backButtonImage, this.instructionsImage, app);
    });

    canvas.addEventListener("click", (event) => handleCanvasClick
            (event, canvas, this.heartImage, this.backButtonImage, this.instructionsImage));
    document.addEventListener("keydown", (event) => handleKeydown
            (event, canvas, this.heartImage, this.backButtonImage, this.instructionsImage));
});
