import { useEffect, useState } from "react";
import React from 'react';

function RequestforSupplies() {
  const [datos, setDatos] = useState([]);

  const fetchDatos = () => {
    fetch("/api/solicitud/solicitudesInsumos")
      .then((response) => {
        if (!response.ok) {
            throw new Error("Error al cargar los datos: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDatos(data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos", error);
      });
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  return (
    <div>
      <h1>Solicitudes de Insumos</h1>
      <table>
        <thead>
          <tr>
            <th>Solicita</th>
            <th>Articulo</th>
            <th>Cantidad</th>
            <th>Descripcion de solicitud</th>
            <th>Estatus de solicitud</th>
            <th>Solicitud Completa</th>
            <th>Opciones de continuacion</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id}>
              <td> {dato.requestingUser.name} </td>
              <td> {dato.requestArticle.name} </td>
              <td> {dato.quantity} </td>
              <td> {dato.description} </td>
              <td> {dato.status} </td>
              <td> <button>Ver solicitud</button> </td>
              <td>
                <button>Aceptar Solicitud </button>
                <button> Rechazar Solicitud </button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestforSupplies;