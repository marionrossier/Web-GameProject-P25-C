/**
 * Represents a Tree object, containing its position and appearance.
 */
class Tree {
    constructor(x, y, skin) {
        this.x = x;
        this.y = y;
        this.skin = skin;
        this.treeSkin = new TreeSkin(this.skin);
    }

    draw() {
        this.treeSkin.draw (this.x, this.y);
    }
}