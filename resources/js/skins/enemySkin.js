class EnemySkin {
    constructor() {
        this.image = new Image();
        this.image.src = "resources/images/game/Characters.png";

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
                window.enemyDestinationWidth, // Destination width
                window.enemyDestinationHeight // Destination height
            );
        }
    }
}