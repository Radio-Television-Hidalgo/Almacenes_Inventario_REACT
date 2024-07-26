import React from "react";
import { Link } from "react-router-dom";
import "../../styles/documentacion.css";

const Documentation = () => {
  return (
    <div className="container">
      <br />
      <main className="main-content">
        <h1>Documentación</h1>
        
        <div className="buttons-container">
          <Link to="/facturas" className="card button">
            <span className="icon">🚪</span>
            <span>Ver facturas</span>
          </Link>
          <Link to="/crearFactura" className="card button">
            <span className="icon">🚪</span>
            <span>Crear Facturas</span>
          </Link>
          <Link to="/crearPoliza" className="card button">
            <span className="icon">📄</span>
            <span>Crear Poliza</span>
          </Link>
          <Link to="/polizas" className="card button">
            <span className="icon">📂</span>
            <span>Ver polizas</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
