import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const styles = {
  card: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "1.5rem",
    color: "#333",
  },
  paragraph: {
    margin: "10px 0",
    color: "#555",
  },
  strong: {
    color: "#000",
  },
  pdfContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  pdf: {
    width: "100%",
    height: "600px",
  },
};

function PolicyDetail() {
  const { policyId } = useParams();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await fetch(`/api/articulos/polizas/${policyId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch policy");
        }
        const data = await response.json();
        setPolicy(data);
        setLoading(false);

        if (data.file) {
          // Fetch the PDF file if the file property is available
          const pdfResponse = await fetch(`/api/policy/${data.file}`);
          const pdfBlob = await pdfResponse.blob();
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setPdfUrl(pdfUrl);
        }
      } catch (error) {
        console.error("Error fetching policy details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [policyId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!policy) {
    return <div>No se encontró la póliza</div>;
  }

  // Formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div style={styles.card}>
      <h1 style={styles.heading}>Detalles de la Póliza</h1>
      <p style={styles.paragraph}>
        <strong style={styles.strong}>Descripción:</strong> {policy.description}
      </p>
      <p style={styles.paragraph}>
        <strong style={styles.strong}>Cobertura:</strong> {policy.coverage}
      </p>
      <p style={styles.paragraph}>
        <strong style={styles.strong}>Tipo:</strong> {policy.type}
      </p>
      <p style={styles.paragraph}>
        <strong style={styles.strong}>Prima:</strong> {policy.premium}
      </p>
      <p style={styles.paragraph}>
        <strong style={styles.strong}>Deducible:</strong> {policy.deductible}
      </p>
      <p style={styles.paragraph}>
        <strong style={styles.strong}>Límites de Indemnización:</strong>{" "}
        {policy.indemnity_limits}
      </p>
      <p style={styles.paragraph}>
        <strong style={styles.strong}>Periodo de Vigencia:</strong>{" "}
        {formatDate(policy.validity_period)}
      </p>
      <p style={styles.paragraph}>
        <strong style={styles.strong}>Cláusulas de Exclusión:</strong>{" "}
        {policy.exclusion_clauses}
      </p>
      <p style={styles.paragraph}>
        <strong style={styles.strong}>Fecha:</strong> {formatDate(policy.date)}
      </p>
      <p style={styles.paragraph}>
        <strong style={styles.strong}>Cantidad:</strong> {policy.quantity}
      </p>

      {pdfUrl ? (
        <div style={styles.pdfContainer}>
          <iframe
            style={styles.pdf}
            src={pdfUrl}
            title="Póliza PDF"
            frameBorder="0"
          >
            Este navegador no soporta la visualización de PDF.
          </iframe>
        </div>
      ) : (
        <p>No se encontró el PDF de la póliza.</p>
      )}
    </div>
  );
}

export default PolicyDetail;
