import React, { useEffect, useState } from "react";

function BienTable() {
  const [bienes, setBienes] = useState([]);

  useEffect(() => {
    fetch("/api/articulos?type=Bien")
      .then((response) => response.json())
      .then((data) => {
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
        </tr>
      </thead>
      <tbody>
        {bienes.map((bien) => (
          <tr key={bien.id}>
            <td>{bien.description}</td>
            <td>{bien.quantity}</td>
            <td>{bien.status}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BienTable;
