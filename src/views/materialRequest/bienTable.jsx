import { useEffect, useState } from "react";
import "/src/styles/BienTable.css";

function BienTable({ onAddArticle }) {
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
      (bien.name && bien.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <h2>Bienes</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={search}
          onChange={handleSearch}
        />
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Número de Inventario</th>
              <th>Fotos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredBienes.map((bien) => (
              <tr key={bien.id}>
                <td>{bien.id}</td>
                <td>{bien.name}</td>
                <td>{bien.description}</td>
                <td>
                  {bien.articleWarehouses && bien.articleWarehouses.length > 0
                    ? bien.articleWarehouses[0].quantity
                    : "N/A"}
                </td>
                <td>
                  {bien.articleWarehouses &&
                    bien.articleWarehouses.length > 0 &&
                    bien.articleWarehouses[0].inventory_number}
                </td>
                <td>
                  {bien.photos_entry &&
                    bien.photos_entry
                      .split(",")
                      .map((photo, index) => (
                        <img
                          key={index}
                          src={`/api/uploads/${photo}`}
                          alt="Foto del bien"
                          className="photo"
                        />
                      ))}
                </td>
                <td>
                  <button onClick={() => onAddArticle(bien)}>
                    Agregar artículo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BienTable;
