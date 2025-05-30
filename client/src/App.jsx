import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WPPage from "./components/WPPage";
import Navbar from "./components/Navbar";
import Game from "./components/Game";
import './styles/style.css';
import './styles/gameScreen.css';
import './styles/responsive.css';


const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<WPPage slug="description" />} />
                <Route path="/flux" element={<WPPage slug="flux" />} />
                <Route path="/logbook" element={<WPPage slug="logbook" />} />
                <Route path="/wireframe" element={<WPPage slug="wireframe" />} />
                <Route path="/mockup" element={<WPPage slug="mockup" />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </Router>
    );
};

export default App;
