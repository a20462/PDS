import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Viatura = () => {
  const [carros, setCarros] = useState([]);
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

  useEffect(() => {
    fetchCarros();
  }, []);

  const fetchCarros = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/carros');
      setCarros(response.data);
    } catch (error) {
      console.error('Erro ao buscar os carros:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
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
    <div>
      <h1>Gerenciamento de Carros</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{form.id ? 'Editar Carro' : 'Adicionar Carro'}</button>
      </form>

      <h2>Lista de Carros</h2>
      <ul>
        {carros.map((carro) => (
          <li key={carro._id}>
            {carro.marca} {carro.modelo} - {carro.kms} KMs
            <button onClick={() => handleEdit(carro)}>Editar</button>
            <button onClick={() => handleDelete(carro._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Viatura;
