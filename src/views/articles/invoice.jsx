import React, { useState } from "react";
import '../../styles/invoice.css';

function Invoice() {
  const [formData, setFormData] = useState({
    bill_number: "",
    purchase_type: "",
    concept: "",
    iva: "",
    bill_date: "",
    file: null,
    supplier_name: "",
    quantity: "",
    unit_price: "",
    sub_total: "",
    total: "",
    supplier_phone: "",
    supplier_rfc: "",
    supplier_address: "",
    file_sat: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleFileSatChange = (e) => {
    setFormData({ ...formData, file_sat: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === 'file' || key === 'file_sat') {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:3000/facturas/bills", {
        method: "POST",
        body: data,
        headers: {
          // No es necesario establecer Content-Type para FormData; se establece automáticamente
        },
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }

      const result = await response.json();
      console.log("Factura creada:", result);
    } catch (error) {
      console.error("Error al crear factura:", error);
    }
  };

  return (
    <div className="main-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Número de factura:</label>
            <input
              type="number"
              name="bill_number"
              value={formData.bill_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo de compra:</label>
            <select name="purchase_type" value={formData.purchase_type} onChange={handleChange} required>
              <option value="">Selecciona tipo</option>
              <option value="Adjudicación">Adjudicación</option>
              <option value="Licitacion">Licitación</option>
              <option value="Invitacion a 3">Invitación a 3</option>
              <option value="Donación">Donación</option>
              <option value="Convenio">Convenio</option>
            </select>
          </div>

          <div className="form-group">
            <label>Concepto:</label>
            <input
              type="text"
              name="concept"
              value={formData.concept}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>IVA:</label>
            <input
              type="number"
              name="iva"
              step="0.01"
              value={formData.iva}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="bill_date"
              value={formData.bill_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Archivo:</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Nombre del proveedor:</label>
            <input
              type="text"
              name="supplier_name"
              value={formData.supplier_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Cantidad:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Precio unitario:</label>
            <input
              type="number"
              name="unit_price"
              step="0.01"
              value={formData.unit_price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Subtotal:</label>
            <input
              type="number"
              name="sub_total"
              step="0.01"
              value={formData.sub_total}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Total:</label>
            <input
              type="number"
              name="total"
              step="0.01"
              value={formData.total}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono del proveedor:</label>
            <input
              type="text"
              name="supplier_phone"
              value={formData.supplier_phone}
              onChange={handleChange}
              maxLength="10"
              required
            />
          </div>

          <div className="form-group">
            <label>RFC del proveedor:</label>
            <input
              type="text"
              name="supplier_rfc"
              value={formData.supplier_rfc}
              onChange={handleChange}
              maxLength="13"
              required
            />
          </div>

          <div className="form-group">
            <label>Dirección del proveedor:</label>
            <input
              type="text"
              name="supplier_address"
              value={formData.supplier_address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Archivo SAT:</label>
            <input
              type="file"
              name="file_sat"
              onChange={handleFileSatChange}
              required
            />
           <a href="https://verificacfdi.facturaelectronica.sat.gob.mx" target="_blank" rel="noopener noreferrer">verifica tu factura</a>


          </div>

        </div>

        <button className="submit-button" type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Invoice;
