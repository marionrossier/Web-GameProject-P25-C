function drawBackgroundAndOverlay(ctx, canvas) {
    ctx.fillStyle = "rgb(60, 60, 60)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawButton(ctx, button, heartImage, backButtonImage) {
    if (button.id === "back" && backButtonImage.complete && backButtonImage.naturalWidth !== 0) {
        ctx.drawImage(backButtonImage, button.x, button.y, button.width, button.height);
    } else {
        ctx.fillStyle = "#ff5722";
        ctx.fillRect(button.x, button.y, button.width, button.height);

        ctx.strokeStyle = "white";
        ctx.strokeRect(button.x, button.y, button.width, button.height);

        if (heartImage.complete && heartImage.naturalWidth !== 0) {
            ctx.drawImage(heartImage, button.x - 40, button.y, 32, 32);
            ctx.drawImage(heartImage, button.x + button.width + 10, button.y, 32, 32);
        }

        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
    }
}

function drawMainMenu(ctx, canvas, heartImage, backButtonImage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgroundAndOverlay(ctx, canvas);

    ctx.font = "48px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Mouse Rush", canvas.width / 2, 200);

    menuButtons.forEach(button => drawButton(ctx, button, heartImage, backButtonImage));
}

function drawScreen(ctx, canvas, currentScreen, heartImage, backButtonImage, instructionsImage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgroundAndOverlay(ctx, canvas);

    if (currentScreen === "rules" && instructionsImage.complete && instructionsImage.naturalWidth !== 0) {
        ctx.drawImage(instructionsImage, 0, 25, canvas.width, canvas.height);
    } else if (currentScreen === "gameOver") {
        ctx.font = "48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, 300);

        gameOverButtons.forEach(button => drawButton(ctx, button, heartImage, backButtonImage));
    } else {
        ctx.font = "48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Screen not loaded", canvas.width / 2, canvas.height / 2);
    }

    if (currentScreen !== "gameOver") {
        drawButton(ctx, backButton, heartImage, backButtonImage);
    }
}