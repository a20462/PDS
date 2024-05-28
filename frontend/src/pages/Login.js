import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming you have a CSS file for styling

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
    navigate('/home');
  };

  return (
    <section className="vh-100 login-section">
      <div className="container">
        <div className="login-card">
          <div className="login-image">
            <img
              src="https://i.pinimg.com/originals/60/17/ae/6017ae2d8fcc560b97518219b621ac6c.jpg"
              alt="login form"
            />
          </div>
          <div className="login-form">
            <h2>SCF Auto</h2>
            <h5>Faça login com a sua conta.</h5>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="username"
                placeholder="Utilizador"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
            <p>
              Ainda não tem conta? <Link to="/signup">Faça o registo aqui!</Link>
            </p>
            <a href="#!" className="small-text">Terms of use.</a>
            <a href="#!" className="small-text">Privacy policy</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
