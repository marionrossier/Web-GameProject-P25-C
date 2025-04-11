const WidthTable = [25, 1000];
const HeightTable = [17, 700];
const pixelSizeTable = [40, 1];

const decorSize = 40;
const attempts = 120;

class DrawMap {
    constructor(mapTable, textPack, Size) {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.mapWidth = WidthTable[Size];
        this.mapHeight = HeightTable[Size];
        this.pixelSize = pixelSizeTable[Size];
        this.canvas.width = this.mapWidth * this.pixelSize;
        this.canvas.height = this.mapHeight * this.pixelSize;

        this.mapTable = mapTable;
        this.textPack = textPack;
        this.decorPosition = [];

        this.decorImg = new Image();
        this.decorImg.crossOrigin = "anonymous";
        this.decorImg.src = "/resources/images/game/tree.png";

        this.generateImage();
        this.decorImg.onload = () => {
            this.draw()
            console.log("image charged ");
        };
        this.decorImg.onerror = () => {
            console.error("Erreur lors du chargement de l’image");
        };
    }

    generateImage() {

        //génère la map en fonction d'un tableau brute donné
        //on utilise une variable index comme le tableau a qu'une dimension,
        //Ils n'en ont qu'une seule et on se sert d'index pour définir "Une grandeur de ligne"
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const index = y * this.mapWidth + x;
                const value = this.mapTable[index];
                this.ctx.fillStyle = value >= 0 && value <= 4 ? this.textPack[value] : "purple";

                //dessine le rectangle
                this.ctx.fillRect(
                    x * this.pixelSize,
                    y * this.pixelSize,
                    this.pixelSize,
                    this.pixelSize
                );
            }
        }


        //methode sensé placer les obstacles, mais des problèmes de chargement de l'image l'en empêche
        for (let i = 0; i < attempts; i++) {
            const x = Math.random() * (this.canvas.width - decorSize);
            const y = Math.random() * (this.canvas.height - decorSize);

            try {
                const pixel = this.ctx.getImageData(x + decorSize / 2, y + decorSize / 2, 1, 1).data;
                const [r, g, b] = pixel;
                const targetColor = getRGBFromColorName(this.textPack[0]);
                const isOnPath = (r === targetColor[0] && g === targetColor[1] && b === targetColor[2]);

                if (!isOnPath) {
                    this.decorPosition.push({ x, y });
                }
            } catch (e) {
                // Cela signifie que l'obstacle est mis hors de la map, on ignore
            }
        }

        this.draw();
    }

    draw() {
        //afin de pouvoir affiché les différents objets
        this.drawDecor();
        console.log("✅ Décor dessiné !");
    }

    drawDecor() {
        //affiche le décor
        this.decorPosition.forEach(pos => {
            this.ctx.drawImage(this.decorImg, pos.x, pos.y, decorSize, decorSize);
        });
    }
}

function getRGBFromColorName(colorName) {
    //traduis le texte en valeur chromatique
    const colorMap = {
        "white": [255, 255, 255],
        "black": [0, 0, 0],
        "red": [255, 0, 0],
        "green": [0, 255, 0],
        "blue": [0, 0, 255],
        "yellow": [255, 255, 0],
    };
    return colorMap[colorName] || [0, 0, 0];
}
