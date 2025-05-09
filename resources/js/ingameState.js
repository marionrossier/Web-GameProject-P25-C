// Gestion des transitions d'écran dans le jeu

class ingameState {
    constructor(motor) {
        this.motor = motor; // Référence à l'instance de Motor pour accéder à gameState
        this.lastMessage = null; // Stocke le dernier message intercepté
        this.isIntercepting = false; // Désactivé par défaut
        this.originalConsoleLog = console.log; // Sauvegarder console.log original

        const canvas = document.getElementById("gameCanvas");
        if (canvas) {
            this.originalWidth = canvas.width;
            this.originalHeight = canvas.height;
            this.originalConsoleLog(`Dimensions originales du canvas sauvegardées: ${this.originalWidth}x${this.originalHeight}`);
        }
    }

    listenToConsole() {
        // Appliquer le proxy pour intercepter les messages
        console.log = (...args) => {
            if (this.isIntercepting && window.currentScreen === "play" && this.motor.gameState === 1) {
                const message = args.join(" "); // Concaténer les arguments en une chaîne
                this.lastMessage = message; // Stocker le dernier message
            }
            this.originalConsoleLog.apply(console, args); // Appeler le log original
        };
    }

    // Activer l'interception (appliquer le proxy)
    enableInterception() {
        if (!this.isIntercepting) {
            this.isIntercepting = true;
            this.listenToConsole(); // Appliquer le proxy
            this.originalConsoleLog("Interception de console.log activée");
        }
    }

    // Désactiver l'interception (restaurer console.log original)
    disableInterception() {
        if (this.isIntercepting) {
            this.isIntercepting = false;
            this.lastMessage = null; // Réinitialiser pour éviter les interférences
            console.log = this.originalConsoleLog; // Restaurer console.log original
            this.originalConsoleLog("Interception de console.log désactivée");
        }
    }

    analyzeLastMessage() {
        if (!this.isIntercepting || window.currentScreen !== "play" || this.motor.gameState !== 1) {
            return; // Ne rien faire si l'interception est désactivée ou si on n'est pas dans le jeu actif
        }

        this.isIntercepting = false; // Désactiver temporairement pour éviter les boucles
        if (this.lastMessage) {
            if (this.lastMessage.includes("gameOver")) {
                this.drawGameOverScreen();
            } else if (this.lastMessage.includes("endLevel")) {
                this.drawEndLevelScreen();
            } else if (this.lastMessage.includes("endGame")) {
                this.drawEndGameScreen();
            }
        }
        this.isIntercepting = true; // Réactiver si toujours dans "play" et gameState === 1
    }

    // Méthode pour préserver la taille originale du canvas
    preserveCanvasSize() {
        const canvas = document.getElementById("gameCanvas");
        if (canvas && this.originalWidth && this.originalHeight) {
            // Vérifier si la taille a changé
            if (canvas.width !== this.originalWidth || canvas.height !== this.originalHeight) {
                this.originalConsoleLog(`Rétablissement de la taille du canvas: ${this.originalWidth}x${this.originalHeight}`);

                // Restaurer les dimensions originales
                canvas.width = this.originalWidth;
                canvas.height = this.originalHeight;
            }
        }
    }

    drawGameOverScreen() {
        this.originalConsoleLog("DrawGameOverScreen");

        // S'assurer que le canvas a la bonne taille avant d'afficher l'écran Game Over
        this.preserveCanvasSize();

        // Vérifier si la classe gameOverScreen est disponible
        if (typeof window.gameOverScreen === 'function') {
            // Créer une instance de la classe gameOverScreen
            const screen = new window.gameOverScreen(this.motor);
            screen.show();
        }

        // Désactiver l'interception
        this.disableInterception();
    }

// Remplacer la méthode drawEndLevelScreen dans la classe ingameState
// Utiliser exactement la même logique que drawGameOverScreen

    drawEndLevelScreen() {
        this.originalConsoleLog("DrawEndLevelScreen");

        // Vérifier si la classe levelCompleteScreen est disponible
        if (typeof window.levelCompleteScreen === 'function') {
            // Créer une instance de la classe levelCompleteScreen
            const screen = new window.levelCompleteScreen(this.motor);
            screen.show();
        }

        // Désactiver l'interception
        this.disableInterception();
    }

    // Remplacer la méthode drawEndGameScreen dans ingameState.js

    drawEndGameScreen() {
        this.originalConsoleLog("DrawEndGameScreen");

        // S'assurer que le canvas a les bonnes dimensions
        const canvas = document.getElementById("gameCanvas");
        if (canvas.width !== 1000 || canvas.height !== 700) {
            this.originalConsoleLog(`Correction des dimensions du canvas: ${canvas.width}x${canvas.height} -> 1000x700`);
            canvas.width = 1000;
            canvas.height = 700;
        }

        // Vérifier si la classe gameCompleteScreen est disponible
        if (typeof window.gameCompleteScreen === 'function') {
            // Créer une instance de la classe gameCompleteScreen
            const screen = new window.gameCompleteScreen(this.motor);
            screen.show();
        }

        // Désactiver l'interception
        this.disableInterception();
    }
}