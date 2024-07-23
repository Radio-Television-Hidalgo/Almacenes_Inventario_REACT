
import "../styles/Footer.css"; // Importa los estilos CSS

const Header = () => {
  return (
    <div>
      {/* Aquí va el contenido del encabezado */}
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Desarrollado por TICS</p>
          <p>Radio y Televisión de Hidalgo</p>
          <div className="footer-logos">
            <img src="public/SIA_gold" alt="Logo TICS" className="logo-tics" />
            <img src="public/image.png" alt="Logo Empresa" className="logo-empresa" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Header;
