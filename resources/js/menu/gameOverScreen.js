class gameOverScreen {
    constructor(motor) {
        this.motor = motor;
        this.activeListener = null;

        // Dimensions et positions des boutons comme dans menuConstants.js
        const buttonY1 = window.canvas.height * 0.6; // ~420px sur un canvas de 700px
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
        window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

        // Fond comme dans le menu (rgb(60, 60, 60))
        window.ctx.fillStyle = "rgb(60, 60, 60)";
        window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);

        // Titre "Game Over" comme dans le menu (police 48px Arial)
        window.ctx.font = "48px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.textAlign = "center";
        window.ctx.fillText("Game Over", window.canvas.width / 2, 200);

        // Score final avec la même police que le menu (32px Arial)
        if (window.finalScore) {
            window.ctx.font = "32px Arial";
            window.ctx.fillStyle = "white";
            window.ctx.fillText(`Play Score: ${window.finalScore}`, window.canvas.width / 2, 280);
        }

        // Temps avec la même police
        window.finalTime += Math.floor(this.motor.timer / 24);
        window.ctx.font = "32px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.fillText(`Play Time: ${window.finalTime} seconds`, window.canvas.width / 2, 340);

        // Dessiner les boutons avec le style du menu
        this.drawButtons();
    }

    // Dessiner les boutons comme dans le menu
    drawButtons() {
        // Centrer les boutons comme dans le menu
        for (const button of this.gameOverButtons) {
            button.x = (window.canvas.width - button.width) / 2;
        }

        // Dessiner chaque bouton avec le style du menu
        this.gameOverButtons.forEach(button => {
            // Fond du bouton orange comme dans le menu (#ff5722)
            window.ctx.fillStyle = "#ff5722";
            window.ctx.fillRect(button.x, button.y, button.width, button.height);

            // Contour blanc comme dans le menu
            window.ctx.strokeStyle = "white";
            window.ctx.strokeRect(button.x, button.y, button.width, button.height);

            // Dessiner les cœurs à côté des boutons comme dans le menu
            if (this.heartImage && this.heartImage.complete && this.heartImage.naturalWidth !== 0) {
                window.ctx.drawImage(this.heartImage, button.x - 40, button.y, 32, 32);
                window.ctx.drawImage(this.heartImage, button.x + button.width + 10, button.y, 32, 32);
            }

            // Texte du bouton avec la même police que dans le menu (20px Arial)
            window.ctx.font = "20px Arial";
            window.ctx.fillStyle = "white";
            window.ctx.textAlign = "center";
            window.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
        });
        drawButton(backButton, heartImage, backButtonImage);
    }

    // Ajouter l'écouteur d'événements pour les clics (comme dans le menu)
    addClickListener() {
        this.activeListener = (event) => {
            const rect = window.canvas.getBoundingClientRect();

            // Calculer les coordonnées relatives au canvas comme dans le menu
            const scaleX = window.canvas.width / rect.width;
            const scaleY = window.canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            // Vérifier les clics sur les boutons
            this.gameOverButtons.forEach(button => {
                if (x >= button.x && x <= button.x + button.width &&
                    y >= button.y && y <= button.y + button.height) {
                    this.clearEventListeners();

                    if (button.id === "retry") {
                        // Redémarrer le jeu
                        window.gameInitialisation();
                        window.startGame( window.heartImage, window.backButtonImage, window.instructionsImage);
                    } else if (button.id === "menu") {
                        // Retour au menu
                        window.currentScreen = "menu";
                        window.renderMenu( window.heartImage, window.backButtonImage, window.instructionsImage, this.motor);
                    }
                }
            });
        };

        window.canvas.addEventListener("click", this.activeListener);
    }

    // Nettoyer les écouteurs d'événements
    clearEventListeners() {
        if (this.activeListener) {
            window.canvas.removeEventListener("click", this.activeListener);
            this.activeListener = null;
        }
    }
}

// Rendre la classe disponible globalement
window.gameOverScreen = gameOverScreen;