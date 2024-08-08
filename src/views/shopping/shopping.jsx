import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Shopping() {
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const fetchAcceptedRequests = () => {
    fetch("/api/solicitud/solicitudes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        // Filtrar las solicitudes aceptadas
        const accepted = data.filter(
          (solicitud) => solicitud.status === "Aceptado"
        );
        setAcceptedRequests(accepted);
      })
      .catch((error) => {
        console.error("Error al cargar los datos", error);
      });
  };

  useEffect(() => {
    fetchAcceptedRequests();
  }, []);

  return (
    <div>
      <h1>Solicitudes de Compra</h1>
      <table className="request-for-supplies-table">
        <thead>
          <tr>
            <th className="request-for-supplies-header">Solicita</th>
            <th className="request-for-supplies-header">Artículo</th>
            <th className="request-for-supplies-header">Cantidad</th>
            <th className="request-for-supplies-header">
              Descripción de solicitud
            </th>
            <th className="request-for-supplies-header">Proyecto Afectado</th>
          </tr>
        </thead>
        <tbody>
          {acceptedRequests.map((solicitud) => (
            <tr key={solicitud.id} className="request-for-supplies-row">
              <td className="request-for-supplies-cell">
                {" "}
                {solicitud.requestingUser.name}{" "}
              </td>
              <td className="request-for-supplies-cell">
                {" "}
                {solicitud.requestArticle.name}{" "}
              </td>
              <td className="request-for-supplies-cell">
                {" "}
                {solicitud.quantity}{" "}
              </td>
              <td className="request-for-supplies-cell">
                {" "}
                {solicitud.description}{" "}
              </td>
              <td className="request-for-supplies-cell">
                {" "}
                {solicitud.project_type}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shopping;
