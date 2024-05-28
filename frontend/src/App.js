import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './pages/Sobre';
import Contact from './pages/Contato';
import Viatura from './pages/Viatura';
import Oficina from './pages/Oficina';
import Home from './pages/Home';
import CarroDetalhes from './pages/CarroDetalhes';
import './App.css';
import Fornecedores from './pages/Fornecedores';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import ClienteRegistro from './pages/ClienteRegisto';
import Carrinho from './pages/Carrinho';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);

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
        handleLogout();
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

  useEffect(() => {
    console.log('Current User:', currentUser);
    console.log('Is Admin:', isAdmin);
  }, [currentUser, isAdmin]);

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
            {!isAdmin && (
              <>
                <li>
                  <Link to="/viatura">Viatura</Link>
                </li>
                <li>
                  <Link to="/suporte">Suporte</Link>
                </li>
                <li>
                  <Link to="/sobre">Sobre Nós</Link>
                </li>
              </>
            )}
            {isLoggedIn && isAdmin && (
              <>
                <li>
                  <Link to="/fornecedores">Fornecedores</Link>
                </li>
                <li>
                  <Link to="/oficina">Oficina</Link>
                </li>
                <li>
                  <Link to="/viatura">Viatura</Link>
                </li>
              </>
            )}
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/oficina">Oficina</Link>
                </li>
                <li>
                  <Link to="/perfil">Perfil</Link>
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
            <li>
              <Link to="/carrinho">
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/viatura" element={<Viatura currentUser={currentUser} cart={cart} setCart={setCart} />} />
          <Route path="/fornecedores" element={isLoggedIn && isAdmin ? <Fornecedores /> : <Home />} />
          <Route path="/suporte" element={<Contact />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/carros/:id" element={<CarroDetalhes cart={cart} setCart={setCart} />} />
          <Route path="/oficina" element={isLoggedIn ? <Oficina /> : <Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cliente-registo" element={<ClienteRegistro />} />
          <Route
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route path="/perfil" element={<Perfil currentUser={currentUser} />} />
          <Route path="/carrinho" element={<Carrinho cart={cart} setCart={setCart} currentUser={currentUser} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
