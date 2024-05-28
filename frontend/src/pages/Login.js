import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:2000/api/users/login', {
      username, // Certifique-se de que `username` corresponde ao nome do campo no backend
      password,
    });
    const userData = response.data;
    console.log('User Data:', userData); // Verifique o log da resposta do servidor
    handleLogin(userData); // Usar a função handleLogin para atualizar o estado do usuário
    navigate('/home');
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
