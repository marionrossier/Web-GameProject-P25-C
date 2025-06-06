/**
 * Represents a visual skin for a game element, allowing customization of its appearance.
 */
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

    drawCenter(x, y) {
        if (this.imageLoaded) {
            window.ctx.drawImage(
                this.image, // Image source
                this.skinX * 16, // Image source x
                this.skinY * 16, // Image source y
                16, // Image source width
                16, // Image source height
                x * 16, // Destination x
                y * 16, // Destination y
                WAY.destinationWidth, // Destination width
                WAY.destinationHeight // Destination height
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