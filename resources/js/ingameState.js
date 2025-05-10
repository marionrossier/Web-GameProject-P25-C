// Gestion des transitions d'écran dans le jeu

class ingameState {
    constructor(motor) {
        this.motor = motor; // Référence à l'instance de Motor pour accéder à gameState

        const canvas = document.getElementById("gameCanvas");
        if (canvas) {
            this.originalWidth = canvas.width;
            this.originalHeight = canvas.height;
        }
    }

    // Méthode pour préserver la taille originale du canvas
    preserveCanvasSize() {
        const canvas = document.getElementById("gameCanvas");
        if (canvas && this.originalWidth && this.originalHeight) {
            // Vérifier si la taille a changé
            if (canvas.width !== this.originalWidth || canvas.height !== this.originalHeight) {

                // Restaurer les dimensions originales
                canvas.width = this.originalWidth;
                canvas.height = this.originalHeight;
            }
        }
    }

    drawGameOverScreen() {
        // S'assurer que le canvas a la bonne taille avant d'afficher l'écran Game Over
        this.preserveCanvasSize();

        // Vérifier si la classe gameOverScreen est disponible
        if (typeof window.gameOverScreen === 'function') {
            // Créer une instance de la classe gameOverScreen
            const screen = new window.gameOverScreen(this.motor);
            screen.show();
        }
    }

    drawEndLevelScreen() {
        // Vérifier si la classe levelCompleteScreen est disponible
        if (typeof window.levelCompleteScreen === 'function') {
            // Créer une instance de la classe levelCompleteScreen
            const screen = new window.levelCompleteScreen(this.motor);
            screen.show();
        }
    }

    drawEndGameScreen() {
        // S'assurer que le canvas a les bonnes dimensions
        const canvas = document.getElementById("gameCanvas");
        if (canvas.width !== 1000 || canvas.height !== 700) {
            canvas.width = 1000;
            canvas.height = 700;
        }

        // Vérifier si la classe gameCompleteScreen est disponible
        if (typeof window.gameCompleteScreen === 'function') {
            // Créer une instance de la classe gameCompleteScreen
            const screen = new window.gameCompleteScreen(this.motor);
            screen.show();
        }
    }
}