class playerSetupUi {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.nameInput = this.createNameInput();
        this.startButton = { x: 400, y: 550, width: 200, height: 50 };
        this.backButton = { x: 20, y: 20, width: 100, height: 40 };
        this.uploadButton = { x: 425, y: 350, width: 150, height: 150 };
    }

    createNameInput() {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Entrez votre nom";
        input.style.position = "absolute";
        input.style.fontSize = "24px";
        input.style.padding = "10px";
        input.style.width = "300px";
        input.style.borderRadius = "5px";
        input.style.border = "2px solid #333";
        input.style.textAlign = "center";
        return input;
    }

    show() {
        const rect = this.canvas.getBoundingClientRect();
        this.nameInput.style.left = rect.left + (this.canvas.width / 2 - 150) + "px";
        this.nameInput.style.top = rect.top + 200 + "px";
        document.body.appendChild(this.nameInput);
        this.nameInput.focus();
    }

    hide() {
        if (this.nameInput.parentNode) {
            document.body.removeChild(this.nameInput);
        }
    }

    draw(playerData, canStart) {
        // Fond
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, "#1a237e");
        gradient.addColorStop(1, "#000051");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Titre
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 48px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Configuration du Joueur", this.canvas.width / 2, 100);

        // Label pour le nom
        this.ctx.font = "24px Arial";
        this.ctx.fillText("Nom du joueur", this.canvas.width / 2, 180);

        // Zone avatar
        this.drawAvatarSection(playerData.playerAvatar);

        // Localisation
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "#aaa";
        this.ctx.fillText("Localisation: " + playerData.playerLocation, this.canvas.width / 2, 530);

        // Boutons
        this.drawButton(this.startButton, "Commencer", canStart ? "#4CAF50" : "#666");
        this.drawButton(this.backButton, "Retour", "#666");
    }

    drawAvatarSection(avatar) {
        this.ctx.font = "24px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Photo de profil", this.canvas.width / 2, 320);

        // Cadre pour l'avatar/bouton upload
        this.ctx.strokeStyle = "#666";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.uploadButton.x, this.uploadButton.y, this.uploadButton.width, this.uploadButton.height);

        if (avatar) {
            // Afficher l'avatar
            const img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, this.uploadButton.x, this.uploadButton.y, this.uploadButton.width, this.uploadButton.height);
            };
            img.src = avatar;
        } else {
            // Bouton d'upload
            this.ctx.fillStyle = "#444";
            this.ctx.fillRect(this.uploadButton.x, this.uploadButton.y, this.uploadButton.width, this.uploadButton.height);

            // Icône de caméra ou +
            this.ctx.strokeStyle = "white";
            this.ctx.lineWidth = 3;
            const centerX = this.uploadButton.x + this.uploadButton.width / 2;
            const centerY = this.uploadButton.y + this.uploadButton.height / 2;

            // Dessiner un +
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY - 30);
            this.ctx.lineTo(centerX, centerY + 30);
            this.ctx.moveTo(centerX - 30, centerY);
            this.ctx.lineTo(centerX + 30, centerY);
            this.ctx.stroke();

            // Texte
            this.ctx.fillStyle = "white";
            this.ctx.font = "16px Arial";
            this.ctx.fillText("Cliquez pour", centerX, centerY + 60);
            this.ctx.fillText("ajouter une photo", centerX, centerY + 80);
        }
    }

    drawButton(button, text, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(button.x, button.y, button.width, button.height);
        this.ctx.fillStyle = "white";
        this.ctx.font = "24px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, button.x + button.width / 2, button.y + button.height / 2);
    }

    isClickOnButton(x, y, button) {
        return x >= button.x && x <= button.x + button.width &&
            y >= button.y && y <= button.y + button.height;
    }
}