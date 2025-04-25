class Cursor {
    constructor(skin, canvas, maptable, size, onWinCallback, ctx, motor) {
        this.skin = skin;
        this.cursorSkin = new CursorSkin(this.skin);
        this.canvas = canvas;
        this.ctx = ctx;
        this.maptable = maptable;
        this.size = size;
        this.onWin = onWinCallback;
        this.motor = motor;

        const cellSize = pixelSizeTable[this.size];
        this.mousePosition = {
            x: 0 * cellSize + cellSize / 2,
            y: 14 * cellSize + cellSize / 2
        };
        this.hitbox = {
            width: this.cursorSkin.spriteSize,
            height: this.cursorSkin.spriteSize
        };

        this.canvas.addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();

            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;

            this.mousePosition.x = (e.clientX - rect.left) * scaleX;
            this.mousePosition.y = (e.clientY - rect.top) * scaleY;
        });

    }


    touch() {
        const cellSize = pixelSizeTable[this.size];
        const mapWidth = WidthTable[this.size];

        const cellX = Math.floor(this.mousePosition.x / cellSize);
        const cellY = Math.floor(this.mousePosition.y / cellSize);
        const index = cellY * mapWidth + cellX;

        const cursorHitbox = {
            x: this.mousePosition.x - this.hitbox.width / 2,
            y: this.mousePosition.y - this.hitbox.height / 2,
            width: this.hitbox.width,
            height: this.hitbox.height
        };

        // Enemy collision detection
        for (const key in gameEntities.enemies) {
            const enemy = gameEntities.enemies[key];
            const enemyHitbox = enemy.getHitbox();

            if (this.rectsOverlap(cursorHitbox, enemyHitbox)) {
                console.log("Collision avec ennemi !");
                this.loseLife();
                return;
            }
        }

        // Life collision detection
        for (const key in gameEntities.lives) {
            const life = gameEntities.lives[key];
            const lifeHitbox = {
                x: life.positionX * cellSize,
                y: life.positionY * cellSize,
                width: life.hitboxWidth,
                height: life.hitboxHeight
            };

            if (this.rectsOverlap(cursorHitbox, lifeHitbox)) {
                console.log("Récupération de vie !");
                delete gameEntities.lives[key];
                this.gainLife();
                return; // Pareil, on sort après avoir ramassé la vie
            }
        }

        let value = this.maptable[index];

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
            case 4:
                console.log("Arrivée !");
                //TODO: modifier pour qu'une fois touché, on passe au niveau suivant, ou a l'affichage de fin avec scores
                break;
        }
    }

    drawMouse() {
        this.cursorSkin.draw(this.ctx, this.mousePosition.x, this.mousePosition.y);

        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(
            this.mousePosition.x - this.hitbox.width / 2,
            this.mousePosition.y - this.hitbox.height / 2,
            this.hitbox.width,
            this.hitbox.height
        );
    }

    loseLife() {
        if (this.motor.lives > 0) {
            this.motor.lives--; // Réduit le nombre de vies
            console.log(`Vies restantes : ${this.motor.lives}`);
        }

        if (this.motor.lives === 0) {
            this.motor.gameOver(); // Arrête le jeu si plus de vies
        }
    }

    gainLife() {
        this.motor.lives++; // Augmente le nombre de vies
        console.log(`Vies restantes : ${this.motor.lives}`);
    }

    rectsOverlap(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }
}
