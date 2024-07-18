import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

const ArticleDetails = () => {
  const { inventoryNumber } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/articulos/${inventoryNumber}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setError(error.response ? error.response.data.message : error.message);
      });
  }, [inventoryNumber]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>Cargando...</div>;
  }

  // Asegúrate de que las rutas sean correctas
  const photoUrls = article.photos_entry
    .split(",")
    .map((photo) => "/api/"+`${photo.trim()}`)
  return (
    <div>
      <h1>{article.name}</h1>
      <p>{article.description}</p>
      <div>
        {photoUrls.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            onError={(e) => {
              e.target.onerror = null;
            }}
          />
        ))}
      </div>
      <QRCode value={article.QR} />
    </div>
  );
};

export default ArticleDetails;
