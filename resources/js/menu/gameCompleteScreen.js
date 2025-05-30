// Function de debug pour vérifier le chargement du script
console.log("Script gameCompleteScreen.js chargé avec succès!");

class gameCompleteScreen {
    constructor(motor) {
        this.motor = motor;
        this.activeListener = null;

        // IMPORTANT: S'assurer que le canvas a les bonnes dimensions
        if (window.canvas.width !== 1000 || window.canvas.height !== 700) {
            window.canvas.width = 1000;
            window.canvas.height = 700;
        }

        // Dimensions et positions des boutons
        this.gameCompleteButtons = [
            { id: "restart", text: "Play Again", x: 400, y: 450, width: 200, height: 60 },
            { id: "menu", text: "Menu", x: 400, y: 530, width: 200, height: 60 }
        ];
        this.heartImage = window.heartImage ? window.heartImage : heartImage();
    }

    show() {

        this.motor.stopTimer();

        // Arrêter la musique du jeu si disponible
        const gameMusic = document.getElementById("gameMusic");
        if (gameMusic) {
            gameMusic.pause();
            gameMusic.currentTime = 0;
        }

        const menuMusic = document.getElementById("menuMusic");
        if (menuMusic) {
            menuMusic.play();
        }

        // Forcer le style de curseur normal
        window.canvas.style.cursor = 'default';

        // Nettoyer les écouteurs d'événements précédents
        this.clearEventListeners();

        // Dessiner l'écran de fin de jeu
        this.draw();

        // Ajouter l'écouteur pour gérer les interactions
        this.addClickListener();
    }

    draw() {
        // Effacer le canvas
        window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

        // Fond festif avec dégradé
        const gradient = window.ctx.createLinearGradient(0, 0, 0, window.canvas.height);
        gradient.addColorStop(0, "#4A148C"); // Violet foncé
        gradient.addColorStop(1, "#311B92"); // Indigo foncé
        window.ctx.fillStyle = gradient;
        window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);

        // Dessiner des confettis colorés
        this.drawConfetti();

        // Titre "Congratulations!" en doré
        window.ctx.font = "64px Arial";
        window.ctx.fillStyle = "#FFD700"; // Or
        window.ctx.textAlign = "center";
        window.ctx.fillText("Congratulations!", window.canvas.width / 2, 150);

        // Sous-titre
        window.ctx.font = "36px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.fillText("You've Completed Mouse Rush!", window.canvas.width / 2, 220);

        // Score final
        if (window.finalScore) {
            window.ctx.font = "32px Arial";
            window.ctx.fillStyle = "white";
            window.ctx.fillText(`Final Score: ${window.finalScore}`, window.canvas.width / 2, 300);
        }

        // Temps total
        window.finalTime += Math.floor(this.motor.timer / 24);
        const minutes = Math.floor(window.finalTime / 60);
        const seconds = window.finalTime % 60;
        window.ctx.font = "32px Arial";
        window.ctx.fillStyle = "white";
        window.ctx.fillText(`Play Time: ${minutes}m ${seconds}s`, window.canvas.width / 2, 360);

        // Dessiner les boutons
        this.drawButtons();
    }

    // Dessiner des confettis pour un effet festif
    drawConfetti() {
        // Générer 100 confettis colorés
        for (let i = 0; i < 100; i++) {
            // Position aléatoire
            const x = Math.random() * window.canvas.width;
            const y = Math.random() * window.canvas.height;

            // Taille aléatoire
            const size = Math.random() * 10 + 5;

            // Couleur aléatoire parmi des couleurs vives
            const colors = ["#FF5252", "#FFEB3B", "#69F0AE", "#40C4FF", "#EA80FC", "#FFFFFF"];
            window.ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

            // Forme aléatoire (cercle ou rectangle)
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

    // Dessiner les boutons
    drawButtons() {
        // Centrer les boutons
        for (const button of this.gameCompleteButtons) {
            button.x = (window.canvas.width - button.width) / 2;
        }

        // Dessiner chaque bouton
        this.gameCompleteButtons.forEach(button => {
            // Fond du bouton
            window.ctx.fillStyle = button.id === "restart" ? "#4CAF50" : "#ff5722"; // Vert ou orange
            window.ctx.fillRect(button.x, button.y, button.width, button.height);

            // Contour blanc
            window.ctx.strokeStyle = "white";
            window.ctx.strokeRect(button.x, button.y, button.width, button.height);

            // Dessiner les cœurs à côté des boutons
            if (this.heartImage && this.heartImage.complete && this.heartImage.naturalWidth !== 0) {
                window.ctx.drawImage(this.heartImage, button.x - 40, button.y, 32, 32);
                window.ctx.drawImage(this.heartImage, button.x + button.width + 10, button.y, 32, 32);
            }

            // Texte du bouton
            window.ctx.font = "20px Arial";
            window.ctx.fillStyle = "white";
            window.ctx.textAlign = "center";
            window.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
        });
    }

    // Ajouter l'écouteur d'événements pour les clics
    addClickListener() {
        this.activeListener = (event) => {
            const rect = window.canvas.getBoundingClientRect();

            // Calculer les coordonnées relatives au canvas
            const scaleX = window.canvas.width / rect.width;
            const scaleY = window.canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
            // Vérifier les clics sur les boutons
            this.gameCompleteButtons.forEach(button => {
                if (x >= button.x && x <= button.x + button.width &&
                    y >= button.y && y <= button.y + button.height) {
                    this.clearEventListeners();

                    if (button.id === "restart") {
                        // Redémarrer le jeu
                        window.gameInitialisation();
                        window.startGame(window.heartImage, window.backButtonImage, window.instructionsImage);
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
    clearEventListeners() {
        if (this.activeListener) {
            window.canvas.removeEventListener("click", this.activeListener);
            this.activeListener = null;
        }
    }
}
window.gameCompleteScreen = gameCompleteScreen;