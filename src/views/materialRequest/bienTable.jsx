import React, { useEffect, useState } from "react";
import "/src/styles/BienTable.css";

function BienTable() {
  const [bienes, setBienes] = useState([]);

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

  return (
    <table className="style-table">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Cantidad</th>
          <th>Número de Inventario</th>
          <th>Fotos</th>
        </tr>
      </thead>
      <tbody>
        {bienes.map((bien) => (
          <tr key={bien.id}>
            <td>{bien.description}</td>
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
                bien.photos_entry
                  .split(",")
                  .map((photo, index) => (
                    <img
                      key={index}
                      src={`/api/${photo}`}
                      alt="Foto del bien"
                      className="photo"
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

export default BienTable;
