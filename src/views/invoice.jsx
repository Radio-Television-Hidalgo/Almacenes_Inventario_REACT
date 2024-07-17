import React from "react";
import { Link } from "react-router-dom";

function invoice() {
    const [formData, setFormData] = React.useState({
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
      });
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
        const handleFileChange = (e) => {
            setFormData({ ...formData, file: e.target.files[0] });
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            
            console.log(formData);
        }
    
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Número de factura:</label>
            <input
              type="number"
              name="bill_number"
              value={formData.bill_number}
              onChange={handleChange}
              required
            />
          </div>
    
          <div>
            <label>Tipo de compra:</label>
            <select name="purchase_type" value={formData.purchase_type} onChange={handleChange} required>
              <option value="">Select type</option>
              <option value="Adjudicación">Adjudicación</option>
              <option value="Licitacion">Licitación</option>
              <option value="Invitacion a 3">Invitación a 3</option>
              <option value="Donación">Donación</option>
              <option value="Convenio">Convenio</option>
            </select>
          </div>
    
          <div>
            <label>Concepto:</label>
            <input
              type="text"
              name="concept"
              value={formData.concept}
              onChange={handleChange}
              required
            />
          </div>
    
          <div>
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
    
          <div>
            <label>Fecha:</label>
            <input
              type="date"
              name="bill_date"
              value={formData.bill_date}
              onChange={handleChange}
              required
            />
          </div>
    
          <div>
            <label>Archivo:</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              required
            />
          </div>
    
          <div>
            <label>Nombre del proveedor:</label>
            <input
              type="text"
              name="supplier_name"
              value={formData.supplier_name}
              onChange={handleChange}
              required
            />
          </div>
    
          <div>
            <label>Cantidad:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
    
          <div>
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
    
          <div>
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
    
          <div>
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
    
          <div>
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
    
          <div>
            <label> RFC del proveedor:</label>
            <input
              type="text"
              name="supplier_rfc"
              value={formData.supplier_rfc}
              onChange={handleChange}
              maxLength="13"
              required
            />
          </div>
    
          <div>
            <label>Dirección del proveedor:</label>
            <input
              type="text"
              name="supplier_address"
              value={formData.supplier_address}
              onChange={handleChange}
            />
          </div>
    
          <button type="submit">Submit</button>
        </form>
      );
}

export default invoice;