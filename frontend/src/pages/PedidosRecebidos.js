import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PedidosRecebidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/fornecedores');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao buscar os pedidos:', error);
    }
  };

  return (
    <div>
      <h2>Pedidos Recebidos</h2>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido._id}>
            <strong>Nome:</strong> {pedido.nome}<br />
            <strong>Descrição:</strong> {pedido.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PedidosRecebidos;
