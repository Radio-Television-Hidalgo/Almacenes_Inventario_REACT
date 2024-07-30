import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/policy.css";

function Policy() {
  const [formData, setFormData] = React.useState({
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
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} class="poliza-form">
    <div class="poliza-form-grid">
        <div class="poliza-form-group">
        <label class="poliza-label">Descripción del bien asegurado:</label>
        <input
            type="text"
            name="description"
            class="poliza-input"
            value={formData.description}
            onChange={handleChange}
        />
        </div>

        <div class="poliza-form-group">
        <label class="poliza-label">Cobertura:</label>
        <input
            type="text"
            name="coverage"
            class="poliza-input"
            value={formData.coverage}
            onChange={handleChange}
        />
        </div>

        <div class="poliza-form-group">
        <label class="poliza-label">Tipo:</label>
        <select
            name="type"
            class="poliza-select"
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

        <div class="poliza-form-group">
        <label class="poliza-label">Prima:</label>
        <input
            type="number"
            name="premium"
            step="0.01"
            class="poliza-input"
            value={formData.premium}
            onChange={handleChange}
        />
        </div>

        <div class="poliza-form-group">
        <label class="poliza-label">Deducible:</label>
        <input
            type="number"
            name="deductible"
            step="0.01"
            class="poliza-input"
            value={formData.deductible}
            onChange={handleChange}
        />
        </div>

        <div class="poliza-form-group">
        <label class="poliza-label">Límites de indemnización:</label>
        <input
            type="text"
            name="indemnity_limits"
            class="poliza-input"
            value={formData.indemnity_limits}
            onChange={handleChange}
        />
        </div>

        <div class="poliza-form-group">
        <label class="poliza-label">Periodo de vigencia:</label>
        <input
            type="date"
            name="validity_period"
            class="poliza-input"
            value={formData.validity_period}
            onChange={handleChange}
        />
        </div>

        <div class="poliza-form-group">
        <label class="poliza-label">Cláusulas de exclusión:</label>
        <input
            type="text"
            name="exclusion_clauses"
            class="poliza-input"
            value={formData.exclusion_clauses}
            onChange={handleChange}
        />
        </div>

        <div class="poliza-form-group">
        <label class="poliza-label">Fecha:</label>
        <input
            type="date"
            name="date"
            class="poliza-input"
            value={formData.date}
            onChange={handleChange}
        />
        </div>

        <div class="poliza-form-group">
        <label class="poliza-label">Cantidad:</label>
        <input
            type="number"
            name="quantity"
            class="poliza-input"
            value={formData.quantity}
            onChange={handleChange}
        />
        </div>

        <div class="poliza-form-group">
        <label class="poliza-label">Archivo:</label>
        <input
            type="file"
            name="file"
            class="poliza-input"
            onChange={handleFileChange}
        />
        </div>
        
    </div>

    <button type="submit" class="poliza-button">Crear póliza</button>
    </form>

  );
}

export default Policy;
