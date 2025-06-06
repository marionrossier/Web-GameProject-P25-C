/**
 * Represents a LifeSkin object used to display a heart icon in a game.
 *
 * The LifeSkin class is responsible for handling the loading and rendering
 * of a heart image used as part of the game visuals. The image is drawn on the
 * game canvas at specified coordinates when required.
 */
class LifeSkin {
    constructor() {
        this.image = new Image();
        this.image.src = "resources/images/game/Heart.png";

        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }

    draw(x, y) {
        if (this.imageLoaded) {
            window.ctx.drawImage(
                this.image, // Image source
                0, // Image source x
                0, // Image source y
                16, // Image source width
                16, // Image source height
                x * 16+2, // Destination x
                y * 16+2, // Destination y
                LIFE.destinationWidth, // Destination width
                LIFE.destinationHeight // Destination height
            );
        }
    }
}