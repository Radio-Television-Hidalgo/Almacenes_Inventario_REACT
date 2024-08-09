import { useState, useEffect } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [fullscreenSrc, setFullscreenSrc] = useState(null);

  useEffect(() => {
    fetch("/api/articulos/articulos")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalIsOpen(true);
    setCurrentSlide(0);
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

  const openFullscreen = (src) => {
    setFullscreenSrc(src);
  };

  const closeFullscreen = () => {
    setFullscreenSrc(null);
  };

  const sortTable = (column) => {
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
                <QRCode
                  className="qr-codes"

                  value={article.name}
                  size={64}

                />
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
  className="modal-gr"
  overlayClassName="overlay-gr"
>
  <button onClick={closeModal} className="close-button-gr">
    &times;
  </button>
  {selectedArticle && (
    <div className="modal-content-gr">
      {selectedArticle.photos_entry && (
        <div className="carousel-container-gr">
          <div
            className="carousel-gr"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {selectedArticle.photos_entry.split(",").map((photo, index) => (
              <div key={index} className="carousel-slide-gr">
                <div className="carousel-image-container">
                  <img
                    src={`/api/${photo}`}
                    alt={`Slide ${index}`}
                    className="carousel-photo-gr"
                    onClick={() => openFullscreen(`/api/${photo}`)}
                  />
                </div>
              </div>

            ))}
          </div>
          <button
            className="carousel-prev-gr"
            onClick={() => moveSlide(-1)}
          >
            &#10094;
          </button>
          <button
            className="carousel-next-gr"
            onClick={() => moveSlide(1)}
          >
            &#10095;
          </button>
        </div>
      )}
      
      <div className="modal-body-gr">
        <div className="text-container">
          <div className="text-item name">
            <strong>Nombre:</strong> {selectedArticle.name}
          </div>
          <div className="text-item brand">
            <strong>Marca:</strong> {selectedArticle.brand}
          </div>
          <div className="text-item series">
            <strong>Serie:</strong> {selectedArticle.number_series}
          </div>
          <div className="text-item model">
            <strong>Modelo:</strong> {selectedArticle.model}

          </div>
          <div className="text-item">
            <strong>Fecha de Adquisición:</strong>{" "}
            {selectedArticle.acquisition_date}
          </div>
          <div className="text-item">
            <strong>Estado:</strong> {selectedArticle.status}
          </div>
          <div className="text-item">
            <strong>Descripción:</strong> {selectedArticle.description}
          </div>
          <div className="text-item">
            <strong>Características:</strong>{" "}
            {selectedArticle.caracteristics}
          </div>
          <div className="text-item">
            <strong>Tipo:</strong> {selectedArticle.type}
          </div>
        </div>
      </div>
      <div className="qr-container">
        <QRCode
          className="qr-code"
          value={selectedArticle.name}
          size={100}
        />
      </div>
    </div>
  )}
</Modal>

      {fullscreenSrc && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <img
            src={fullscreenSrc}
            alt="Fullscreen"
            className="fullscreen-image"
          />
        </div>
      )}
    </div>
  );
}

export default GeneralReceipt;
