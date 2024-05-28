import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Viatura = ({ currentUser, cart, setCart }) => {
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
  const [isEdit, setIsEdit] = useState(false);

  const isAdmin = currentUser && currentUser.username === 'Admin';

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

  const addToCart = (carro) => {
    setCart([...cart, carro]);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Gerenciamento de Carros</h1>
      {isAdmin && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input type="text" name="marca" value={form.marca} onChange={handleChange} className="form-control" placeholder="Marca" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" name="modelo" value={form.modelo} onChange={handleChange} className="form-control" placeholder="Modelo" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="number" name="kms" value={form.kms} onChange={handleChange} className="form-control" placeholder="KMs" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" name="combustivel" value={form.combustivel} onChange={handleChange} className="form-control" placeholder="Combustível" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="number" name="ano" value={form.ano} onChange={handleChange} className="form-control" placeholder="Ano" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" name="caixa" value={form.caixa} onChange={handleChange} className="form-control" placeholder="Caixa" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" name="img" value={form.img} onChange={handleChange} className="form-control" placeholder="Imagem URL" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" name="garantia" value={form.garantia} onChange={handleChange} className="form-control" placeholder="Garantia" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="number" name="preco" value={form.preco} onChange={handleChange} className="form-control" placeholder="Preço" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" name="cor" value={form.cor} onChange={handleChange} className="form-control" placeholder="Cor" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">{isEdit ? 'Editar Carro' : 'Adicionar Carro'}</button>
        </form>
      )}

      <div className="mb-4">
        <h2>Filtrar Carros</h2>
        <div className="row">
          <div className="col-md-2 mb-3">
            <input type="text" name="marca" value={filters.marca} onChange={handleFilterChange} className="form-control" placeholder="Marca" />
          </div>
          <div className="col-md-2 mb-3">
            <input type="text" name="modelo" value={filters.modelo} onChange={handleFilterChange} className="form-control" placeholder="Modelo" />
          </div>
          <div className="col-md-2 mb-3">
            <input type="number" name="anoDe" value={filters.anoDe} onChange={handleFilterChange} className="form-control" placeholder="Ano de" />
          </div>
          <div className="col-md-2 mb-3">
            <input type="number" name="anoAte" value={filters.anoAte} onChange={handleFilterChange} className="form-control" placeholder="Ano até" />
          </div>
          <div className="col-md-2 mb-3">
            <input type="text" name="combustivel" value={filters.combustivel} onChange={handleFilterChange} className="form-control" placeholder="Combustível" />
          </div>
          <div className="col-md-2 mb-3">
            <button onClick={handleFilter} className="btn btn-secondary w-100">Pesquisar</button>
          </div>
        </div>
      </div>

      <h2>Lista de Carros</h2>
      <div className="row">
        {filteredCarros.map((carro) => (
<<<<<<< HEAD
          <div key={carro._id} className="col-md-4 mb-4">
            <div className="card">
              <img src={carro.img} className="card-img-top" alt={`${carro.marca} ${carro.modelo}`} />
              <div className="card-body">
                <h5 className="card-title">{carro.marca} {carro.modelo}</h5>
                <p className="card-text">{carro.kms} KMs</p>
                <p className="card-text">{carro.combustivel}</p>
                <p className="card-text">{carro.ano}</p>
                <p className="card-text">{carro.caixa}</p>
                <p className="card-text">{carro.garantia}</p>
                <p className="card-text">{carro.preco} €</p>
                <p className="card-text">{carro.cor}</p>
                <p className="card-text">{carro.dono?.nome || 'Sem dono'}</p>
                <Link to={`/carros/${carro._id}`} className="btn btn-primary">Ver mais</Link>
                {isAdmin && (
                  <div className="d-flex justify-content-between mt-2">
                    <button onClick={() => handleEdit(carro)} className="btn btn-warning">Editar</button>
                    <button onClick={() => handleDelete(carro._id)} className="btn btn-danger">Deletar</button>
                  </div>
                )}
              </div>
=======
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
              <button onClick={() => addToCart(carro)}>Adicionar ao Carrinho</button>
              {isAdmin && (
                <div className="admin-actions">
                  <button onClick={() => handleEdit(carro)}>Editar</button>
                  <button onClick={() => handleDelete(carro._id)}>Deletar</button>
                </div>
              )}
>>>>>>> eb55b7821188001f986bd5c038f9a8ba787258fc
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Viatura;
