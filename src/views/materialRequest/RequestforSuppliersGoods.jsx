import { useEffect, useState } from "react";
import React from 'react';
import "../../styles/RequestforSuppliesGoods.css";

function RequestforSuppliesGoods() {
  const [datos, setDatos] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [rejectModal, setRejectModal] = useState({ show: false, id: null });

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
        setSuccessModal(true);
        fetchDatos();
      } else {
        console.error("Error al aceptar la solicitud");
      }
    } catch (error) {
      console.error("Error al aceptar la solicitud", error);
    } 
  };

  const handleReject = async () => {
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

  return (
    <div className="request-for-supplies-container-go">
      <table className="request-for-supplies-table-go">
        <thead>
          <tr>
            <th className="request-for-supplies-header-go">Solicita</th>
            <th className="request-for-supplies-header-go">Artículo</th>
            <th className="request-for-supplies-header-go">Cantidad</th>
            <th className="request-for-supplies-header-go">Descripción de solicitud</th>
            <th className="request-for-supplies-header-go">Estatus de solicitud</th>
            <th className="request-for-supplies-header-go">Solicitud Completa</th>
            <th className="request-for-supplies-header-go">Opciones de continuación</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id} className="request-for-supplies-row-go">
              <td className="request-for-supplies-cell-go"> {dato.requestingUser.name} </td>
              <td className="request-for-supplies-cell-go"> {dato.requestArticle.name} </td>
              <td className="request-for-supplies-cell-go"> {dato.quantity} </td>
              <td className="request-for-supplies-cell-go"> {dato.description} </td>
              <td className="request-for-supplies-cell-go"> {dato.status} </td>
              <td className="request-for-supplies-cell-go"> <button onClick={() => handleViewMore(dato)} className="request-for-supplies-button request-for-supplies-view-button-go">Ver solicitud</button> </td>
              <td className="request-for-supplies-cell-go">
                <div className="request-for-supplies-button-container-go">
                  <button onClick={(event) => handleAcept(event, dato.id)} className="request-for-supplies-button request-for-supplies-accept-button-go">Aceptar Solicitud</button>
                  <button onClick={() => setRejectModal({ show: true, id: dato.id })} className="request-for-supplies-button request-for-supplies-reject-button-go">Rechazar Solicitud</button> 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalData && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <span className="glass-close-button" onClick={closeModal}>&times;</span>
            <div className="glass-modal-content">
              <h2><strong>Detalle de la Solicitud</strong></h2>
              <div>
                <h2>Solicita:</h2>
                <img src={`${modalData.requestingUser.img}`} alt="" className="glass-modal-image" />
                <p><strong>{modalData.requestingUser.name}</strong></p>
                <p><strong>Número de trabajador:</strong> {modalData.requestingUser.worker_nomber}</p>
              </div>
              <div>
                <h2>Artículo: </h2>
                <p><strong>{modalData.requestArticle.name}</strong></p>
                </div>
                <p><strong>Descripción: </strong> {modalData.requestArticle.description}</p>
                <p><strong>QR: </strong> {modalData.requestArticle.QR}</p>
              </div>
              <hr />
                <div className="glass-modal-container">
                  <div className="glass-modal-item-Brand" >
                    <p><strong>Marca: </strong> {modalData.requestArticle.brand}</p>
                  </div>
                  <div className="glass-modal-item-Model">
                    <p><strong>Modelo: </strong> {modalData.requestArticle.model}</p>
                  </div>
                  <div className="glass-modal-item-Serie">
                    <p><strong>Número de serie: </strong> {modalData.requestArticle.number_series}</p>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#891B31" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
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
              <h2><strong>¿Estás seguro?</strong></h2>
              <p>¿Estás seguro de rechazar la solicitud?</p>
              <button onClick={handleReject} className="request-for-supplies-button request-for-supplies-accept-button-go">Sí</button>
              <button onClick={() => setRejectModal({ show: false, id: null })} className="request-for-supplies-button request-for-supplies-reject-button-go">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestforSuppliesGoods;

