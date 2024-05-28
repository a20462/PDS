import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Carrinho.css';

const Carrinho = ({ cart, setCart, currentUser }) => {
  const [isFinalizing, setIsFinalizing] = useState(false);

  const getTotal = () => {
    return cart.reduce((total, carro) => total + carro.preco, 0);
  };

  const handleRemove = (carroId) => {
    setCart(cart.filter(carro => carro._id !== carroId));
  };

  const handleFinalize = () => {
    setIsFinalizing(true);
  };

  const confirmPurchase = () => {
    // Lógica para confirmar a compra (envio para o servidor, etc.)
    alert('Compra finalizada com sucesso!');
    setCart([]);
    setIsFinalizing(false);
  };

  return (
    <div className="carrinho-container">
      <h1>Meu Carrinho</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="carrinho-lista">
          {cart.map(carro => (
            <div key={carro._id} className="carrinho-item">
              <img src={carro.img} alt={`${carro.marca} ${carro.modelo}`} />
              <div className="car-info">
                <h3>{carro.marca} {carro.modelo}</h3>
                <p>{carro.preco} €</p>
                <button onClick={() => handleRemove(carro._id)}>Remover</button>
              </div>
            </div>
          ))}
          <h2>Total: {getTotal()} €</h2>
          <button onClick={handleFinalize} disabled={isFinalizing}>Finalizar Compra</button>
          {isFinalizing && (
            <div className="finalizar-compra">
              <h3>Confirmar Compra</h3>
              <button onClick={confirmPurchase}>Confirmar</button>
              <button onClick={() => setIsFinalizing(false)}>Cancelar</button>
            </div>
          )}
        </div>
      )}
      <Link to="/viatura" className="continuar-comprando-btn">Continuar Comprando</Link>
    </div>
  );
};

export default Carrinho;
