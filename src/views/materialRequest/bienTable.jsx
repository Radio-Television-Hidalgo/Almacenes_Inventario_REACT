import React, { useEffect, useState } from "react";
import "/src/styles/BienTable.css";

function BienTable() {
  const [bienes, setBienes] = useState([]);

  useEffect(() => {
    fetch("/api/articulos?type=Bien")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log para verificar los datos recibidos
        setBienes(data);
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
          <th>Estado</th>
          <th>Fotos</th>
        </tr>
      </thead>
      <tbody>
        {bienes.map((bien) => (
          <tr key={bien.id}>
            <td>{bien.description}</td>
            <td>
              {bien.tb_warehouses && bien.tb_warehouses.length > 0
                ? bien.tb_warehouses[0].stock
                : "N/A"}
            </td>
            <td>
              {bien.tb_inventories && bien.tb_inventories.length > 0
                ? bien.tb_inventories[0].inventory_number
                : "N/A"}
            </td>
            <td>{bien.status}</td>
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
