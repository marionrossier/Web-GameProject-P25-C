/**
 * Represents a user-controlled cursor within the game environment, providing interaction
 * and collision detection with various game elements such as enemies, walls, and lives.
 */
class Cursor {
    constructor(skin, maptable, motor, gameEntities) {
        this.skin = skin;
        this.cursorSkin = new CursorSkin(this.skin);
        this.maptable = maptable;
        this.motor = motor;
        this.invulnerableUntil = 0;
        this.isVisible = true;
        this.gameEntities = gameEntities;
        this.isActive = false;
        const cellSize = MAP.pixelSize;

        this.mousePosition = {
            x: 0 * cellSize + cellSize / 2,
            y: 14 * cellSize + cellSize / 2
        };
        this.lastDirection = "down";
        this.prevMousePosition = { x: this.mousePosition.x, y: this.mousePosition.y };

        this.hitbox = {
            width: CURSOR.hitBoxWidth,
            height: CURSOR.hitBoxHeight
        };

        window.canvas.addEventListener("mousemove", (e) => {
            if (!this.isActive) return;

            const rect = window.canvas.getBoundingClientRect();
            const scaleX = window.canvas.width / rect.width;
            const scaleY = window.canvas.height / rect.height;

            this.mousePosition.x = (e.clientX - rect.left) * scaleX;
            this.mousePosition.y = (e.clientY - rect.top) * scaleY;

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

        window.canvas.addEventListener("click", () => {
            this.isActive = true;
        });
    }


    touch() {
        const cellX = Math.floor(this.mousePosition.x / MAP.pixelSize);
        const cellY = Math.floor(this.mousePosition.y / MAP.pixelSize);
        const index = cellY * MAP.width + cellX;

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
                this.loseLife();
                return;
            }
        }

        // Life collision detection
        for (const key in this.gameEntities.lives) {
            const life = this.gameEntities.lives[key];
            const lifeHitbox = {
                x: life.positionX * MAP.pixelSize,
                y: life.positionY * MAP.pixelSize,
                width: life.hitboxWidth,
                height: life.hitboxHeight
            };

            if (this.rectsOverlap(cursorHitbox, lifeHitbox)) {
                delete this.gameEntities.lives[key];
                this.gainLife();
                return;
            }
        }

        let value = this.maptable[index];

        if (value === undefined) {
            return;
        }


        switch (value) {
            case 0:
                break;
            case 1:
                this.loseLife();
                break;
            case 4:
                this.motor.endLevel();
                break;
            case 5:
                this.motor.endGame();
                window.currentLevel = 1;
        }
    }

    drawMouse() {
        const now = Date.now();

        if (now < this.invulnerableUntil) {
            if (Math.floor(now / 100) % 2 === 0) {
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
        } else {
            this.isVisible = true;
        }

        if  (this.isVisible) {
            this.cursorSkin.draw(this.mousePosition.x, this.mousePosition.y);
        }
    }


    loseLife() {
        const now = Date.now();
        if (now < this.invulnerableUntil) {
            return;
        }
        if (window.currentLives > 0) {
            window.currentLives--;
            this.invulnerableUntil = now + 1000;
        }

        if (window.currentLives === 0) {
            this.motor.gameOver();
            window.currentLevel = 1;
        }
    }

    gainLife() {
        window.currentLives++;
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
