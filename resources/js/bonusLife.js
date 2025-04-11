
class BonusLife {
    constructor(lifeValue, wayValue, color, wayColor, positionX, positionY) {
        this.lifeValue = lifeValue;
        this.color = color;
        this.positionX = positionX;
        this.positionY = positionY;
        this.wayValue = wayValue;
        this.wayColor = wayColor;
    }

    endLife(){
        this.lifeValue = this.wayValue;
        this.color = this.wayColor;
    }
}

const life = new BonusLife(2,0,"red","white",2,3);

export { BonusLife, life };