/**
 * Represents a Life object within a game environment.
 * A Life object is typically used to represent a collectible,
 * which can appear on a map at a given position and has a visual
 * representation (lifeSkin) and hitbox dimensions.
 */
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