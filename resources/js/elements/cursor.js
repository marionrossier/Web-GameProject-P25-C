class Cursor {
    constructor(skin, canvas, maptable, size, onWinCallback, ctx, motor, gameEntities) {
        this.skin = skin;
        this.cursorSkin = new CursorSkin(this.skin);
        this.canvas = canvas;
        this.ctx = ctx;
        this.maptable = maptable;
        this.size = size;
        this.onWin = onWinCallback;
        this.motor = motor;
        this.invulnerableUntil = 0;
        this.isVisible = true;
        this.gameEntities = gameEntities;
        this.isActive = false; // Bloque la souris au début du jeu.
        const cellSize = pixelSizeTable[this.size];


        this.mousePosition = {
            x: 0 * cellSize + cellSize / 2,
            y: 14 * cellSize + cellSize / 2
        };
        this.lastDirection = "down"; // valeur par défaut
        this.prevMousePosition = { x: this.mousePosition.x, y: this.mousePosition.y };

        this.hitbox = {
            width: this.cursorSkin.spriteSize,
            height: this.cursorSkin.spriteSize
        };

        this.canvas.addEventListener("mousemove", (e) => {
            if (!this.isActive) return;

            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;

            this.mousePosition.x = (e.clientX - rect.left) * scaleX;
            this.mousePosition.y = (e.clientY - rect.top) * scaleY;

            //pour changer le skin du cursor selon sa direction
            const deltaX = this.mousePosition.x - this.prevMousePosition.x;
            const deltaY = this.mousePosition.y - this.prevMousePosition.y;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                this.lastDirection = deltaX > 0 ? "right" : "left";
            } else {
                this.lastDirection = deltaY > 0 ? "down" : "up";
            }

            this.prevMousePosition = { x: this.mousePosition.x, y: this.mousePosition.y };
            this.cursorSkin.updateDirection(this.lastDirection);

        });

        // Dès qu'on clique une fois sur le canvas, active le suivi souris
        this.canvas.addEventListener("click", () => {
            this.isActive = true;
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
        for (const key in this.gameEntities.enemies) {
            const enemy = this.gameEntities.enemies[key];
            const enemyHitbox = enemy.getHitbox();

            if (this.rectsOverlap(cursorHitbox, enemyHitbox)) {
                console.log("Collision avec ennemi !");
                this.loseLife();
                return;
            }
        }

        // Life collision detection
        for (const key in this.gameEntities.lives) {
            const life = this.gameEntities.lives[key];
            const lifeHitbox = {
                x: life.positionX * cellSize,
                y: life.positionY * cellSize,
                width: life.hitboxWidth,
                height: life.hitboxHeight
            };

            if (this.rectsOverlap(cursorHitbox, lifeHitbox)) {
                console.log("Récupération de vie !");
                delete this.gameEntities.lives[key];
                this.gainLife();
                return;
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
                this.motor.endLevel();
                break;
            case 5:
                this.motor.endGame();
        }
    }

    drawMouse() {
        const now = Date.now();

        // Pendant l'invulnérabilité, on fait clignoter
        if (now < this.invulnerableUntil) {
            // Toutes les 100 ms, on inverse la visibilité
            if (Math.floor(now / 100) % 2 === 0) {
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
        } else {
            this.isVisible = true; // Hors invulnérabilité, toujours visible
        }

        if  (this.isVisible) {
            this.cursorSkin.draw(this.ctx, this.mousePosition.x, this.mousePosition.y);
        }
    }


    loseLife() {
        const now = Date.now();
        if (now < this.invulnerableUntil) {
            // Encore invulnérable, donc on ignore
            return;
        }
        if (this.motor.lives > 0) {
            this.motor.lives--;
            console.log(`Vies restantes : ${this.motor.lives}`);
            this.invulnerableUntil = now + 2000; // 2 secondes d'invulnérabilité
        }

        if (this.motor.lives === 0) {
            this.motor.gameOver();
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
