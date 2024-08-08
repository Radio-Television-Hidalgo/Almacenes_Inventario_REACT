import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../articles/ModalPolicy"; // Asegúrate de tener un modal similar para mostrar el éxito
import "../../styles/subArch.css"

function ShoppingForm() {
  const [formData, setFormData] = useState({
    quotation1: null,
    quotation2: null,
    quotation3: null,
    comparative_chart: null,
    purchase_order: null,
    bill_id: "",
  });

  const [bills, setBills] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get("/api/articulos/datosCatalogo");
        setBills(response.data.bills);
      } catch (error) {
        console.error("Error al obtener los datos del catálogo:", error);
      }
    };

    fetchCatalogs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post("/api/shopping", data);
      console.log("Success:", response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    window.location.reload();
  };

  return (
    <div className="shopping-form-container">
      <form onSubmit={handleSubmit} className="shopping-form">
        <div className="shopping-form-grid">
          <div className="shopping-form-group">
            <label className="shopping-label">Cotización 1</label>
            <input
              type="file"
              name="quotation1"
              className="shopping-input"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="shopping-form-group">
            <label className="shopping-label">Cotización 2</label>
            <input
              type="file"
              name="quotation2"
              className="shopping-input"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="shopping-form-group">
            <label className="shopping-label">Cotización 3</label>
            <input
              type="file"
              name="quotation3"
              className="shopping-input"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="shopping-form-group">
            <label className="shopping-label">Cuadro Comparativo</label>
            <input
              type="file"
              name="comparative_chart"
              className="shopping-input"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="shopping-form-group">
            <label className="shopping-label">Orden de Compra</label>
            <input
              type="file"
              name="purchase_order"
              className="shopping-input"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="shopping-form-group">
            <label className="shopping-label">Número de Factura</label>
            <select
              name="bill_id"
              className="shopping-select"
              value={formData.bill_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Seleccione una factura</option>
              {bills.map(bill => (
                <option key={bill.id} value={bill.id}>{bill.bill_number}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="shopping-button">Subir Documentos</button>
      </form>

      <Modal show={modalVisible} handleClose={closeModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#691b31" className="bi bi-file-earmark-medical-fill" viewBox="0 0 16 16">
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-3 2v.634l.549-.317a.5.5 0 1 1 .5.866L7 7l.549.317a.5.5 0 1 1-.5.866L6.5 7.866V8.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L5 7l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V5.5a.5.5 0 1 1 1 0m-2 4.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1m0 2h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1"/>
        </svg>
        <h2>Documentos subidos correctamente</h2>
      </Modal>
    </div>
  );
}

export default ShoppingForm;
