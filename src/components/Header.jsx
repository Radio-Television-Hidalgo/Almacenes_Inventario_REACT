import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Importa los estilos CSS

const Header = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

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
        // Aquí puedes realizar cualquier otra acción necesaria después de cerrar sesión
        navigate('/'); // Redirige al usuario a la página de inicio o login
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
            <a href="#" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Saliendo...' : 'Salir'}
            </a>
          </li>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/User">User</Link></li>
          <li><Link to="/Bills">Facturas</Link></li>
          <li><Link to="/StateofThegoods">Estado de los productos</Link></li>
          <li><Link to="/Assignations">Asignaciones</Link></li>
          <li><Link to="/Goods">Goods</Link></li>
          <li><Link to="/SeeUser">ver Usuarios</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
