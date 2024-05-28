import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">SCF Auto</h2>
                <h5 className="text-center mb-4">Faça login com a sua conta.</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Utilizador"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                <div className="mt-4 text-center">
                  <p>
                    Ainda não tem conta? <Link to="/signup">Faça o registo aqui!</Link>
                  </p>
                  <a href="#!" className="small-text d-block">Terms of use.</a>
                  <a href="#!" className="small-text d-block">Privacy policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
