import React, { useEffect } from 'react';

const Pdf = ({ file }) => {
  useEffect(() => {
    if (typeof window.orientation !== 'undefined') {
      document.getElementById('enlaceDescargarPdf').click();
      window.close();
    }
  }, []);

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <object
        data={`/public/bills/${file}`}
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <br />
        <a
          href={`/public/bills/${file}`}
          id="enlaceDescargarPdf"
          download={file}
        >
          Tu dispositivo no puede visualizar los PDF, da click aquí para descargarlo
        </a>
      </object>
    </div>
  );
};

export default Pdf;
