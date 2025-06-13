import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WPPage from "./components/WPPage";
import Navbar from "./components/Navbar";
import Game from "./components/Game";
import './styles/style.css';
import './styles/gameScreen.css';
import './styles/responsive.css';


const App = () => {
    return (

        <Router>
            <header>
                <h1 className="main-title">HES-SO Vs - 64-31 - Web Development</h1>
                <Navbar />
            </header>

            <Routes>
                <Route path="/" element={<Navigate to="/description" replace />} />
                <Route path="/description" element={<WPPage slug="description" />} />
                <Route path="/flux" element={<WPPage slug="flux" />} />
                <Route path="/logbook" element={<WPPage slug="logbook" />} />
                <Route path="/wireframe" element={<WPPage slug="wireframe" />} />
                <Route path="/mockup" element={<WPPage slug="mockup" />} />
                <Route path="/game" element={<Game />} />
                <Route path="*" element={<Navigate to="/description" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
