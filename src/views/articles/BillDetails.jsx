import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { PulseLoader } from 'react-spinners';

// Configura el modal para el acceso a la raíz
Modal.setAppElement('#root');

const styles = {
  card: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '1.8rem',
    color: '#333',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '10px',
  },
  paragraph: {
    margin: '12px 0',
    fontSize: '1rem',
    color: '#555',
  },
  strong: {
    color: '#000',
    fontWeight: 'bold',
  },
  pdfContainer: {
    marginTop: '30px',
    textAlign: 'center',
  },
  pdf: {
    width: '100%',
    height: '700px',
    border: 'none',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
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
  const [pdfUrlFile, setPdfUrlFile] = useState(null);
  const [pdfUrlSat, setPdfUrlSat] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await fetch(`/api/articulos/datosCatalogo/${billNumber}`);
        const data = await response.json();
        setBill(data);
        setLoading(false);
        setModalIsOpen(false);
        
        if (data.file) {
          const pdfResponseFile = await fetch(`/api/bills/${data.file}`);
          const pdfBlobFile = await pdfResponseFile.blob();
          const pdfUrlFile = URL.createObjectURL(pdfBlobFile);
          setPdfUrlFile(pdfUrlFile);
        }

        if (data.file_sat) {
          const pdfResponseSat = await fetch(`/api/bills/${data.file_sat}`);
          const pdfBlobSat = await pdfResponseSat.blob();
          const pdfUrlSat = URL.createObjectURL(pdfBlobSat);
          setPdfUrlSat(pdfUrlSat);
        }
      } catch (error) {
        console.error('Error fetching bill details:', error);
        setLoading(false);
        setModalIsOpen(false);
      }
    };

    fetchBill();
  }, [billNumber]);

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
    <div style={styles.card}>
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

      {pdfUrlFile ? (
        <div style={styles.pdfContainer}>
          <h2 style={styles.heading}>Factura PDF</h2>
          <iframe
            style={styles.pdf}
            src={pdfUrlFile}
            title="Factura PDF"
          >
            Este navegador no soporta la visualización de PDF.
          </iframe>
        </div>
      ) : (
        <p style={{ textAlign: 'center', padding: '10px' }}>No se encontró el PDF de la factura.</p>
      )}

      {pdfUrlSat ? (
        <div style={styles.pdfContainer}>
          <h2 style={styles.heading}>Archivo SAT PDF</h2>
          <iframe
            style={styles.pdf}
            src={pdfUrlSat}
            title="Archivo SAT PDF"
          >
            Este navegador no soporta la visualización de PDF.
          </iframe>
        </div>
      ) : (
        <p style={{ textAlign: 'center', padding: '10px' }}>No se encontró el PDF SAT de la factura.</p>
      )}
    </div>
  );
};

export default BillDetails;
