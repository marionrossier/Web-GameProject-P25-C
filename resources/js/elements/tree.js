class Tree {
    constructor(x, y, skin, size) {
        this.x = x;
        this.y = y;
        this.skin = skin;
        this.treeSkin = new TreeSkin(this.skin);
        this.size = size;
    }

    draw() {
        this.treeSkin.draw (this.x, this.y);
    }
}