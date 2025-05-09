// Function de debug pour vérifier le chargement du script
console.log("Script gameCompleteScreen.js chargé avec succès!");

class gameCompleteScreen {
    constructor(motor) {
        this.motor = motor;
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.activeListener = null;

        // IMPORTANT: S'assurer que le canvas a les bonnes dimensions
        if (this.canvas.width !== 1000 || this.canvas.height !== 700) {
            console.log(`Correction des dimensions du canvas: ${this.canvas.width}x${this.canvas.height} -> 1000x700`);
            this.canvas.width = 1000;
            this.canvas.height = 700;
        }

        // Dimensions et positions des boutons
        this.gameCompleteButtons = [
            { id: "restart", text: "Play Again", x: 400, y: 450, width: 200, height: 60 },
            { id: "menu", text: "Menu", x: 400, y: 530, width: 200, height: 60 }
        ];

        // Chargement des images
        this.heartImage = window.heartImage ? window.heartImage : heartImage();

        console.log(`Dimensions du canvas: ${this.canvas.width}x${this.canvas.height}`);
    }

    // Afficher l'écran de fin de jeu
    show() {
        console.log("Affichage de l'écran de fin de jeu");

        // Stopper le jeu
        this.motor.stopTimer();
        this.motor.gameState = 0;

        // Arrêter la musique du jeu si disponible
        const gameMusic = document.getElementById("gameMusic");
        if (gameMusic) {
            gameMusic.pause();
            gameMusic.currentTime = 0;
        }

        // Jouer une musique festive ou la musique du menu
        const menuMusic = document.getElementById("menuMusic");
        if (menuMusic) {
            menuMusic.play().catch(error => {
                console.error("Erreur lors de la lecture de la musique:", error);
            });
        }

        // Forcer le style de curseur normal
        this.canvas.style.cursor = 'default';

        // Nettoyer les écouteurs d'événements précédents
        this.clearEventListeners();

        // Dessiner l'écran de fin de jeu
        this.draw();

        // Ajouter l'écouteur pour gérer les interactions
        this.addClickListener();
    }

    // Dessiner l'écran de fin de jeu
    draw() {
        // Effacer le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Fond festif avec dégradé
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, "#4A148C"); // Violet foncé
        gradient.addColorStop(1, "#311B92"); // Indigo foncé
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Dessiner des confettis colorés
        this.drawConfetti();

        // Titre "Congratulations!" en doré
        this.ctx.font = "64px Arial";
        this.ctx.fillStyle = "#FFD700"; // Or
        this.ctx.textAlign = "center";
        this.ctx.fillText("Congratulations!", this.canvas.width / 2, 150);

        // Sous-titre
        this.ctx.font = "36px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("You've Completed Mouse Rush!", this.canvas.width / 2, 220);

        // Score final
        if (this.motor.score) {
            this.ctx.font = "32px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(`Final Score: ${this.motor.score.getCurrentScore()}`, this.canvas.width / 2, 300);
        }

        // Temps total
        const secondsPlayed = Math.floor(this.motor.timer / 24);
        const minutes = Math.floor(secondsPlayed / 60);
        const seconds = secondsPlayed % 60;
        this.ctx.font = "32px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Total Time: ${minutes}m ${seconds}s`, this.canvas.width / 2, 360);

        // Dessiner les boutons
        this.drawButtons();
    }

    // Dessiner des confettis pour un effet festif
    drawConfetti() {
        // Générer 100 confettis colorés
        for (let i = 0; i < 100; i++) {
            // Position aléatoire
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;

            // Taille aléatoire
            const size = Math.random() * 10 + 5;

            // Couleur aléatoire parmi des couleurs vives
            const colors = ["#FF5252", "#FFEB3B", "#69F0AE", "#40C4FF", "#EA80FC", "#FFFFFF"];
            this.ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

            // Forme aléatoire (cercle ou rectangle)
            if (Math.random() > 0.5) {
                // Cercle
                this.ctx.beginPath();
                this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                // Rectangle
                this.ctx.fillRect(x, y, size, size);
            }
        }
    }

    // Dessiner les boutons
    drawButtons() {
        // Centrer les boutons
        for (const button of this.gameCompleteButtons) {
            button.x = (this.canvas.width - button.width) / 2;
        }

        // Dessiner chaque bouton
        this.gameCompleteButtons.forEach(button => {
            // Fond du bouton
            this.ctx.fillStyle = button.id === "restart" ? "#4CAF50" : "#ff5722"; // Vert ou orange
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
            this.gameCompleteButtons.forEach(button => {
                if (x >= button.x && x <= button.x + button.width &&
                    y >= button.y && y <= button.y + button.height) {

                    console.log(`Button clicked: ${button.id}`);
                    this.clearEventListeners();

                    if (button.id === "restart") {
                        // Réinitialiser le niveau à 1
                        window.currentLevel = 1;

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
            console.log("Écouteur de clics supprimé");
        }
    }
}

// Rendre la classe disponible globalement
window.gameCompleteScreen = gameCompleteScreen;