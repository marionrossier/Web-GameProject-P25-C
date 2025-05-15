import React, { useEffect } from 'react';

export default function Game() {
    useEffect(() => {
        const scriptPaths = [
            "elements/cursor.js", "elements/tree.js", "elements/enemy.js", "elements/life.js",
            "skins/cursorSkin.js", "skins/enemySkin.js", "skins/lifeSkin.js", "skins/treeSkin.js", "skins/outsideSkin.js", "skins/waySkin.js",
            "drawMap.js", "maps/randomMap.js", "menu/menuConstants.js", "menu/playerDataManager.js", "menu/locationService.js",
            "menu/imageUploader.js", "menu/playerSetupUi.js", "menu/playerSetupScreen.js", "menu/gameOverScreen.js",
            "menu/levelCompleteScreen.js", "menu/gameCompleteScreen.js", "ingameState.js", "gameLogic/score.js", "motor.js",
            "script.js",
            "maps/summerLevel1.js", "maps/autumnLevel1.js", "maps/winterLevel1.js",
            "maps/summerLevel2.js", "maps/autumnLevel2.js", "maps/winterLevel2.js",
            "maps/summerLevel3.js", "maps/autumnLevel3.js", "maps/winterLevel3.js",
            "menu/menuDraw.js", "menu/menuState.js", "menu/menuStartGame.js", "menu/menuHandlers.js",
            "maps/levelManager.js", "menu/cursorDisplayManager.js", "menu/menu.js"
        ];

        const scriptElements = scriptPaths.map(path => {
            const script = document.createElement("script");
            script.src = process.env.PUBLIC_URL + "/assets/resources/js/" + path;
            script.async = true;
            document.body.appendChild(script);
            return script;
        });

        return () => {
            scriptElements.forEach(script => document.body.removeChild(script));
        };
    }, []);

    return (
        <>
            <header>
                <h1>HES-SO Vs - 64-31 - Web Development</h1>
                <nav>
                    <ul>
                        <li className="hamburger">
                            <img src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/hamburger_icon.svg"} alt="Menu" />
                        </li>
                        <li><a href="/description">Description</a></li>
                        <li><a href="/maquettes">Wireframe</a></li>
                        <li><a href="/mockup">Mockup</a></li>
                        <li><a href="/flux">Flux</a></li>
                        <li><a href="/journal">Logbook</a></li>
                        <li className="active"><a href="/game">Game</a></li>
                    </ul>
                </nav>
            </header>

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
                            <source src={process.env.PUBLIC_URL + "/assets/resources/audio/Menu_Theme.mp3"} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>

                        <audio id="gameMusic" loop>
                            <source src={process.env.PUBLIC_URL + "/assets/resources/audio/Forest_Theme.mp3"} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </article>
                </section>
            </main>

            <footer>
                <img id="logo" src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/logo.png"} alt="Logo" />
            </footer>
        </>
    );
}
