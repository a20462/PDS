import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Oficina = () => {
  const [form, setForm] = useState({
    tipo: '',
    nome: '',
    email: '',
    telemovel: '',
    estado: 'Pendente',
    modelo: '',
    conta: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2000/api/services', form);
      alert('Serviço adicionado com sucesso!');
      setForm({
        tipo: '',
        nome: '',
        email: '',
        telemovel: '',
        estado: 'Pendente',
        modelo: '',
        conta: '',
      });
    } catch (error) {
      console.error('Erro ao adicionar o serviço:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Adicionar Serviço</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input type="text" name="tipo" value={form.tipo} onChange={handleChange} className="form-control" placeholder="Tipo de Serviço" required />
          </div>
          <div className="col-md-6 mb-3">
            <input type="text" name="nome" value={form.nome} onChange={handleChange} className="form-control" placeholder="Nome do Cliente" required />
          </div>
          <div className="col-md-6 mb-3">
            <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Email" required />
          </div>
          <div className="col-md-6 mb-3">
            <input type="text" name="telemovel" value={form.telemovel} onChange={handleChange} className="form-control" placeholder="Telemóvel" required />
          </div>
          <div className="col-md-6 mb-3">
            <input type="text" name="estado" value={form.estado} onChange={handleChange} className="form-control" placeholder="Estado" required />
          </div>
          <div className="col-md-6 mb-3">
            <input type="text" name="modelo" value={form.modelo} onChange={handleChange} className="form-control" placeholder="Modelo" required />
          </div>
          <div className="col-md-6 mb-3">
            <input type="number" name="conta" value={form.conta} onChange={handleChange} className="form-control" placeholder="Conta" required />
          </div>
          </div>
        <button type="submit" className="btn btn-primary">Adicionar Serviço</button>
      </form>
    </div>
  );
};

export default Oficina;
