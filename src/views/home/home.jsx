import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";

function Home() {
  return (
    <div>
      <div className="home-container">
        <h3>¿Qué deseas hacer hoy?</h3>
        <h2>Selecciona una Opcion</h2>
        <div className="home-columns">

        <div className="home-column">
            <Link to="/ControlInventario" className="home-card">
              <div className="home-content">
                <h1>Control de inventario</h1>
              </div>
            </Link>

          </div>

          <div className="home-column">
            <Link to="/usuario/misBienes" className="home-card">
              <div className="home-content">
                <h1>Mi resguardo</h1>
              </div>
            </Link>
            <Link to="/usuario/gestionUsuarios" className="home-card">
              <div className="home-content">
                <h1>Control de Usuarios</h1>
              </div>
            </Link>
          </div>
          <div className="home-column">
            <Link to="/solicitudMaterial" className="home-card">
              <div className="home-content">
                <h1>Solicitudes de Material</h1>
              </div>
            </Link>
            <Link to="/almacen" className="home-card">
              <div className="home-content">
                <h1>Almacen</h1>
              </div>
            </Link>
            <Link to="/inventario" className="home-card">
              <div className="home-content">
                <h1>Inventario</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
