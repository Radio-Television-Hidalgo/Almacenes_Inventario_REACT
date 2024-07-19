import React, { useState } from "react";
import InsumoTable from "./insumoTable";
import BienTable from "./bienTable";

function MaterialRequest() {
  const [formData, setFormData] = useState({
    description: "",
    quantity: "",
    type: "Insumo",
    status: "En Espera",
    file: "",
    approving_user_id: "", 
    requesting_user_id: "", 
    item_id: "",
    inventory_number_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("/api/articulos/crearSolicitud", {
        method: "POST",
        body: formDataToSend,
        headers: {
          // No es necesario establecer el Content-Type al usar FormData; el navegador lo hace automáticamente
        },
      });
      const data = await response.json();
      console.log("Solicitud creada:", data);
    } catch (error) {
      console.error("Error al crear la solicitud:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Cantidad"
          required
        />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Insumo">Insumo</option>
          <option value="Bien">Bien</option>
        </select>
        <input type="file" name="file" onChange={handleFileChange} />
        <input
          type="number"
          name="approving_user_id"
          value={formData.approving_user_id}
          onChange={handleChange}
          placeholder="ID del usuario que aprueba"
          required
        />
        <input
          type="number"
          name="requesting_user_id"
          value={formData.requesting_user_id}
          onChange={handleChange}
          placeholder="ID del usuario que solicita"
          required
        />
        <input
          type="number"
          name="item_id"
          value={formData.item_id}
          onChange={handleChange}
          placeholder="ID del artículo"
          required
        />
        <input
          type="number"
          name="inventory_number_id"
          value={formData.inventory_number_id}
          onChange={handleChange}
          placeholder="Número de inventario"
          required
        />
        <button type="submit">Solicitar Material</button>
      </form>

      {formData.type === "Insumo" && (
        <>
          <h2>Insumos</h2>
          <InsumoTable />
        </>
      )}

      {formData.type === "Bien" && (
        <>
          <h2>Bienes</h2>
          <BienTable />
        </>
      )}
    </div>
  );
}

export default MaterialRequest;
