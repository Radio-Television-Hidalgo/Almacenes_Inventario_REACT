import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css"; // Importa los estilos CSS

const Header = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/usuario/cerrarSesion", {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.ok) {
        navigate("/"); // Redirige al usuario a la página de inicio o login
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

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
          <li>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="logout-button"
            >
              {isLoggingOut ? "Saliendo..." : "Salir"}
            </button>
          </li>
          <li>
            <Link to="/inicio">Inicio</Link>
          </li>
          <li>
            <Link to="/usuario/nuevoUsuario">Nuevo Usuario</Link>
          </li>
          <li>
            <Link to="/facturas">Facturas</Link>
          </li>
          <li>
            <Link to="/estadoProductos">Estado de los productos</Link>
          </li>
          <li>
            <Link to="/asignaciones">Asignaciones</Link>
          </li>
          <li>
            <Link to="/bienes">Bienes</Link>
          </li>
          <li>
            <Link to="/usuarios/gestionUsuarios">Gestión de Usuarios</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
