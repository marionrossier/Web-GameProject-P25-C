
class Life {
    constructor(wayValue, positionX, positionY, map) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.wayValue = wayValue;
        this.map = map;
        this.lifeSkin = new lifeSkin();
    }

    endLife(){
        this.map[this.positionY][this.positionX] = this.wayValue;
    }

    draw() {
        this.lifeSkin.draw(this.positionX, this.positionY);
    }
}