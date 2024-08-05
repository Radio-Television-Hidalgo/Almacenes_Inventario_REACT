import { useEffect, useState } from "react";
import React from 'react'

function RequestHistory() {
  const [datosA, setDatosA] = useState([]);
  const [datosR, setDatosR] = useState([]);
  const [showAcepted, setShowAcepted] = useState(true);
  const [modalData, setModalData] = useState(null);

  const fetchDatosAcepted = () => {
    fetch("/api/solicitud/solicitudesInsumos/aceptadas")
      .then((response) => {
        if (!response.ok) {
            throw new Error("Error al cargar los datos: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDatosA(data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos", error);
      });
  };

  const fetchDatosRejected = () => {
    fetch("/api/solicitud/solicitudesInsumos/rechazadas")
      .then((response) => {
        if (!response.ok) {
            throw new Error("Error al cargar los datos: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDatosR(data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos", error);
      });
  };

  useEffect(() => {
    fetchDatosAcepted();
    fetchDatosRejected();
  }, []);

  const viewAcepted = () => {
    setShowAcepted(true);
  }

  const viewRejected = () => {
    setShowAcepted(false);
  }

  const handleViewMore = (dato) => {
    setModalData(dato);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div>
      <h1>Historial de Solicitudes</h1>
      <button onClick={() => viewAcepted()}>Aceptadas</button>
      <button onClick={() => viewRejected()}>Rechazadas</button>
      {showAcepted && (
        <h2>Solicitudes Aceptadas</h2>
      )}
      {!showAcepted && (
        <h2>Solicitudes Rechazadas</h2>
      )}
      <table>
        <thead>
          <tr>
            <th>Solicita</th>
            <th>Articulo</th>
            <th>Cantidad</th>
            <th>Descripcion de solicitud</th>
            <th>Estatus de solicitud</th>
            <th>Solicitud Completa</th>
          </tr>
        </thead>
        {showAcepted && (
          <tbody>
           {datosA.map((dato) => (
             <tr key={dato.id} className="request-for-supplies-row">
               <td className="request-for-supplies-cell"> {dato.requestingUser.name} </td>
               <td className="request-for-supplies-cell"> {dato.requestArticle.name} </td>
               <td className="request-for-supplies-cell"> {dato.quantity} </td>
               <td className="request-for-supplies-cell"> {dato.description} </td>
               <td className="request-for-supplies-cell"> {dato.status} </td>
               <td className="request-for-supplies-cell"> <button onClick={() => handleViewMore(dato)}   className="request-for-supplies-button request-for-supplies-view-button">Ver solicitud</button> </td>
              </tr>
            ))}
          </tbody>
        )}
        {!showAcepted && (
          <tbody>
            {datosR.map((dato) => (
              <tr key={dato.id} className="request-for-supplies-row">
                <td className="request-for-supplies-cell"> {dato.requestingUser.name} </td>
                <td className="request-for-supplies-cell"> {dato.requestArticle.name} </td>
                <td className="request-for-supplies-cell"> {dato.quantity} </td>
                <td className="request-for-supplies-cell"> {dato.description} </td>
                <td className="request-for-supplies-cell"> {dato.status} </td>
                <td className="request-for-supplies-cell"> <button onClick={() => handleViewMore(dato)} className="request-for-supplies-button request-for-supplies-view-button">Ver solicitud</button> </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {modalData && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <span className="glass-close-button" onClick={closeModal}>&times;</span>
            <div className="glass-modal-content">
            <h2>Detalle de la Solicitud</h2>
              <img src={`${modalData.requestingUser.img}`} alt="" className="glass-modal-image" />
              
              <p><strong>Solicita:</strong> {modalData.requestingUser.name}</p> 
              <p><strong>Número de trabajador:</strong> {modalData.requestingUser.worker_nomber}</p>
    
              
              <p><strong>Artículo:</strong> {modalData.requestArticle.name}</p>
              <p><strong>Descripción:</strong> {modalData.requestArticle.description}</p>
              <p><strong>QR:</strong> {modalData.requestArticle.QR}</p>
              <hr />
              <div className="glass-modal-details">
                <div className="glass-modal-detail brand"><strong>Marca:</strong> {modalData.requestArticle.brand}</div>
                <div className="glass-modal-detail model"><strong>Modelo:</strong> {modalData.requestArticle.model}</div>
                <div className="glass-modal-detail series"><strong>Número de serie:</strong> {modalData.requestArticle.number_series}</div>
              </div>
             
            </div>
          </div>
        </div>
      )}  
    </div>
  )
}

export default RequestHistory