import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import React from 'react';
import axios from "axios";
import "../../styles/RequestforSupplies.css";

function RequestforSupplies() {
  const [datosI, setDatosI] = useState([]);
  const [datosB, setDatosB] = useState([]);
  const [insumosData, setInsumosData] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectData, setRejectData] = useState([]);

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
        fetchDatosI();
        fetchDatosB();
      } else {
        console.error("Error al aceptar la solicitud");
      }
    } catch (error) {
      console.error("Error al aceptar la solicitud", error);
    } 
  };

  const handleSub = async (e, id) => {
    e.preventDefault();
    const data = {
        rejected_type: rejectData.rejected_type,
        comment: rejectData.comment
    };

    try {
        const response = await axios.post(`/api/solicitud/rechazarSolicitud/${id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRejectModal(false);
        fetchDatosI();
        fetchDatosB();
        console.log('Solicitud actualizada:', response.data);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
    }
};

  const modalReject = (id) => {
    setRejectModal(true);
    setModalData({ id }); // Guardar el ID de la solicitud en el estado del modal
  }

  const closeModalReject = () => {
    setRejectModal(false);
  }

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
     
      <button className="soli" onClick={showInsumos}>Solicitudes de Insumos</button>
      <button className="soli" onClick={showBienes}>Solicitudes de Bienes</button>
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
            <th className="request-for-supplies-header">Proyecto Afectado</th>
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
              <td className="request-for-supplies-cell"> {dato.project_type} </td>
              <td className="request-for-supplies-cell"> {dato.status} </td>
              <td className="request-for-supplies-cell"> <button onClick={() => handleViewMore(dato)} className="request-for-supplies-button request-for-supplies-view-button">Ver solicitud</button> </td>
              <td className="request-for-supplies-cell">
                <div className="request-for-supplies-button-container">
                  <button onClick={(event) => handleAcept(event, dato.id)} className="request-for-supplies-button request-for-supplies-accept-button">Aceptar Solicitud</button>
                  <button onClick={() => modalReject(dato.id)} className="request-for-supplies-button request-for-supplies-reject-button">Rechazar Solicitud</button> 
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
            <th className="request-for-supplies-header">Proyecto Afectado</th>
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
              <td className="request-for-supplies-cell"> {dato.project_type} </td>
              <td className="request-for-supplies-cell"> {dato.status} </td>
              <td className="request-for-supplies-cell"> <button onClick={() => handleViewMore(dato)} className="request-for-supplies-button request-for-supplies-view-button">Ver solicitud</button> </td>
              <td className="request-for-supplies-cell">
                <div className="request-for-supplies-button-container">
                  <button onClick={(event) => handleAcept(event, dato.id)} className="request-for-supplies-button request-for-supplies-accept-button">Aceptar Solicitud</button>
                  <button onClick={() => modalReject(dato.id)} className="request-for-supplies-button request-for-supplies-reject-button">Rechazar Solicitud</button> 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

      {modalData && modalData.requestingUser && (
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
          <div className="glass-modal">
            <span className="glass-close-button" onClick={closeModal}>&times;</span>
            <div className="glass-modal-content">
              <iframe
                src={`/api/request/${modalData.file}`}
                title="PDF de Solicitud"
              >
                PDF
              </iframe>
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

      {rejectModal && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <span className="glass-close-button" onClick={() => closeModalReject()}>&times;</span>
            <div className="glass-modal-content">
              <h2><strong>Confirmación</strong></h2>
              {/* <p>¿Porque rechaza esta solicitud?</p> */}
              <form onSubmit={(event) => handleSub(event, modalData.id)}>
              <label htmlFor="">¿Porque rechaza esta solicitud?</label><br />
              <select name="rejected_type" id="" onChange={e => setRejectData({ ...rejectData, rejected_type: e.target.value })}>
                <option value="#" selected disabled>- Motivo -</option>
                <option value="Falta de presupuesto">Falta de Presupuesto</option>
                <option value="No planeado">No Planeado</option>
              </select><br /><br />
              <label htmlFor="">Comentario adicional:</label><br />
              <input type="text" name="comment" onChange={e => setRejectData({ ...rejectData, comment: e.target.value })}/>
              <br /><br />
              <button type="submit" className="request-for-supplies-button request-for-supplies-accept-button">Continuar</button>
              <button onClick={() => closeModalReject()} className="request-for-supplies-button request-for-supplies-reject-button">Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestforSupplies;
