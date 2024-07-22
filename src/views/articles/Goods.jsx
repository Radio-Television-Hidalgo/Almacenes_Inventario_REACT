import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import '../../styles/Goods.css'; 


function Goods() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/articulos/bienesAdquiridos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data) => {
        setDatos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
<div>
  <h1>Bienes Adquiridos</h1>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Modelo</th>
        <th>Descripción</th>
        <th>Marca</th>
        <th>Número de serie</th>
        <th>Número de inventario</th>
        <th>Origen</th>
        <th>Foto</th>
        <th>Ubicación</th>
        <th>Depreciación</th>
        <th>Valor</th>
        <th>QR</th>
      </tr>
    </thead>
    <tbody>
      {datos.map((dato) => (
        <tr key={dato.id}>
          <td>{dato.name}</td>
          <td>{dato.model}</td>
          <td>{dato.description}</td>
          <td>{dato.brand}</td>
          <td>{dato.number_series}</td>
          <td>{dato.inventory_number}</td>
          <td>{dato.origin}</td>
          <td>
            <img
              src={dato.photos_entry ? dato.photos_entry.split(",")[0] : ""}
              alt={`Foto de ${dato.name}`}
              width="100"
            />
          </td>
          <td>{dato.ubication}</td>
          <td>{dato.accumulated_depreciation}</td>
          <td>{dato.value}</td>
          <td>
            <QRCode className="qr-code" value={dato.QR} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default Goods;
