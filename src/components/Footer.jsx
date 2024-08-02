import "../styles/footer.css"; 

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <p>Desarrollado por TICS</p>
          <p>Radio y Televisión de Hidalgo</p>
          <div className="footer-logos">
            <img src="/SIA_gold.webp" alt="Logo TICS" className="logo-tics" />
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
