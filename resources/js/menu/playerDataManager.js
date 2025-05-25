class playerDataManager {
    constructor() {
        this.playerName = "";
        this.playerAvatar = null;
        this.playerLocation = "Localisation en cours...";
    }

    setName(name) {
        const sanitized = name
            .replace(/[^a-zA-Z0-9 _\-À-ÿ]/g, '')  // lettres, chiffres, espaces, accents, tirets
            .trim()
            .substring(0, 20);  // max 20 caractères

        this.playerName = sanitized;
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
        return playerData;
    }

    load() {
        const savedData = localStorage.getItem('playerData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.playerName = data.name || "";
            this.playerAvatar = data.avatar || null;
            this.playerLocation = data.location || "Localisation en cours...";
            return data;
        }
        return null;
    }
}