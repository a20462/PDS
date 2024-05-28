import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import ClienteRegistro from './ClienteRegisto';

const SignUp = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        nome: '',
        email: '',
        dataNascimento: '',
        telemovel: '',
        nif: ''
    });
    const [showClienteRegistro, setShowClienteRegistro] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:2000/api/users/signup', userData);
            alert(response.data.message);
            if (response.status === 200) {
                navigate('/ClienteRegisto');
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
        <div>
            {showClienteRegistro ? (
                <ClienteRegistro handleSignup={handleSignup} />
            ) : (
                <div>
                    <h2>Registo de Utilizador</h2>
                    <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
                    <button onClick={() => setShowClienteRegistro(true)}>Registar Cliente</button>
                </div>
            )}
        </div>
    );
};

export default SignUp;
