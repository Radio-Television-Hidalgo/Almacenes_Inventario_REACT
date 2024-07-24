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
      <div className="goods-table">
        <div className="goods-header goods-row">
          <div>Nombre</div>
          <div>Modelo</div>
          <div>Descripción</div>
          <div>Marca</div>
          <div>Número de serie</div>
          <div>Número de inventario</div>
          <div>Origen</div>
          <div>Foto</div>
          <div>Ubicación</div>
          <div>Depreciación</div>
          <div>Valor</div>
          <div>QR</div>
        </div>
        {datos.map((dato) => (
          <div className="goods-row" key={dato.id}>
            <div>{dato.name}</div>
            <div>{dato.model}</div>
            <div>{dato.description}</div>
            <div>{dato.brand}</div>
            <div>{dato.number_series}</div>
            <div>{dato.inventory_number}</div>
            <div>{dato.origin}</div>
            <div>
              <img
                src={dato.photos_entry ? dato.photos_entry.split(",")[0] : ""}
                alt={`Foto de ${dato.name}`}
                width="100"
              />
            </div>
            <div>{dato.ubication}</div>
            <div>{dato.accumulated_depreciation}</div>
            <div>{dato.value}</div>
            <div>
              <QRCode className="qr-code" value={dato.QR} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Goods;
