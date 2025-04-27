document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const heartImage = new Image();
    heartImage.src = "resources/images/game/Heart.png";

    const backButtonImage = new Image();
    backButtonImage.src = "resources/images/Menu/rollback-picto.png";

    const instructionsImage = new Image();
    instructionsImage.src = "resources/images/WebSite/mockup/Instructions.png";

    Promise.all([
        new Promise(resolve => { heartImage.onload = resolve; heartImage.onerror = resolve; }),
        new Promise(resolve => { backButtonImage.onload = resolve; backButtonImage.onerror = resolve; }),
        new Promise(resolve => { instructionsImage.onload = resolve; instructionsImage.onerror = resolve; })
    ]).then(() => {
        currentScreen = "menu";
        renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
    });

    canvas.addEventListener("click", (event) => handleCanvasClick(event, canvas, ctx, heartImage, backButtonImage, instructionsImage));
    document.addEventListener("keydown", (event) => handleKeydown(event, ctx, canvas, heartImage, backButtonImage, instructionsImage));
});
