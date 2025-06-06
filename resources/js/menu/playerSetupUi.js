/**
 * Class representing the UI for player setup in a game.
 * Provides methods for creating and displaying UI elements for player configuration such as name input, avatar selection, and buttons.
 */
class playerSetupUi {
    constructor() {
        this.nameInput = this.createNameInput();

        this.startButton = { x: 400, y: 600, width: 200, height: 60 };
        this.uploadButton = { x: 425, y: 380, width: 150, height: 150 };

        this.heartImage = this.loadHeartImage();

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
        img.src = "resources/images/game/Heart.png";
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
        const gameWrapper = document.getElementById('gameWrapper');
        if (!gameWrapper) {
            console.error('gameWrapper not found');
            return;
        }

        const inputWidth = 300;
        const centerX = (window.canvas.width - inputWidth) / 2;
        const inputY = 280; // Position Y dans le canvas

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

        gameWrapper.appendChild(this.nameInput);

        this.positionInput();

        this.resizeHandler = () => this.positionInput();
        window.addEventListener('resize', this.resizeHandler);

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
        window.canvas.width = 1000;
        window.canvas.height = 700;
        window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

        window.ctx.fillStyle = this.colors.background;
        window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);

        this.drawText("PLAYER", window.canvas.width / 2, 100, this.fonts.title);
        this.drawText("CONFIGURATION", window.canvas.width / 2, 150, this.fonts.subtitle);

        const nameLabel = playerData.playerName || "Player name";
        this.drawText(nameLabel, window.canvas.width / 2, 250, this.fonts.label);

        this.drawAvatarSection(playerData.playerAvatar);

        this.drawText(
            `Location: ${playerData.playerLocation}`,
            window.canvas.width / 2,
            570,
            this.fonts.text,
            this.colors.textSecondary
        );

        this.drawButton(this.startButton, "Start", canStart);
    }

    drawText(text, x, y, font, color = this.colors.text) {
        window.ctx.font = font;
        window.ctx.fillStyle = color;
        window.ctx.textAlign = "center";
        window.ctx.fillText(text, x, y);
    }

    drawAvatarSection(avatar) {
        this.drawText("Profile picture", window.canvas.width / 2, 350, this.fonts.label);

        window.ctx.strokeStyle = avatar ? this.colors.primary : this.colors.border;
        window.ctx.lineWidth = 3;
        window.ctx.strokeRect(
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
            window.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            window.ctx.fillRect(
                this.uploadButton.x,
                this.uploadButton.y,
                this.uploadButton.width,
                this.uploadButton.height
            );
            window.ctx.drawImage(
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

        window.ctx.fillStyle = "rgba(40, 40, 40, 0.8)";
        window.ctx.fillRect(x, y, width, height);

        const centerX = x + width / 2;
        const centerY = y + height / 2;

        window.ctx.strokeStyle = this.colors.text;
        window.ctx.lineWidth = 4;
        window.ctx.beginPath();
        window.ctx.moveTo(centerX - 30, centerY);
        window.ctx.lineTo(centerX + 30, centerY);
        window.ctx.moveTo(centerX, centerY - 30);
        window.ctx.lineTo(centerX, centerY + 30);
        window.ctx.stroke();

        this.drawText("Click to", centerX, centerY + 60, this.fonts.small);
        this.drawText("add a photo", centerX, centerY + 80, this.fonts.small);
    }

    drawButton(button, text, enabled = true) {
        button.x = (window.canvas.width - button.width) / 2;

        window.ctx.fillStyle = enabled ? this.colors.primary : this.colors.disabled;
        window.ctx.fillRect(button.x, button.y, button.width, button.height);

        window.ctx.strokeStyle = enabled ? this.colors.text : this.colors.border;
        window.ctx.lineWidth = 2;
        window.ctx.strokeRect(button.x, button.y, button.width, button.height);

        if (enabled && this.heartImage && this.heartImage.complete) {
            window.ctx.drawImage(this.heartImage, button.x - 40, button.y + 14, 32, 32);
            window.ctx.drawImage(this.heartImage, button.x + button.width + 10, button.y + 14, 32, 32);
        }

        window.ctx.font = this.fonts.button;
        window.ctx.fillStyle = enabled ? this.colors.text : this.colors.textSecondary;
        window.ctx.textAlign = "center";
        window.ctx.textBaseline = "middle";
        window.ctx.fillText(text, button.x + button.width / 2, button.y + button.height / 2);
    }

    isClickOnButton(x, y, button) {
        return x >= button.x && x <= button.x + button.width &&
            y >= button.y && y <= button.y + button.height;
    }
}

window.playerSetupUi = playerSetupUi;