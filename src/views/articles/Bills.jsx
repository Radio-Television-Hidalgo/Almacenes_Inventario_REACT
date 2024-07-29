import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../../styles/bills.css";

function Bills() {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/articulos/datosCatalogo");
        const data = await response.json();
        setBills(data.bills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchData();
  }, []);

  const filteredBills = bills.filter((bill) =>
    bill.supplier_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bills-container">
      <Helmet>
        <title>Facturas</title>
      </Helmet>
      <h1 className="bills-title">Bienvenido a las facturas</h1>

      <input
        type="text"
        placeholder="Buscar..."
        className="bills-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bills-table-wrapper">
        <div className="bills-table">
          <div className="bills-row bills-header">
            <div>No. Factura</div>
            <div>Tipo de Compra</div>
            <div>Concepto</div>
            <div>Ver Más</div>
          </div>
          {filteredBills.map((bill) => (
            <div className="bills-row" key={bill.bill_number}>
              <div>{bill.bill_number}</div>
              <div>{bill.purchase_type}</div>
              <div>{bill.concept}</div>
              <div>
                <Link to={`/facturas/${bill.bill_number}`} className="bills-show-more">
                  Ver más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bills;
