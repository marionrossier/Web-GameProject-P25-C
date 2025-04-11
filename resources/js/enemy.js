
class Enemy {
    constructor(enemyValue, wayValue, color, velocity, startX, startY, endX, endY, currentX, currentY) {
        this.enemiesValue = enemyValue;
        this.currentValue = wayValue
        this.color = color;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.currentX = currentX;
        this.currentY = currentY;
        this.velocity = velocity;
    }

    appearWithDelayAndMove(preApparitionColor) {
        const preAppColor = preApparitionColor
        const enemyColor = this.color;
        this.currentX = this.startX;
        this.currentY = this.startY;
        this.color = preApparitionColor;

        setTimeout(() => {
            this.color = enemyColor;
        }, 1000);
        this.currentValue = this.enemiesValue;
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
        if (this.backtracking(map, this.currentX, this.currentY, path, visited) === true) {
            return path;
        } else {
            return null;
        }
    }

    backtracking(map, x, y, path, visited) {
        // If we reached the end
        if (x === this.endX && y === this.endY) {
            path.push([x, y]);
            return true;
        }

        // If the position is safe and not visited
        if ((this.wayIsSafe(map, x, y) === true) && (!visited.has(`${x},${y}`) === true)) {
            visited.add(`${x},${y}`);
            path.push([x, y]);

            const directions = [
                [0, -1], // up
                [1, 0],  // right
                [0, 1],  // down
                [-1, 0]  // left
            ];

            // Explore all possible directions
            for (const [dx, dy] of directions) {
                if (this.backtracking(map, x + dx, y + dy, path, visited)) {
                    return true; // Found a path
                }
            }

            path.pop(); // Backtrack if no further path found
        }
        return false; // No path found
    }

    wayIsSafe(map, x, y) {
        const inArray =
            x >= 0 && x < map[0].length &&
            y >= 0 && y < map.length;

        const isPathOrLife =
            map[y][x] === 0 ||
            map[y][x] === 2;
        return inArray && isPathOrLife;
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

    //enemiesDie
}

const enemy = new Enemy(3, 0, "yellow", 1,
    0, 0,
    10, 10,
    5, 5);

export { Enemy, enemy };
