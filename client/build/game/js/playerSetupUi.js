class playerSetupUi {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.nameInput = this.createNameInput();

        // Boutons avec le même style que gameOverScreen
        this.startButton = { x: 400, y: 600, width: 200, height: 60 };
        this.uploadButton = { x: 425, y: 380, width: 150, height: 150 };

        // Charger les images une seule fois
        this.heartImage = this.loadHeartImage();

        // Propriétés réutilisables
        this.fonts = {
            title: "48px Arial",
            subtitle: "36px Arial",
            label: "32px Arial",
            text: "24px Arial",
            button: "20px Arial",
            small: "16px Arial"
        };

        this.colors = {
            background: "rgb(60, 60, 60)",
            primary: "#ff5722",
            text: "white",
            textSecondary: "#aaaaaa",
            disabled: "#666666",
            border: "#888888"
        };
    }

    loadHeartImage() {
        if (window.heartImage) return window.heartImage;
        if (typeof heartImage === 'function') return heartImage();

        const img = new Image();
        img.src = "/game/images/Heart.png";
        return img;
    }

    createNameInput() {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter your name";

        const styles = {
            position: "absolute",
            fontSize: "24px",
            padding: "10px",
            width: "300px",
            height: "40px",
            borderRadius: "5px",
            border: `3px solid ${this.colors?.primary || '#ff5722'}`,
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 26, 0.8)",
            color: "white",
            fontFamily: "Arial, sans-serif",
            outline: "none",
            zIndex: "1000",
            boxSizing: "border-box"
        };

        Object.assign(input.style, styles);
        return input;
    }

    positionInput() {
        // Utiliser le gameWrapper comme référence
        const gameWrapper = document.getElementById('gameWrapper');
        if (!gameWrapper) {
            console.error('gameWrapper not found');
            return;
        }

        // Position relative au gameWrapper
        const inputWidth = 300;
        const centerX = (this.canvas.width - inputWidth) / 2;
        const inputY = 280; // Position Y dans le canvas

        // Calculer la position par rapport au wrapper
        this.nameInput.style.position = "absolute";
        this.nameInput.style.left = `${centerX}px`;
        this.nameInput.style.top = `${inputY}px`;
    }

    show() {
        const gameWrapper = document.getElementById('gameWrapper');
        if (!gameWrapper) {
            console.error('gameWrapper not found');
            return;
        }

        // Ajouter l'input au gameWrapper au lieu de body
        gameWrapper.appendChild(this.nameInput);

        // Positionner immédiatement
        this.positionInput();

        // Gestion simple du resize
        this.resizeHandler = () => this.positionInput();
        window.addEventListener('resize', this.resizeHandler);

        // Focus simple
        setTimeout(() => {
            this.nameInput.focus();
        }, 100);
    }

    hide() {
        if (this.nameInput.parentNode) {
            this.nameInput.parentNode.removeChild(this.nameInput);
        }
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
            this.resizeHandler = null;
        }
    }

    draw(playerData, canStart) {
        // Dimensions du canvas
        this.canvas.width = 1000;
        this.canvas.height = 700;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Fond
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Titre
        this.drawText("PLAYER", this.canvas.width / 2, 100, this.fonts.title);
        this.drawText("CONFIGURATION", this.canvas.width / 2, 150, this.fonts.subtitle);

        // Label pour le nom - Affiche le nom saisi ou "Player name"
        const nameLabel = playerData.playerName || "Player name";
        this.drawText(nameLabel, this.canvas.width / 2, 250, this.fonts.label);

        // Zone avatar
        this.drawAvatarSection(playerData.playerAvatar);

        // Localisation
        this.drawText(
            `Location: ${playerData.playerLocation}`,
            this.canvas.width / 2,
            570,
            this.fonts.text,
            this.colors.textSecondary
        );

        // Bouton Start
        this.drawButton(this.startButton, "Start", canStart);
    }

    drawText(text, x, y, font, color = this.colors.text) {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, x, y);
    }

    drawAvatarSection(avatar) {
        this.drawText("Profile picture", this.canvas.width / 2, 350, this.fonts.label);

        // Cadre pour l'avatar
        this.ctx.strokeStyle = avatar ? this.colors.primary : this.colors.border;
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(
            this.uploadButton.x,
            this.uploadButton.y,
            this.uploadButton.width,
            this.uploadButton.height
        );

        if (avatar) {
            this.drawAvatar(avatar);
        } else {
            this.drawUploadButton();
        }
    }

    drawAvatar(avatar) {
        const img = new Image();
        img.onload = () => {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            this.ctx.fillRect(
                this.uploadButton.x,
                this.uploadButton.y,
                this.uploadButton.width,
                this.uploadButton.height
            );
            this.ctx.drawImage(
                img,
                this.uploadButton.x,
                this.uploadButton.y,
                this.uploadButton.width,
                this.uploadButton.height
            );
        };
        img.src = avatar;
    }

    drawUploadButton() {
        const { x, y, width, height } = this.uploadButton;

        // Fond du bouton
        this.ctx.fillStyle = "rgba(40, 40, 40, 0.8)";
        this.ctx.fillRect(x, y, width, height);

        // Icône +
        const centerX = x + width / 2;
        const centerY = y + height / 2;

        this.ctx.strokeStyle = this.colors.text;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 30, centerY);
        this.ctx.lineTo(centerX + 30, centerY);
        this.ctx.moveTo(centerX, centerY - 30);
        this.ctx.lineTo(centerX, centerY + 30);
        this.ctx.stroke();

        // Texte
        this.drawText("Click to", centerX, centerY + 60, this.fonts.small);
        this.drawText("add a photo", centerX, centerY + 80, this.fonts.small);
    }

    drawButton(button, text, enabled = true) {
        // Centrer le bouton
        button.x = (this.canvas.width - button.width) / 2;

        // Fond du bouton
        this.ctx.fillStyle = enabled ? this.colors.primary : this.colors.disabled;
        this.ctx.fillRect(button.x, button.y, button.width, button.height);

        // Bordure
        this.ctx.strokeStyle = enabled ? this.colors.text : this.colors.border;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(button.x, button.y, button.width, button.height);

        // Coeurs décoratifs
        if (enabled && this.heartImage && this.heartImage.complete) {
            this.ctx.drawImage(this.heartImage, button.x - 40, button.y + 14, 32, 32);
            this.ctx.drawImage(this.heartImage, button.x + button.width + 10, button.y + 14, 32, 32);
        }

        // Texte du bouton
        this.ctx.font = this.fonts.button;
        this.ctx.fillStyle = enabled ? this.colors.text : this.colors.textSecondary;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, button.x + button.width / 2, button.y + button.height / 2);
    }

    isClickOnButton(x, y, button) {
        return x >= button.x && x <= button.x + button.width &&
            y >= button.y && y <= button.y + button.height;
    }
}

// Rendre la classe disponible globalement
window.playerSetupUi = playerSetupUi;