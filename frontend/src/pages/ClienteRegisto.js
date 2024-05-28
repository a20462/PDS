import React, { useState } from 'react';
import axios from 'axios';

const ClienteRegistro = ({ handleSignup }) => {
  const [clienteData, setClienteData] = useState({
    nome: '',
    email: '',
    date: '',
    telemovel: '',
    nif: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteData({
      ...clienteData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:2000/api/clientes', clienteData);
      handleSignup(); // Chame a função de retorno de chamada sem argumentos se a solicitação for bem-sucedida
    } catch (error) {
      console.error('Erro ao registrar cliente:', error);
      
    }
  };

  return (
    <div className="registro-container">
      <h2>Registo de Cliente</h2>
      <div>
        <label>Nome:</label>
        <input type="text" name="nome" value={clienteData.nome} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={clienteData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input type="date" name="date" value={clienteData.date} onChange={handleChange} />
      </div>
      <div>
        <label>Telemovel:</label>
        <input type="tel" name="telemovel" value={clienteData.telemovel} onChange={handleChange} />
      </div>
      <div>
        <label>NIF:</label>
        <input type="text" name="nif" value={clienteData.nif} onChange={handleChange} />
      </div>
      <button onClick={handleSubmit}>Registar</button>
    </div>
  );
};

export default ClienteRegistro;
