import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Importa los estilos CSS personalizados

const Header = () => {
  return (
    <div>
      <nav>
        <div className="header-top">
          <h1 className="invent">Bienvenido</h1>
          <div className="user-info">
            <img
              className="user-avatar"
              src="https://media.gettyimages.com/id/75600163/photo/the-36th-annual-naacp-image-awards-portraits.jpg?b=1&s=594x594&w=0&k=20&c=SbkJPZ3_UF9GVzr8bn2nZ0q0mbNtJNJxqYa7NygCFwQ="
              alt="Avatar del usuario"
            />
            <p>Nombre de usuario</p>
          </div>
        </div>
        <div className="header-top">
          <p className="header-paragraph">Sistema inventario y Almacen de Radio y Televisión de Hidalgo</p>
        </div>
        
         
        
        <div className="header-bottom">
          <input type="checkbox" id="sidebar-active" />
          <label htmlFor="sidebar-active" className="open-sidebar-button">
            <span>☰</span>
          </label>
          <label id="overlay" htmlFor="sidebar-active"></label>
          <div className="links-container">
            <Link to="/inicio">Home</Link>
            <Link to="/usuario/nuevoUsuario">User</Link>
            <Link to="/facturas">Facturas</Link>
            <Link to="/stateOfThegoods">Estado de los productos</Link>
            <Link to="/assignations">Asignaciones</Link>
            <Link to="/usuario/misBienes">Bienes adquiridos</Link>
            <Link to="/usuario/gestionUsuarios">Ver Usuarios</Link>
            <Link to="/">Salir</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
