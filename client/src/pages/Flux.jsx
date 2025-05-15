import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Flux() {
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
                            <img src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/hamburger_icon.svg"}
                                 alt="menu"/>
                        </li>
                        <li><Link to="/description">Description</Link></li>
                        <li><Link to="/maquettes">Wireframe</Link></li>
                        <li><Link to="/mockup">Mockup</Link></li>
                        <li className="active"><Link to="/flux">Flux</Link></li>
                        <li><Link to="/journal">Logbook</Link></li>
                        <li><Link to="/game">Game</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="articles">
                    <article>
                        <header>
                            <h2>Project sitemap and flux</h2>
                            <p>By Mégane, the 27.03.2025</p>
                        </header>
                        <img className="Diagrams" src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/diagramSequence.png"} alt="Diagram sequence" />
                        <br />
                        <img className="Diagrams" src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/diagram2.png"} alt="Diagram 2" />
                    </article>
                </section>
            </main>

            <footer>
                <img id="logo" src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/logo.png"} alt="logo" />
            </footer>
        </>
    );
}
