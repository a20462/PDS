import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './pages/Sobre';
import Contact from './pages/Contato';
import Viatura from './pages/Viatura';
import Oficina from './pages/Oficina';
import Home from './pages/Home';
import CarroDetalhes from './pages/CarroDetalhes';
import './App.css';
import Fornecedores from './pages/Fornecedores';
import PedidosRecebidos from './pages/PedidosRecebidos';
import Signup from './pages/SignUp';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo">
          <Link to="/home">
          <img src="/images/logo.png" alt="SCF Logo" />
          </Link>
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
            <li>
              <Link to="/Fornecedores">Fornecedores</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/viatura" element={<Viatura />} />
          <Route path="/oficina" element={<Oficina />} />
          <Route path="/suporte" element={<Contact />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/carros/:id" element={<CarroDetalhes />} />
          <Route path="/Fornecedores" element={<Fornecedores />} />
          <Route path="/pedidos-recebidos" element={<PedidosRecebidos />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
