import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Descripción del bien asegurado:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Cobertura:</label>
        <input
          type="text"
          name="coverage"
          value={formData.coverage}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Tipo:</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="">Seleccionar tipo</option>
          <option value="egresos">Egresos</option>
          <option value="presupuestales">Presupuestales</option>
          <option value="diario">Diario</option>
          <option value="cheques">Cheques</option>
          <option value="ingresos">Ingresos</option>
        </select>
      </div>

      <div>
        <label>Prima:</label>
        <input
          type="number"
          name="premium"
          step="0.01"
          value={formData.premium}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Deducible:</label>
        <input
          type="number"
          name="deductible"
          step="0.01"
          value={formData.deductible}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Límites de indemnización:</label>
        <input
          type="text"
          name="indemnity_limits"
          value={formData.indemnity_limits}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Periodo de vigencia:</label>
        <input
          type="date"
          name="validity_period"
          value={formData.validity_period}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Cláusulas de exclusión:</label>
        <input
          type="text"
          name="exclusion_clauses"
          value={formData.exclusion_clauses}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Archivo:</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label>Fecha:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Policy;
