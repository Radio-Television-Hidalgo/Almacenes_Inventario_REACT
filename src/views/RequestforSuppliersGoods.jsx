import { useEffect, useState } from "react";
import React from 'react';

import "../styles/RequestforSupplies.css";

function RequestforSuppliesGoods() {
  const [datos, setDatos] = useState([]);
  const [modalData, setModalData] = useState(null);

  const fetchDatos = () => {
    fetch("/api/solicitud/solicitudesBienes")
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

  const handleViewMore = (dato) => {
    setModalData(dato);
  };

  const closeModal = () => {
    setModalData(null);
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
              <td className="request-for-supplies-cell"> <button onClick={() => handleViewMore(dato)} className="request-for-supplies-button request-for-supplies-view-button">Ver solicitud</button> </td>
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
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2> <strong>Detalle de la Solicitud</strong> </h2>
            <div>
              <h2>Artículo: </h2>
              <img src={`${modalData.requestArticle.photos_entry}`}  alt="" />
              <p><strong>{modalData.requestArticle.name}</strong></p>
              <p><strong>Marca: </strong> {modalData.requestArticle.brand}</p>
              <p><strong>Modelo: </strong> {modalData.requestArticle.model}</p>
              <p><strong>Numero de serie: </strong> {modalData.requestArticle.number_series}</p>
              <p><strong>Descripción: </strong> {modalData.requestArticle.description}</p>
              <p><strong>QR: </strong> {modalData.requestArticle.QR}</p>
              <p><strong></strong> </p>
            </div>
            <div>
              <h2>Solicita: </h2>
              <img src={`${modalData.requestingUser.img}`}  alt="" />
              <p><strong>{modalData.requestingUser.name}</strong></p>
              <p><strong>Numero de trabajador:</strong>{modalData.requestingUser.worker_nomber}</p>
            </div>
            
          </div>
        </div>
      )}  
    </div>
  );
}

export default RequestforSuppliesGoods;
