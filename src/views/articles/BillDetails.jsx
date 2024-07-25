import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const styles = {
  card: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',
  },
  paragraph: {
    margin: '10px 0',
    color: '#555',
  },
  strong: {
    color: '#000',
  },
  pdfContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  pdf: {
    width: '100%',
    height: '600px',
  },
};

const BillDetails = () => {
  const { billNumber } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await fetch(`/api/articulos/datosCatalogo/${billNumber}`);
        const data = await response.json();
        setBill(data);
        setLoading(false);
        
        if (data.file) {
          // Fetch the PDF file if the file property is available
          const pdfResponse = await fetch(`/api/bills/${data.file}`);
          const pdfBlob = await pdfResponse.blob();
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setPdfUrl(pdfUrl);
        }
      } catch (error) {
        console.error('Error fetching bill details:', error);
        setLoading(false);
      }
    };

    fetchBill();
  }, [billNumber]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!bill) {
    return <div>No se encontró la factura</div>;
  }

  // Formatear la fecha
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

      {pdfUrl ? (
        <div style={styles.pdfContainer}>
          <iframe
            style={styles.pdf}
            src={pdfUrl}
            title="Factura PDF"
            frameBorder="0"
          >
            Este navegador no soporta la visualización de PDF.
          </iframe>
        </div>
      ) : (
        <p>No se encontró el PDF de la factura.</p>
      )}
    </div>
  );
};

export default BillDetails;
