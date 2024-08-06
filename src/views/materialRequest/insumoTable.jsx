import React, { useEffect, useState } from "react";
import "/src/styles/TablaInsumos.css";

function InsumoTable() {
  const [insumos, setInsumos] = useState([]);

  useEffect(() => {
    fetch("/api/articulos?type=Insumos")
      .then((response) => response.json())
      .then((data) => {
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

  return (
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
        {insumos.map((insumo) => (
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
                    src={`/api/uploads/${photo}`}
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
  );
}

export default InsumoTable;
