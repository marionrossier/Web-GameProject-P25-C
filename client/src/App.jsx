import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Description from './pages/Description';
import Flux from './pages/Flux';
import Journal from './pages/Journal';
import Maquettes from './pages/Maquettes';
import Mockup from './pages/Mockup';
import Game from './pages/Game'; // Ton composant unifié Game.jsx

function App() {
    return (
        <main>
            <Routes>
                {/* Redirection de la racine vers la vraie page d'accueil */}
                <Route path="/" element={<Navigate to="/description" />} />

                {/* Pages React */}
                <Route path="/description" element={<Description />} />
                <Route path="/flux" element={<Flux />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/maquettes" element={<Maquettes />} />
                <Route path="/mockup" element={<Mockup />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </main>
    );
}

export default App;
