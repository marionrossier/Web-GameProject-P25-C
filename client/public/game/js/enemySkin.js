/**
 * Represents the visual appearance of an enemy in the game.
 * Responsible for loading and drawing the enemy's sprite.
 */
class EnemySkin {
    constructor() {
        this.image = new Image();
        this.image.src = `${window.PUBLIC_URL}/game/images/Characters.png`;

        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }

    draw(x, y) {
        if (this.imageLoaded) {
            window.ctx.drawImage(
                this.image, // Image source
                16 * 16, // Image source x 16
                16 * 16, // Image source y 16
                16, // Image source width
                16, // Image source height
                x * 16, // Destination x
                y * 16, // Destination y
                ENEMY.destinationWidth, // Destination width
                ENEMY.destinationHeight // Destination height
            );
        }
    }
}