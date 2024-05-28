import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Viatura.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [nome, setNome] = useState('');
  const [nif, setNIF] = useState('');
  const [iban, setIBAN] = useState('');
  const [telemovel, setTelemovel] = useState('');

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const fetchFornecedores = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/fornecedores');
      setFornecedores(response.data);
    } catch (error) {
      console.error('Erro ao buscar os fornecedores:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/fornecedores/${id}`);
      fetchFornecedores();
    } catch (error) {
      console.error('Erro ao deletar o fornecedor:', error);
    }
  };

  const handleAddFornecedor = async () => {
    try {
      await axios.post('http://localhost:2000/api/fornecedores', {
        nome,
        nif,
        iban,
        telemovel
      });
      setNome('');
      setNIF('');
      setIBAN('');
      setTelemovel('');
      fetchFornecedores();
    } catch (error) {
      console.error('Erro ao adicionar fornecedor:', error);
    }
  };

  return (
    <div className="container fornecedores-container">
      <h1>Gerenciamento de Fornecedores</h1>
      <div className="add-fornecedor">
        <h2>Adicionar Fornecedor</h2>
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">NIF:</label>
          <input type="text" value={nif} onChange={(e) => setNIF(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">IBAN:</label>
          <input type="text" value={iban} onChange={(e) => setIBAN(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Telemóvel:</label>
          <input type="text" value={telemovel} onChange={(e) => setTelemovel(e.target.value)} className="form-control" />
        </div>
        <button onClick={handleAddFornecedor} className="btn btn-primary">Adicionar Fornecedor</button>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Nome</th>
            <th>NIF</th>
            <th>IBAN</th>
            <th>Telemóvel</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(fornecedor => (
            <tr key={fornecedor._id}>
              <td>{fornecedor.nome}</td>
              <td>{fornecedor.nif}</td>
              <td>{fornecedor.iban}</td>
              <td>{fornecedor.telemovel}</td>
              <td>
                <Link to={`/editar-fornecedor/${fornecedor._id}`} className="btn btn-warning me-2">Editar</Link>
                <button onClick={() => handleDelete(fornecedor._id)} className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fornecedores;
