function drawBackgroundAndOverlay(canvas) {
    window.ctx.fillStyle = "rgb(60, 60, 60)";
    window.ctx.fillRect(0, 0, canvas.width, canvas.height);
}

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

function drawMainMenu(canvas, heartImage, backButtonImage) {
    window.ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgroundAndOverlay(canvas);

    window.ctx.font = "48px Arial";
    window.ctx.fillStyle = "white";
    window.ctx.textAlign = "center";
    window.ctx.fillText("Mouse Rush", canvas.width / 2, 200);

    menuButtons.forEach(button => drawButton(button, heartImage, backButtonImage));
}

function drawScreen(canvas, currentScreen, heartImage, backButtonImage, instructionsImage) {
    window.ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgroundAndOverlay(canvas);

    if (currentScreen === "rules" && instructionsImage.complete && instructionsImage.naturalWidth !== 0) {
        window.ctx.drawImage(instructionsImage, 0, 25, canvas.width, canvas.height);
    } else if (currentScreen === "gameOver") {
        ctx.font = "48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, 300);

        gameOverButtons.forEach(button => drawButton(button, heartImage, backButtonImage));
    } else {
        ctx.font = "48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Screen not loaded", canvas.width / 2, canvas.height / 2);
    }

    if (currentScreen !== "gameOver") {
        drawButton(backButton, heartImage, backButtonImage);
    }
}