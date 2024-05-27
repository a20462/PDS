import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Oficina.css'

const Oficina = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [form, setForm] = useState({
    id: '',
    tipo: '',
    nome: '',
    email: '',
    telemovel: '',
    estado: 'Pendente',
    modelo: '',
    conta: '',
  });
  const [filters, setFilters] = useState({
    tipo: '',
    nome: '',
    estado: '',
    modelo: ''
  });
  const [isAdmin, setIsAdmin] = useState(true); // Simulação de verificação de administrador
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/services');
      setServices(response.data);
      setFilteredServices(response.data);
    } catch (error) {
      console.error('Erro ao buscar os serviços:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFilter = () => {
    let filtered = services;

    if (filters.tipo) {
      filtered = filtered.filter(service => service.tipo.toLowerCase().includes(filters.tipo.toLowerCase()));
    }
    if (filters.nome) {
      filtered = filtered.filter(service => service.nome.toLowerCase().includes(filters.nome.toLowerCase()));
    }
    if (filters.estado) {
      filtered = filtered.filter(service => service.estado.toLowerCase().includes(filters.estado.toLowerCase()));
    }
    if (filters.modelo) {
      filtered = filtered.filter(service => service.modelo.toLowerCase().includes(filters.modelo.toLowerCase()));
    }

    setFilteredServices(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      // Editar serviço
      try {
        await axios.put(`http://localhost:2000/api/services/${form.id}`, form);
        fetchServices();
        setForm({
          id: '',
          tipo: '',
          nome: '',
          email: '',
          telemovel: '',
          estado: 'Pendente',
          modelo: '',
          conta: '',
        });
        setIsEdit(false);
      } catch (error) {
        console.error('Erro ao editar o serviço:', error);
      }
    } else {
      // Adicionar novo serviço
      try {
        await axios.post('http://localhost:2000/api/services', form);
        fetchServices();
        setForm({
          id: '',
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
    }
  };

  const handleEdit = (service) => {
    setForm({ ...service, id: service._id });
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Erro ao deletar o serviço:', error);
    }
  };

  return (
    <div className="service-management-container">
      <h1>Gerenciamento de Serviços</h1>
      {isAdmin && (
        <form onSubmit={handleSubmit} className="service-form">
          <input type="text" name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo de Serviço" required />
          <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do Cliente" required />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="telemovel" value={form.telemovel} onChange={handleChange} placeholder="Telemóvel" required />
          <input type="text" name="estado" value={form.estado} onChange={handleChange} placeholder="Estado" required />
          <input type="text" name="modelo" value={form.modelo} onChange={handleChange} placeholder="Modelo" required />
          <input type="number" name="conta" value={form.conta} onChange={handleChange} placeholder="Conta" required />
          <button type="submit">{isEdit ? 'Editar Serviço' : 'Adicionar Serviço'}</button>
        </form>
      )}

      <div className="filter-container">
        <input type="text" name="tipo" value={filters.tipo} onChange={handleFilterChange} placeholder="Tipo de Serviço" />
        <input type="text" name="nome" value={filters.nome} onChange={handleFilterChange} placeholder="Nome do Cliente" />
        <input type="text" name="estado" value={filters.estado} onChange={handleFilterChange} placeholder="Estado" />
        <input type="text" name="modelo" value={filters.modelo} onChange={handleFilterChange} placeholder="Modelo" />
        <button onClick={handleFilter}>Pesquisar</button>
      </div>

      <h2>Lista de Serviços</h2>
      <div className="service-grid">
        {filteredServices.map((service) => (
          <div key={service._id} className="service-card">
            <div className="service-info">
              <h3>{service.tipo}</h3>
              <p>{service.nome}</p>
              <p>{service.email}</p>
              <p>{service.telemovel}</p>
              <p>{service.estado}</p>
              <p>{service.modelo}</p>
              <p>{service.conta} €</p>
              {isAdmin && (
                <div className="admin-actions">
                  <button onClick={() => handleEdit(service)}>Editar</button>
                  <button onClick={() => handleDelete(service._id)}>Deletar</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Oficina;
