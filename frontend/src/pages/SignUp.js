import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">SCF Auto</h2>
                <h5 className="text-center mb-4">Crie a sua conta.</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Utilizador"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="nome"
                      className="form-control"
                      placeholder="Nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="tel"
                      name="telemovel"
                      className="form-control"
                      placeholder="Telemovel"
                      value={formData.telemovel}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="nif"
                      className="form-control"
                      placeholder="NIF"
                      value={formData.nif}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Signup</button>
                </form>
                <div className="mt-4 text-center">
                  <a href="#!" className="small-text">Terms of use.</a>
                  <br />
                  <a href="#!" className="small-text">Privacy policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
