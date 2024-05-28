import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
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
import Perfil from './pages/Perfil';
import ClienteRegistro from './pages/ClienteRegisto';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (loggedIn && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setCurrentUser(parsedUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Erro ao parsear o usuário armazenado:', error);
        handleLogout(); // Limpar dados inválidos do localStorage
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  };

  const isAdmin = currentUser && currentUser.username === 'Admin';

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
              <Link to="/Fornecedores">Fornecedores</Link>
            </li>
            <li>
              <Link to="/suporte">Suporte</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre Nos</Link>
            </li>
            {isLoggedIn && isAdmin && (
              <li>
                <Link to="/Oficina">Oficina</Link>
              </li>
            )}
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/Perfil">Perfil</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/viatura" element={<Viatura />} />
          <Route path="/Fornecedores" element={<Fornecedores />} />
          <Route path="/suporte" element={<Contact />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/carros/:id" element={<CarroDetalhes />} />
          {isLoggedIn && isAdmin && (
            <Route path="/Oficina" element={<Oficina />} />
          )}
          <Route path="/pedidos-recebidos" element={<PedidosRecebidos />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ClienteRegisto" element={<ClienteRegistro />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />}
          />
          <Route path="/Perfil" element={<Perfil currentUser={currentUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
