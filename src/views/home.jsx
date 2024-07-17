import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link
import '../styles/Home.css'; // Importamos el archivo CSS

function Home() {
  return (
    <div>
      <div className="home-container">
        <h3>¿Qué deseas hacer hoy?</h3> {/* Movemos el h3 aquí */}
        
        <div className="home-columns">

        <div className="home-column">
            <Link to="/ControlInventario" className="home-card">
              <div className="home-content">
                <h1>Control de inventario</h1>
              </div>
            </Link>

          </div>

          <div className="home-column">
            <Link to="/mi-resguardo" className="home-card">
              <div className="home-content">
                <h1>Mi resguardo</h1>
              </div>
            </Link>
            <Link to="/solicitud" className="home-card">
              <div className="home-content">
                <h1>Solicitud</h1>
              </div>
            </Link>
          </div>
          
          <div className="home-column">
            <Link to="/resguardo" className="home-card">
              <div className="home-content">
                <h1>Resguardo</h1>
              </div>
            </Link>
            <Link to="/almacen" className="home-card">
              <div className="home-content">
                <h1>Almacen</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
