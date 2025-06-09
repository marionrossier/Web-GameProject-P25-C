/**
 * The `gameOverScreen` class represents the game-over screen of the application. It is responsible for
 * displaying the game-over interface, drawing buttons, handling user interactions, and managing game state transitions.
 */
class gameOverScreen {
    constructor(motor) {
        this.motor = motor;
        this.activeListener = null;

        const buttonY1 = window.canvas.height * 0.6; // ~420px sur un canvas de 700px
        const buttonY2 = buttonY1 + 80; // ~500px, espacement comme dans menuConstants.js

        this.gameOverButtons = [
            { id: "retry", text: "Try Again", x: 400, y: buttonY1, width: 200, height: 60 },
            { id: "menu", text: "Menu", x: 400, y: buttonY2, width: 200, height: 60 }
        ];

        this.heartImage = window.heartImage ? window.heartImage : heartImage();
    }

    show() {
                // Stopper le jeu
        this.motor.stopTimer();

        const gameMusic = document.getElementById("gameMusic");
        if (gameMusic) {
            gameMusic.pause();
            gameMusic.currentTime = 0;
        }

        const menuMusic = document.getElementById("menuMusic");
        if (menuMusic) {
            menuMusic.play();
        }

        this.clearEventListeners();
        this.draw();
        this.addClickListener();
    }

    draw() {
        window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

        window.ctx.fillStyle = "rgb(60, 60, 60)";
        window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);

        window.ctx.font = "48px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.textAlign = "center";
        window.ctx.fillText("Game Over", window.canvas.width / 2, 200);

        if (window.finalScore) {
            window.ctx.font = "32px Arial";
            window.ctx.fillStyle = "white";
            window.ctx.fillText(`Play Score: ${window.finalScore}`, window.canvas.width / 2, 280);
        }

        window.finalTime += Math.floor(this.motor.timer / 24);
        window.ctx.font = "32px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.fillText(`Play Time: ${window.finalTime} seconds`, window.canvas.width / 2, 340);

        this.drawButtons();
    }

    drawButtons() {
        for (const button of this.gameOverButtons) {
            button.x = (window.canvas.width - button.width) / 2;
        }

        this.gameOverButtons.forEach(button => {
            window.ctx.fillStyle = "#ff5722";
            window.ctx.fillRect(button.x, button.y, button.width, button.height);

            window.ctx.strokeStyle = "white";
            window.ctx.strokeRect(button.x, button.y, button.width, button.height);

            if (this.heartImage && this.heartImage.complete && this.heartImage.naturalWidth !== 0) {
                window.ctx.drawImage(this.heartImage, button.x - 40, button.y, 32, 32);
                window.ctx.drawImage(this.heartImage, button.x + button.width + 10, button.y, 32, 32);
            }

            window.ctx.font = "20px Arial";
            window.ctx.fillStyle = "white";
            window.ctx.textAlign = "center";
            window.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
        });
        drawButton(backButton, heartImage, backButtonImage);
    }

    addClickListener() {
        this.activeListener = (event) => {
            const rect = window.canvas.getBoundingClientRect();

            const scaleX = window.canvas.width / rect.width;
            const scaleY = window.canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            this.gameOverButtons.forEach(button => {
                if (x >= button.x && x <= button.x + button.width &&
                    y >= button.y && y <= button.y + button.height) {
                    this.clearEventListeners();

                    if (button.id === "retry") {
                        window.gameInitialisation();
                        window.startGame( window.heartImage, window.backButtonImage, window.instructionsImage);
                    } else if (button.id === "menu") {
                        window.currentScreen = "menu";
                        window.renderMenu( window.heartImage, window.backButtonImage, window.instructionsImage, this.motor);
                    }
                }
            });
        };

        window.canvas.addEventListener("click", this.activeListener);
    }

    clearEventListeners() {
        if (this.activeListener) {
            window.canvas.removeEventListener("click", this.activeListener);
            this.activeListener = null;
        }
    }
}

window.gameOverScreen = gameOverScreen;