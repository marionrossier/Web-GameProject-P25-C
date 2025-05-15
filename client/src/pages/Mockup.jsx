import React, { useEffect } from 'react';

export default function Mockup() {
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
                            <img src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/hamburger_icon.svg"} alt="Hamburger menu icon" />
                        </li>
                        <li><a href="/description">Description</a></li>
                        <li><a href="/maquettes">Wireframe</a></li>
                        <li className="active"><a href="/mockup">Mockup</a></li>
                        <li><a href="/flux">Flux</a></li>
                        <li><a href="/journal">Logbook</a></li>
                        <li><a href="/game">Game</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="articles">
                    <article>
                        <header>
                            <h2>Screenshots of the Game "Mouse Rush"</h2>
                            <p>By Valentin, the 03.04.2025</p>
                            <p>Here are the different stages of the user experience in the game, from the main menu to the death screen.</p>
                        </header>

                        <section className="screenshots">
                            {[
                                { title: "Main Menu", file: "Menu.png", desc: "The game's home screen, where players can choose to play or view instructions." },
                                { title: "Instructions", file: "Instructions.png", desc: "The instructions explain the game rules." },
                                { title: "Play", file: "Play.png", desc: "Face the mazes in increasingly complicated worlds." },
                                { title: "Play - Timer", file: "Timer.png", desc: "Track the time for each race live to compare your performance." },
                                { title: "Play - Fog", file: "Fog.png", desc: "As you progress, the difficulty increases, and you will find yourself in a fog, limiting your view." },
                                { title: "Death Screen", file: "Death.png", desc: "The screen displayed when a player touches a wall, with options to continue or return to the menu." },
                                { title: "Themed maps - Dungeon", file: "Theme-Dungeon.png", desc: "Dungeon-themed environment with dark visuals." },
                                { title: "Desert", file: "Theme-Desert.png", desc: "Desert-themed map with sandy textures." }
                            ].map(({ title, file, desc }, idx) => (
                                <div className="screenshot-item" key={idx}>
                                    <h3>{title}</h3>
                                    <img
                                        src={process.env.PUBLIC_URL + `/assets/resources/images/WebSite/mockup/${file}`}
                                        alt={title}
                                    />
                                    <p>{desc}</p>
                                </div>
                            ))}
                        </section>
                    </article>
                </section>
            </main>

            <footer>
                <img id="logo" src={process.env.PUBLIC_URL + "/assets/resources/images/WebSite/logo.png"} alt="HES-SO logo" />
            </footer>
        </>
    );
}
