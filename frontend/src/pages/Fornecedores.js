import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Viatura.css';

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);

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

  return (
    <div className="fornecedores-container">
      <h1>Gerenciamento de Fornecedores</h1>
      <Link to="/adicionar-fornecedor" className="adicionar-fornecedor-btn">Adicionar Fornecedor</Link>
      <table>
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
                <Link to={`/editar-fornecedor/${fornecedor._id}`}>Editar</Link>
                <button onClick={() => handleDelete(fornecedor._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fornecedores;
