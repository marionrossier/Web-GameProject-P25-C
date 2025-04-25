class Decor {
    constructor(x, y, decorImg, decorSize) {
        this.x = x;
        this.y = y;
        this.decorImg = decorImg;
        this.decorSize = decorSize;
        console.log("Décor créé !");
    }

    draw(ctx) {
        ctx.drawImage(this.decorImg, this.x, this.y, this.decorSize, this.decorSize);
        console.log("Décor dessiné !");
    }
}