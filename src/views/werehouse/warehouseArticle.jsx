import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/warehouseArticle.css";


function WarehouseArticle() {
  const [formData, setFormData] = useState({
    acquisition_type: "",
    name: "",
    description: "",
    type: "",
    entry_date: "",
    asset_type: "",
    harmonizable_code: "",
    accounting_record: "",
    quantity: 0,
    location: "",
    status: false,
    serial_number: "",

    reason: "",
    custody_type: "",
    article_id: "",
    invoice_id: "",
    policy_id: "",
    user_id: "",
    delivery_order: null
  });

  const [chargeIdOptions, setChargeIdOptions] = useState([]);
  const navigate = useNavigate(); // Crear la instancia de navigate

  useEffect(() => {
    const storedArticle = sessionStorage.getItem('article');
    if (storedArticle) {
      const article = JSON.parse(storedArticle);
      setFormData(prevFormData => ({
        ...prevFormData,
        article_id: article.id,
        name: article.name,
        invoice_id: article.bill_id,
        description: article.description,
        policy_id: article.policy_id,
        type: article.type,
        serial_number: article.number_series
      }));
      sessionStorage.removeItem('article'); // Limpiar el almacenamiento después de usarlo
    } else {
      // Obtener los parámetros de la URL si no hay datos en sessionStorage
      const searchParams = new URLSearchParams(window.location.search);
      const newFormData = {};
      searchParams.forEach((value, key) => {
        newFormData[key] = value;
      });
      setFormData(prevFormData => ({
        ...prevFormData,
        ...newFormData
      }));
    }

    fetchChargeId();
  }, []);
  const fetchChargeId = async () => {
    try {
      const response = await fetch("http://localhost:3000/usuario/usuarios");
      const data = await response.json();
      const almacenUsers = data.data.filter(user => user.type === "almacen");
      setChargeIdOptions(almacenUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/almacen/almacen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Error al guardar los datos.");
      }
      const data = await response.json();
      console.log(data);
      // Redirigir al inicio después de guardar los datos
      navigate('/inicio');
    } catch (error) {
      console.error("Error:", error);
      // Mostrar un mensaje de error al usuario si es necesario
    }
  };
  return (
    <form onSubmit={handleSubmit} className="asset-container">
      <div className="asset-form">
        <div className="asset-grid">
          <div className="asset-group">
            <label htmlFor="acquisition_type" className="asset-label">Tipo de adquisición</label>
            <select name="acquisition_type" value={formData.acquisition_type} onChange={handleChange} required className="asset-input">
              <option value="">Selecciona una opción</option>
              <option value="donacion">Donación</option>
              <option value="compra">Compra</option>
              <option value="como dato">Como dato</option>
            </select>
          </div>
          <div className="asset-group">
            <label htmlFor="name" className="asset-label">Nombre</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="asset-input" readOnly />
          </div>
          <div className="asset-group">
            <label htmlFor="description" className="asset-label">Descripción</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} required className="asset-input" readOnly />
          </div>
          <div className="asset-group">
            <label htmlFor="type" className="asset-label">Tipo</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} required className="asset-input" readOnly />
          </div>
          <div className="asset-group">
            <label htmlFor="entry_date" className="asset-label">Fecha de entrada</label>
            <input type="date" name="entry_date" value={formData.entry_date} onChange={handleChange} required className="asset-input" />
          </div>
          <div className="asset-group">
            <label htmlFor="custody_type" className="asset-label">Tipo de resguardo</label>
            <select name="custody_type" value={formData.custody_type} onChange={handleChange} required className="asset-input">
              <option value="">Selecciona una opción</option>
              <option value="almacen">Almacén</option>
              <option value="inventario">Inventario</option>
            </select>
          </div>
          <div className="asset-group">
            <label htmlFor="asset_type" className="asset-label">Tipo de activo</label>
            <select name="asset_type" value={formData.asset_type} onChange={handleChange} required className="asset-input">
              <option value="">Selecciona una opción</option>
              <option value="mueble">Mueble</option>
              <option value="inmueble">Inmueble</option>
            </select>
          </div>
          <div className="asset-group">
            <label htmlFor="harmonizable_code" className="asset-label">Código armonizable</label>
            <input type="text" name="harmonizable_code" value={formData.harmonizable_code} onChange={handleChange} required className="asset-input" />
          </div>
          <div className="asset-group">
            <label htmlFor="accounting_record" className="asset-label">Cuenta contable</label>
            <input type="text" name="accounting_record" value={formData.accounting_record} onChange={handleChange} required className="asset-input" />
          </div>
          <div className="asset-group">
            <label htmlFor="quantity" className="asset-label">Cantidad</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="asset-input" />
          </div>
          <div className="asset-group">
            <label htmlFor="location" className="asset-label">Locación</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="asset-input" />
          </div>
          <div className="asset-group">
            <label htmlFor="serial_number" className="asset-label">Número de serie</label>
            <input type="text" name="serial_number" value={formData.serial_number} onChange={handleChange} required className="asset-input" readOnly />
          </div>
          <div className="asset-group">
            <label htmlFor="reason" className="asset-label">Motivo</label>
            <input type="text" name="reason" value={formData.reason} onChange={handleChange} required className="asset-input" />
          </div>
          <div className="asset-group">
            <label htmlFor="delivery_order" className="asset-label">Orden de entrega</label>
            <input type="file" name="delivery_order" onChange={handleChange} required className="asset-input" />
          </div>
          <div className="asset-group">
            <input type="text" name="article_id" value={formData.article_id} onChange={handleChange} required className="asset-input" hidden />
          </div>
          <div className="asset-group asset-group-checkbox">
            <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} className="asset-input-checkbox" role="switch" hidden />
          </div>
          <div className="asset-group">
            <input type="text" name="invoice_id" value={formData.invoice_id} onChange={handleChange} required className="asset-input" hidden />
          </div>
          <div className="asset-group" >
            <input type="number" name="policy_id" value={formData.policy_id} onChange={handleChange} required className="asset-input" hidden />
          </div>
        </div>
        <button type="submit" className="asset-button">Guardar</button>
      </div>
    </form>
  );
}



export default WarehouseArticle;
