import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Description() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = process.env.PUBLIC_URL + "/assets/resources/js/script.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <header>
                <h1>HES-SO Vs - 64-31 - Web Development</h1>
                <nav>
                    <ul>
                        <li className="hamburger">
                            <img src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/hamburger_icon.svg"}
                                 alt="menu"/>
                        </li>
                        <li className="active"><Link to="/description">Description</Link></li>
                        <li><Link to="/maquettes">Wireframe</Link></li>
                        <li><Link to="/mockup">Mockup</Link></li>
                        <li><Link to="/flux">Flux</Link></li>
                        <li><Link to="/journal">Logbook</Link></li>
                        <li><Link to="/game">Game</Link></li>
                    </ul>
                </nav>
            </header>

            <main id="description">
                <section id="articles">
                    <article>
                        <header>
                            <h2>Mouse Rush - Game Description</h2>
                            <p>By Eric, the 23.03.2025</p>
                        </header>

                        <h3>Welcome to <em>Mouse Rush</em></h3>
                        <p>Precision, speed, and nerves of steel — that's all you'll need.</p>

                        <p><em>Mouse Rush</em> is a 2D skill-based browser game where every move matters. Using only your mouse,
                            your goal is simple... or so it seems: reach the finish without touching the edges. But be warned —
                            the further you go, the harder it gets!</p>

                        <h3>A simple concept... dangerously addictive !</h3>
                        <ul className="gameDescription">
                            <li><strong>Guide</strong> your cursor through increasingly tricky mazes.</li>
                            <li><strong>Touch a wall ?</strong> You lose a life. Lose them all, and it's game over.</li>
                            <li><strong>Race against the clock</strong> to beat your personal best.</li>
                        </ul>

                        <h3>Game Features</h3>
                        <ul className="gameFeatures">
                            <li><strong>Mouse-only gameplay</strong> : Intuitive, smooth, and fast-paced.</li>
                            <li><strong>Progressive levels</strong> : Each new stage introduces tougher layouts and new obstacles.</li>
                            <li><strong>Unique worlds</strong> : Explore multiple themed maps like enchanted forests, space stations, and ancient ruins.</li>
                            <li><strong>Life system</strong> : Limited lives per level — stay sharp!</li>
                            <li><strong>Built-in timer</strong> : Track your time down to the millisecond.</li>
                        </ul>

                        <h3>Why Play ?</h3>
                        <p>Because it's fun, fast, a little frustrating (in a good way), and incredibly satisfying
                            when you beat your own record. Whether you're a future speedrunner or just love a good challenge,
                            <em> Mouse Rush</em> is made for you.</p>

                        <p>The game will be available very soon at the following link:
                            <a href="https://github.com/marionrossier/Web-GameProject-P25-C.git" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </p>
                    </article>
                </section>

                <aside>
                    <div>
                        <h3>Information sheet</h3>
                        <ul>
                            <li><p><strong>Donnet-Monay Mégane</strong> : Project member</p></li>
                            <li><p><strong>Sierro Eric</strong> : Project member</p></li>
                            <li><p><strong>Valentin Guiraud</strong> : Project member</p></li>
                            <li><p><strong>Rossier Marion</strong> : Project member</p></li>
                        </ul>
                    </div>
                </aside>
            </main>

            <footer>
                <img id="logo" src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/logo.png"} alt="Logo" />
            </footer>
        </>
    );
}
