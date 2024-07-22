import { Link } from "react-router-dom";
import "/src/styles/inventoryScreen.css";

function InventoryScreen() {
  return (
    <div>
      <Link to="/factura">
        <div>
          <h1>Crear Factura</h1>
        </div>
      </Link>
      <Link to="/facturas">
        <div>
          <h1>Facturas</h1>
        </div>
      </Link>
      <Link to={"/entregaArticulo"}>
        <div>
          <h1>Entrega de bien a usuario</h1>
        </div>
      </Link>
      <Link to="/Bajadebien">
        <div>
          <h1>Baja de Bien</h1>
        </div>
      </Link>
      <Link>
        <div>
          <h1>Resguardo General</h1>
        </div>
      </Link>
      <Link>
        <div>
          <h1>Alta de Bienes</h1>
        </div>
      </Link>
      <Link>
        <div>
          <h1>Baja de Bienes</h1>
        </div>
      </Link>
    </div>
  );
}

export default InventoryScreen;
