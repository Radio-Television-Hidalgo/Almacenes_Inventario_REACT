import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css"; // Importa los estilos CSS

const Header = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información del usuario
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768); // Estado para controlar el tamaño de pantalla
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ubicación actual

  useEffect(() => {
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
          setUserInfo(data); 
        } else {
          console.error('Error al obtener la información del usuario');
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario', error);
      }
    };

    fetchUserInfo(); 
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/inicio':
        return 'Bienvenido';
      case '/usuario/nuevoUsuario':
        return 'Usuarios';
      case '/facturas':
        return 'Facturas';
      case '/stateOfThegoods':
        return 'Estado de los productos';
      case '/assignations':
        return 'Asignaciones';
      case '/crearcrearPoliza':
        return 'crearPolizas';
      case '/inventario':
        return 'Mi inventario';
      case '/ControlInventario':
        return' Centro de Control';
      case '/usuario/misBienes':
        return ' Mis Bienes';
      case '/solicitudMaterial':
        return  'Subir material';  
      case '/usuario/gestionUsuarios' :
        return 'Usuarios';
      case '/almacen':
        return 'Almacen';
      case '/resguardoGeneral':
        return 'Resguardo General';
      case '/factura':
        return 'Crear Factura';
      case '/entregaArticulo':
        return 'Entrega de bienes';
      case '/inventarios/usuario':
        return 'Inventarios de Usuario';
      case '/articulos/bajaBien':
        return 'Baja de Bienes';
      default:
        return '';
    }
  };

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
                <button className="btn" onClick={handleAvatarClick}>{userInfo.name}</button> 
              </>
            ) : (
              <p>Cargando...</p> // Muestra un mensaje de carga mientras se obtiene la información del usuario
            )}
          </div>
        </div>

        <div className="header-top2">
          <h1 className="invent">{getPageTitle()}</h1>
          <p className="header-paragraph">Sistema inventario y Almacen de Radio y Televisión de Hidalgo</p>
        </div>

        <div className="header-bottom">
          <input type="checkbox" id="sidebar-active" />
          <label htmlFor="sidebar-active" className="open-sidebar-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
            </svg>
          </label>
          <label id="overlay" htmlFor="sidebar-active"></label>
          <div className="links-container">
            {isLargeScreen ? (
              <>
                <div className="dropdown">
                  <Link to="/inicio" className="dropdown-toggle">Inicio</Link>
                  <div className="dropdown-menu">
                    <Link to="/inventario" className="dropdown-item">Inventario</Link>
                    <Link to="/gestionUsuarios" className="dropdown-item">Control de Usuarios </Link>
                    <Link to="/almacen" className="dropdown-item">Almacen</Link>
                    <Link to="/usuario/misBienes" className="dropdown-item">Mi resguardo </Link>
                    <Link to="/solicitudMaterial" className="dropdown-item">Solicitudes de Material</Link>
                  </div>
                </div>
                <Link to="/stateOfThegoods">Estado de los productos</Link>
                <div className="dropdown">
                  <Link to="/almacen" className="dropdown-toggle">Almacen</Link>
                  <div className="dropdown-menu">
                    <Link to="/historialSalida" className="dropdown-item">Historial de Salida de Bienes</Link>
                    <Link to="/entradaBienes" className="dropdown-item">Entrada de Bienes </Link>
                    <Link to="/salidaBienes" className="dropdown-item">Salida de Bienes</Link>
                    <Link to="/poliza" className="dropdown-item">Crear Poliza </Link>
                    <Link to="/recepcionSolicitudes" className="dropdown-item">Recepción de Solicitudes </Link>
                    <Link to="/entradaInsumos" className="dropdown-item">Entrada de Insumos </Link>
                    <Link to="/salidaInsumos" className="dropdown-item">Salida de Insumos </Link>
                    <Link to="/polizas" className="dropdown-item">Ver Pólizas </Link>
                  </div>
                </div>
                <Link to="/assignations">Asignaciones</Link>
                <div className="dropdown">
                  <Link to="/inventario" className="dropdown-toggle">Inventario</Link>
                  <div className="dropdown-menu">
                    <Link to="/facturas" className="dropdown-item">Facturas</Link>
                    <Link to="/factura" className="dropdown-item">Crear Factura</Link>
                    <Link to="/entregaArticulo" className="dropdown-item">Entrega de bien a usuario</Link>
                    <Link to="/articulos/bajaBien" className="dropdown-item">Baja de Bienes</Link>
                    <Link to="/resguardoGeneral" className="dropdown-item">Resguardo General</Link>
                    <Link to="/" className="dropdown-item">Alta de Bienes</Link>
                    <Link to="/inventarios" className="dropdown-item">inventarios de Usuario</Link>
                    <Link to="/" className="dropdown-item">Historial de Bajas</Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/inicio">Inicio</Link>
                <Link to="/stateOfThegoods">Estado de los productos</Link>
                <Link to="/almacen">Almacen</Link>
                <Link to="/assignations">Asignaciones</Link>
                <Link to="/inventario">Inventario</Link>
              </>
            )}
            <a href="#" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Saliendo...' : 'Salir'}
            </a>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-header">
              <img
                className="modal-avatar"
                src={userInfo.img || 'https://via.placeholder.com/150'}
                alt="User"
              />
            </div>
            <div className="modal-content">
              <h2>{userInfo.name}</h2>
              <h3>Número de trabajador: {userInfo.worker_nomber}</h3>
              <h3>Adscripción: {userInfo.ascription}</h3>
              <h3>Correo Electrónico: {userInfo.email}</h3>
              <h3>RFC: {userInfo.RFC}</h3>
              <h3>Cargo: {userInfo.tbc_charge?.name}</h3>
              <h3>Departamento: {userInfo.tbc_department?.name}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
