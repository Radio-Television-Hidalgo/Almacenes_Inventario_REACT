import { useEffect, useState } from "react";
import "/src/styles/BienTable.css";

function BienTable() {
  const [bienes, setBienes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/articulos?type=Bien")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (bien) =>
            bien.articleWarehouses &&
            bien.articleWarehouses.length > 0 &&
            bien.articleWarehouses[0].inventory_number
        );
        setBienes(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching bienes:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredBienes = bienes.filter(
    (bien) =>
      !search ||
      (bien.description &&
        bien.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por descripcion"
        value={search}
        onChange={handleSearch}
        className="search-input"
      />
      <table className="style-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Número de Inventario</th>
            <th>Fotos</th>
          </tr>
        </thead>
        <tbody>
          {filteredBienes.map((bien) => (
            <tr key={bien.id}>
              <td>{bien.name}</td>
              <td className="descripcion">{bien.description}</td>
              <td>
                {bien.articleWarehouses && bien.articleWarehouses.length > 0
                  ? bien.articleWarehouses[0].quantity
                  : "N/A"}
              </td>
              <td>
                {bien.articleWarehouses && bien.articleWarehouses.length > 0
                  ? bien.articleWarehouses[0].inventory_number
                  : "N/A"}
              </td>
              <td>
                {bien.photos_entry &&
                  bien.photos_entry.split(",").map((photo, index) => (
                    <img
                      key={index}
                      src={`/api/uploads/${photo}`}
                      alt="Foto del bien"
                      className="photo"
                    />
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BienTable;
