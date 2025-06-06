class CursorSkin {
    constructor(skinNbr) {
        this.image = new Image();
        this.image.src = "/game/images/Characters.png";
        this.spriteSize = 16;
        this.selectSkin(skinNbr);
        this.updateDirection("down")

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
                this.baseY * 16, // Image source y
                16, // Image source width
                16, // Image source height
                x-6, // Destination x
                y-6, // Destination y
                12, // Destination width
                12 // Destination height
            );
        }
    }

    selectSkin (skinNbr){
        switch (skinNbr) {
            case 1: //chauve bleu
                this.baseX = 0;
                this.baseY = 2;
                break;
            case 2: //lunette et smoking cravate rouge
                this.baseX = 16;
                this.baseY = 4;
                break;
            case 3: //sportif rouge
                this.baseX = 0;
                this.baseY = 12;
                break;
            case 4: //père noel bleu
                this.baseX = 16;
                this.baseY = 8;
                break;
            case 5: // ninja vert
                this.baseX = 0;
                this.baseY = 26;
                break;
            case 6: // astronaute
                this.baseX = 16;
                this.baseY = 10;
                break;
        }
        this.skinX = this.baseX;
        this.skinY = this.baseY * 16;
    }

    updateDirection(direction) {
        switch (direction) {
            case "up":
                this.skinX = this.baseX + 4; // ligne de sprites vers le haut
                break;
            case "down":
                this.skinX = this.baseX; // ligne de face
                break;
            case "left":
                this.skinX = this.baseX + 6; // ligne de gauche
                break;
            case "right":
                this.skinX = this.baseX + 2; // ligne de droite OK
                break;
        }
    }

}