import { Helmet } from "react-helmet";
import QRCode from "react-qr-code";
import { useStockOut } from "../controllers/usestockOut";

function StockOut() {
  const { articulos, articulosAgregados, agregarCantidad, fechaFormateada, limpiarArticulosAgregados, eliminarArticulo } =
    useStockOut();

    const articulosInsumos = articulos.filter(articulo => articulo.type === "Insumos");

  return (
    <>
      <Helmet>
        <title>Salida de existentes</title>
      </Helmet>

      <input type="" placeholder="Buscar"></input>

      <input placeholder="Numero de trabajador"></input>

      <p style={{ textAlign: "center" }}>Tabla de articulos salientes</p>
      <button onClick={limpiarArticulosAgregados}>Limpiar tabla</button>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Total</th>
            <th>Cantidad A entregar</th>
            <th>Tipo de salida</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {articulosAgregados.map((articulo, index) => (
            <tr key={index}>
              <td>{fechaFormateada}</td>
              <td>{articulo.name}</td>
              <td> {articulo.cantidad} </td>
              <td>
                <select id="Tipodesalida">
                  <option value="">--- Seleccione ---</option>
                  <option value="Baja">Baja</option>
                  <option value="Robo">Robo</option>
                </select>
              </td>
              <td>
                <button onClick={() => eliminarArticulo(articulo.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "center" }}>Tabla de articulos existentes</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Fecha de adquisicion</th>
            <th>Numero de serie</th>
            <th>Status</th>
            <th>Descripcion</th>
            <th>Color</th>
            <th>Tipo</th> 
            <th>QR</th>
            <th>Agregar</th>
          </tr>
        </thead>
        <tbody>
          {articulosInsumos.map((articulo, index) => (
            <tr key={articulo.id ? articulo.id : index}>
              <td>{articulo.name}</td>
              <td>{articulo.brand}</td>
              <td>{articulo.model}</td>
              <td>{articulo.acquisition_date}</td>
              <td>{articulo.number_series}</td>
              <td>{articulo.status}</td>
              <td>{articulo.description}</td>
              <td>{articulo.caracteristics}</td>
              <td>{articulo.type}</td>
              <td>
                <div>
                  <QRCode value={articulo.QR} size={100} />
                </div>
              </td>
              <td>
                <button onClick={() => agregarCantidad(articulo)}>
                  Agregar 1
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StockOut;
