import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Oficina.css';

const Oficina = () => {
  const [form, setForm] = useState({
    tipo: '',
    nome: '',
    email: '',
    telemovel: '',
    estado: '',
    modelo: '',
    conta: '',
    observacoes: '',
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
        estado: '',
        modelo: '',
        conta: '',
        observacoes: '',
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
      <h1 className="mb-4">Oficina</h1>
      <form onSubmit={handleSubmit} className="service-booking">
        <div className="row">
          <div className="col-md-6 mb-3">
            <select name="tipo" value={form.tipo} onChange={handleChange} className="form-control" required>
              <option value="">Selecione o Tipo de Serviço</option>
              <option value="revisão">Revisão</option>
              <option value="reparação">Reparação</option>
              <option value="limpeza geral">Limpeza Geral</option>
              <option value="pintura">Pintura</option>
              <option value="substituição de vidro">Substituição de Vidro</option>
            </select>
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
            <input type="text" name="modelo" value={form.modelo} onChange={handleChange} className="form-control" placeholder="Modelo" required />
          </div>
          <div className="col-md-12 mb-3">
            <textarea name="observacoes" value={form.observacoes} onChange={handleChange} className="form-control" placeholder="Observações" rows="4"></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary submit-button">Adicionar Serviço</button>
      </form>
    </div>
  );
};

export default Oficina;
