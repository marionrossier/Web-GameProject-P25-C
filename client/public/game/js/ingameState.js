/**
 * The `ingameState` class represents the state of the game during gameplay.
 * It is responsible for managing and displaying different game-related screens like
 * the 'Game Over' screen, 'Level Complete' screen, and 'Game Complete' screen.
 * It also ensures to preserve the original canvas size during specific actions.
 */
class ingameState {
    constructor(motor) {
        this.motor = motor;

        if (window.canvas) {
            this.originalWidth = canvas.width;
            this.originalHeight = canvas.height;
        }
    }

    // Méthode pour préserver la taille originale du canvas
    preserveCanvasSize() {
        const canvas = document.getElementById("gameCanvas");
        if (canvas && this.originalWidth && this.originalHeight) {
            if (canvas.width !== this.originalWidth || canvas.height !== this.originalHeight) {

                canvas.width = this.originalWidth;
                canvas.height = this.originalHeight;
            }
        }
    }

    drawGameOverScreen() {
        this.preserveCanvasSize();
        window.currentLevel = 1;
        if (typeof window.gameOverScreen === 'function') {
            const screen = new window.gameOverScreen(this.motor);
            screen.show();
        }
    }

    drawEndLevelScreen() {
        if (typeof window.levelCompleteScreen === 'function') {
            const screen = new window.levelCompleteScreen(this.motor);
            screen.show();
        }
    }

    drawEndGameScreen() {
        const canvas = document.getElementById("gameCanvas");
        if (canvas.width !== 1000 || canvas.height !== 700) {
            canvas.width = 1000;
            canvas.height = 700;
        }

        if (typeof window.gameCompleteScreen === 'function') {
            const screen = new window.gameCompleteScreen(this.motor);
            screen.show();
        }
    }
}