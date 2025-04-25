class WaySkin {
    constructor(skinNbr) {
        this.image = new Image();
        this.image.src = "resources/images/game/Ground.png";
        this.imageLoaded = false;

        this.image.onload = () => {
            this.imageLoaded = true;
        };
        this.selectSkin(skinNbr);
    }

    drawCenter(ctx, x, y) {
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
            case 1: //summer
                this.skinX = 1;
                this.skinY = 1;
                break;
            case 2: //autumn
                this.skinX = 1;
                this.skinY = 1;
                break;
            case 3: //winter
                this.skinX = 1;
                this.skinY = 10;
                break;
        }
    }
}