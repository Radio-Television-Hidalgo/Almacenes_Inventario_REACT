import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { PulseLoader } from 'react-spinners';
import "../../styles/FacturasInfo.css";

// Configura el modal para el acceso a la raíz
Modal.setAppElement('#root');

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    flexWrap: 'wrap', // Permite que los elementos se ajusten en pantallas más pequeñas
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    flex: '1 1 45%', // Se ajusta el ancho de las tarjetas para que ocupen hasta el 45% del contenedor
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '1.8rem',
    color: '#333',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '10px',
  },
  paragraph: {
    margin: "10px 0",
    padding: "10px",
    borderBottom: "1px solid #eee",
    color: "#555",
  },
  strong: {
    color: '#000',
    fontWeight: 'bold',
  },
  pdfContainer: {
    position: 'relative',
    textAlign: 'center',
  },
  pdf: {
    width: '100%',
    height: '700px',
    border: 'none',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#691B31',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '50%',
    zIndex: 1,
  },
  prevButton: {
    left: '10px',
  },
  nextButton: {
    right: '10px',
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px', // Tamaño del modal
    maxWidth: '90vw',
    height: '200px',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#fff',
    border: 'none',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    margin: '0 auto', // Asegura que el modal esté centrado
  },
  loader: {
    marginBottom: '20px',
  },
  loadingText: {
    marginTop: '10px',
    color: '#333',
  },
};

const BillDetails = () => {
  const { billNumber } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await fetch(`/api/articulos/datosCatalogo/${billNumber}`);
        const data = await response.json();
        setBill(data);
        setLoading(false);
        setModalIsOpen(false);
        
        const urls = [];
        if (data.file) {
          const pdfResponseFile = await fetch(`/api/bills/${data.file}`);
          const pdfBlobFile = await pdfResponseFile.blob();
          const pdfUrlFile = URL.createObjectURL(pdfBlobFile);
          urls.push({ url: pdfUrlFile, label: "Factura PDF" });
        }

        if (data.file_sat) {
          const pdfResponseSat = await fetch(`/api/bills/${data.file_sat}`);
          const pdfBlobSat = await pdfResponseSat.blob();
          const pdfUrlSat = URL.createObjectURL(pdfBlobSat);
          urls.push({ url: pdfUrlSat, label: "Archivo SAT PDF" });
        }

        setPdfUrls(urls);
      } catch (error) {
        console.error('Error fetching bill details:', error);
        setLoading(false);
        setModalIsOpen(false);
      }
    };

    fetchBill();
  }, [billNumber]);

  const handleNextPdf = () => {
    setCurrentPdfIndex((prevIndex) => (prevIndex + 1) % pdfUrls.length);
  };

  const handlePrevPdf = () => {
    setCurrentPdfIndex((prevIndex) => (prevIndex - 1 + pdfUrls.length) % pdfUrls.length);
  };

  if (loading) {
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: styles.modalOverlay,
          content: styles.modalContent,
        }}
      >
        <div style={styles.loader}>
          <PulseLoader color="#3498db" />
        </div>
        <p style={styles.loadingText}>Cargando...</p>
      </Modal>
    );
  }

  if (!bill) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>No se encontró la factura</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div style={styles.container}>
      <div className='card' style={styles.card}>
        <h1 style={styles.heading}>Detalles de la Factura</h1>
        <p style={styles.paragraph}><strong style={styles.strong}>Número de Factura:</strong> {bill.bill_number}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>Tipo de Compra:</strong> {bill.purchase_type}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>Concepto:</strong> {bill.concept}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>IVA:</strong> {bill.iva}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>Fecha de la Factura:</strong> {formatDate(bill.bill_date)}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>Nombre del Proveedor:</strong> {bill.supplier_name}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>Cantidad:</strong> {bill.quantity}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>Precio Unitario:</strong> {bill.unit_price}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>Subtotal:</strong> {bill.sub_total}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>Total:</strong> {bill.total}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>Teléfono del Proveedor:</strong> {bill.supplier_phone}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>RFC del Proveedor:</strong> {bill.supplier_rfc}</p>
        <p style={styles.paragraph}><strong style={styles.strong}>Dirección del Proveedor:</strong> {bill.supplier_address}</p>
      </div>

      {pdfUrls.length > 0 && (
        <div style={styles.card}>
          <div style={styles.pdfContainer}>
            {pdfUrls.length > 0 && (
              <div>
                <h2 style={styles.heading}>{pdfUrls[currentPdfIndex].label}</h2>
                <iframe
                  style={styles.pdf}
                  src={pdfUrls[currentPdfIndex].url}
                  title={`PDF ${currentPdfIndex + 1}`}
                >
                  Este navegador no soporta la visualización de PDF.
                </iframe>
                {pdfUrls.length > 1 && (
                  <>
                    <button
                      style={{ ...styles.navButton, ...styles.prevButton }}
                      onClick={handlePrevPdf}
                    >
                      &lt;
                    </button>
                    <button
                      style={{ ...styles.navButton, ...styles.nextButton }}
                      onClick={handleNextPdf}
                    >
                      &gt;
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;
