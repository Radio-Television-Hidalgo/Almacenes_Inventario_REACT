import React, { useEffect, useState } from "react";

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
    <table>
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Cantidad</th>
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
            <td>{bien.status}</td>
            <td>
              {bien.photos_entry &&
                bien.photos_entry.split(",").map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt="Foto del bien"
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
