import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Modal.css";

function Modal({ message = "Tu solicitud fue enviada exitosamente", onClose }) {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate("/inicio");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="#691b31" // Color morado
          className="modal-icon"
          viewBox="0 0 16 16"
        >
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
        </svg>
        <h2>{message}</h2>
        <button onClick={handleAccept} className="modal-button">
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default Modal;
