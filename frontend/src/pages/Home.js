import React, { useEffect } from 'react';
import './Home.css';

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.services, .vehicles');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('scrolled');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <img src="/images/background.png" alt="Background" className="background-image" />
        <div className="overlay">
          <h1 className="header-title">The pleasure of driving</h1>
          <img src="/images/logo.png" alt="SCF Logo" className="logo" />
        </div>
      </header>
      <main className="content">
        <section className="services">
          <h2>Nossos Serviços</h2>
          <p>Oferecemos uma gama completa de serviços de manutenção e reparação automóvel.</p>
        </section>
        <section className="vehicles">
          <h2>Veículos Disponíveis</h2>
          <p>Confira nossa seleção de veículos novos e usados de alta qualidade.</p>
        </section>
      </main>
    </div>
  );
}

export default Home;
