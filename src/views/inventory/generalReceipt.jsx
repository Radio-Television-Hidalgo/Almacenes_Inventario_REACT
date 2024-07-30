import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import "../../styles/GeneralReceipt.css";

// Asegúrate de que el modal esté asociado al elemento raíz
Modal.setAppElement('#root');

function GeneralReceipt() {
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Realiza la petición para obtener los artículos
  useEffect(() => {
    fetch("/api/articulos/articulos") // Asegúrate que esta URL es correcta
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalIsOpen(true);
    setCurrentSlide(0); // Reset the slide index when opening the modal
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedArticle(null);
  };

  const moveSlide = (direction) => {
    if (selectedArticle && selectedArticle.photos_entry) {
      const totalSlides = selectedArticle.photos_entry.split(",").length;
      let newIndex = currentSlide + direction;
      if (newIndex >= totalSlides) newIndex = 0;
      if (newIndex < 0) newIndex = totalSlides - 1;
      setCurrentSlide(newIndex);
    }
  };

  const sortTable = (column) => {
    // Aquí puedes implementar la lógica de ordenamiento
    console.log(`Sorting by ${column}`);
  };

  return (
    <div className="table-container">
      <h1>Lista de Artículos</h1>
      <table className="article-table">
        <thead>
          <tr>
            <th onClick={() => sortTable("name")}>Nombre</th>
            <th onClick={() => sortTable("brand")}>Marca</th>
            <th onClick={() => sortTable("model")}>Modelo</th>
            {/* Descomenta las columnas que necesites */}
            {/* <th onClick={() => sortTable("acquisition_date")}>Fecha de Adquisición</th>
            <th onClick={() => sortTable("number_series")}>Número de Serie</th>
            <th onClick={() => sortTable("status")}>Estado</th>
            <th onClick={() => sortTable("description")}>Descripción</th>
            <th onClick={() => sortTable("caracteristics")}>Características</th>
            <th onClick={() => sortTable("type")}>Tipo</th> */}
            <th>QR</th>
            <th></th>
            {/* <th onClick={() => sortTable("photos_entry")}>Fotos</th>
            <th onClick={() => sortTable("userful_live_id")}>Vida Útil</th>
            <th onClick={() => sortTable("policy_id")}>Póliza</th>
            <th onClick={() => sortTable("bill_id")}>Factura</th> */}
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td>{article.name}</td>
              <td>{article.brand}</td>
              <td>{article.model}</td>
              {/* <td>{article.acquisition_date}</td>
              <td>{article.number_series}</td>
              <td>{article.status}</td>
              <td>{article.description}</td>
              <td>{article.caracteristics}</td>
              <td>{article.type}</td> */}
              <td>
                <img src={article.QR} alt="Código QR" className="qr-image" />
              </td>
              <td>
                <button onClick={() => openModal(article)}>Ver más</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del Artículo"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className="close-button">×</button>
        {selectedArticle && (
          <div className="modal-content">
            <div className="modal-header">
              <img src={selectedArticle.QR} alt="Código QR" className="qr-image" />
            </div>
            <div className="modal-body">
              <h2>{selectedArticle.name}</h2>
              <p><strong>Marca:</strong> {selectedArticle.brand}</p>
              <p><strong>Fecha de Adquisición:</strong> {selectedArticle.acquisition_date}</p>
              <p><strong>Número de Serie:</strong> {selectedArticle.number_series}</p>
              <p><strong>Estado:</strong> {selectedArticle.status}</p>
              <p><strong>Descripción:</strong> {selectedArticle.description}</p>
              <p><strong>Características:</strong> {selectedArticle.caracteristics}</p>
              <p><strong>Tipo:</strong> {selectedArticle.type}</p>
              <div className="carousel-container">
                {selectedArticle.photos_entry && (
                  <div className="carousel">
                    {selectedArticle.photos_entry.split(",").map((photo, index) => (
                      <div key={index} className="carousel-slide" style={{ display: currentSlide === index ? 'block' : 'none' }}>
                        <img
                          src={`/api/${photo}`}
                          alt={`Foto ${index + 1}`}
                          className="carousel-photo"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <button className="carousel-prev" onClick={() => moveSlide(-1)}>‹</button>
                <button className="carousel-next" onClick={() => moveSlide(1)}>›</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default GeneralReceipt;
