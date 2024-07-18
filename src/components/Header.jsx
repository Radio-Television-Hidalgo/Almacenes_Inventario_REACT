
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
            <Link to="/Home">Home</Link>
            <Link to="/User">User</Link>
            <Link to="/Bills">Facturas</Link>
            <Link to="/StateofThegoods">Estado de los productos</Link>
            <Link to="/Assignations">Asignaciones</Link>
            <Link to="/Goods">Goods</Link>
            <Link to="/SeeUser">Ver Usuarios</Link>
            <Link to="/">Salir</Link>
          </div>
        </div>

      </nav>
    </div>
  );
};

export default Header;
