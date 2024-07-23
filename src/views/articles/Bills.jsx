import React from 'react';
import { Helmet } from "react-helmet";
import '../../styles/bills.css';

function Bills() {
  return (
    <div className="bills-container">
      <Helmet>
        <title>Facturas</title>
      </Helmet>
      <h1 className="bills-title">Bienvenido a las facturas</h1>

      <input
        type="text"
        placeholder="Buscar..."
        className="bills-search"
      />

      <div className="bills-table">
        <div className="bills-row bills-header">
          <div>ID</div>
          <div>No. bien</div>
          <div>Cuenta Bancaria</div>
          <div>No. poliza</div>
          <div>Persona</div>
          <div>Costo unitario</div>
          <div>RFC</div>
          <div>Dirección</div>
          <div>Tipo de Compra</div>
          <div>Fecha de compra</div>
        </div>
        <div className="bills-row">
          <div>1</div>
          <div>12</div>
          <div>123456789</div>
          <div>2525</div>
          <div>Moral</div>
          <div>12.5</div>
          <div>RETA030</div>
          <div>De las gardenias #125</div>
          <div>Directa</div>
          <div>01/04/2021</div>
        </div>
      </div>

      <p className="bills-footer">Esta es la página de las facturas de la app.</p>
    </div>
  );
}

export default Bills;
