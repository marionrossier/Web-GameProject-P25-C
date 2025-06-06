const WIDTH = 25;
const HEIGHT = 17;

const coEntry = 15 * WIDTH;
const coEnd = 1 * WIDTH + 24;

class RandomMap {
    constructor() {
        this.maze = Array(HEIGHT * WIDTH).fill(1);  // Tout est mur
        this.visited = Array(HEIGHT).fill(0).map(() => Array(WIDTH).fill(false));
    }

    generateMaze() {
        this.backtrack(15, 0);
        // entrée/sortie ouvertes
        this.maze[15 * WIDTH + 0] = 0;
        this.maze[1 * WIDTH + 24] = 0;
        return this.maze;
    }

    isInBounds(x, y) {
        return x >= 0 && x < HEIGHT && y >= 0 && y < WIDTH;
    }

    backtrack(x, y) {
        this.visited[x][y] = true;
        this.maze[x * WIDTH + y] = 0;

        const directions = [
            [-2, 0], [2, 0], [0, -2], [0, 2]
        ];
        directions.sort(() => Math.random() - 0.5);

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (this.isInBounds(nx, ny) && !this.visited[nx][ny]) {
                // casser le mur entre les deux cases
                const mx = x + dx / 2;
                const my = y + dy / 2;
                this.maze[mx * WIDTH + my] = 0;

                this.backtrack(nx, ny);
            }
        }
    }
}
