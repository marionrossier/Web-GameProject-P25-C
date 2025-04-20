class Cursor {
    constructor(skin, canvas, maptable, size, onWinCallback, ctx) {
        this.skin = skin;
        this.cursorSkin = new cursorSkin(this.skin);
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

        let value = this.maptable[index];

        for (const enemy in gameEntities.enemies) {
            const enemyEntity = gameEntities.enemies[enemy];
            if (enemyEntity.currentX === cellX && enemyEntity.currentY === cellY) {
                value = 3;
                break;
            }
        }

        if (value === undefined) {
            console.log("Souris hors des limites de la map");
            return;
        }


        switch (value) {
            case 0:
                break;
            case 1:
                console.log("Mur !");
                this.loseLife();
                break;
            case 2:
                console.log("Vie !");
                this.gainLife();
                this.maptable[index] = 0;
                //TODO: modifier pour qu'une fois touché, la vie disparaisse
                break;
            case 3:
                console.log("Ennemi !");
                //TODO: modifier pour qu'une fois touché, le jeu s'arrête, on meurt ou recommence
                this.loseLife();
                break;
            case 4:
                console.log("Arrivée !");
                //TODO: modifier pour qu'une fois touché, on passe au niveau suivant, ou a l'affichage de fin avec scores
                break;
        }
    }

    drawMouse() {

        // this.ctx.fillStyle = "red";
        // this.ctx.beginPath();
        //this.ctx.arc(this.mousePosition.x, this.mousePosition.y, 5, 0, Math.PI * 2);
        //this.ctx.fill();

        this.cursorSkin.draw(this.mousePosition.x,this.mousePosition.y)

        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(
            this.mousePosition.x - this.hitbox.width / 2,
            this.mousePosition.y - this.hitbox.height / 2,
            this.hitbox.width,
            this.hitbox.height
        );
    }

    loseLife() {
        if (this.lives > 0) {
            this.lives--; // Réduit le nombre de vies
            console.log(`Vies restantes : ${this.lives}`);
        }

        if (this.lives === 0) {
            this.gameOver(); // Arrête le jeu si plus de vies
        }
    }

    gainLife() {
        this.lives++; // Augmente le nombre de vies
        console.log(`Vies restantes : ${this.lives}`);
    }
}
