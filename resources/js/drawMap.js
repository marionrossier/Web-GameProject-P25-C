const WidthTable = [25];
const HeightTable = [17];
const pixelSizeTable = [16];

class DrawMap {
    constructor(mapTable, outsideSkin, waySkin, treeSkin, gameEntities, Size) {
        this.canvas = document.getElementById("gameCanvas");
        if (!this.canvas) {
            throw new Error("Canvas 'gameCanvas' introuvable !");
        }

        this.ctx = this.canvas.getContext("2d");

        this.mapWidth = WidthTable[Size];
        this.mapHeight = HeightTable[Size];
        this.pixelSize = pixelSizeTable[Size];
        this.canvas.width = this.mapWidth * this.pixelSize;
        this.canvas.height = this.mapHeight * this.pixelSize;

        this.mapTable = mapTable;
        this.outsideSkin = outsideSkin;
        this.waySkin = waySkin;
        this.treeSkin = treeSkin;
        this.lives = gameEntities.lives;

        this.treePositions = this.generateTreePositions();

        this.draw();
        console.log("Éléments dessinés !");
    }

    drawOutsideSkin() {
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const index = y * this.mapWidth + x;
                if (this.mapTable[index] === 1) {
                    this.outsideSkin.draw(this.ctx, x, y);
                }
            }
        }
    }

    drawWaySkin() {
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const index = y * this.mapWidth + x;
                if (this.mapTable[index] === 0) {
                    this.waySkin.drawCenter(this.ctx, x, y);
                }
            }
        }
    }

    drawTreeSkinOnRandomCells() {
        for (const { x, y } of this.treePositions) {
            this.treeSkin.draw(this.ctx, x, y);
        }
    }

    generateTreePositions() {
        const eligibleCells = [];

        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const index = y * this.mapWidth + x;
                if (this.mapTable[index] === 1) {
                    eligibleCells.push({ x, y });
                }
            }
        }
        const numberOfTrees = Math.floor(eligibleCells.length * 0.2);
        const selected = [];

        for (let i = 0; i < numberOfTrees; i++) {
            const randomIndex = Math.floor(Math.random() * eligibleCells.length);
            selected.push(eligibleCells.splice(randomIndex, 1)[0]);
        }

        return selected;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawOutsideSkin();
        this.drawWaySkin();
        this.drawTreeSkinOnRandomCells();
    }
}
