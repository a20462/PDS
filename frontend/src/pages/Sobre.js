import React from 'react';
import './About.css'

function About() {
  return (
    <div>
      <section className="about-section">
        <p>
          A SCF, guiada pelo lema "The Pleasure of Driving", é mais do que um local de venda de veículos.
        </p>
        <img src="../carroAbout.png" alt="Carro About" />
      </section>
      <TeamSection />
    </div>
  );
}

function TeamSection() {
  return (
    <section className="team-section">
      <TeamMember role="Product Owner" name="Diogo Silva" />
      <TeamMember role="Scrum Master" name="João Salgado" />
      <TeamMember role="Developer" name="Nuno Costa" />
      <TeamMember role="Developer" name="Filipe Silva" />
      <TeamMember role="Developer" name="André Ferreira" />
    </section>
  );
}

function TeamMember({ role, name }) {
  return (
    <div className="team-member"> 
      <p>{role}<br/>{name}</p>
    </div>
  );
}

export default About;