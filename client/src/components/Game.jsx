import React, { useEffect } from "react";

const Game = () => {
    useEffect(() => {
        const base = process.env.PUBLIC_URL;

        const scriptPaths = [
            `${base}/game/js/autumnLevel1.js`,
            `${base}/game/js/autumnLevel2.js`,
            `${base}/game/js/autumnLevel3.js`,
            `${base}/game/js/cursor.js`,
            `${base}/game/js/cursorDisplayManager.js`,
            `${base}/game/js/cursorSkin.js`,
            `${base}/game/js/displayStatsScreen.js`,
            `${base}/game/js/drawMap.js`,
            `${base}/game/js/enemy.js`,
            `${base}/game/js/enemySkin.js`,
            `${base}/game/js/gameCompleteScreen.js`,
            `${base}/game/js/gameConstants.js`,
            `${base}/game/js/gameOverScreen.js`,
            `${base}/game/js/gestionScore.js`,
            `${base}/game/js/imageUploader.js`,
            `${base}/game/js/ingameState.js`,
            `${base}/game/js/jsonReach.js`,
            `${base}/game/js/levelCompleteScreen.js`,
            `${base}/game/js/levelManager.js`,
            `${base}/game/js/life.js`,
            `${base}/game/js/lifeSkin.js`,
            `${base}/game/js/locationService.js`,
            `${base}/game/js/menu.js`,
            `${base}/game/js/menuConstants.js`,
            `${base}/game/js/menuDraw.js`,
            `${base}/game/js/menuHandlers.js`,
            `${base}/game/js/menuStartGame.js`,
            `${base}/game/js/menuState.js`,
            `${base}/game/js/motor.js`,
            `${base}/game/js/outsideSkin.js`,
            `${base}/game/js/playerDataManager.js`,
            `${base}/game/js/playerSetupScreen.js`,
            `${base}/game/js/playerSetupUi.js`,
            `${base}/game/js/summerLevel1.js`,
            `${base}/game/js/summerLevel2.js`,
            `${base}/game/js/summerLevel3.js`,
            `${base}/game/js/tree.js`,
            `${base}/game/js/treeSkin.js`,
            `${base}/game/js/waySkin.js`,
            `${base}/game/js/winterLevel1.js`,
            `${base}/game/js/winterLevel2.js`,
            `${base}/game/js/winterLevel3.js`
        ];

        const loadScripts = async () => {
            if (window.__mouseRushScriptsLoaded) return;

            for (const src of scriptPaths) {
                const alreadyExists = [...document.scripts].some(s => s.src.includes(src));
                if (alreadyExists) continue;

                await new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = src;
                    script.async = false;
                    script.onload = resolve;
                    script.onerror = () => {
                        console.error(`Erreur de chargement pour : ${src}`);
                        resolve();
                    };
                    document.body.appendChild(script);
                });
            }

            const event = new Event("DOMContentLoaded", { bubbles: true, cancelable: true });
            document.dispatchEvent(event);

            window.__mouseRushScriptsLoaded = true;
        };

        loadScripts();
    }, []);

    const base = process.env.PUBLIC_URL;

    return (
        <>
            <main>
                <section id="articles">
                    <article>
                        <header>
                            <h2>Play Mouse Rush</h2>
                            <p>By Eric, the 01.04.2025</p>
                        </header>

                        <p>
                            Move your mouse through the maze without touching the edges. The game starts below!
                        </p>

                        <div id="gameWrapper" style={{ position: "relative" }}>
                            <canvas id="gameCanvas" width="1000" height="700"></canvas>
                        </div>

                        <audio id="menuMusic" loop>
                            <source src={`${base}/game/audio/Menu_Theme.mp3`} type="audio/mpeg" />
                        </audio>

                        <audio id="gameMusic" loop>
                            <source src={`${base}/game/audio/Forest_Theme.mp3`} type="audio/mpeg" />
                        </audio>
                    </article>
                </section>
            </main>
        <footer>
            <img id="logo" src={process.env.PUBLIC_URL + "/website/logo.png"} alt="logo" />
        </footer>
    </>
    );
};

export default Game;
