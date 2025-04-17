
class Life {
    constructor(lifeValue, wayValue, color, wayColor, positionX, positionY, map) {
        this.lifeValue = lifeValue;
        this.color = color;
        this.positionX = positionX;
        this.positionY = positionY;
        this.wayValue = wayValue;
        this.wayColor = wayColor;
        this.map = map;
    }

    endLife(){
        this.lifeValue = this.wayValue;
        this.color = this.wayColor;
    }

    draw(ctx) {
        new lifeSkin().draw(ctx, this.positionX, this.positionY);
    }
}