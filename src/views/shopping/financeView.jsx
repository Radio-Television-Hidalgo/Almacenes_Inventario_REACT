import React from "react";
import { Link } from "react-router-dom";
import "../../styles/documentacion.css";

const FinanceView = () => {
  return (
    <div className="documentacion-container">
      
      <main className="main-content">
      <h4>¿Qué deseas hacer hoy?</h4>
      <h2>Selecciona una opción</h2>
        
        <div className="documentacion-columns">
          <div className="documentacion-column documentacion-column-left">
            <Link to="/crearPoliza" className="documentacion-card button card-left">
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                </svg>
                <h1 className="h1-mini">Crear póliza</h1>
              </span>
            </Link>
          </div>
          <div className="documentacion-column documentacion-column-right">

            <Link to="/polizas" className="documentacion-card button card-right">
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-file-earmark-ruled-fill" viewBox="0 0 16 16">
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M3 9h10v1H6v2h7v1H6v2H5v-2H3v-1h2v-2H3z"/>
                </svg>
                <h1 className="h1-mini">Ver pólizas</h1>
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};


export default FinanceView;

