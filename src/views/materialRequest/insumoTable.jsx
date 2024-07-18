import React, { useEffect, useState } from "react";

function InsumoTable() {
  const [insumos, setInsumos] = useState([]);

  useEffect(() => {
    fetch("/api/articulos?type=Insumos")
      .then((response) => response.json())
      .then((data) => {
        setInsumos(data);
      })
      .catch((error) => {
        console.error("Error fetching insumos:", error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Cantidad</th>
          <th>Estado</th>
          <th>Foto</th>
        </tr>
      </thead>
      <tbody>
        {insumos.map((insumo) => (
          <tr key={insumo.id}>
            <td>{insumo.description}</td>
            <td>{insumo.quantity}</td>
            <td>{insumo.status}</td>
            <td>
              {insumo.photos_entry &&
                insumo.photos_entry
                  .split(",")
                  .map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
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
