class gameOverScreen {
    constructor(motor) {
        this.motor = motor;
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.activeListener = null;

        // Sauvegarder les dimensions originales du canvas
        this.originalWidth = this.canvas.width;
        this.originalHeight = this.canvas.height;

        // Dimensions et positions des boutons comme dans menuConstants.js
        const buttonY1 = this.canvas.height * 0.6; // ~420px sur un canvas de 700px
        const buttonY2 = buttonY1 + 80; // ~500px, espacement comme dans menuConstants.js

        // Utiliser les mêmes dimensions et style de boutons que menuConstants.js
        this.gameOverButtons = [
            { id: "retry", text: "Try Again", x: 400, y: buttonY1, width: 200, height: 60 },
            { id: "menu", text: "Menu", x: 400, y: buttonY2, width: 200, height: 60 }
        ];

        // Chargement des images comme dans menuConstants.js
        this.heartImage = window.heartImage ? window.heartImage : heartImage();
    }

    // Afficher l'écran Game Over
    show() {
                // Stopper le jeu
        this.motor.stopTimer();
        this.motor.gameState = 0;

        // Arrêter la musique du jeu si disponible
        const gameMusic = document.getElementById("gameMusic");
        if (gameMusic) {
            gameMusic.pause();
            gameMusic.currentTime = 0;
        }

        // Jouer la musique du menu si disponible
        const menuMusic = document.getElementById("menuMusic");
        if (menuMusic) {
            menuMusic.play();
        }

        // Nettoyer les écouteurs d'événements précédents
        this.clearEventListeners();

        // Dessiner l'écran Game Over
        this.draw();

        // Ajouter l'écouteur pour gérer les interactions
        this.addClickListener();
    }

    // Dessiner l'écran Game Over avec le style du menu
    draw() {
        // Effacer le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Fond comme dans le menu (rgb(60, 60, 60))
        this.ctx.fillStyle = "rgb(60, 60, 60)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Titre "Game Over" comme dans le menu (police 48px Arial)
        this.ctx.font = "48px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over", this.canvas.width / 2, 200);

        // Score final avec la même police que le menu (32px Arial)
        if (this.motor.score) {
            this.ctx.font = "32px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(`Score: ${this.motor.score.getCurrentScore()}`, this.canvas.width / 2, 280);
        }

        // Temps avec la même police
        window.finalTime += Math.floor(this.motor.timer / 24);
        this.ctx.font = "32px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Play Time: ${window.finalTime} seconds`, this.canvas.width / 2, 340);

        // Dessiner les boutons avec le style du menu
        this.drawButtons();
    }

    // Dessiner les boutons comme dans le menu
    drawButtons() {
        // Centrer les boutons comme dans le menu
        for (const button of this.gameOverButtons) {
            button.x = (this.canvas.width - button.width) / 2;
        }

        // Dessiner chaque bouton avec le style du menu
        this.gameOverButtons.forEach(button => {
            // Fond du bouton orange comme dans le menu (#ff5722)
            this.ctx.fillStyle = "#ff5722";
            this.ctx.fillRect(button.x, button.y, button.width, button.height);

            // Contour blanc comme dans le menu
            this.ctx.strokeStyle = "white";
            this.ctx.strokeRect(button.x, button.y, button.width, button.height);

            // Dessiner les cœurs à côté des boutons comme dans le menu
            if (this.heartImage && this.heartImage.complete && this.heartImage.naturalWidth !== 0) {
                this.ctx.drawImage(this.heartImage, button.x - 40, button.y, 32, 32);
                this.ctx.drawImage(this.heartImage, button.x + button.width + 10, button.y, 32, 32);
            }

            // Texte du bouton avec la même police que dans le menu (20px Arial)
            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
        });
    }

    // Ajouter l'écouteur d'événements pour les clics (comme dans le menu)
    addClickListener() {
        this.activeListener = (event) => {
            const rect = this.canvas.getBoundingClientRect();

            // Calculer les coordonnées relatives au canvas comme dans le menu
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            // Vérifier les clics sur les boutons
            this.gameOverButtons.forEach(button => {
                if (x >= button.x && x <= button.x + button.width &&
                    y >= button.y && y <= button.y + button.height) {
                    this.clearEventListeners();

                    if (button.id === "retry") {
                        // Redémarrer le jeu
                        window.currentScreen = "play";
                        window.startGame(this.canvas, this.ctx, window.heartImage, window.backButtonImage, window.instructionsImage);
                    } else if (button.id === "menu") {
                        // Retour au menu
                        window.currentScreen = "menu";
                        window.renderMenu(this.ctx, this.canvas, window.heartImage, window.backButtonImage, window.instructionsImage, this.motor);
                    }
                }
            });
        };

        this.canvas.addEventListener("click", this.activeListener);
    }

    // Nettoyer les écouteurs d'événements
    clearEventListeners() {
        if (this.activeListener) {
            this.canvas.removeEventListener("click", this.activeListener);
            this.activeListener = null;
        }
    }
}

// Rendre la classe disponible globalement
window.gameOverScreen = gameOverScreen;