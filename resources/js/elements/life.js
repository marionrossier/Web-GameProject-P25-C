class Life {
    constructor(positionX, positionY, map) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.map = map;
        this.lifeSkin = new LifeSkin();
        this.hitboxWidth = window.lifeHitBoxWidth;
        this.hitboxHeight = window.lifeHitBoxHeight;
    }

    draw() {
        this.lifeSkin.draw(this.positionX, this.positionY);
    }
}