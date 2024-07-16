import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

const articleDetails = () => {
  const { inventoryNumber } = useParams(); 
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api"+`/articulos/${inventoryNumber}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        setError(error.response ? error.response.data.message : error.message);
      });
  }, [inventoryNumber]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{article.material}</h1>
      <p>{article.description}</p>
      {/* Renderiza más información del artículo según sea necesario */}
      <div>
        <h3>Código QR:</h3>
        <QRCode value={article.QR} />
      </div>
    </div>
  );
};

export default articleDetails;
