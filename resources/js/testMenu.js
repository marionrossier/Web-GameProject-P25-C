document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded, initializing menu in testMenu.js");

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas ? canvas.getContext("2d") : null;

    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }
    if (!ctx) {
        console.error("Canvas context not initialized");
        return;
    }

    const logoImage = new Image();
    logoImage.src = "resources/images/WebSite/logo.png";

    const heartImage = new Image();
    heartImage.src = "resources/images/game/Heart.png";

    const backButtonImage = new Image();
    backButtonImage.src = "resources/images/Menu/rollback-picto.png";

    const instructionsImage = new Image();
    instructionsImage.src = "resources/images/WebSite/mockup/Instructions.png";

    const menuButtons = [
        { id: "play", text: "Play", x: 400, y: 400, width: 200, height: 60 },
        { id: "rules", text: "Instructions", x: 400, y: 480, width: 200, height: 60 },
        { id: "stats", text: "Results", x: 400, y: 560, width: 200, height: 60 }
    ];

    const backButton = {
        id: "back",
        text: "Back",
        x: canvas.width - 20 - 40,
        y: 20,
        width: 40,
        height: 40
    };

    const gameOverButtons = [
        { id: "continue", text: "Continue", x: 400, y: 400, width: 200, height: 60 },
        { id: "menu", text: "Menu", x: 400, y: 480, width: 200, height: 60 }
    ];

    let currentScreen = "menu";
    let app = null;

    function drawBackgroundAndOverlay() {
        ctx.fillStyle = "rgb(60, 60, 60)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        console.log("Dark gray background drawn");
    }

    function drawButton(button) {
        if (button.id === "back" && backButtonImage.complete && backButtonImage.naturalWidth !== 0) {
            ctx.drawImage(backButtonImage, button.x, button.y, button.width, button.height);
            console.log("Back button image drawn at", button.x, button.y);
        } else {
            ctx.fillStyle = "#ff5722";
            ctx.fillRect(button.x, button.y, button.width, button.height);
            console.log("Button background drawn at", button.x, button.y);

            ctx.strokeStyle = "white";
            ctx.strokeRect(button.x, button.y, button.width, button.height);
            console.log("Button border drawn");

            if (heartImage.complete && heartImage.naturalWidth !== 0) {
                ctx.drawImage(heartImage, button.x - 40, button.y, 32, 32);
                ctx.drawImage(heartImage, button.x + button.width + 10, button.y, 32, 32);
                console.log("Hearts drawn around button");
            }

            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
            console.log("Button text drawn:", button.text);
        }
    }

    function drawMainMenu() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("Canvas cleared for main menu");

        drawBackgroundAndOverlay();

        ctx.font = "48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Mouse Rush", canvas.width / 2, 200);
        console.log("Title drawn at", canvas.width / 2, 200);

        menuButtons.forEach(button => drawButton(button));
    }

    function drawScreen(message = "Screen not loaded") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("Canvas cleared for screen");

        drawBackgroundAndOverlay();

        if (currentScreen === "rules" && instructionsImage.complete && instructionsImage.naturalWidth !== 0) {
            ctx.drawImage(instructionsImage, 0, 25, canvas.width, canvas.height);
            console.log("Instructions image drawn at 0, 25 with size", canvas.width, "x", canvas.height);
        } else if (currentScreen === "gameOver") {
            ctx.font = "48px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Game Over!", canvas.width / 2, 300);
            console.log("Game Over text drawn");

            gameOverButtons.forEach(button => drawButton(button));
        } else {
            ctx.font = "48px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(message, canvas.width / 2, canvas.height / 2);
            console.log("Message drawn:", message);
        }

        if (currentScreen !== "gameOver") {
            drawButton(backButton);
        }
    }

    function startGame() {
        console.log("Starting game...");

        if (typeof Enemy === "undefined") {
            console.error("Enemy class is not defined. Ensure enemy.js is loaded.");
            currentScreen = "menu";
            render();
            return;
        }
        if (typeof Life === "undefined") {
            console.error("Life class is not defined. Ensure life.js is loaded.");
            currentScreen = "menu";
            render();
            return;
        }
        if (typeof RandomMap === "undefined") {
            console.error("RandomMap class is not defined. Ensure RandomMap.js is loaded.");
            currentScreen = "menu";
            render();
            return;
        }
        if (typeof cursorSkin === "undefined") {
            console.error("cursorSkin class is not defined. Ensure cursorSkin.js is loaded.");
            currentScreen = "menu";
            render();
            return;
        }
        if (typeof Cursor === "undefined") {
            console.error("Cursor class is not defined. Ensure Cursor.js is loaded.");
            currentScreen = "menu";
            render();
            return;
        }
        if (typeof Motor === "undefined") {
            console.error("Motor class is not defined. Ensure Motor.js is loaded.");
            currentScreen = "menu";
            render();
            return;
        }

        try {
            console.log("Initializing game entities...");
            const enemySkin = new Image();
            enemySkin.src = "resources/images/game/mouse.png";
            window.gameEntities = {
                enemies: {
                    enemy1: new Enemy(1, 5, 5, 5, 5, enemySkin, 0, 20, 20),
                    enemy2: new Enemy(2, 10, 10, 10, 10, enemySkin, 0, 20, 20)
                },
                lives: {
                    life1: new Life(0, 19, 7, null)
                }
            };
            console.log("Game entities initialized");

            const testTexturePack = ["white", "green", "red", "black", "yellow"];
            console.log("Texture pack defined");

            console.log("Generating map...");
            const map = new RandomMap();
            const generated = map.generateMaze();
            console.log("Map generated");

            window.pixelSizeTable = { 2: 32 };
            window.WidthTable = { 2: 20 };
            window.HeightTable = { 2: 20 };

            console.log("Creating Cursor instance...");
            const cursorSkinNumber = 1;
            const onWinCallback = () => {
                console.log("Player wins!");
                currentScreen = "stats";
                render();
            };
            const onGameOverCallback = () => {
                console.log("Game Over triggered!");
                currentScreen = "gameOver";
                render();
            };
            const cursor = new Cursor(cursorSkinNumber, canvas, generated, 2, onWinCallback, ctx, onGameOverCallback);
            console.log("Cursor instance created");

            console.log("Creating Motor instance...");
            app = new Motor(2, generated, testTexturePack, window.gameEntities, 0);
            console.log("Motor instance created successfully");

            currentScreen = "play";
            app.gameStart();
            console.log("Game started successfully");
            // Pas besoin d'appeler render() ici, car Motor gère son propre rendu via setInterval
        } catch (error) {
            console.error("Error starting game:", error);
            currentScreen = "menu";
            render();
        }
    }

    function render() {
        console.log("Rendering screen:", currentScreen);
        if (currentScreen === "menu") {
            if (app) {
                app.stopTimer(); // Arrêter le timer de Motor si on revient au menu
            }
            drawMainMenu();
        } else if (currentScreen === "play") {
            // Motor gère son propre rendu via setInterval, donc on n'a rien à faire ici
            // On dessine juste le bouton "Back"
            drawButton(backButton);
        } else if (currentScreen === "rules") {
            if (app) {
                app.stopTimer(); // Arrêter le timer de Motor
            }
            drawScreen("Game Rules not loaded");
        } else if (currentScreen === "stats") {
            if (app) {
                app.stopTimer(); // Arrêter le timer de Motor
            }
            drawScreen("Results: Score 0, Time 0s");
        } else if (currentScreen === "gameOver") {
            if (app) {
                app.stopTimer(); // Arrêter le timer de Motor
            }
            drawScreen();
        }
    }

    function handleCanvasClick(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log("Canvas clicked at", x, y);

        if (
            (currentScreen === "play" || currentScreen === "rules" || currentScreen === "stats") &&
            x >= backButton.x &&
            x <= backButton.x + backButton.width &&
            y >= backButton.y &&
            y <= backButton.y + backButton.height
        ) {
            console.log("Back button clicked");
            if (currentScreen === "play" && app) {
                try {
                    app.stopTimer();
                    console.log("Game timer stopped");
                } catch (error) {
                    console.error("Error stopping game timer:", error);
                }
            }
            currentScreen = "menu";
            render();
            return;
        }

        if (currentScreen === "menu") {
            menuButtons.forEach(button => {
                if (
                    x >= button.x &&
                    x <= button.x + button.width &&
                    y >= button.y &&
                    y <= button.y + button.height
                ) {
                    console.log("Button clicked:", button.id);
                    currentScreen = button.id;
                    if (button.id === "play") {
                        startGame();
                    } else {
                        render();
                    }
                }
            });
        } else if (currentScreen === "gameOver") {
            gameOverButtons.forEach(button => {
                if (
                    x >= button.x &&
                    x <= button.x + button.width &&
                    y >= button.y &&
                    y <= button.y + button.height
                ) {
                    console.log("Game Over button clicked:", button.id);
                    if (button.id === "continue") {
                        startGame();
                    } else if (button.id === "menu") {
                        currentScreen = "menu";
                        render();
                    }
                }
            });
        }
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && currentScreen === "play") {
            console.log("Escape key pressed, returning to menu");
            if (app) {
                try {
                    app.stopTimer();
                    console.log("Game timer stopped");
                } catch (error) {
                    console.error("Error stopping game timer:", error);
                }
            }
            currentScreen = "menu";
            render();
        }
    });

    Promise.all([
        new Promise(resolve => {
            logoImage.onload = () => {
                console.log("Logo image loaded");
                resolve();
            };
            logoImage.onerror = () => {
                console.error("Failed to load logo image");
                resolve();
            };
        }),
        new Promise(resolve => {
            heartImage.onload = () => {
                console.log("Heart image loaded");
                resolve();
            };
            heartImage.onerror = () => {
                console.error("Failed to load heart image");
                resolve();
            };
        }),
        new Promise(resolve => {
            backButtonImage.onload = () => {
                console.log("Back button image loaded");
                resolve();
            };
            backButtonImage.onerror = () => {
                console.error("Failed to load back button image");
                resolve();
            };
        }),
        new Promise(resolve => {
            instructionsImage.onload = () => {
                console.log("Instructions image loaded");
                resolve();
            };
            instructionsImage.onerror = () => {
                console.error("Failed to load instructions image");
                resolve();
            };
        })
    ]).then(() => {
        console.log("All images processed, drawing menu");
        render();
    }).catch(err => {
        console.error("Error processing images:", err);
        render();
    });

    canvas.addEventListener("click", handleCanvasClick);
});