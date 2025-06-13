/**
 * Represents the level complete screen in the game.
 * This screen displays the details of the completed level, including the score, time, and remaining lives.
 * It also provides buttons for navigating to the next level or returning to the menu.
 */
class levelCompleteScreen {
    constructor(motor) {

        window.currentScreen = null; //so it doesn't stay on currentScreen "play"

        this.motor = motor;
        this.activeListener = null;

        if (window.canvas.width !== 1000 || window.canvas.height !== 700) {
            window.canvas.width = 1000;
            window.canvas.height = 700;
        }

        this.levelCompleteButtons = [
            { id: "nextLevel", text: "Next Level", x: 400, y: 450, width: 200, height: 60 },
            { id: "menu", text: "Menu", x: 400, y: 530, width: 200, height: 60 }
        ];

        this.heartImage = window.heartImage ? window.heartImage : heartImage();
    }


    show() {

        this.motor.stopTimer();

        const gameMusic = document.getElementById("gameMusic");
        if (gameMusic) {
            gameMusic.pause();
            gameMusic.currentTime = 0;
        }

        // IMPORTANT: Force the default system cursor
        window.canvas.style.cursor = 'default';

        if (typeof window.updateCursorStyle === 'function') {
            window.updateCursorStyle("menu", window.canvas);
        }

        if (this.motor.cursor) {
            if (!this.originalDrawMouse && this.motor.cursor.drawMouse) {
                this.originalDrawMouse = this.motor.cursor.drawMouse;
                this.motor.cursor.drawMouse = function() {};
            }
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
        window.ctx.fillStyle = "#4CAF50";
        window.ctx.textAlign = "center";
        window.ctx.fillText("Level Complete!", window.canvas.width / 2, 200);

        if (window.finalScore) {
            window.ctx.font = "32px Arial";
            window.ctx.fillStyle = "white";
            window.ctx.fillText(`Play Score: ${window.finalScore}`, window.canvas.width / 2, 280);
        }

        window.finalTime += Math.floor(this.motor.timer / 24);
        window.ctx.font = "32px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.fillText(`Play Time: ${window.finalTime} seconds`, window.canvas.width / 2, 340);

        window.ctx.font = "32px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.fillText(`Lives: ${window.currentLives}`, window.canvas.width / 2, 400);
        this.drawButtons();
    }

    drawButtons() {

        for (const button of this.levelCompleteButtons) {
            button.x = (window.canvas.width - button.width) / 2;
        }

        this.levelCompleteButtons.forEach(button => {

            window.ctx.fillStyle = button.id === "nextLevel" ? "#4CAF50" : "#ff5722";
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
    }

    addClickListener() {
        this.activeListener = (event) => {
            const rect = window.canvas.getBoundingClientRect();

            const scaleX = window.canvas.width / rect.width;
            const scaleY = window.canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            this.levelCompleteButtons.forEach(button => {
                if (x >= button.x && x <= button.x + button.width &&
                    y >= button.y && y <= button.y + button.height) {
                    this.clearEventListeners();

                    if (button.id === "nextLevel") {

                        window.currentLevel++;
                        window.currentScreen = "play";
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

window.levelCompleteScreen = levelCompleteScreen;