import React, { useState, useEffect } from "react";

function WarehouseArticle() {
  const [formData, setFormData] = useState({
    acquisition_type: "",
    status: false,
    warehouses_number: "",
    entry_date: "",
    asset_type: "",
    harmonizable_code: "",
    accumulated_depreciation_accounting_record: "",
    stock: 0,
    user_charge_id: "",
    invoice_id: "",
    article_id: ""
  });
  
  const [chargeIdOptions, setChargeIdOptions] = useState([]);

  useEffect(() => {
    const fetchChargeId = async () => {
      try {
        const response = await fetch("http://localhost:3000/usuario/usuarios");
        const data = await response.json();
        
        // Filtrar los usuarios cuyo campo type sea 'almacen'
        const almacenUsers = data.data.filter(user => user.type === "almacen");
        
        // Guardar los usuarios en el estado
        setChargeIdOptions(almacenUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChargeId();

    // Obtener los parámetros de la URL
    const searchParams = new URLSearchParams(window.location.search);
    const invoiceId = searchParams.get('bill_id');
    const articleId = searchParams.get('id');
    
    // Actualizar el estado con los valores de los parámetros de la URL
    setFormData(prevFormData => ({
      ...prevFormData,
      invoice_id: invoiceId || "", // Si no hay invoiceId, se asigna una cadena vacía
      article_id: articleId || ""  // Si no hay articleId, se asigna una cadena vacía
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enviar los datos al servidor
    try{
      const response = await fetch("http://localhost:3000/almacen/almacen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);

    }catch(error){
      console.log(data);
      console.error(error);
  };
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tipo de adquisición</label>
        <select name="acquisition_type" value={formData.acquisition_type} onChange={handleChange} required>
          <option value="">Selecciona una opción</option>
          <option value="donacion">Donación</option>
          <option value="compra">Compra</option>
          <option value="como dato">Como dato</option>
        </select>
      </div>

      <div>
        <label>Estatus</label>
        <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} />
      </div>

      <div>
        <label>Número de almacén</label>
        <input type="text" name="warehouses_number" value={formData.warehouses_number} onChange={handleChange} required />
      </div>

      <div>
        <label>Fecha de entrada</label>
        <input type="date" name="entry_date" value={formData.entry_date} onChange={handleChange} required />
      </div>

      <div>
        <label>Tipo de activo</label>
        <select name="asset_type" value={formData.asset_type} onChange={handleChange} required>
          <option value="">Selecciona una opción</option>
          <option value="mueble">Mueble</option>
          <option value="inmueble">Inmueble</option>
        </select>
      </div>

      <div>
        <label>Código armonizable</label>
        <input type="text" name="harmonizable_code" value={formData.harmonizable_code} onChange={handleChange} required />
      </div>

      <div>
        <label>Cuenta contable de depreciación acumulada</label>
        <input type="text" name="accumulated_depreciation_accounting_record" value={formData.accumulated_depreciation_accounting_record} onChange={handleChange} required />
      </div>

      <div>
        <label>Stock</label>
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
      </div>

      <div>
        <label>ID del encargado</label>
        <select name="user_charge_id" value={formData.user_charge_id} onChange={handleChange} required>
          <option value="">Selecciona una opción</option>
          {chargeIdOptions.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>ID de la factura</label>
        <input type="number" name="invoice_id" value={formData.invoice_id} onChange={handleChange} required />
      </div>

      <div>
        <label>ID del artículo</label>
        <input type="number" name="article_id" value={formData.article_id} onChange={handleChange} required />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default WarehouseArticle;
