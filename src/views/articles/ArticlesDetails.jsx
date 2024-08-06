import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Collapse } from 'react-collapse';


const ArticleDetails = () => {
  const { inventoryNumber } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [policyFileUrl, setPolicyFileUrl] = useState('');
  const [billFileUrl, setBillFileUrl] = useState('');
  const [billFileSatUrl, setBillFileSatUrl] = useState('');

  const [isOpen, setIsOpen] = useState({
    general: false,
    internal: false,
    usefulLife: false,
    files: false,
  });

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetch(`/api/articulos/inventory/${inventoryNumber}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del artículo");
        }
        const data = await response.json();
        setArticleData(data);
        setPolicyFileUrl(`/api/policy/${data.articleData.articlePolicy?.file}`);
        setBillFileUrl(`/api/bills/${data.articleData.articleBill?.file}`);
        setBillFileSatUrl(`/api/bills/${data.articleData.articleBill?.file_sat}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, [inventoryNumber]);

  const styles = {
    container: {
      padding: "20px",
      margin: "0 auto",
      maxWidth: "800px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    },
    heading: {
      borderBottom: "2px solid #BC955B",
      paddingBottom: "10px",
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    section: {
      marginBottom: "20px",
      
      
    },
    label: {
      fontWeight: "bold",
      color: "#666"
    },
    value: {
      marginLeft: "10px",

    },
    fileContainer: {
      marginBottom: "20px"
    },
    fileTitle: {
      fontWeight: "bold",
      marginBottom: "10px"
      
    },
    file: {
      width: "100%",
      height: "500px",
      border: "none"
    },
    image: {
      maxWidth: "100%",
      height: "auto"
    },
    loaderContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    },
    icon: {
      transition: "transform 0.3s",
      backgroundColor: "#691B31",
      color: "white",
      borderRadius: "100px"
    },
    iconRotated: {
      transform: "rotate(180deg)",

    },
    opcion:{
      textAlign: "center",
    }
  };

  const toggleSection = (section) => {
    setIsOpen(prevState => ({ ...prevState, [section]: !prevState[section] }));
  };

  if (isLoading) {
    return (
      <div style={styles.loaderContainer}>
        <ClipLoader color="#BC955B" size={60} />
      </div>
    );
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>Error: {error}</p>;
  }

  if (!articleData) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>No se encontraron datos para el artículo.</p>;
  }

  const renderIcon = (section) => (
    <svg
      style={{
        ...styles.icon,
        ...(isOpen[section] ? styles.iconRotated : {})
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-chevron-down"
      backgroundColor="red"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  return (
    <div>
      <br />
    <div style={styles.container}>
      <h3 style={styles.opcion}>Selecciona una opción</h3>
      <br />
      <h2 style={styles.heading} onClick={() => toggleSection('general')}>
        Detalles del Artículo {renderIcon('general')}
      </h2>
      <Collapse isOpened={isOpen.general}>
        <div style={styles.section}>
          <p><span style={styles.label}>Nombre:</span><span style={styles.value}> {articleData.name}</span></p>
          <p><span style={styles.label}>Descripción:</span><span style={styles.value}> {articleData.description}</span></p>
          <p><span style={styles.label}>Tipo:</span><span style={styles.value}> {articleData.type}</span></p>
          <p><span style={styles.label}>Fecha de Entrada:</span><span style={styles.value}> {new Date(articleData.entry_date).toLocaleDateString()}</span></p>
          <p><span style={styles.label}>Ubicación:</span><span style={styles.value}> {articleData.location}</span></p>
          <p><span style={styles.label}>Número de Serie:</span><span style={styles.value}> {articleData.serial_number}</span></p>
          <p><span style={styles.label}>Razón:</span><span style={styles.value}> {articleData.reason}</span></p>
        </div>
      </Collapse>

      <h2 style={styles.heading} onClick={() => toggleSection('internal')}>
        Detalles del Artículo Interno {renderIcon('internal')}
      </h2>
      <Collapse isOpened={isOpen.internal}>
        <div style={styles.section}>
          <p><span style={styles.label}>Marca:</span><span style={styles.value}> {articleData.articleData.brand}</span></p>
          <p><span style={styles.label}>Modelo:</span><span style={styles.value}> {articleData.articleData.model}</span></p>
          <p><span style={styles.label}>Estado:</span><span style={styles.value}> {articleData.articleData.status}</span></p>
          <p><span style={styles.label}>Características:</span><span style={styles.value}> {articleData.articleData.caracteristics}</span></p>
        </div>
      </Collapse>

      <h2 style={styles.heading} onClick={() => toggleSection('usefulLife')}>
        Vida Útil {renderIcon('usefulLife')}
      </h2>
      <Collapse isOpened={isOpen.usefulLife}>
        <div style={styles.section}>
          <p><span style={styles.label}>Cuenta:</span><span style={styles.value}> {articleData.articleData.usefulLive.account}</span></p>
          <p><span style={styles.label}>Partida:</span><span style={styles.value}> {articleData.articleData.usefulLive.item}</span></p>
          <p><span style={styles.label}>Concepto:</span><span style={styles.value}> {articleData.articleData.usefulLive.concept}</span></p>
          <p><span style={styles.label}>Vida Útil (años):</span><span style={styles.value}> {articleData.articleData.usefulLive.useful_life_years}</span></p>
          <p><span style={styles.label}>Depreciación Mensual (%):</span><span style={styles.value}> {articleData.articleData.usefulLive.monthly_depreciation_percentage}</span></p>
          <p><span style={styles.label}>Depreciación Anual (%):</span><span style={styles.value}> {articleData.articleData.usefulLive.annual_depreciation_percentage}</span></p>
        </div>
      </Collapse>

      <h2 style={styles.heading} onClick={() => toggleSection('files')}>
        Archivos Adjuntos {renderIcon('files')}
      </h2>
      <Collapse isOpened={isOpen.files}>
        <div style={styles.fileContainer}>
          {policyFileUrl && (
            <>
              <p style={styles.fileTitle}>Archivo de Póliza:</p>
              <iframe src={policyFileUrl} style={styles.file} title="Archivo de Póliza"></iframe>
            </>
          )}
          {billFileUrl && (
            <>
              <p style={styles.fileTitle}>Archivo de Factura:</p>
              <iframe src={billFileUrl} style={styles.file} title="Archivo de Factura"></iframe>
            </>
          )}
          {billFileSatUrl && (
            <>
              <p style={styles.fileTitle}>Archivo SAT de Factura:</p>
              <iframe src={billFileSatUrl} style={styles.file} title="Archivo SAT de Factura"></iframe>
            </>
          )}
        </div>
      </Collapse>
    </div>
    <br />
    </div>
  );
};

export default ArticleDetails;
