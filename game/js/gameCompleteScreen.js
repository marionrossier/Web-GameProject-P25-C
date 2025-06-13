// Function de debug pour vérifier le chargement du script

/**
 * Represents the "game complete" screen displayed after a player finishes the game.
 * This screen includes congratulatory messages, options to restart the game or return
 * to the main menu, and visual enhancements such as confetti and buttons.
 */
class gameCompleteScreen {
    constructor(motor) {
        this.motor = motor;
        this.activeListener = null;

        if (window.canvas.width !== 1000 || window.canvas.height !== 700) {
            window.canvas.width = 1000;
            window.canvas.height = 700;
        }

        this.gameCompleteButtons = [
            { id: "restart", text: "Play Again", x: 400, y: 450, width: 200, height: 60 },
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

        const menuMusic = document.getElementById("menuMusic");
        if (menuMusic) {
            menuMusic.play();
        }

        window.canvas.style.cursor = 'default';

        this.clearEventListeners();
        this.draw();
        this.addClickListener();
    }

    draw() {
        window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

        const gradient = window.ctx.createLinearGradient(0, 0, 0, window.canvas.height);
        gradient.addColorStop(0, "#4A148C");
        gradient.addColorStop(1, "#311B92");
        window.ctx.fillStyle = gradient;
        window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);

        this.drawConfetti();

        window.ctx.font = "64px Arial";
        window.ctx.fillStyle = "#FFD700"; // Or
        window.ctx.textAlign = "center";
        window.ctx.fillText("Congratulations!", window.canvas.width / 2, 150);

        window.ctx.font = "36px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.fillText("You've Completed Mouse Rush!", window.canvas.width / 2, 220);

        if (window.finalScore) {
            window.ctx.font = "32px Arial";
            window.ctx.fillStyle = "white";
            window.ctx.fillText(`Final Score: ${window.finalScore}`, window.canvas.width / 2, 300);
        }

        window.finalTime += Math.floor(this.motor.timer / 24);
        const minutes = Math.floor(window.finalTime / 60);
        const seconds = window.finalTime % 60;
        window.ctx.font = "32px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.fillText(`Play Time: ${minutes}m ${seconds}s`, window.canvas.width / 2, 360);

        this.drawButtons();
    }

    drawConfetti() {

        for (let i = 0; i < 100; i++) {
            const x = Math.random() * window.canvas.width;
            const y = Math.random() * window.canvas.height;

            const size = Math.random() * 10 + 5;

            const colors = ["#FF5252", "#FFEB3B", "#69F0AE", "#40C4FF", "#EA80FC", "#FFFFFF"];
            window.ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

            if (Math.random() > 0.5) {
                // Cercle
                window.ctx.beginPath();
                window.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                window.ctx.fill();
            } else {
                // Rectangle
                window.ctx.fillRect(x, y, size, size);
            }
        }
    }

    drawButtons() {
        for (const button of this.gameCompleteButtons) {
            button.x = (window.canvas.width - button.width) / 2;
        }

        this.gameCompleteButtons.forEach(button => {
            window.ctx.fillStyle = button.id === "restart" ? "#4CAF50" : "#ff5722";
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
            this.gameCompleteButtons.forEach(button => {
                if (x >= button.x && x <= button.x + button.width &&
                    y >= button.y && y <= button.y + button.height) {
                    this.clearEventListeners();

                    if (button.id === "restart") {
                        window.gameInitialisation();
                        window.startGame(window.heartImage, window.backButtonImage, window.instructionsImage);
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
window.gameCompleteScreen = gameCompleteScreen;