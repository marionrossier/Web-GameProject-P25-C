// 🟢 On attend que la page soit chargée pour démarrer
window.addEventListener("load", () => {
    // 🎯 On sélectionne le canvas et son contexte de dessin 2D
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // 🖼️ On définit la taille du canvas
    const canvasWidth = canvas.width = 1000;
    const canvasHeight = canvas.height = 700;

    // 📏 Définition de la grille
    const cols = 25; // colonnes
    const rows = 17; // lignes
    const cellSize = 40; // taille d’une cellule en pixels

    // 🌳 Tableau des positions d’arbres
    let treePositions = [];

    // 🖱️ Définition du curseur / joueur
    const cursor = {
        x: 0,
        y: 0,
        radius: 8,
        image: new Image(),
        imageSize: 30
    };

    // 🔓 Autorise le chargement de l’image même depuis d’autres origines (utile si hébergée ailleurs)
    cursor.image.crossOrigin = "anonymous";
    cursor.image.src = "ressources/images/game/mouse.png"; // chemin vers l’image du curseur

    // 🌲 Chargement de l’image des arbres
    const treeImg = new Image();
    treeImg.crossOrigin = "anonymous";
    treeImg.src = "ressources/images/game/tree.png"; // à modifier si une vraie image d’arbre est utilisée

    // 🧱 Représentation du labyrinthe (0 = mur, 1 = chemin)
    let maze = [];

    // 🕹️ Quand le curseur est prêt, on génère le labyrinthe et on dessine
    cursor.image.onload = () => {
        generateMaze();
        draw();
    };

    // 🌲 Quand l’image d’arbre est prête, on redessine
    treeImg.onload = () => {
        draw();
    };

    // 📍 Mouvement de souris : on met à jour la position du curseur
    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        cursor.x = e.clientX - rect.left;
        cursor.y = e.clientY - rect.top;
        draw();
    });

    // 🧠 Fonction principale pour générer un labyrinthe
    function generateMaze() {
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        maze = Array.from({ length: rows }, () => Array(cols).fill(0));
        treePositions = [];

        const stack = [];
        let current = { x: 1, y: 1 };

        // 🔄 Retourne les voisines accessibles à 2 cases
        function neighbors(cell) {
            const steps = [
                { dx: 0, dy: -2 }, // haut
                { dx: 2, dy: 0 },  // droite
                { dx: 0, dy: 2 },  // bas
                { dx: -2, dy: 0 }  // gauche
            ];
            return steps
                .map(({ dx, dy }) => ({
                    x: cell.x + dx,
                    y: cell.y + dy,
                    betweenX: cell.x + dx / 2,
                    betweenY: cell.y + dy / 2
                }))
                .filter(n =>
                    n.x >= 1 && n.x < cols - 1 &&
                    n.y >= 1 && n.y < rows - 1 &&
                    !visited[n.y][n.x]
                );
        }

        // 🔨 Algorithme récursif de creusement
        function carve() {
            visited[current.y][current.x] = true;
            maze[current.y][current.x] = 1;

            const nbs = neighbors(current);
            if (nbs.length > 0) {
                const next = nbs[Math.floor(Math.random() * nbs.length)];
                maze[next.betweenY][next.betweenX] = 1; // ouvrir le mur entre les deux cellules
                stack.push(current);
                current = { x: next.x, y: next.y };
                carve();
            } else if (stack.length > 0) {
                current = stack.pop();
                carve();
            }
        }

        carve();

        // 🟦 Entrée (en bas à gauche)
        maze[rows - 2][0] = 1;
        cursor.x = (0 + 0.5) * cellSize;
        cursor.y = (rows - 2 + 0.5) * cellSize;

        // 🟥 Sortie (en haut à droite)
        maze[1][cols - 1] = 1;

        // 🧹 On dessine une première fois le labyrinthe
        clearCanvas();
        drawMaze();

        // 🌳 Génération d’arbres sur les zones vertes uniquement
        const treeSize = 40;
        const attempts = 150;

        for (let i = 0; i < attempts; i++) {
            const x = Math.random() * (canvasWidth - treeSize);
            const y = Math.random() * (canvasHeight - treeSize);

            try {
                const pixel = ctx.getImageData(x + treeSize / 2, y + treeSize / 2, 1, 1).data;
                const [r, g, b] = pixel;
                const isOnPath = (r > 240 && g > 240 && b > 240);
                if (!isOnPath) {
                    treePositions.push({ x, y });
                }
            } catch (e) {
                // en cas d'erreur (bord du canvas), on ignore
            }
        }
    }

    // ✨ Efface tout le canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    // 🧱 Dessine le labyrinthe : herbe, chemin, entrée et sortie
    function drawMaze() {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const px = x * cellSize;
                const py = y * cellSize;

                if (x === 0 && y === rows - 2) ctx.fillStyle = "#4a90e2"; // entrée
                else if (x === cols - 1 && y === 1) ctx.fillStyle = "#e94f4f"; // sortie
                else if (maze[y][x] === 1) ctx.fillStyle = "#ffffff"; // chemin
                else ctx.fillStyle = "#00aa00"; // herbe

                ctx.fillRect(px, py, cellSize, cellSize);
            }
        }
    }

    // 🌳 Dessine tous les arbres selon les positions générées
    function drawTrees() {
        const treeSize = 40;
        treePositions.forEach(pos => {
            ctx.drawImage(treeImg, pos.x, pos.y, treeSize, treeSize);
        });
    }

    // 🖱️ Dessine le curseur / joueur
    function drawCursor() {
        if (!cursor.image.complete) return;
        const size = cursor.imageSize;
        const x = cursor.x - size / 2;
        const y = cursor.y - size / 2;
        ctx.drawImage(cursor.image, x, y, size, size);
    }

    // ❌ Détection de collision par couleur (rouge si hors du chemin)
    function checkCollisionByColor() {
        try {
            const pixel = ctx.getImageData(cursor.x, cursor.y, 1, 1).data;
            const [r, g, b] = pixel;
            return !(r > 240 && g > 240 && b > 240); // si ce n’est pas blanc, c’est un obstacle
        } catch (e) {
            return false;
        }
    }

    // 🖼️ Fonction principale d’affichage
    function draw() {
        clearCanvas();
        drawMaze();
        drawTrees();

        if (checkCollisionByColor()) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }

        drawCursor(); // dessiné en dernier !
        checkVictory();
    }

    // 🔁 Bouton de rechargement du labyrinthe
    document.getElementById("replayButton").addEventListener("click", () => {
        generateMaze();
        draw();
        document.getElementById("message").textContent = "";
    });

    // 🏁 Vérifie si le joueur est sur la sortie
    function checkVictory() {
        const cellX = Math.floor(cursor.x / cellSize);
        const cellY = Math.floor(cursor.y / cellSize);

        if (cellX === cols - 1 && cellY === 1) {
            document.getElementById("message").textContent = "🎉 Bravo ! Tu as atteint la sortie !";
        }
    }
});