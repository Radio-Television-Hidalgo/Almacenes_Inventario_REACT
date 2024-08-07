import React from "react";
import { Link } from "react-router-dom";

function ShoppingScreen() {
  return (
    <div>
      <div>
        <Link to="/controlCompras/compras">
          <h1>Compras</h1>
        </Link>
      </div>
      <div>
        <Link to="/solicitudMaterial">
          <h1>Finanzas</h1>
        </Link>
      </div>
      <div>
        <Link to="/solicitudMaterial">
          <h1>Planeacion</h1>
        </Link>
      </div>
    </div>
  );
}

export default ShoppingScreen;
