import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Maquettes() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = process.env.PUBLIC_URL + "/assets/resources/js/script.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    return (
        <>
            <header>
                <h1>HES-SO Vs - 64-31 - Web Development</h1>
                <nav>
                    <ul>
                        <li className="hamburger">
                            <img src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/hamburger_icon.svg"} alt="menu" />
                        </li>
                        <li><Link to="/description">Description</Link></li>
                        <li className="active"><Link to="/maquettes">Wireframe</Link></li>
                        <li><Link to="/mockup">Mockup</Link></li>
                        <li><Link to="/flux">Flux</Link></li>
                        <li><Link to="/journal">Logbook</Link></li>
                        <li><Link to="/game">Game</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="articles">
                    <article>
                        <header>
                            <h2>Visual Wireframe of Mouse Rush</h2>
                            <p>By Marion, the 28.03.2025</p>
                        </header>
                        <div id="leftImage">
                            <img className="imageLeft" src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/maquette.jpg"} alt="Mockup" />
                        </div>

                        <p>
                            This wireframe illustrates a typical game level, where the player must move their mouse from the
                            <strong> starting point (START)</strong> to the <strong>end of the level (END)</strong> while avoiding obstacles.
                        </p>

                        <h3>Interactive Game Elements</h3>
                        <ul className="gameDescription">
                            <li><strong>The player character</strong>: blue arrow ("your mouse"), follows blue dots. May be an avatar or sprite.</li>
                            <li><strong>The walls</strong>: define the borders of the path. Contact = life loss.</li>
                            <li><strong>Remaining lives</strong>: red hearts shown top-left.</li>
                            <li><strong>Life bonus</strong>: extra heart on the path.</li>
                            <li><strong>Enemy</strong>: purple object to avoid; touching it causes penalties.</li>
                        </ul>

                        <h3>Decorative (Non-Interactive) Elements</h3>
                        <ul className="gameDescription">
                            <li><strong>Trees</strong>: only visual, no gameplay impact.</li>
                        </ul>

                        <h3>Objective and Progression</h3>
                        <ul className="gameDescription">
                            <li><strong>End of the level</strong>: triggers new map generation.</li>
                        </ul>

                        <p>
                            This project is part of our Business IT training. More info:{" "}
                            <a href="http://www.hevs.ch/" target="_blank" rel="noreferrer">http://www.hevs.ch/</a>
                        </p>
                        <p>
                            The source code is available on <a href="https://github.com/">GitHub</a>. Contact Marion Rossier for access.
                        </p>
                    </article>
                </section>
            </main>

            <footer>
                <img id="logo" src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/logo.png"} alt="logo" />
            </footer>
        </>
    );
}
