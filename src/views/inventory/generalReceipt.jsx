import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import QRCode from "react-qr-code";
import "../../styles/GeneralReceipt.css";

// Asegúrate de que el modal esté asociado al elemento raíz
Modal.setAppElement("#root");

function GeneralReceipt() {
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredArticles = articles.filter((article) =>
    article.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <br />
      <br />
      <table className="article-table">
        <thead>
          <tr>
            <th onClick={() => sortTable("name")}>Nombre</th>
            <th onClick={() => sortTable("brand")}>Marca</th>
            <th onClick={() => sortTable("model")}>Modelo</th>
            <th>QR</th>
            <th>Ver más</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((article, index) => (
            <tr key={index}>
              <td>{article.name}</td>
              <td>{article.brand}</td>
              <td>{article.model}</td>
              <td>
                <QRCode className="qr-code" value={article.QR} />
              </td>
              <td className="button-container">
                <button
                  className="ver-mas-button"
                  onClick={() => openModal(article)}
                >
                  Ver más
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del Artículo"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className="close-button">
          ×
        </button>
        {selectedArticle && (
          <div className="modal-content">
            <div className="modal-header">
              <QRCode className="qr-code" value={selectedArticle.QR} />
            </div>
            <div className="modal-body">
              <h2>{selectedArticle.name}</h2>
              <p>
                <strong>Marca:</strong> {selectedArticle.brand}
              </p>
              <p>
                <strong>Fecha de Adquisición:</strong>{" "}
                {selectedArticle.acquisition_date}
              </p>
              <p>
                <strong>Número de Serie:</strong>{" "}
                {selectedArticle.number_series}
              </p>
              <p>
                <strong>Estado:</strong> {selectedArticle.status}
              </p>
              <p>
                <strong>Descripción:</strong> {selectedArticle.description}
              </p>
              <p>
                <strong>Características:</strong>{" "}
                {selectedArticle.caracteristics}
              </p>
              <p>
                <strong>Tipo:</strong> {selectedArticle.type}
              </p>
              <div className="carousel-container">
                {selectedArticle.photos_entry && (
                  <div className="carousel">
                    {selectedArticle.photos_entry
                      .split(",")
                      .map((photo, index) => (
                        <div
                          key={index}
                          className="carousel-slide"
                          style={{
                            display: currentSlide === index ? "block" : "none",
                          }}
                        >
                          <img
                            src={`/api/uploads/${photo}`}
                            alt={`Foto ${index + 1}`}
                            className="carousel-photo"
                          />
                        </div>
                      ))}
                  </div>
                )}
                <button className="carousel-prev" onClick={() => moveSlide(-1)}>
                  ‹
                </button>
                <button className="carousel-next" onClick={() => moveSlide(1)}>
                  ›
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default GeneralReceipt;
