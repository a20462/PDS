import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://localhost:3000/users/signup', {
                username,
                password,
            });
            alert(response.data.message);
            if (response.status === 200) {
                // Redirecionar após login bem-sucedido
                navigate('/Login');  
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <section className="vh-100 SignUp-section">
            <div className="container">
                <div className="SignUp-card">
                    <div className="SignUp-image">
                        <img
                            src="https://i.pinimg.com/originals/60/17/ae/6017ae2d8fcc560b97518219b621ac6c.jpg"
                            alt="SignUp form"
                        />
                    </div>
                    <div className="SignUp-form">
                        <h2>SCF Auto</h2>
                        <h5>Faça registo da sua conta.</h5>
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
                        <button type="button" onClick={handleSignUp}>
                            Registar
                        </button>
                        <a href="#!" className="small-text">Terms of use.</a>
                        <a href="#!" className="small-text">Privacy policy</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
