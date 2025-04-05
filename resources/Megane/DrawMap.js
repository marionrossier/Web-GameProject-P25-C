class DrawMap {
    constructor(mapTable) {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        // Dimensions du canvas basées sur la taille de la carte
        this.mapWidth = 25;
        this.mapHeight = 17;
        this.pixelSize = 40;

        // Définir les dimensions du canvas
        this.canvas.width = this.mapWidth * this.pixelSize;
        this.canvas.height = this.mapHeight * this.pixelSize;

        // Attribuer la table de la carte
        this.mapTable = mapTable;
    }

    generateImage(textPack) {
        // Parcourir la table et dessiner sur le canvas


        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const index = y * this.mapWidth + x;
                const value = this.mapTable[index];  // 0 = blanc, 1 = noir

                // Choisir la couleur en fonction de la valeur de la table
                this.ctx.fillStyle = value >= 0 && value <= 4 ? textPack[value] : "purple";

                // Dessiner le carré correspondant à chaque pixel
                this.ctx.fillRect(
                    x * this.pixelSize,
                    y * this.pixelSize,
                    this.pixelSize,
                    this.pixelSize
                );
            }
        }
    }
}
