import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css"; // Importa los estilos CSS

const Header = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información del usuario
  const navigate = useNavigate();

  useEffect(() => {
    // Función para hacer fetch a la API y obtener la información del usuario
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/usuario/infoUsuario', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserInfo(data); // Almacena la información del usuario en el estado
        } else {
          console.error('Error al obtener la información del usuario');
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario', error);
      }
    };

    fetchUserInfo(); // Llama a la función para obtener la información del usuario cuando el componente se monte
  }, []); // El array vacío como segundo argumento asegura que esto se ejecute solo una vez al montar el componente

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
            {userInfo ? (
              <>
                <img
                  className="user-avatar"
                  src={userInfo.img || 'https://via.placeholder.com/150'} // Usa la URL del avatar del usuario, o un marcador de posición si no está disponible
                  alt="User"
                />
                <p>{userInfo.name}</p> {/* Muestra el nombre del usuario */}
              </>
            ) : (
              <p>Cargando...</p> // Muestra un mensaje de carga mientras se obtiene la información del usuario
            )}
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
            <Link to="/usuario/misBienes">Bienes</Link>
          </li>
          <li>
            <Link to="/usuario/gestionUsuarios">Gestión de Usuarios</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
