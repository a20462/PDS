import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Viatura.css';

const Viatura = () => {
  const [carros, setCarros] = useState([]);
  const [filteredCarros, setFilteredCarros] = useState([]);
  const [form, setForm] = useState({
    id: '',
    marca: '',
    modelo: '',
    kms: '',
    combustivel: '',
    ano: '',
    caixa: '',
    img: '',
    garantia: '',
    preco: '',
    cor: '',
  });
  const [filters, setFilters] = useState({
    marca: '',
    modelo: '',
    anoDe: '',
    anoAte: '',
    combustivel: ''
  });
  const [isAdmin, setIsAdmin] = useState(true); // Simulação de verificação de administrador
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchCarros();
  }, []);

  const fetchCarros = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/carros');
      setCarros(response.data);
      setFilteredCarros(response.data);
    } catch (error) {
      console.error('Erro ao buscar os carros:', error);
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
    let filtered = carros;

    if (filters.marca) {
      filtered = filtered.filter(carro => carro.marca.toLowerCase().includes(filters.marca.toLowerCase()));
    }
    if (filters.modelo) {
      filtered = filtered.filter(carro => carro.modelo.toLowerCase().includes(filters.modelo.toLowerCase()));
    }
    if (filters.anoDe) {
      filtered = filtered.filter(carro => carro.ano >= filters.anoDe);
    }
    if (filters.anoAte) {
      filtered = filtered.filter(carro => carro.ano <= filters.anoAte);
    }
    if (filters.combustivel) {
      filtered = filtered.filter(carro => carro.combustivel.toLowerCase().includes(filters.combustivel.toLowerCase()));
    }

    setFilteredCarros(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      // Editar carro
      try {
        await axios.put(`http://localhost:2000/api/carros/${form.id}`, form);
        fetchCarros();
        setForm({
          id: '',
          marca: '',
          modelo: '',
          kms: '',
          combustivel: '',
          ano: '',
          caixa: '',
          img: '',
          garantia: '',
          preco: '',
          cor: '',
        });
        setIsEdit(false);
      } catch (error) {
        console.error('Erro ao editar o carro:', error);
      }
    } else {
      // Adicionar novo carro
      try {
        await axios.post('http://localhost:2000/api/carros', form);
        fetchCarros();
        setForm({
          id: '',
          marca: '',
          modelo: '',
          kms: '',
          combustivel: '',
          ano: '',
          caixa: '',
          img: '',
          garantia: '',
          preco: '',
          cor: '',
        });
      } catch (error) {
        console.error('Erro ao adicionar o carro:', error);
      }
    }
  };

  const handleEdit = (carro) => {
    setForm({ ...carro, id: carro._id });
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/carros/${id}`);
      fetchCarros();
    } catch (error) {
      console.error('Erro ao deletar o carro:', error);
    }
  };

  return (
    <div className="viatura-container">
      <h1>Gerenciamento de Carros</h1>
      {isAdmin && (
        <form onSubmit={handleSubmit} className="car-form">
          <input type="text" name="marca" value={form.marca} onChange={handleChange} placeholder="Marca" required />
          <input type="text" name="modelo" value={form.modelo} onChange={handleChange} placeholder="Modelo" required />
          <input type="number" name="kms" value={form.kms} onChange={handleChange} placeholder="KMs" required />
          <input type="text" name="combustivel" value={form.combustivel} onChange={handleChange} placeholder="Combustível" required />
          <input type="number" name="ano" value={form.ano} onChange={handleChange} placeholder="Ano" required />
          <input type="text" name="caixa" value={form.caixa} onChange={handleChange} placeholder="Caixa" required />
          <input type="text" name="img" value={form.img} onChange={handleChange} placeholder="Imagem URL" required />
          <input type="text" name="garantia" value={form.garantia} onChange={handleChange} placeholder="Garantia" required />
          <input type="number" name="preco" value={form.preco} onChange={handleChange} placeholder="Preço" required />
          <input type="text" name="cor" value={form.cor} onChange={handleChange} placeholder="Cor" required />
          <button type="submit">{isEdit ? 'Editar Carro' : 'Adicionar Carro'}</button>
        </form>
      )}

      <div className="filter-container">
        <input type="text" name="marca" value={filters.marca} onChange={handleFilterChange} placeholder="Marca" />
        <input type="text" name="modelo" value={filters.modelo} onChange={handleFilterChange} placeholder="Modelo" />
        <input type="number" name="anoDe" value={filters.anoDe} onChange={handleFilterChange} placeholder="Ano de" />
        <input type="number" name="anoAte" value={filters.anoAte} onChange={handleFilterChange} placeholder="Ano até" />
        <input type="text" name="combustivel" value={filters.combustivel} onChange={handleFilterChange} placeholder="Combustível" />
        <button onClick={handleFilter}>Pesquisar</button>
      </div>

      <h2>Lista de Carros</h2>
      <div className="car-grid">
        {filteredCarros.map((carro) => (
          <div key={carro._id} className="car-card">
            <img src={carro.img} alt={`${carro.marca} ${carro.modelo}`} />
            <div className="car-info">
              <h3>{carro.marca} {carro.modelo}</h3>
              <p>{carro.kms} KMs</p>
              <p>{carro.combustivel}</p>
              <p>{carro.ano}</p>
              <p>{carro.caixa}</p>
              <p>{carro.garantia}</p>
              <p>{carro.preco} €</p>
              <p>{carro.cor}</p>
              <p>{carro.dono?.nome || 'Sem dono'}</p>
              <Link to={`/carros/${carro._id}`} className="ver-mais-btn">Ver mais</Link>
              {isAdmin && (
                <div className="admin-actions">
                  <button onClick={() => handleEdit(carro)}>Editar</button>
                  <button onClick={() => handleDelete(carro._id)}>Deletar</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Viatura;
