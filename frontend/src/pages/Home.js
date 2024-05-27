import React from 'react';
import './Home.css';

function Home() {
  return (
    <header className="header">
          <img src="/images/background.png" alt="Background" className="background-image" />
          <div className="overlay">
            <h1 className="header-title">The pleasure of driving</h1>
            <img src="/images/logo.png" alt="SCF Logo" />
        </div>
    </header>
  );
}

export default Home;
