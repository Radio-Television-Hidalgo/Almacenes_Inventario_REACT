import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WarehouseArticle() {
  const [formData, setFormData] = useState({
    acquisition_type: "",
    name: "",
    description: "",
    type: "",
    entry_date: "",
    exit_date: "",
    asset_type: "",
    harmonizable_code: "",
    accounting_record: "",
    quantity: 0,
    location: "",
    status: false,
    serial_number: "",
    warehouses_number: "",
    inventory_number: "",
    reason: "",
    custody_type: "",
    article_id: "",
    invoice_id: "",
    policy_id: "",
    user_id: ""
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
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.column}>
        <div style={styles.field}>
          <label style={styles.label}>Tipo de adquisición</label>
          <select name="acquisition_type" value={formData.acquisition_type} onChange={handleChange} required style={styles.select}>
            <option value="">Selecciona una opción</option>
            <option value="donacion">Donación</option>
            <option value="compra">Compra</option>
            <option value="como dato">Como dato</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Descripción</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tipo</label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Fecha de entrada</label>
          <input type="date" name="entry_date" value={formData.entry_date} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Fecha de salida</label>
          <input type="date" name="exit_date" value={formData.exit_date} onChange={handleChange} style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tipo de activo</label>
          <select name="asset_type" value={formData.asset_type} onChange={handleChange} required style={styles.select}>
            <option value="">Selecciona una opción</option>
            <option value="mueble">Mueble</option>
            <option value="inmueble">Inmueble</option>
          </select>
        </div>
      </div>

      <div style={styles.column}>
        <div style={styles.field}>
          <label style={styles.label}>Código armonizable</label>
          <input type="text" name="harmonizable_code" value={formData.harmonizable_code} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Cuenta contable</label>
          <input type="text" name="accounting_record" value={formData.accounting_record} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Cantidad</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Locación</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Estatus</label>
          <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} style={styles.checkbox} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Número de serie</label>
          <input type="text" name="serial_number" value={formData.serial_number} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Número de almacén</label>
          <input type="text" name="warehouses_number" value={formData.warehouses_number} onChange={handleChange} required style={styles.input} />
        </div>
      </div>

      <div style={styles.column}>
        <div style={styles.field}>
          <label style={styles.label}>Número de inventario</label>
          <input type="text" name="inventory_number" value={formData.inventory_number} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Motivo</label>
          <input type="text" name="reason" value={formData.reason} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tipo de resguardo</label>
          <select name="custody_type" value={formData.custody_type} onChange={handleChange} required style={styles.select}>
            <option value="">Selecciona una opción</option>
            <option value="almacen">Almacén</option>
            <option value="inventario">Inventario</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>ID del artículo</label>
          <input type="" name="article_id" value={formData.article_id} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>ID de la factura</label>
          <input type="" name="invoice_id" value={formData.invoice_id} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>ID de la póliza</label>
          <input type="number" name="policy_id" value={formData.policy_id} onChange={handleChange} required style={styles.input} />
        </div>
      </div>

      <button type="submit" style={styles.button}>Guardar</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "10px",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  checkbox: {
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  }
};

export default WarehouseArticle;
