class cursorSkin {
    constructor(skinNbr) {
        this.image = new Image();
        this.image.src = "resources/images/game/Characters.png";
        this.selectSkin(skinNbr);
    }

    draw(ctx, x, y) {
        this.image.onload = () => {
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
        };
    }

    selectSkin (skinNbr){
        switch (skinNbr) {
            case "1": //chauve bleu
                this.skinX = 2;
                this.skinY = 0;
                break;
            case "2": //lunette et smoking cravate rouge
                this.skinX = 4;
                this.skinY = 16;
                break;
            case "3": //sportif rouge
                this.skinX = 12;
                this.skinY = 0;
                break;
            case "4": //père noel bleu
                this.skinX = 8;
                this.skinY = 16;
                break;
            case "5": // ninja vert
                this.skinX = 26;
                this.skinY = 0;
                break;
            case "6": // astronaute
                this.skinX = 10;
                this.skinY = 16;
                break;
        }
    }
}