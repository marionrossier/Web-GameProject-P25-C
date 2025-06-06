/**
 * Represents the player whose turn it currently is in a game.
 *
 * The `currentPlayer` variable holds the state of the active player.
 * It is initialized as null, indicating that no player is currently
 * active or that the game has not yet started. During gameplay,
 * this variable will typically hold the value of the player
 * whose turn it is.
 *
 * Expected to be updated as the game progresses to switch
 * between players.
 *
 * Default Value: null
 */
let currentPlayer = null;

// Fonction globale pour obtenir le nom du joueur
/**
 * Retrieves the name of the current player. If no player is set, a default
 * value of "Anonymous Player" is returned.
 *
 * @return {string} The name of the current player or "Anonymous Player" if no player is set.
 */
function getPlayerName() {
    if (window.currentPlayer && window.currentPlayer.playerName) {
        return window.currentPlayer.playerName;
    }
    return "Anonymous Player";
}

/**
 * Manages player data including name, avatar, and location. Provides methods
 * to set, save, load, and validate player data. This class also defines
 * a global reference to the current player instance.
 */
class playerDataManager {
    constructor() {
        this.playerName = "";
        this.playerAvatar = null;
        this.playerLocation = "Localisation en cours...";
    }

    setName(name) {
        const sanitized = name
            .replace(/[^a-zA-Z0-9 _\-À-ÿ]/g, '')
            .trim()
            .substring(0, 20);

        this.playerName = sanitized;
        console.log(`Nom du joueur défini: ${this.playerName}`);
    }

    setAvatar(imageData) {
        this.playerAvatar = imageData;
    }

    setLocation(location) {
        this.playerLocation = location;
    }

    isComplete() {
        return this.playerName && this.playerAvatar && this.playerLocation !== "Localisation en cours...";
    }

    save() {
        const playerData = {
            name: this.playerName,
            avatar: this.playerAvatar,
            location: this.playerLocation,
            timestamp: Date.now()
        };

        localStorage.setItem('playerData', JSON.stringify(playerData));
        window.playerData = playerData;

        // IMPORTANT: Définir la variable globale simple
        window.currentPlayer = this;

        console.log(`Joueur sauvegardé: ${this.playerName}`);
        return playerData;
    }

    load() {
        const savedData = localStorage.getItem('playerData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.playerName = data.name || "";
            this.playerAvatar = data.avatar || null;
            this.playerLocation = data.location || "Localisation en cours...";

            // IMPORTANT: Définir la variable globale simple
            window.currentPlayer = this;

            console.log(`Joueur chargé: ${this.playerName}`);
            return data;
        }
        return null;
    }

    // Méthode simple pour obtenir le nom
    getName() {
        return this.playerName || "Anonymous Player";
    }
}