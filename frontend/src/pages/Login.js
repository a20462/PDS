import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:2000/users/login', {
                username,
                password,
            });
            console.log('Response from server:', response);
            alert(response.data.message);
            if (response.status === 200) {
                // Redirecionar após login bem-sucedido
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                console.log('Error response:', error.response);
                alert(error.response.data.message);
            } else {
                alert('An error occurred. Please try again.');
            }
        }
        
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
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button>
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