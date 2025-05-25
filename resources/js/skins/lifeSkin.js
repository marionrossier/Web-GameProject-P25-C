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
                window.lifeDestinationWidth, // Destination width
                window.lifeDestinationHeight // Destination height
            );
        }
    }
}