import React from 'react';
import './About.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  return (
    <div className="container about-container">
      <div className="row">
        <div className="col-md-6 about-text">
          <p>
            A SCF, guiada pelo lema "The Pleasure of Driving", é mais do que um local de venda de veículos.
          </p>
        </div>
        <div className="col-md-6 about-image">
          <img src="/images/carroAbout.png" alt="SCF Logo" className="img-fluid" />
        </div>
      </div>
      <TeamSection />
    </div>
  );
}

function TeamSection() {
  return (
    <section className="team-section">
      <div className="row">
        <div className="col">
          <TeamMember role="Scrum Master" name="João Salgado" />
        </div>
        <div className="col">
          <TeamMember role="Developer" name="Nuno Costa" />
        </div>
        <div className="col">
          <TeamMember role="Developer" name="Filipe Silva" />
        </div>
        <div className="col">
          <TeamMember role="Developer" name="André Ferreira" />
        </div>
      </div>
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
