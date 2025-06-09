/**
 * Represents a utility class for loading and accessing JSON data from a file.
 */
class JsonReach {
    constructor(path) {
        this.path = path;
        this.data = this.loadSync();
    }

    loadSync() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", this.path, false);
        try {
            xhr.send(null);
            if (xhr.status === 200) {
                return JSON.parse(xhr.responseText);
            } else {
                console.error("HTTP error :", xhr.status);
                return null;
            }
        } catch (e) {
            console.error("Synchon chargment error :", e);
            return null;
        }
    }

    get(father, child) {
        try {
            return this.data[father][child];
        } catch (e) {
            console.error("JSON access error :", e);
            return null;
        }
    }

    getObject(){
        return this.data;
    }
}