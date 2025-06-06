class GameOverScreenClass {
    constructor(motor) {
        this.motor = motor;
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.activeListener = null;

        this.originalWidth = this.canvas.width;
        this.originalHeight = this.canvas.height;

        const buttonY1 = this.canvas.height * 0.6;
        const buttonY2 = buttonY1 + 80;

        this.gameOverButtons = [
            { id: "retry", text: "Try Again", x: 400, y: buttonY1, width: 200, height: 60 },
            { id: "menu", text: "Menu", x: 400, y: buttonY2, width: 200, height: 60 }
        ];

        this.heartImage = window.heartImage ? window.heartImage : heartImage();
    }

    show() {
        this.motor.stopTimer();
        this.motor.gameState = 0;

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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgb(60, 60, 60)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = "48px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over", this.canvas.width / 2, 200);

        if (this.motor.score) {
            this.ctx.font = "32px Arial";
            this.ctx.fillText(`Score: ${this.motor.score.getCurrentScore()}`, this.canvas.width / 2, 280);
        }

        const secondsPlayed = Math.floor(this.motor.timer / 24);
        this.ctx.font = "32px Arial";
        this.ctx.fillText(`Time: ${secondsPlayed} seconds`, this.canvas.width / 2, 340);

        this.drawButtons();
    }

    drawButtons() {
        for (const button of this.gameOverButtons) {
            button.x = (this.canvas.width - button.width) / 2;
        }

        this.gameOverButtons.forEach(button => {
            this.ctx.fillStyle = "#ff5722";
            this.ctx.fillRect(button.x, button.y, button.width, button.height);

            this.ctx.strokeStyle = "white";
            this.ctx.strokeRect(button.x, button.y, button.width, button.height);

            if (this.heartImage && this.heartImage.complete && this.heartImage.naturalWidth !== 0) {
                this.ctx.drawImage(this.heartImage, button.x - 40, button.y, 32, 32);
                this.ctx.drawImage(this.heartImage, button.x + button.width + 10, button.y, 32, 32);
            }

            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
        });
    }

    addClickListener() {
        this.activeListener = (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            this.gameOverButtons.forEach(button => {
                if (
                    x >= button.x &&
                    x <= button.x + button.width &&
                    y >= button.y &&
                    y <= button.y + button.height
                ) {
                    this.clearEventListeners();

                    if (button.id === "retry") {
                        window.currentScreen = "play";
                        window.startGame(this.canvas, this.ctx, window.heartImage, window.backButtonImage, window.instructionsImage);
                    } else if (button.id === "menu") {
                        window.currentScreen = "menu";
                        window.renderMenu(this.ctx, this.canvas, window.heartImage, window.backButtonImage, window.instructionsImage, this.motor);
                    }
                }
            });
        };

        this.canvas.addEventListener("click", this.activeListener);
    }

    clearEventListeners() {
        if (this.activeListener) {
            this.canvas.removeEventListener("click", this.activeListener);
            this.activeListener = null;
        }
    }
}

// Export pour l'utiliser globalement
window.GameOverScreenClass = GameOverScreenClass;
