import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Importa los estilos CSS

const Header = () => {
  return (
 <div>
    <header className="navbar">
      <div className="logo-container">
        <div className="logo">
          <h1>Bienvenido</h1>
          <p>Sistema de inventarios</p>
        </div>
        <div className="user-info">
          <img 
            className="user-avatar" 
            src="https://media.gettyimages.com/id/75600163/photo/the-36th-annual-naacp-image-awards-portraits.jpg?b=1&s=594x594&w=0&k=20&c=SbkJPZ3_UF9GVzr8bn2nZ0q0mbNtJNJxqYa7NygCFwQ=" 
            alt="Avatar del usuario" 
          />
          <p>Nombre de usuario</p>
        </div>
      </div>
      
      
    </header>
    <nav className="nav-links">
        <ul>
          <li><Link to="/">Salir</Link></li>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/User">User</Link></li>
            <li><Link to="/Bills">Facturas</Link></li>
            <li><Link to="/StateofThegoods">Estado de los productos</Link></li>
            <li><Link to="/Assignations">Asignaciones</Link></li>
          <li><Link to="/Goods">Goods</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
