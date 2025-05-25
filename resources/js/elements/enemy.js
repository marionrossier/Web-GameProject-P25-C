class Enemy {
    constructor(velocity, startX, startY, endX, endY, map, size) {
        this.startX = this.currentX = startX;
        this.startY = this.currentY = startY;
        this.endX = endX;
        this.endY = endY;
        this.velocity = velocity;
        this.map = map;
        this.size = size;
        this.enemySkin = new EnemySkin();
        this.hitboxWidth = 25;
        this.hitboxHeight = 25;

        this.enemiesMove()
    }

    enemiesMove(map) {
        const path = this.findPath(map);
        if (path && path.length > 0) {
            this.enemiesMoveAlongPath(path);
        }
    }

    findPath(map) {
        const path = [];
        const visited = new Set();
        if (this.pathDefinition(map, this.currentX, this.currentY, path, visited) === true) {
            return path;
        } else {
            return null;
        }
    }

    pathDefinition(map, x, y, path, visited) {
        path.length = 0;

        const dx = this.endX - this.startX;
        const dy = this.endY - this.startY;
        const steps = Math.max(Math.abs(dx), Math.abs(dy));

        for (let i = 0; i <= steps; i++) {
            const intermediateX = Math.round(this.startX + (dx * i) / steps);
            const intermediateY = Math.round(this.startY + (dy * i) / steps);
            path.push([intermediateX, intermediateY]);
        }

        // Add the reverse path for the return trip
        for (let i = steps - 1; i >= 0; i--) {
            const intermediateX = Math.round(this.startX + (dx * i) / steps);
            const intermediateY = Math.round(this.startY + (dy * i) / steps);
            path.push([intermediateX, intermediateY]);
        }

        return true;
    }

    enemiesMoveAlongPath(path) {
        let step = 0;
        let progress = 0; // Progression entre deux points (0 à 1)
        let forward = true;

        const move = () => {
            if (path.length > 1) {
                const [startX, startY] = path[step];
                const [endX, endY] = path[step + (forward ? 1 : -1)];

                this.currentX = startX + (endX - startX) * progress;
                this.currentY = startY + (endY - startY) * progress;

                progress += this.velocity / 100;

                if (progress >= 1) {
                    progress = 0;
                    step += forward ? 1 : -1;

                    if (step === path.length - 1 || step === 0) {
                        forward = !forward;
                    }
                }
            }
            setTimeout(move, 1000 / 60);
        };
        move();
    }

    draw() {
        this.enemySkin.draw(this.currentX, this.currentY);
    }

    getHitbox() {
        const cellSize = pixelSizeTable[this.size];
        const posX = this.currentX * cellSize;
        const posY = this.currentY * cellSize;

        return {
            x: posX - this.hitboxWidth / 2,
            y: posY - this.hitboxHeight / 2,
            width: this.hitboxWidth,
            height: this.hitboxHeight
        };
    }
}
