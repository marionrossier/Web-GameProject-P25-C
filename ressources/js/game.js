window.addEventListener("load", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const canvasWidth = canvas.width = 1000;
    const canvasHeight = canvas.height = 700;

    const cursor = {
        x: 0,
        y: 0,
        radius: 8,
        image: new Image(),
        imageSize: 30
    };

    // 👇 Important : activer le CORS avant de définir le src
    cursor.image.crossOrigin = "anonymous";
    cursor.image.src = "ressources/images/game/mouse.png";

    cursor.image.onload = () => {
        startGame();
    };

    function startGame() {
        const walls = [
            { x: 200, y: 150, width: 600, height: 20 },
            { x: 200, y: 150, width: 20, height: 400 },
            { x: 780, y: 150, width: 20, height: 400 },
            { x: 200, y: 530, width: 600, height: 20 }
        ];

        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            cursor.x = e.clientX - rect.left;
            cursor.y = e.clientY - rect.top;
            draw();
        });

        function clearCanvas() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        }

        function drawWalls() {
            ctx.fillStyle = "#000000";
            walls.forEach(wall => {
                ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
            });
        }

        function drawCursor() {
            if (!cursor.image.complete) return;
            const size = cursor.imageSize;
            const x = cursor.x - size / 2;
            const y = cursor.y - size / 2;
            ctx.drawImage(cursor.image, x, y, size, size);
        }

        function checkCollisionByColor() {
            try {
                const pixel = ctx.getImageData(cursor.x, cursor.y, 1, 1).data;
                const [r, g, b] = pixel;
                // console.log(`Pixel RGB: ${r}, ${g}, ${b}`);
                return (r < 30 && g < 30 && b < 30);
            } catch (e) {
                console.warn("CORS security: canvas tainted?", e);
                return false;
            }
        }

        function draw() {
            clearCanvas();
            drawWalls();
            drawCursor();

            if (checkCollisionByColor()) {
                ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            }
        }

        draw();
    }
});
