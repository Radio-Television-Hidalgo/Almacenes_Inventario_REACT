import React, { useState, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import "../../styles/GeneralReceipt.css";

function GeneralReceipt() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/articulos/articulos")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <div class="table-container">
      <h1>Lista de Artículos</h1>
      <table className="article-table">
        <thead>
          <tr>
            <th onClick={() => sortTable("name")}>Nombre</th>
            <th onClick={() => sortTable("brand")}>Marca</th>
            <th onClick={() => sortTable("model")}>Modelo</th>
            <th onClick={() => sortTable("acquisition_date")}>
              Fecha de Adquisición
            </th>
            <th onClick={() => sortTable("number_series")}>Número de Serie</th>
            <th onClick={() => sortTable("status")}>Estado</th>
            <th onClick={() => sortTable("description")}>Descripción</th>
            <th onClick={() => sortTable("caracteristics")}>Características</th>
            <th onClick={() => sortTable("type")}>Tipo</th>
            <th>QR</th>
            <th onClick={() => sortTable("photos_entry")}>Fotos</th>
            <th onClick={() => sortTable("userful_live_id")}>Vida Útil</th>
            <th onClick={() => sortTable("policy_id")}>Póliza</th>
            <th onClick={() => sortTable("bill_id")}>Factura</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td>{article.name}</td>
              <td>{article.brand}</td>
              <td>{article.model}</td>
              <td>{article.acquisition_date}</td>
              <td>{article.number_series}</td>
              <td>{article.status}</td>
              <td>{article.description}</td>
              <td>{article.caracteristics}</td>
              <td>{article.type}</td>
              <td>
                <QRCode value={article.QR} size={50} />
              </td>
              <td>
                {article.photos_entry &&
                  article.photos_entry
                    .split(",")
                    .map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt="Foto del bien"
                        className="photo"
                      />
                    ))}
              </td>
              <td>{article.userful_live_id}</td>
              <td>{article.policy_id}</td>
              <td>{article.bill_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GeneralReceipt;
