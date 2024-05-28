import React, { useState } from 'react';
import axios from 'axios';
import './Contato.css';

function Contact() {
  const [pedido, setPedido] = useState({
    nome: '',
    email: '',
    telefone: '',
    descricao: ''
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido(prevPedido => ({
      ...prevPedido,
      [name]: value
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2000/api/pedidos', pedido); // Atualize a URL para corresponder à sua API
      alert('Pedido enviado com sucesso!');
      setPedido({
        nome: '',
        email: '',
        telefone: '',
        descricao: ''
      });
    } catch (error) {
      console.error('Erro ao enviar o pedido:', error);
      alert('Erro ao enviar o pedido. Por favor, tente novamente.');
    }
  };
  

  return (
    <section className="contact-section">
      <h2>Contacte-nos</h2>
      <p>
        Nossa equipe dedicada está pronta para fornecer assistência personalizada e garantir que suas necessidades sejam atendidas.
      </p>
      <div className="contact-content">
        <div className="contact-form">
          <p>
            Utilize o formulário abaixo para enviar seu pedido de fornecedor. Estamos ansiosos para ajudá-lo!
          </p>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="nome" value={pedido.nome} onChange={handleChange} placeholder="Nome" required />
            <input type="text" name="telefone" value={pedido.telefone} onChange={handleChange} placeholder="Telefone" />
          </div>
          <div className="form-group">
            <input type="email" name="email" value={pedido.email} onChange={handleChange} placeholder="Email" />
          </div>
          <div className="form-group">
            <textarea name="descricao" value={pedido.descricao} onChange={handleChange} placeholder="Descreva seu pedido de fornecedor" required></textarea>
          </div>
            <button type="submit">Enviar Pedido</button>
          </form>
        </div>
        <div className="contact-info">
          <p><strong>Telefone</strong><br />+351 xxx xxx xxx</p>
          <p><strong>Email</strong><br />suporte@scf.com</p>
          <p><strong>Morada</strong><br />Rua xyz, Barcelos</p>
          <p><strong>Horário de funcionamento</strong><br />09:00 - 12:30 / 14:00 - 18:30</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
