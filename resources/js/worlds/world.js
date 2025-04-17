class world {
    constructor(skinNbr,ctx,x,y) {
        switch (skinNbr){
            case "1": //summer
                summerOutsideSkin.draw(ctx,x,y);
                summerTreeSkin.draw(ctx,x,y);
                break;
            case "2": //autumn
                autumnOutsideSkin.draw(ctx,x,y);
                autumnTreeSkin.draw(ctx,x,y);
                break;
            case "3": //winter
                winterOutsideSkin.draw(ctx,x,y);
                winterTreeSkin.draw(ctx,x,y);
                break;
        }
    }
}