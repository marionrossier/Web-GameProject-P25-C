import React, { useEffect } from "react";

const Game = () => {
    useEffect(() => {
        const scriptPaths = [
            // Elements
            "/game/js/cursor.js",
            "/game/js/tree.js",
            "/game/js/enemy.js",
            "/game/js/life.js",

            // Skins
            "/game/js/cursorSkin.js",
            "/game/js/enemySkin.js",
            "/game/js/lifeSkin.js",
            "/game/js/treeSkin.js",
            "/game/js/outsideSkin.js",
            "/game/js/waySkin.js",

            // Map drawing + random map generator
            "/game/js/drawMap.js",
            "/game/js/randomMap.js",

            // Menu constants, images, configs
            "/game/js/menuConstants.js",
            "/game/js/playerDataManager.js",
            "/game/js/locationService.js",
            "/game/js/imageUploader.js",
            "/game/js/playerSetupUi.js",
            "/game/js/playerSetupScreen.js",
            "/game/js/gameOverScreen.js",
            "/game/js/levelCompleteScreen.js",
            "/game/js/gameCompleteScreen.js",
            "/game/js/ingameState.js",
            "/game/js/score.js",

            // Motor (core logic)
            "/game/js/motor.js",

            // Maps manager + levels
            "/game/js/levelManager.js",
            "/game/js/summerLevel1.js",
            "/game/js/autumnLevel1.js",
            "/game/js/winterLevel1.js",
            "/game/js/summerLevel2.js",
            "/game/js/autumnLevel2.js",
            "/game/js/winterLevel2.js",
            "/game/js/summerLevel3.js",
            "/game/js/autumnLevel3.js",
            "/game/js/winterLevel3.js",

            // Menu drawing, click handling
            "/game/js/menuDraw.js",
            "/game/js/menuState.js",
            "/game/js/menuStartGame.js",
            "/game/js/menuHandlers.js",
            "/game/js/cursorDisplayManager.js",

            // FINAL ENTRY POINT
            "/game/js/menu.js",
            "/game/js/script.js"
        ];

        const addedScripts = [];

        const loadScriptsSequentially = async () => {
            for (const src of scriptPaths) {
                await new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = src;
                    script.async = false;
                    script.onload = resolve;
                    script.onerror = () => {
                        console.error(`Erreur de chargement pour : ${src}`);
                        resolve(); // ne bloque pas la suite
                    };
                    document.body.appendChild(script);
                    addedScripts.push(script);
                });
            }

            // Simuler l'événement DOMContentLoaded
            const event = new Event("DOMContentLoaded", {
                bubbles: true,
                cancelable: true,
            });
            document.dispatchEvent(event);
        };

        loadScriptsSequentially();

        return () => {
            addedScripts.forEach((s) => s.remove());
        };
    }, []);

    return (
        <main>
            <section id="articles">
                <article>
                    <header>
                        <h2>Play Mouse Rush</h2>
                        <p>By Eric, the 01.04.2025</p>
                    </header>

                    <p>Move your mouse through the maze without touching the edges. The game starts below!</p>

                    <div id="gameWrapper" style={{ position: "relative" }}>
                        <canvas id="gameCanvas" width="1000" height="700"></canvas>
                    </div>

                    <audio id="menuMusic" loop>
                        <source src="/game/audio/Menu_Theme.mp3" type="audio/mpeg" />
                    </audio>

                    <audio id="gameMusic" loop>
                        <source src="/game/audio/Forest_Theme.mp3" type="audio/mpeg" />
                    </audio>

                    {/* Screens required by game state management */}
                    <div id="startScreen" style={{ display: "none" }}>
                        <button id="startButton">Start Game</button>
                    </div>

                    <div id="endScreen" style={{ display: "none" }}>
                        <button id="replayButton">Play Again</button>
                    </div>

                    <div id="gameOverScreen" style={{ display: "none" }}>
                        <button id="replayButton2">Retry</button>
                    </div>
                </article>
            </section>
        </main>
    );
};

export default Game;
