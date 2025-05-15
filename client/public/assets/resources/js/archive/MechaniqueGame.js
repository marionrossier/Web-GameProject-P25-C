// Initialisation du canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Taille des cellules (doit correspondre à celle du labyrinthe)
const cellSize = 40;

// Position de la souris
let mousePosition = { x: 0, y: 0 };

// Hitbox modifiable
let hitbox = { width: 1, height: 1 };

// Fonction pour mettre à jour la position de la souris
function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    mousePosition.x = event.clientX - rect.left;
    mousePosition.y = event.clientY - rect.top;
}

function setHitbox(width, height) {
    hitbox.width = width;
    hitbox.height = height;
}

// carte de test
let gameMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 3, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];

// fonction pour détecter où la souris est ainsi que ce qu'elle touche (sur la matrice)
function touch() {
    const centerX = mousePosition.x;
    const centerY = mousePosition.y;

    const cellX = Math.floor(centerX / cellSize);
    const cellY = Math.floor(centerY / cellSize);

    const value = gameMap[cellY]?.[cellX];

    // A définir ce qu'on veut que le switch case renvoie, pour l'instant c'est des log visible sur dev. tool
    switch (value) {
        case 0:
            console.log("Chemin sûr");
            break;
        case 1:
            console.log("Mur touché !");
            break;
        case 2:
            console.log("Vie supplémentaire !");
            gameMap[cellY][cellX] = 0;
            break;
        case 3:
            console.log("Ennemi !");
            break;
        case 4:
            console.log("Souris !");
            break;
        default:
            // zone vide ou hors limites
            break;
    }
}

// Suivi de la souris
canvas.addEventListener("mousemove", (e) => {
    getMousePosition(e);
    touch(); // vérifie à chaque mouvement
    draw();  // pour test visuel
});

// Dessine un visuel simple pour la matrice de test
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < gameMap.length; y++) {
        for (let x = 0; x < gameMap[y].length; x++) {
            let val = gameMap[y][x];
            switch (val) {
                case 0: ctx.fillStyle = "#ffffff"; break; // chemin
                case 1: ctx.fillStyle = "#228B22"; break; // mur
                case 2: ctx.fillStyle = "#ff69b4"; break; // vie
                case 3: ctx.fillStyle = "#8b0000"; break; // ennemi
                case 4: ctx.fillStyle = "#4444ff"; break; // souris
                default: ctx.fillStyle = "#000000"; break;
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }

        ctx.fillStyle = "yellow";
        ctx.fillRect(mousePosition.x - 1, mousePosition.y - 1, 1, 1);
    }

    // dessine la hitbox autour de la souris
    ctx.strokeStyle = "red";
    ctx.strokeRect(
        mousePosition.x - hitbox.width / 2,
        mousePosition.y - hitbox.height / 2,
        hitbox.width,
        hitbox.height
    );
}
