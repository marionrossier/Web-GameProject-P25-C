import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => (
    <nav>
        <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Description</NavLink></li>
            <li><NavLink to="/flux" className={({ isActive }) => isActive ? "active" : ""}>Flux</NavLink></li>
            <li><NavLink to="/logbook" className={({ isActive }) => isActive ? "active" : ""}>Logbook</NavLink></li>
            <li><NavLink to="/wireframe" className={({ isActive }) => isActive ? "active" : ""}>Wireframe</NavLink></li>
            <li><NavLink to="/mockup" className={({ isActive }) => isActive ? "active" : ""}>Mockup</NavLink></li>
            <li><NavLink to="/game" className={({ isActive }) => isActive ? "active" : ""}>Game</NavLink></li>
        </ul>
    </nav>
);

export default Navbar;