class MouseController {
    constructor(canvas, maptable, size, onWinCallback, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.maptable = maptable;
        this.size = size;
        this.onWin = onWinCallback;

        this.mousePosition = { x: 0, y: 0 };
        this.hitbox = { width: 10, height: 10 };

        this.canvas.addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
        });
    }


    touch() {
        const cellSize = pixelSizeTable[this.size];
        const mapWidth = WidthTable[this.size];
        const mapHeight = HeightTable[this.size];

        const cellX = Math.floor(this.mousePosition.x / cellSize);
        const cellY = Math.floor(this.mousePosition.y / cellSize);
        const index = cellY * mapWidth + cellX;

        const value = this.maptable[index];

        if (value === undefined) {
            console.log("Souris hors des limites de la map");
            return;
        }


        switch (value) {
            case 0:
                break;
            case 1:
                console.log("Mur !");
                break;
            case 2:
                console.log("Vie !");
                this.maptable[index] = 0;
                break;
            case 3:
                console.log("Ennemi !");
                break;
            case 4:
                console.log("Arrivée !");
                break;
        }
    }

    drawMouse() {

        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.mousePosition.x, this.mousePosition.y, 5, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(
            this.mousePosition.x - this.hitbox.width / 2,
            this.mousePosition.y - this.hitbox.height / 2,
            this.hitbox.width,
            this.hitbox.height
        );
    }
}
