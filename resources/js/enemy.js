
class Enemy {
    constructor(enemyValue, wayValue, color, velocity, startX, startY, endX, endY, map) {
        this.enemiesValue = enemyValue;
        this.currentValue = wayValue
        this.color = color;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.currentX = startX;
        this.currentY = startY;
        this.velocity = velocity;
        this.map = map;
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
        // Clear the path array
        path.length = 0;

        // Add the straight-line path from start to end
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

        return true; // Path is always valid
    }

    enemiesMoveAlongPath(path) {
        let step = 0;
        let forward = true;
        const move = () => {
            if (forward) {
                if (step < path.length) {
                    this.currentX = path[step][0];
                    this.currentY = path[step][1];
                    step++;
                } else {
                    step--;
                    forward = false;
                }
            } else {
                if (step >= 0) {
                    this.currentX = path[step][0];
                    this.currentY = path[step][1];
                    step--;
                } else {
                    step++;
                    forward = true;
                }
            }
            setTimeout(move, 1000 / this.velocity);
        };
        move();
    }
    draw(ctx) {
        new enemySkin().draw(ctx, this.currentX, this.currentY);
        this.enemiesMove()
    }
}