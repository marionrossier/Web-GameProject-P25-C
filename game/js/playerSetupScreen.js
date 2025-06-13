/**
 * Represents the player setup screen in the application.
 * This class manages the initialization, display, and interactions on the player setup screen.
 */
class playerSetupScreen {
    constructor() {
        this.playerData = new playerDataManager();
        this.locationService = new locationService();
        this.imageUploader = new imageUploader();
        this.ui = new playerSetupUi(window.ctx);

        this.playerData.load();

        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async show() {
        window.canvas.width = 1000;
        window.canvas.height = 700;
        currentScreen = "playerSetup";

        this.draw();

        setTimeout(() => {
            this.ui.show();
        }, 50);

        window.canvas.addEventListener("click", this.handleClick);
        this.ui.nameInput.addEventListener("input", this.handleInput);

        this.getLocation();
    }

    hide() {
        this.ui.hide();
        this.imageUploader.destroy();
        window.canvas.removeEventListener("click", this.handleClick);
        this.ui.nameInput.removeEventListener("input", this.handleInput);
    }

    draw() {
        this.ui.draw(this.playerData, this.playerData.isComplete());
        if (this.ui.nameInput.parentNode) {
            this.ui.positionInput();
        }
    }

    async handleClick(event) {
        const rect = window.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (this.ui.isClickOnButton(x, y, this.ui.uploadButton)) {
            const imageData = await this.imageUploader.selectImage();
            if (imageData) {
                this.playerData.setAvatar(imageData);
                this.draw();
            }
        }

        if (this.ui.isClickOnButton(x, y, this.ui.startButton) && this.playerData.isComplete()) {
            this.playerData.save();

            this.hide();
            window.gameInitialisation();
            startGame(heartImage, backButtonImage, instructionsImage);
        }
    }

    handleInput(event) {
        this.playerData.setName(event.target.value);
        this.draw();
    }

    async getLocation() {
        const location = await this.locationService.getLocation();
        this.playerData.setLocation(location);
        this.draw();
    }
}

window.playerSetupScreen = playerSetupScreen;