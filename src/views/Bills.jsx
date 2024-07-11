import { Helmet } from "react-helmet";
import '../styles/bills.css';
function Bills() {
  
  return (
    <div>
        <Helmet>
            <title>Facturas</title>
        </Helmet>
        <h1>Bienvenido a las facturas</h1>

          <input
        type="text"
        placeholder="Buscar..."
      />
      
            <table>
              <thead>
                <tr>
                    <th>ID</th>
                    <th>No. bien</th>
                    <th>Cuenta Bancaria</th>
                    <th>NO. poliza</th>
                    <th>Persona</th>
                    <th>Costo unitario</th>
                    <th>RFC</th>
                    <th>Direccion</th>
                    <th>Tipo de Compra</th>
                    <th>Fecha de compra</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>12</td>
                    <td>123456789</td>
                    <td>2525</td>
                    <td>Moral</td>
                    <td>12.5</td>
                    <td>RETA030</td>
                    <td>De las gardenias #125</td>
                    <td>23232</td>
                    <td>01/04/2021</td>
                </tr>
                </tbody>
            </table>

      
      <p>Esta es la página de las facturas de la app.</p>
      {/* Aquí puedes agregar más contenido o funcionalidad según lo necesites */}
    </div>
  );
}

export default Bills;
