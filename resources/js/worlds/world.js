class world {
    constructor(skinNbr,x,y) {
        this.summerOutsideSkin = new summerOutsideSkin;
        this.summerTreeSkin = new summerTreeSkin;
        this.summerWaySkin = new summerWaySkin;
        this.autumnOutsideSkin = new autumnOutsideSkin;
        this.autumnTreeSkin = new autumnTreeSkin;
        this.autumnWaySkin = new autumnWaySkin;
        this.winterOutsideSkin = new winterOutsideSkin;
        this.winterTreeSkin = new winterTreeSkin;
        this.winterWaySkin = new winterWaySkin;

        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        switch (skinNbr){
            case 1: //summer
                this.summerOutsideSkin.draw(ctx,x,y);
                this.summerTreeSkin.draw(ctx,x,y);
                this.summerWaySkin.drawCenter(ctx,x,y);
                break;
            case 2: //autumn
                this.autumnOutsideSkin.draw(ctx,x,y);
                this.autumnTreeSkin.draw(ctx,x,y);
                this.autumnWaySkin.drawCenter(ctx,x,y);
                break;
            case 3: //winter
                this.winterOutsideSkin.draw(ctx,x,y);
                this.winterTreeSkin.draw(ctx,x,y);
                this.winterWaySkin.drawCenter(ctx,x,y);
                break;
        }
    }
}