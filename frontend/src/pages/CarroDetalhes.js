import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CarroDetalhes.css';

const CarroDetalhes = () => {
  const { id } = useParams();
  const [carro, setCarro] = useState(null);

  useEffect(() => {
    const fetchCarro = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/carros/${id}`);
        setCarro(response.data);
      } catch (error) {
        console.error('Erro ao buscar o carro:', error);
      }
    };

    fetchCarro();
  }, [id]);

  if (!carro) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="carro-detalhes-container">
      <div className="carro-imagem">
        <img src={carro.img} alt={`${carro.marca} ${carro.modelo}`} />
      </div>
      <div className="carro-detalhes">
        <h2>{carro.marca} {carro.modelo}</h2>
        <p>{carro.kms} KMs</p>
        <p>{carro.combustivel}</p>
        <p>{carro.ano}</p>
        <p>{carro.caixa}</p>
        <p>{carro.garantia}</p>
        <p>{carro.preco} €</p>
        <p>{carro.cor}</p>
        <p>{carro.dono?.nome || 'Sem dono'}</p>
      </div>
    </div>
  );
};

export default CarroDetalhes;
