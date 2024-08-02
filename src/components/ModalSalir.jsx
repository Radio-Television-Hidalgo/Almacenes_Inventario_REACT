import React from 'react';
import '../styles/ModalSalir.css'; // Importa los estilos CSS para el modal


const ModalSalir = ({ show, handleClose, handleConfirm }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="mo-content"  onClick={(e) => e.stopPropagation()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#691b31" className="bi bi-door-open-fill" viewBox="0 0 16 16">
            <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/>
          </svg>
          <h2>¿Seguro que quieres salir?</h2>
          <button onClick={handleConfirm}>Sí</button>
          <button onClick={handleClose}>No</button>
        </div>
      </div>
    );
  };
  
  export default ModalSalir;