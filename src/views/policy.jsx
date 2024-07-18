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
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5173/api/policies', formData);
      console.log('Respuesta del servidor:', response.data);
      // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
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
          <option value="">Select type</option>
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
          type="text"
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
