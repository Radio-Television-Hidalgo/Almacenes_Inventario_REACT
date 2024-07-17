import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

export default function CreateArticle() {
  const [formData, setFormData] = useState({
    material: "",
    possession_type: "",
    inventory_number: "",
    depreciation_code: "",
    brand: "",
    document_date: "",
    color: "",
    amortized_subaccount: "",
    model: "",
    acquisition_date: "",
    entry_type: "",
    item_code: "",
    series: "",
    status: "",
    item_condition: "",
    description: "",
    type: "Bien",
  });

  const [qrValue, setQrValue] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const articleWithQR = {
      ...formData,
      QR: `http://localhost:3000/articulos/${formData.inventory_number}`,
    };

    axios
      .post("/api/articulos/insertarArticulo", articleWithQR)
      .then((response) => {
        console.log("Artículo creado:", response.data);
        setQrValue(articleWithQR.QR);
      })
      .catch((error) => {
        console.error("Hubo un error al crear el artículo!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="material"
        value={formData.material}
        onChange={handleChange}
        placeholder="Material"
        required
      />
      <input
        type="text"
        name="possession_type"
        value={formData.possession_type}
        onChange={handleChange}
        placeholder="Tipo de Posesión"
      />
      <input
        type="text"
        name="inventory_number"
        value={formData.inventory_number}
        onChange={handleChange}
        placeholder="Número de Inventario"
        required
      />
      <input
        type="text"
        name="depreciation_code"
        value={formData.depreciation_code}
        onChange={handleChange}
        placeholder="Código de Depreciación"
        required
      />
      <input
        type="text"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Marca"
        required
      />
      <input
        type="date"
        name="document_date"
        value={formData.document_date}
        onChange={handleChange}
        placeholder="Fecha del Documento"
        required
      />
      <input
        type="text"
        name="color"
        value={formData.color}
        onChange={handleChange}
        placeholder="Color"
        required
      />
      <input
        type="text"
        name="amortized_subaccount"
        value={formData.amortized_subaccount}
        onChange={handleChange}
        placeholder="Subcuenta Amortizada"
      />
      <input
        type="text"
        name="model"
        value={formData.model}
        onChange={handleChange}
        placeholder="Modelo"
        required
      />
      <input
        type="date"
        name="acquisition_date"
        value={formData.acquisition_date}
        onChange={handleChange}
        placeholder="Fecha de Adquisición"
      />
      <input
        type="text"
        name="entry_type"
        value={formData.entry_type}
        onChange={handleChange}
        placeholder="Tipo de Entrada"
      />
      <input
        type="text"
        name="item_code"
        value={formData.item_code}
        onChange={handleChange}
        placeholder="Código del Artículo"
        required
      />
      <input
        type="text"
        name="series"
        value={formData.series}
        onChange={handleChange}
        placeholder="Serie"
      />
      <input
        type="text"
        name="status"
        value={formData.status}
        onChange={handleChange}
        placeholder="Estado"
        required
      />
      <input
        type="text"
        name="item_condition"
        value={formData.item_condition}
        onChange={handleChange}
        placeholder="Condición del Artículo"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        required
      ></textarea>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="Insumos">Insumos</option>
        <option value="Bien">Bien</option>
      </select>
      <button type="submit">Crear Artículo</button>
      {qrValue && (
        <div>
          <h3>Código QR generado:</h3>
          <QRCode value={qrValue} />
        </div>
      )}
    </form>
  );
}
