/**
 * DrawMap class provides functionality to render a game map onto a canvas.
 * It utilizes different skins to draw various elements such as outside areas,
 * pathways, and randomly placed trees based on the provided map structure.
 */
class DrawMap {
    constructor(mapTable, outsideSkin, waySkin, treeSkin, gameEntities) {
        if (!window.canvas) {
            throw new Error("Canvas 'gameCanvas' not found !");
        }

        window.canvas.width = MAP.width * MAP.pixelSize;
        window.canvas.height = MAP.height * MAP.pixelSize;

        this.mapTable = mapTable;
        this.outsideSkin = outsideSkin;
        this.waySkin = waySkin;
        this.treeSkin = treeSkin;
        this.lives = gameEntities.lives;

        this.treePositions = this.generateTreePositions();

        this.draw();
    }

    drawOutsideSkin() {
        for (let y = 0; y < MAP.height; y++) {
            for (let x = 0; x < MAP.width; x++) {
                const index = y * MAP.width + x;
                if (this.mapTable[index] === 1) {
                    this.outsideSkin.draw(x, y);
                }
            }
        }
    }

    drawWaySkin() {
        for (let y = 0; y < MAP.height; y++) {
            for (let x = 0; x < MAP.width; x++) {
                const index = y * MAP.width + x;
                if (this.mapTable[index] === 0) {
                    this.waySkin.drawCenter(x, y);
                }
            }
        }
    }

    drawTreeSkinOnRandomCells() {
        for (const { x, y } of this.treePositions) {
            this.treeSkin.draw(x, y);
        }
    }

    generateTreePositions() {
        const eligibleCells = [];

        for (let y = 0; y < MAP.height; y++) {
            for (let x = 0; x < MAP.width; x++) {
                const index = y * MAP.width + x;
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
        window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
        this.drawOutsideSkin();
        this.drawWaySkin();
        this.drawTreeSkinOnRandomCells();
    }
}
