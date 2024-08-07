import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import React from 'react';
import "../../styles/RequestforSupplies.css";

function RequestforSupplies() {
  const [datosI, setDatosI] = useState([]);
  const [datosB, setDatosB] = useState([]);
  const [insumosData, setInsumosData] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [rejectModal, setRejectModal] = useState({ show: false, id: null });

  const fetchDatosI = () => {
    fetch("/api/solicitud/solicitudesInsumos")
      .then((response) => {
        if (!response.ok) {
            throw new Error("Error al cargar los datos: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDatosI(data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos", error);
      });
  };

  const fetchDatosB = () => {
    fetch("/api/solicitud/solicitudesBienes")
      .then((response) => {
        if (!response.ok) {
            throw new Error("Error al cargar los datos: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDatosB(data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos", error);
      });
  };

  useEffect(() => {
    fetchDatosI();
    fetchDatosB();
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
        setSuccessModal(true);
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
        setRejectModal({ show: true, id: id });
        fetchDatos();
      } else {
        console.error("Error al rechazar la solicitud");
      }
    } catch (error) {
      console.error("Error al rechazar la solicitud", error);
    } 
  };

  const handleConfirmReject = async () => {
    try {
      const response = await fetch(`/api/solicitud/rechazarSolicitud/${rejectModal.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.ok) {
        setRejectModal({ show: false, id: null });
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

  const showInsumos = () =>{
    setInsumosData(true);
  }

  const showBienes = () =>{
    setInsumosData(false);
  }

  return (
    <div className="request-for-supplies-container">
      <h1>Planeación</h1>
      <button onClick={showInsumos}>Solicitudes de Insumos</button>
      <button onClick={showBienes}>Solicitudes de Bienes</button>
      {insumosData && (
      <h2>Solicitudes de Insumos</h2>
      )}
      {!insumosData && (
      <h2>Solicitudes de Bienes</h2>
      )}
      {insumosData &&(
      <table className="request-for-supplies-table">
        <thead>
          <tr>
            <th className="request-for-supplies-header">Solicita</th>
            <th className="request-for-supplies-header">Artículo</th>
            <th className="request-for-supplies-header">Cantidad</th>
            <th className="request-for-supplies-header">Descripción de solicitud</th>
            <th className="request-for-supplies-header">Estatus de solicitud</th>
            <th className="request-for-supplies-header">Solicitud Completa</th>
            <th className="request-for-supplies-header">Opciones de continuación</th>
          </tr>
        </thead>
        <tbody>
          {datosI.map((dato) => (
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
      )}

      {!insumosData && (
        <table className="request-for-supplies-table">
        <thead>
          <tr>
            <th className="request-for-supplies-header">Solicita</th>
            <th className="request-for-supplies-header">Artículo</th>
            <th className="request-for-supplies-header">Cantidad</th>
            <th className="request-for-supplies-header">Descripción de solicitud</th>
            <th className="request-for-supplies-header">Estatus de solicitud</th>
            <th className="request-for-supplies-header">Solicitud Completa</th>
            <th className="request-for-supplies-header">Opciones de continuación</th>
          </tr>
        </thead>
        <tbody>
          {datosB.map((dato) => (
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
      )}

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
              <p><strong>QR:</strong> <QRCode className="qr-code" value={modalData.requestArticle.QR} /> </p>
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

      {successModal && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <span className="glass-close-button" onClick={() => setSuccessModal(false)}>&times;</span>
            <div className="glass-modal-content">
              <h2><strong>¡Felicidades!</strong></h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#891B31" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
              </svg>
              <p>Acción completada con éxito.</p>
            </div>
          </div>
        </div>
      )}

{rejectModal.show && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <span className="glass-close-button" onClick={() => setRejectModal({ show: false, id: null })}>&times;</span>
            <div className="glass-modal-content">
              <h2><strong>Confirmación</strong></h2>
              <p>¿Deseas rechazar esta solicitud?</p>
              <div className="request-for-supplies-button-container">
                <button onClick={handleConfirmReject} className="request-for-supplies-button request-for-supplies-accept-button">Sí</button>
                <button onClick={() => setRejectModal({ show: false, id: null })} className="request-for-supplies-button request-for-supplies-reject-button">No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestforSupplies;
