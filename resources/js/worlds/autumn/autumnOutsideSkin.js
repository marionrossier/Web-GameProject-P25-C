class autumnOutsideSkin {
    constructor() {
        this.image = new Image();
        this.image.src = "resources/images/game/Ground.png";
    }

    draw(ctx, x, y) {
        this.image.onload = () => {
            ctx.drawImage(
                this.image, // Image source
                5 * 16, // Image source x
                6 * 16, // Image source y
                16, // Image source width
                16, // Image source height
                x * 16, // Destination x
                y * 16, // Destination y
                16, // Destination width
                16 // Destination height
            );
        };
    }
}