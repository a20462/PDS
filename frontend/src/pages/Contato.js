import React from 'react';
import './Contato.css';

function Contact() {
  return (
    <section className="contact-section">
      <h2>Contacte-nos</h2>
      <p>
        Nossa equipe dedicada está pronta para fornecer assistência personalizada e garantir que suas necessidades sejam atendidas.
      </p>
      <div className="contact-content">
        <div className="contact-form">
          <p>
            Utilize o formulário abaixo ou as informações de contato fornecidas e permita-nos tornar sua interação conosco tão suave e agradável quanto a própria condução. Estamos ansiosos para ouvir de você!
          </p>
          <form>
            <div className="form-group">
              <input type="text" name="name" placeholder="Nome" />
              <input type="text" name="phone" placeholder="Tel." />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Mensagem"></textarea>
            </div>
            <button type="submit">Contacte-nos</button>
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
