import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "../articles/ModalPolicy";
import "../../styles/policy.css";

function Policy() {
  const [formData, setFormData] = useState({
    description: "",
    coverage: "",
    type: "",
    premium: "",
    deductible: "",
    indemnity_limits: "",
    validity_period: "",
    exclusion_clauses: "",
    file: null,
    date: "",
    quantity: "",
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await axios.post("http://localhost:3000/facturas/policy", data);
      console.log("Success:", response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="poliza-form">
        <div className="poliza-form-grid">
          <div className="poliza-form-group">
            <label className="poliza-label">Descripción del bien asegurado:</label>
            <input
              type="text"
              name="description"
              className="poliza-input"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="poliza-form-group">
            <label className="poliza-label">Cobertura:</label>
            <input
              type="text"
              name="coverage"
              className="poliza-input"
              value={formData.coverage}
              onChange={handleChange}
            />
          </div>
          <div className="poliza-form-group">
            <label className="poliza-label">Tipo:</label>
            <select
              name="type"
              className="poliza-select"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Seleccionar tipo</option>
              <option value="egresos">Egresos</option>
              <option value="presupuestales">Presupuestales</option>
              <option value="diario">Diario</option>
              <option value="cheques">Cheques</option>
              <option value="ingresos">Ingresos</option>
            </select>
          </div>
          <div className="poliza-form-group">
            <label className="poliza-label">Prima:</label>
            <input
              type="number"
              name="premium"
              step="0.01"
              className="poliza-input"
              value={formData.premium}
              onChange={handleChange}
            />
          </div>
          <div className="poliza-form-group">
            <label className="poliza-label">Deducible:</label>
            <input
              type="number"
              name="deductible"
              step="0.01"
              className="poliza-input"
              value={formData.deductible}
              onChange={handleChange}
            />
          </div>
          <div className="poliza-form-group">
            <label className="poliza-label">Límites de indemnización:</label>
            <input
              type="text"
              name="indemnity_limits"
              className="poliza-input"
              value={formData.indemnity_limits}
              onChange={handleChange}
            />
          </div>
          <div className="poliza-form-group">
            <label className="poliza-label">Periodo de vigencia:</label>
            <input
              type="date"
              name="validity_period"
              className="poliza-input"
              value={formData.validity_period}
              onChange={handleChange}
            />
          </div>
          <div className="poliza-form-group">
            <label className="poliza-label">Cláusulas de exclusión:</label>
            <input
              type="text"
              name="exclusion_clauses"
              className="poliza-input"
              value={formData.exclusion_clauses}
              onChange={handleChange}
            />
          </div>
          <div className="poliza-form-group">
            <label className="poliza-label">Fecha:</label>
            <input
              type="date"
              name="date"
              className="poliza-input"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="poliza-form-group">
            <label className="poliza-label">Cantidad:</label>
            <input
              type="number"
              name="quantity"
              className="poliza-input"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="poliza-form-group">
            <label className="poliza-label">Archivo:</label>
            <input
              type="file"
              name="file"
              className="poliza-input"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button type="submit" className="poliza-button">Crear póliza</button>
      </form>

      <Modal show={modalVisible} handleClose={closeModal}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#691b31" class="bi bi-file-earmark-medical-fill" viewBox="0 0 16 16">
        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-3 2v.634l.549-.317a.5.5 0 1 1 .5.866L7 7l.549.317a.5.5 0 1 1-.5.866L6.5 7.866V8.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L5 7l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V5.5a.5.5 0 1 1 1 0m-2 4.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1m0 2h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1"/>
      </svg>
        <h2>Polixa Creada Correctamente</h2>
      </Modal>
    </div>
  );
}

export default Policy;
