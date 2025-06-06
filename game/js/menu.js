document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    this.heartImage = heartImage();
    this.backButtonImage = backButtonImage();
    this.instructionsImage = instructionsImage()

    Promise.all([
        new Promise(resolve => { this.heartImage.onload = resolve; this.heartImage.onerror = resolve; }),
        new Promise(resolve => { this.backButtonImage.onload = resolve; this.backButtonImage.onerror = resolve; }),
        new Promise(resolve => { this.instructionsImage.onload = resolve; this.instructionsImage.onerror = resolve; })
    ]).then(() => {
        currentScreen = "menu";
        renderMenu(ctx, canvas, this.heartImage, this.backButtonImage, this.instructionsImage, app);
    });

    canvas.addEventListener("click", (event) => handleCanvasClick
            (event, canvas, ctx, this.heartImage, this.backButtonImage, this.instructionsImage));
    document.addEventListener("keydown", (event) => handleKeydown
            (event, ctx, canvas, this.heartImage, this.backButtonImage, this.instructionsImage));
});
