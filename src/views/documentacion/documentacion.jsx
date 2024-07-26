import React from "react";

import "../../styles/documentacion.css";
import { Link } from "react-router-dom";

const Documentation = () => {
  return (
    <div className="container">
      <main className="main-content">
        <h1>Documentación</h1>
        <tr></tr>
        <div className="buttons-container">
          <Link to="/facturas" className="dropdown-item button">
            <span className="icon">🚪</span>
            <span>Ver facturas</span>
          </Link>
          <Link to="/crearFactura" className="dropdown-item button">
            <span className="icon">🚪</span>
            <span>Crear Facturas</span>
          </Link>
          <Link to="/crearPoliza" className="dropdown-item button">
            <span className="icon">📄</span>
            <span>Crear Poliza</span>
          </Link>
          <Link to="/polizas" className="dropdown-item button">
            <span className="icon">📂</span>
            <span>Ver polizas</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
