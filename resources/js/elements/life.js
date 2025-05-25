
class Life {
    constructor(positionX, positionY, map) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.map = map;
        this.lifeSkin = new LifeSkin();
        this.hitboxWidth = 25;
        this.hitboxHeight = 25;
    }

    draw() {
        this.lifeSkin.draw(this.positionX, this.positionY);
    }
}