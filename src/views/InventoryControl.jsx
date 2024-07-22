import React from "react";
import { Link } from "react-router-dom";
import "../styles/InventoryControl.css";

function InventoryControl() {
  return (
    <div>
      <div className="container">
        <h3>¿Qué deseas hacer hoy?</h3> {/* Movemos el h3 aquí */}
        
        <div className="columns">

        <div className="column">
            <Link to="" className="card">
              <div className="content">
                <h1>Historial de Bajas</h1>
              </div>
            </Link>
            <Link to="" className="card">
              <div className="content">
                <h1>Mi Resguardo</h1>
              </div>
            </Link>

          </div>

          <div className="column">
            <Link to="" className="card">
              <div className="content">
                <h1>Alta de Bienes</h1>
              </div>
            </Link>
            <Link to="/factura" className="card">
              <div className="content">
                <h1>Facturas</h1>
              </div>
            </Link>
          </div>
          
          <div className="column">
            <Link to="/articulos/bajaBien" className="card">
              <div className="content">
                <h1>Baja de Bienes</h1>
              </div>
            </Link>
            <Link to="/poliza" className="card">
              <div className="content">
                <h1>Poliza</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryControl;