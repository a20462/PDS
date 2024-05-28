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
    <section className="vh-100 signup-section">
      <div className="container">
        <div className="signup-card">
          <div className="signup-image">
            <img
              //src="https://i.pinimg.com/originals/60/17/ae/6017ae2d8fcc560b97518219b621ac6c.jpg"
              //alt="signup form"
            />
          </div>
          <div className="signup-form">
            <h2>SCF Auto</h2>
            <h5>Crie a sua conta.</h5>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Utilizador"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="telemovel"
                placeholder="Telemovel"
                value={formData.telemovel}
                onChange={handleChange}
              />
              <input
                type="text"
                name="nif"
                placeholder="NIF"
                value={formData.nif}
                onChange={handleChange}
              />
              <button type="submit">Signup</button>
            </form>
            <a href="#!" className="small-text">Terms of use.</a>
            <a href="#!" className="small-text">Privacy policy</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
