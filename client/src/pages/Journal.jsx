import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const logbookData = [
    { date: "14.03.2025", duration: "01:00", task: "Alignment meeting", author: "The team" },
    { date: "16.03.2025", duration: "04:00", task: "General organization of the project with files, GitHub creation and analyze of the structure of the given website example + CSS general layout with pictures.", author: "Marion Rossier" },
    { date: "20.03.2025", duration: "00:20", task: "Study about generation of noises using Java.", author: "Mégane Donnet-Monay" },
    { date: "21.03.2025", duration: "01:00", task: "Organisational meeting", author: "The team" },
    { date: "21.03.2025", duration: "02:00", task: "CSS, the responsive part + adjustments", author: "Marion Rossier" },
    { date: "23.03.2025", duration: "01:30", task: "Description page content", author: "Eric Sierro" },
    { date: "26.03.2025", duration: "01:00", task: "Addition of the logbook + corresponding CSS", author: "Marion Rossier" },
    { date: "27.03.2025", duration: "01:00", task: "Adjustment of the description page and the logbook page.", author: "Eric Sierro" },
    { date: "27.03.2025", duration: "02:00", task: "Mockup screenshots created and added to the page", author: "Valentin Guiraud" },
    { date: "27.03.2025", duration: "00:30", task: "Refactoring sequence diagram", author: "Marion Rossier and Mégane Donnet-Monay" },
    { date: "28.03.2025", duration: "03:00", task: "Adjustment responsive CSS + add Wireframe and diagrams", author: "Marion Rossier" },
    { date: "29.03.2025", duration: "01:00", task: "Customised mockup pictures using texture pack", author: "Valentin Guiraud" },
    { date: "31.03.2025", duration: "01:30", task: "Creation of a part of the game with random structure like labyrinth", author: "Marion Rossier" },
    { date: "03.04.2025", duration: "02:30", task: "Updated mockup pictures + several themes created for maps", author: "Valentin Guiraud" },
    { date: "04.04.2025", duration: "00:30", task: "Verifications and last CSS/HTML website adjustments.", author: "Marion Rossier" },
    { date: "11.04.2025", duration: "02:00", task: "Enemy creation with first movements + life creation", author: "Marion Rossier" },
    { date: "11.04.2025", duration: "02:00", task: "Hitbox creation, value detection with cursor movement.", author: "Eric Sierro" },
    { date: "14.04.2025", duration: "08:00", task: "Update enemy, life, add skin (enemy, life, cursor, way, outside, tree) with implementation", author: "Marion Rossier" },
    { date: "16.04.2025", duration: "02:00", task: "Creation of the game over, home, and level completion pages.", author: "Eric Sierro" },
    { date: "17.04.2025", duration: "00:40", task: "Team alignment meeting on Teams.", author: "The Team" },
    { date: "17.04.2025", duration: "04:30", task: "Add skin to cursor, improve enemies and their movements, lives and general visual", author: "Marion Rossier" },
    { date: "16.04.2025", duration: "04:00", task: "Adaptation of the cursor and detection to the game mechanics.", author: "Eric Sierro" },
    { date: "21.04.2025", duration: "01:15", task: "Creation of a hitbox for the enemies.", author: "Eric Sierro" },
    { date: "25.04.2025", duration: "05:00", task: "Cleaning of code structure, make skins available in all maps, creation of 3 new maps, resolution of visual and game bugs", author: "Marion Rossier" },
    { date: "27.04.2025", duration: "05:00", task: "Menu and buttons added to the game. User can interact with them.", author: "Valentin Guiraud" },
    { date: "27.04.2025", duration: "05:00", task: "Merge conflict resolution, menu corrections, cursor + score fixes", author: "Marion Rossier" },
    { date: "04.05.2025", duration: "06:00", task: "Menu and ingame state management implemented. Theme musics added.", author: "Valentin Guiraud" },
    { date: "07.05.2025", duration: "03:00", task: "6 remaining maps created with enemies and life. Cursor changes with location.", author: "Marion Rossier" }
];

export default function Journal() {
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
                        <li><Link to="/maquettes">Wireframe</Link></li>
                        <li><Link to="/mockup">Mockup</Link></li>
                        <li><Link to="/flux">Flux</Link></li>
                        <li className="active"><Link to="/journal">Logbook</Link></li>
                        <li><Link to="/game">Game</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="articles">
                    <article>
                        <header>
                            <h2>Logbook</h2>
                            <p>By Marion, the 04.04.2025</p>
                        </header>
                        <table>
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Duration</th>
                                <th>Task</th>
                                <th>Author</th>
                            </tr>
                            </thead>
                            <tbody>
                            {logbookData.map((entry, idx) => (
                                <tr key={idx}>
                                    <td>{entry.date}</td>
                                    <td>{entry.duration}</td>
                                    <td>{entry.task}</td>
                                    <td>{entry.author}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <p>
                            The application's source code is available at{" "}
                            <a href="https://github.com/marionrossier/Web-GameProject-P25-C.git/" target="_blank" rel="noreferrer">
                                project GitHub
                            </a>.
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
