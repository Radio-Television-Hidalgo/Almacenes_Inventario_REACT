import { useEffect, useState } from "react";
import "/src/styles/TablaInsumos.css";

function InsumoTable() {
  const [insumos, setInsumos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/articulos?type=Insumos")
      .then((response) => response.json())
      .then((data) => {
        // Filtra los insumos que tienen datos válidos en articleWarehouses
        const filteredData = data.filter(
          (insumo) =>
            insumo.articleWarehouses &&
            insumo.articleWarehouses.length > 0 &&
            insumo.articleWarehouses[0].warehouses_number
        );
        setInsumos(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching insumos:", error);
      });
  }, []);

  const handlesearch = (e) => {
    setSearch(e.target.value);
  };
  const filteredinsumos = insumos.filter((insumo) =>
    insumo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={search}
        onChange={handlesearch}
        className="search-input"
      ></input>
      <table className="style-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th className="th-descripcion">Descripción</th>
            <th>Cantidad</th>
            <th>Número de Almacén</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {filteredinsumos.map((insumo) => (
            <tr key={insumo.id}>
              <td>{insumo.name}</td>
              <td>{insumo.description}</td>
              <td>
                {insumo.articleWarehouses && insumo.articleWarehouses.length > 0
                  ? insumo.articleWarehouses[0].quantity
                  : "N/A"}
              </td>
              <td>
                {insumo.articleWarehouses && insumo.articleWarehouses.length > 0
                  ? insumo.articleWarehouses[0].warehouses_number
                  : "N/A"}
              </td>
              <td>
                {insumo.photos_entry &&
                  insumo.photos_entry.split(",").map((photo, index) => (
                    <img
                      key={index}
                      src={`/api/${photo}`}
                      alt="Foto del insumo"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "5px",
                      }}
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

export default InsumoTable;
