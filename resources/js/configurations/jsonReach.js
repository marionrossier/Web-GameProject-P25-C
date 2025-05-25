class JsonReach {
    constructor(path) {
        this.path = path;
        this.data = this.loadSync();
    }

    loadSync() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", this.path, false); // ⚠️ false = mode synchrone
        try {
            xhr.send(null);
            if (xhr.status === 200) {
                return JSON.parse(xhr.responseText);
            } else {
                console.error("Erreur HTTP :", xhr.status);
                return null;
            }
        } catch (e) {
            console.error("Erreur de chargement synchrone :", e);
            return null;
        }
    }

    get(father, child, number = null) {
        try {
            let result = this.data[father][child];
            if (number !== null) {
                result = result[number];
            }
            return result;
        } catch (e) {
            console.error("Erreur d'accès JSON :", e);
            return null;
        }
    }
}