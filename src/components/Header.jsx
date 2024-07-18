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
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/usuario/cerrarSesion', {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.ok) {
        navigate('/'); 
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div>
      <nav>
      <div className="header-top1">
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
        <div className="header-top">
          <h1 className="invent">Bienvenido</h1>
        </div>
        
        <div className="header-top">
          <p className="header-paragraph">Sistema inventario y Almacen de Radio y Televisión de Hidalgo</p>
        </div>
        
        <div className="header-bottom">
          <input type="checkbox" id="sidebar-active" />
          <label htmlFor="sidebar-active" className="open-sidebar-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16">
  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
</svg>
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
            <a href="#" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Saliendo...' : 'Salir'}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
