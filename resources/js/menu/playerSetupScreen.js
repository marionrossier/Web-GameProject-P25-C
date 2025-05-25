class playerSetupScreen {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        // Initialiser les services
        this.playerData = new playerDataManager();
        this.locationService = new locationService();
        this.imageUploader = new imageUploader();
        this.ui = new playerSetupUi(this.canvas, this.ctx);

        // Charger les données existantes si disponibles
        this.playerData.load();

        // Gérer les événements
        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async show() {
        // S'assurer que le canvas a les bonnes dimensions dès le début
        this.canvas.width = 1000;
        this.canvas.height = 700;
        currentScreen = "playerSetup";

        // Dessiner l'interface AVANT d'afficher l'input
        this.draw();

        // Afficher l'UI avec un petit délai
        setTimeout(() => {
            this.ui.show();
        }, 50);

        // Ajouter les event listeners
        this.canvas.addEventListener("click", this.handleClick);
        this.ui.nameInput.addEventListener("input", this.handleInput);

        // Démarrer la géolocalisation
        this.getLocation();
    }

    hide() {
        this.ui.hide();
        this.imageUploader.destroy();
        this.canvas.removeEventListener("click", this.handleClick);
        this.ui.nameInput.removeEventListener("input", this.handleInput);
    }

    draw() {
        this.ui.draw(this.playerData, this.playerData.isComplete());
        // Repositionner le champ de saisie après chaque dessin
        if (this.ui.nameInput.parentNode) {
            this.ui.positionInput();
        }
    }

    async handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Clic sur le bouton upload/avatar
        if (this.ui.isClickOnButton(x, y, this.ui.uploadButton)) {
            const imageData = await this.imageUploader.selectImage();
            if (imageData) {
                this.playerData.setAvatar(imageData);
                this.draw();
            }
        }

        // Clic sur le bouton Commencer
        if (this.ui.isClickOnButton(x, y, this.ui.startButton) && this.playerData.isComplete()) {
            this.playerData.save();
            this.hide();
            window.gameInitialisation();
            startGame(this.canvas, this.ctx, heartImage, backButtonImage, instructionsImage);
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