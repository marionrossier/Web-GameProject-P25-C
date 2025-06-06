/**
 * Provides services for retrieving the user's current location
 * and obtaining location information using reverse geocoding.
 */
class locationService {
    async getLocation() {
        if (!("geolocation" in navigator)) {
            return "Géolocalisation non supportée";
        }

        try {
            const position = await this.getCurrentPosition();
            const locationName = await this.reverseGeocode(position.coords.latitude, position.coords.longitude);
            return locationName;
        } catch (error) {
            console.error("Geolocalisation error:", error);
            return "Position not available";
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    async reverseGeocode(lat, lon) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village;
            const country = data.address.country;
            return `${city}, ${country}`;
        } catch (error) {
            return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
        }
    }
}