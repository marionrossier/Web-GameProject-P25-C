class CursorSkin {
    constructor(skinNbr) {
        this.image = new Image();
        this.image.src = "resources/images/game/Characters.png";
        this.selectSkin(skinNbr);

        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }

    draw(ctx, x, y) {
        if (this.imageLoaded) {
            ctx.drawImage(
                this.image, // Image source
                this.skinX * 16, // Image source x
                this.skinY * 16, // Image source y
                16, // Image source width
                16, // Image source height
                x-8, // Destination x
                y-8, // Destination y
                16, // Destination width
                16 // Destination height
            );
        }
    }

    selectSkin (skinNbr){
        switch (skinNbr) {
            case 1: //chauve bleu
                this.skinX = 0;
                this.skinY = 2;
                break;
            case 2: //lunette et smoking cravate rouge
                this.skinX = 16;
                this.skinY = 4;
                break;
            case 3: //sportif rouge
                this.skinX = 0;
                this.skinY = 12;
                break;
            case 4: //père noel bleu
                this.skinX = 16;
                this.skinY = 8;
                break;
            case 5: // ninja vert
                this.skinX = 0;
                this.skinY = 26;
                break;
            case 6: // astronaute
                this.skinX = 16;
                this.skinY = 10;
                break;
        }
    }
}