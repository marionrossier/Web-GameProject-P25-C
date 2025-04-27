
class Life {
    constructor(wayValue, positionX, positionY, map) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.wayValue = wayValue;
        this.map = map;
        this.lifeSkin = new LifeSkin();
        this.hitboxWidth = 25;
        this.hitboxHeight = 25;
    }

    draw() {
        this.lifeSkin.draw(this.positionX, this.positionY);
    }
}