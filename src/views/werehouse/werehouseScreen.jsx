import React from "react";
import { Link } from "react-router-dom";

export default function WerehouseScreen() {
  return (
    <div>
      <Link>
        <div>
          <h1>Entrada de Bienes</h1>
        </div>
      </Link>
      <Link>
        <div>
          <h1>Salida de Bienes</h1>
        </div>
      </Link>
      <Link>
        <div>
          <h1>Historial de Salida de Bienes</h1>
        </div>
      </Link>
      <Link>
        <div>
          <h1>Recepcion de Solicitudes</h1>
        </div>
      </Link>
      <Link>
        <div>
          <h1>Entrada de Insumos</h1>
        </div>
      </Link>
      <Link>
        <div>
          <h1>Salida de Insumos</h1>
        </div>
      </Link>
      <Link to="/polizas" >
        <div>
          <h1>Ver Polizas</h1>
        </div>
      </Link>
    </div>
  );
}
