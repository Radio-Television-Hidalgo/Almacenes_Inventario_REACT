import React from "react";
import "../../styles/ModalPoliciy.css";

const Modal = ({ show, handleClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modalPolicy-overlay">
      <div className="modalPolicy-content">
        {children}
        <button onClick={handleClose} className="modalPolicy-close-button">Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
