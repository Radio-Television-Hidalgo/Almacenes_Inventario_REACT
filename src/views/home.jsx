import React from 'react';
import '../styles/Home.css'; // Importamos el archivo CSS

function Home() {
  return (
    <div>

      <div className="home-container">
        <div className="home-content">
          <h1>Bienvenido al Inicio</h1>
          <p>Esta es la página de inicio de la aplicación.</p>
          <button className="learn-more-button">Aprender más</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
