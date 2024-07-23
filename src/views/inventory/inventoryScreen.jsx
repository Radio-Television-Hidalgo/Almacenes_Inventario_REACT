
import React from "react";
import { Link } from "react-router-dom";
import "/src/styles/inventoryScreen.css";

function InventoryScreen() {
  return (

    
    <div> 
      <br />
  <div className="home-columns">
      <div className="home-column">
      <Link to="/facturas" className="home-card">
        <div className="home-content">
          <h1>Facturas</h1>
        </div>
      </Link>
      < Link to="/factura" className="home-card">
      <div className="home-content">
        <h1>Crear Factura</h1>
      </div>
      </Link>
      <Link to={"/entregaArticulo"} className="home-card">
        <div className="home-content">
          <h1>Entrega de bien a usuario</h1>
        </div>
      </Link>
      <Link to="/Bajadebien" className="home-card">
        <div className="home-content">
          <h1>Baja de Bien</h1>
        </div>
      </Link>
      </div>



      <div className="home-column">
      

      <Link className="home-card">
        <div className="home-content">
          <h1>Resguardo General</h1>
        </div>
      </Link>
      <Link className="home-card">
        <div className="home-content">
          <h1>Alta de Bienes</h1>
        </div>
      </Link>
      <Link className="home-card">
        <div className="home-content">
          <h1>Baja de Bienes</h1>
        </div>
      </Link>
      <Link className="home-card" to="/inventarios/usuario">
      <div className="home-content">
        <h1>inventarios de Usuario</h1>
        </div></Link>


      </div>
      
      
    </div>
    </div>
  );
}

export default InventoryScreen;
