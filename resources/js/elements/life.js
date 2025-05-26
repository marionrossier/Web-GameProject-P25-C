class Life {
    constructor(positionX, positionY, map) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.map = map;
        this.lifeSkin = new LifeSkin();
        this.hitboxWidth = LIFE.hitBoxWidth;
        this.hitboxHeight = LIFE.hitBoxHeight;
    }

    draw() {
        this.lifeSkin.draw(this.positionX, this.positionY);
    }
}