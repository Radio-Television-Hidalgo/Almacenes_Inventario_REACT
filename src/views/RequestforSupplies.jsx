import { useEffect, useState } from "react";
import React from 'react';

import "../styles/RequestforSupplies.css";

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

  const handleAcept = async (event, id) => {
    event.preventDefault(); 
    try {
      const response = await fetch(`/api/solicitud/aceptarSolicitud/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.ok) {
        fetchDatos();
      } else {
        console.error("Error al aceptar la solicitud");
      }
    } catch (error) {
      console.error("Error al aceptar la solicitud", error);
    } 
  };

  const handleReject = async (event, id) => {
    event.preventDefault(); 
    try {
      const response = await fetch(`/api/solicitud/rechazarSolicitud/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.ok) {
        fetchDatos();
      } else {
        console.error("Error al rechazar la solicitud");
      }
    } catch (error) {
      console.error("Error al rechazar la solicitud", error);
    } 
  };

  return (
    <div className="request-for-supplies-container">
      <table className="request-for-supplies-table">
        <thead>
          <tr>
            <th className="request-for-supplies-header">Solicita</th>
            <th className="request-for-supplies-header">Articulo</th>
            <th className="request-for-supplies-header">Cantidad</th>
            <th className="request-for-supplies-header">Descripcion de solicitud</th>
            <th className="request-for-supplies-header">Estatus de solicitud</th>
            <th className="request-for-supplies-header">Solicitud Completa</th>
            <th className="request-for-supplies-header">Opciones de continuacion</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id} className="request-for-supplies-row">
              <td className="request-for-supplies-cell"> {dato.requestingUser.name} </td>
              <td className="request-for-supplies-cell"> {dato.requestArticle.name} </td>
              <td className="request-for-supplies-cell"> {dato.quantity} </td>
              <td className="request-for-supplies-cell"> {dato.description} </td>
              <td className="request-for-supplies-cell"> {dato.status} </td>
              <td className="request-for-supplies-cell"> <button className="request-for-supplies-button request-for-supplies-view-button">Ver solicitud</button> </td>
              <td className="request-for-supplies-cell">
                <div className="request-for-supplies-button-container">
                  <button onClick={(event) => handleAcept(event, dato.id)} className="request-for-supplies-button request-for-supplies-accept-button">Aceptar Solicitud</button>
                  <button onClick={(event) => handleReject(event, dato.id)} className="request-for-supplies-button request-for-supplies-reject-button">Rechazar Solicitud</button> 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestforSupplies;
