import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nome: '',
    email: '',
    date: '',
    telemovel: '',
    nif: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/users/signup', formData);
      console.log('Signup successful:', response.data);
      // Redirecionar para outra página, mostrar uma mensagem de sucesso, etc.
    } catch (error) {
      console.error('Error signing up:', error);
      // Tratar o erro adequadamente, exibir uma mensagem de erro, etc.
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        <input type="tel" name="telemovel" placeholder="Telemovel" value={formData.telemovel} onChange={handleChange} />
        <input type="text" name="nif" placeholder="NIF" value={formData.nif} onChange={handleChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
