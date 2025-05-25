class OutsideSkin {
    constructor(skinNbr) {
        this.image = new Image();
        this.image.src = "resources/images/game/Ground.png";
        this.imageLoaded = false;

        this.image.onload = () => {
            this.imageLoaded = true;
        };
        this.selectSkin(skinNbr);
    }

    draw(ctx, x, y) {
        if (this.imageLoaded) {
            ctx.drawImage(
                this.image, // Image source
                this.skinX * 16, // Image source x
                this.skinY * 16, // Image source y
                16, // Image source width
                16, // Image source height
                x * 16, // Destination x
                y * 16, // Destination y
                16, // Destination width
                16 // Destination height
            );
        }
    }

    selectSkin(skinNbr) {
        switch (skinNbr) {
            case 1: // summer
                this.skinX = 5;
                this.skinY = 0;
                break;
            case 2: // autumn
                this.skinX = 5;
                this.skinY = 5;
                break;
            case 3: // winter
                this.skinX = 5;
                this.skinY = 9;
                break;
        }
    }
}