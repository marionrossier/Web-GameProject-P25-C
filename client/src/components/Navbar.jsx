import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
    <nav>
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: "1em" }}>
            <li><Link to="/">Description</Link></li>
            <li><Link to="/flux">Flux</Link></li>
            <li><Link to="/logbook">Logbook</Link></li>
            <li><Link to="/wireframe">Wireframe</Link></li>
            <li><Link to="/mockup">Mockup</Link></li>
            <li><Link to="/game">Game</Link></li>
        </ul>
    </nav>
);

export default Navbar;
