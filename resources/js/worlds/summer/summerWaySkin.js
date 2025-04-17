class summerWaySkin {
    constructor(skin) {
        this.image = new Image();
        this.image.src = "resources/images/game/Ground.png";
        this.selectSkin = skin;
    }

    drawCenter(ctx, x, y) {
        this.image.onload = () => {
            ctx.drawImage(
                this.image, // Image source
                1 * 16, // Image source x
                1 * 16, // Image source y
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