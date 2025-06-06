class TreeSkin {
    constructor(skinNbr) {
        this.image = new Image();
        this.image.src = `${window.PUBLIC_URL || ""}/game/images/Trees.png`;
        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
        };
        this.selectSkin(skinNbr)
    }

    draw(ctx, x, y) {
        if (this.imageLoaded) {
            ctx.drawImage(
                this.image, // Image source
                this.skinX * 32, // Image source x
                this.skinY * 48, // Image source y
                32, // Image source width
                48, // Image source height
                x * 16+2, // Destination x
                y * 16, // Destination y
                16-4, // Destination width
                16 // Destination height
            );
        }
    }

    selectSkin(skinNbr) {
        switch (skinNbr) {
            case 1: // summer tree
                this.skinX = 0;
                this.skinY = 0;
                break;
            case 2: // autumn tree
                this.skinX = 2;
                this.skinY = 0;
                break;
            case 3: // winter tree
                this.skinX = 3;
                this.skinY = 0;
                break;
        }
    }
}