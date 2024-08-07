import React, { useState, useEffect } from "react";

function ShoppingForm() {
  const [quotation1, setQuotation1] = useState(null);
  const [quotation2, setQuotation2] = useState(null);
  const [quotation3, setQuotation3] = useState(null);
  const [comparativeChart, setComparativeChart] = useState(null);
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [billId, setBillId] = useState("");
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await fetch("/api/articulos/datosCatalogo");
        const data = await response.json();
        setBills(data.bills);
        console.log(data.bills)
      } catch (error) {
        console.error("Error al obtener los datos del catálogo:", error);
      }
    };

    fetchCatalogs();
  }, []);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("quotation1", quotation1);
    formData.append("quotation2", quotation2);
    formData.append("quotation3", quotation3);
    formData.append("comparative_chart", comparativeChart);
    formData.append("purchase_order", purchaseOrder);
    formData.append("bill_id", billId);

    try {
      const response = await fetch("/api/shopping", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Documentos subidos con éxito");
      } else {
        alert("Error al subir los documentos");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al subir los documentos");
    }
  };

  return (
    <div>
      <h2>Subir Documentos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="quotation1">Cotización 1</label>
          <input
            type="file"
            id="quotation1"
            onChange={(e) => handleFileChange(e, setQuotation1)}
            required
          />
        </div>
        <div>
          <label htmlFor="quotation2">Cotización 2</label>
          <input
            type="file"
            id="quotation2"
            onChange={(e) => handleFileChange(e, setQuotation2)}
            required
          />
        </div>
        <div>
          <label htmlFor="quotation3">Cotización 3</label>
          <input
            type="file"
            id="quotation3"
            onChange={(e) => handleFileChange(e, setQuotation3)}
            required
          />
        </div>
        <div>
          <label htmlFor="comparative_chart">Cuadro Comparativo</label>
          <input
            type="file"
            id="comparative_chart"
            onChange={(e) => handleFileChange(e, setComparativeChart)}
            required
          />
        </div>
        <div>
          <label htmlFor="purchase_order">Orden de Compra</label>
          <input
            type="file"
            id="purchase_order"
            onChange={(e) => handleFileChange(e, setPurchaseOrder)}
            required
          />
        </div>
        <div>
          <label htmlFor="bill_id">Número de Factura</label>
          <select
            id="bill_id"
            value={billId}
            onChange={(e) => setBillId(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccione una factura
            </option>
            {bills.map((bill) => (
              <option key={bill.id} value={bill.id}>
                {bill.bill_number}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Subir Documentos</button>
      </form>
    </div>
  );
}

export default ShoppingForm;
