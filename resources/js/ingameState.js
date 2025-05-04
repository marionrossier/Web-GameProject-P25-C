// Gestion des transitions d'écran dans le jeu

class IngameState {
    constructor(motor) {
        this.motor = motor; // Référence à l'instance de Motor pour accéder à gameState
        this.lastMessage = null; // Stocke le dernier message intercepté
        this.isIntercepting = false; // Désactivé par défaut
        this.originalConsoleLog = console.log; // Sauvegarder console.log original
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

    drawGameOverScreen() {
        this.originalConsoleLog("DrawGameOverScreen");
        this.disableInterception(); // Désactiver l'interception
    }

    drawEndLevelScreen() {
        this.originalConsoleLog("DrawEndLevelScreen");
        this.disableInterception(); // Désactiver l'interception
    }

    drawEndGameScreen() {
        this.originalConsoleLog("DrawEndGameScreen");
        this.disableInterception(); // Désactiver l'interception
    }
}