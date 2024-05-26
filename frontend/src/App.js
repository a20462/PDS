import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './pages/Sobre';
import Contact from './pages/Contato';
import Viatura from './pages/Viatura';
import Oficina from './pages/Oficina';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo">
            <img src="/images/logo.png" alt="SCF Logo" />
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/viatura">Viatura</Link>
            </li>
            <li>
              <Link to="/oficina">Oficinas</Link>
            </li>
            <li>
              <Link to="/suporte">Suporte</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre Nos</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/viatura" element={<Viatura />} />
          <Route path="/oficina" element={<Oficina />} />
          <Route path="/suporte" element={<Contact />} />
          <Route path="/sobre" element={<About />} />
        </Routes>
        <header className="header">
          <img src="/images/background.png" alt="Background" className="background-image" />
          <div className="overlay">
            <h1 className="header-title">The pleasure of driving</h1>
            <img src="/path/to/car.png" alt="Car" className="car-image" />
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
