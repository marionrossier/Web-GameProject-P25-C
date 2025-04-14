class summerTreeSkin {
    constructor() {
        this.image = new Image();
        this.image.src = "resources/images/game/Trees.png";
    }

    draw(ctx, x, y) {
        this.image.onload = () => {
            ctx.drawImage(
                this.image, // Image source
                0 * 32, // Image source x
                0 * 48, // Image source y
                32, // Image source width
                48, // Image source height
                x * 16+2, // Destination x
                y * 16, // Destination y
                16-4, // Destination width
                16 // Destination height
            );
        };
    }
}