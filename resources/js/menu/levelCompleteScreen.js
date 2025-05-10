// Function de debug pour vérifier le chargement du script
console.log("Script levelCompleteScreen.js chargé avec succès!");

class levelCompleteScreen {
    constructor(motor) {
        this.motor = motor;
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.activeListener = null;

        // Sauvegarder les dimensions originales du canvas
        this.originalWidth = this.canvas.width;
        this.originalHeight = this.canvas.height;

        // IMPORTANT: S'assurer que le canvas a les bonnes dimensions
        if (this.canvas.width !== 1000 || this.canvas.height !== 700) {
            this.canvas.width = 1000;
            this.canvas.height = 700;
        }

        // Dimensions et positions des boutons - REMONTÉS
        // Positions Y ajustées pour remonter les boutons
        this.levelCompleteButtons = [
            { id: "nextLevel", text: "Next Level", x: 400, y: 450, width: 200, height: 60 },
            { id: "menu", text: "Menu", x: 400, y: 530, width: 200, height: 60 }
        ];

        // Chargement des images
        this.heartImage = window.heartImage ? window.heartImage : heartImage();
    }

    // Afficher l'écran de fin de niveau
    // Remplacement simplifié de la méthode show() dans levelCompleteScreen.js

    show() {
        console.log("Affichage de l'écran de fin de niveau");

        // Stopper le jeu
        this.motor.stopTimer();
        this.motor.gameState = 0;

        // Arrêter la musique du jeu si disponible
        const gameMusic = document.getElementById("gameMusic");
        if (gameMusic) {
            gameMusic.pause();
            gameMusic.currentTime = 0;
        }

        // IMPORTANT: Forcer le curseur système par défaut
        this.canvas.style.cursor = 'default';

        // Si la classe updateCursorStyle est disponible, l'utiliser
        if (typeof window.updateCursorStyle === 'function') {
            window.updateCursorStyle("menu", this.canvas);
        }

        // Neutraliser directement le curseur du moteur s'il existe
        if (this.motor.cursor) {
            // Sauvegarder la méthode originale drawMouse
            if (!this.originalDrawMouse && this.motor.cursor.drawMouse) {
                this.originalDrawMouse = this.motor.cursor.drawMouse;
                // Remplacer par une fonction vide
                this.motor.cursor.drawMouse = function() {};
            }
        }

        // Nettoyer les écouteurs d'événements précédents
        this.clearEventListeners();

        // Dessiner l'écran de fin de niveau
        this.draw();

        // Ajouter l'écouteur pour gérer les interactions
        this.addClickListener();
    }

    // Dessiner l'écran de fin de niveau avec le style du menu
    draw() {
        // Effacer le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Fond comme dans le menu (rgb(60, 60, 60))
        this.ctx.fillStyle = "rgb(60, 60, 60)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Titre "Level Complete!" en vert (pour indiquer la réussite)
        this.ctx.font = "48px Arial";
        this.ctx.fillStyle = "#4CAF50"; // Vert pour indiquer la réussite
        this.ctx.textAlign = "center";
        this.ctx.fillText("Level Complete!", this.canvas.width / 2, 200);

        // Score final
        if (this.motor.score) {
            this.ctx.font = "32px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(`Score: ${this.motor.score.getCurrentScore()}`, this.canvas.width / 2, 280);
        }

        // Temps
        const secondsPlayed = Math.floor(this.motor.timer / 24);
        this.ctx.font = "32px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Time: ${secondsPlayed} seconds`, this.canvas.width / 2, 340);

        // Vies restantes
        this.ctx.font = "32px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Lives: ${this.motor.lives}`, this.canvas.width / 2, 400);

        // Dessiner les boutons
        this.drawButtons();

        // SUPPRIMÉ: Score en bas à gauche (pour éviter le double affichage)
        // Le score est déjà affiché par le moteur de jeu
    }

    // Dessiner les boutons exactement comme dans le menu
    drawButtons() {
        // Centrer les boutons
        for (const button of this.levelCompleteButtons) {
            button.x = (this.canvas.width - button.width) / 2;
        }

        // Dessiner chaque bouton
        this.levelCompleteButtons.forEach(button => {
            // Fond du bouton (vert pour Next Level, orange pour Menu)
            this.ctx.fillStyle = button.id === "nextLevel" ? "#4CAF50" : "#ff5722";
            this.ctx.fillRect(button.x, button.y, button.width, button.height);

            // Contour blanc
            this.ctx.strokeStyle = "white";
            this.ctx.strokeRect(button.x, button.y, button.width, button.height);

            // Dessiner les cœurs à côté des boutons
            if (this.heartImage && this.heartImage.complete && this.heartImage.naturalWidth !== 0) {
                this.ctx.drawImage(this.heartImage, button.x - 40, button.y, 32, 32);
                this.ctx.drawImage(this.heartImage, button.x + button.width + 10, button.y, 32, 32);
            }

            // Texte du bouton
            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
        });
    }

    // Ajouter l'écouteur d'événements pour les clics
    addClickListener() {
        this.activeListener = (event) => {
            const rect = this.canvas.getBoundingClientRect();

            // Calculer les coordonnées relatives au canvas
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            console.log(`Click at: ${x}, ${y}`);

            // Vérifier les clics sur les boutons
            this.levelCompleteButtons.forEach(button => {
                if (x >= button.x && x <= button.x + button.width &&
                    y >= button.y && y <= button.y + button.height) {
                    this.clearEventListeners();

                    if (button.id === "nextLevel") {
                        // Incrémenter le niveau
                        window.currentLevel++;

                        // Démarrer le niveau suivant
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
            console.log("Écouteur de clics supprimé");
        }
    }
}

// Rendre la classe disponible globalement
window.levelCompleteScreen = levelCompleteScreen;