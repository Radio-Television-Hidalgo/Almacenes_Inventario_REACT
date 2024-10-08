import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, matchPath } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./ObtenertipoUsuario";
import ModalSalir from '../components/ModalSalir';
import propTypes from "prop-types";
import "../styles/Header.css"; // Importa los estilos CSS

const Header = () => {
  const { userType } = useContext(UserContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información del usuario
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal de perfil
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1000); // Estado para controlar el tamaño de pantalla
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Estado para controlar el modal de confirmación de logout
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ubicación actual

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/usuario/infoUsuario", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error("Error al obtener la información del usuario");
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/usuario/cerrarSesion", {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
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
        return 'Almacén';
      case '/resguardoGeneral':
        return 'Resguardo General';
      case '/crearFactura':
        return 'Crear Factura';
      case '/entregaArticulo':
        return 'Entrega de bienes';
      case '/inventarios/usuario':
        return 'Inventarios de Usuario';
      case '/articulos/bajaBien':
        return 'Baja de Bienes';
      case '/documentacion':
        return 'Documentación';
      case '/solicitudInsumos':
        return 'Solicitud de insumos';
      case '/articulos/insertarArticulo':
        return 'Crear nuevo articulo';
        case '/articulos':
          return 'Articulos';
      case '/usuario/editarUsuario':
        return 'Editar usuario';
      case '/crearPoliza':
        return 'Crear Poliza';
      case '/Bajadebien':
        return 'Baja de bienes';
      case '/polizas':
        return 'Polizas';
      case '/recepcionSolicitudes':
        return 'Solicitudes';
      case '/articulos/almacen':
        return 'Articulos en Almacen';
      case '/entregasPendientes':
        return 'Entregas pendientes';
      case '/entrada/existencias':
        return 'Entrada de existencias';
      case '/historial/bajas':
        return 'Datos de Bajas';
      case '/verSolicitud/bien':
        return'Solicitudes de bienes';
      case '/dictamenes':
        return 'Dictamenes';
      case '/dictamenes/dajabien':
        return 'Control de dictamenes';
      case '/almacen/insumos':
        return 'Insumos';
      case '/controlCompras':
        return 'Compras';
      case '/almacen/hitorialSolicitudes':
        return 'Historial de solicitudes';
      case '/planeacion':
        return 'Planeacion'
      default: 
        if (matchPath('/facturas/:billNumber', path)) {
        return 'Información de factura';
      }
      if (matchPath('/polizas/:policyId', path)) {
        return 'Información de póliza';
      }
      if (matchPath('/articulos/articulo/:inventoryNumber', path)) {
        return 'Detalles del articulo';
      }
      return '';
    }
  };

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openLogoutModal = (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div>
      <nav>
        <div className="header-top3">
          <img src="/logo_radio.webp" className="logo-empresa" />
        </div>
        <div className="header-top1">
          <div className="user-info">
            {userInfo ? (
              <>
                <img
                  className="user-avatar"
                  src={userInfo.img || "https://via.placeholder.com/150"} // Usa la URL del avatar del usuario, o un marcador de posición si no está disponible
                  alt="User"
                />
                <div>
                  <p className="user-name">{userInfo.name}</p>
                  <p className="user-role">{userInfo.type}</p>
                </div>
                <button className="profile-button" onClick={handleAvatarClick}>
                  Ver Perfil
                </button>
              </>
            ) : (
              <p>Cargando...</p> // Muestra un mensaje de carga mientras se obtiene la información del usuario
            )}
          </div>
        </div>

        <div className="header-top2">
          <h1 className="invent">{getPageTitle()}</h1>

          <p className="header-paragraph">Sistema Integral de Gestión de Inventario, Compras y Almacén para Radio y Televisión de Hidalgo</p>

        </div>

        <div className="header-bottom">
          <input type="checkbox" id="sidebar-active" />
          <label htmlFor="sidebar-active" className="open-sidebar-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-grid"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
            </svg>
          </label>
          <label id="overlay" htmlFor="sidebar-active"></label>
          <div className="links-container">
            <div className="header-top3">
              <img src="/logo_radio.webp" className="logo-empresa-nav1" />
            </div>
            <div className="header-top1">
              <div className="user-info-nav1">
                {userInfo ? (
                  <>
                    <img
                      className="user-avatar"
                      src={userInfo.img || "https://via.placeholder.com/150"} // Usa la URL del avatar del usuario, o un marcador de posición si no está disponible
                      alt="User"
                    />
                    <div>
                      <p className="user-name">{userInfo.name}</p>
                      <p className="user-role">{userInfo.type}</p>
                    </div>
                    <button
                      className="profile-button"
                      onClick={handleAvatarClick}
                    >
                      Ver Perfil
                    </button>
                  </>
                ) : (
                  <p>Cargando...</p> // Muestra un mensaje de carga mientras se obtiene la información del usuario
                )}
              </div>
            </div>
            {isLargeScreen ? (
              <>
                <Link to="/inicio" className="dropdown-toggle">
                  Inicio
                </Link>

                {/*                <Link to="/stateOfThegoods">Estado de los productos</Link>           */}
                {userType!== 'comun' && userType !== 'rh' && (
                <div className="dropdown">
                  <Link to="/almacen" className="dropdown-toggle">
                    Almacén
                  </Link>
                  <div className="dropdown-menu">
                    <Link to="/documentacion" className="dropdown-item">
                      Documentación{" "}
                    </Link>
                    <Link to="/almacen/insumos" className="dropdown-item">
                      Ver insumos{" "}
                    </Link>
                    <Link to="/entrada/existencias" className="dropdown-item">
                      {" "}
                      Entrada de existencias
                    </Link>
                    <Link to="/solicitudInsumos" className="dropdown-item">
                      Solicitudes de insumos{" "}
                    </Link>
                    <Link
                      to="/articulos/insertarArticulo"
                      className="dropdown-item"
                    >
                      Agregar nuevo artículo{" "}
                    </Link>          
                    <Link to="/almacen/hitorialSolicitudes" className="dropdown-item">
                      Historial de salida de bienes{" "}
                    </Link>
          
                  </div>
                </div>
                )}
             
              {userType !== 'comun' && userType !== 'rh' &&(
                <div className="dropdown">
                  <Link to="/documentacion" className="dropdown-toggle">Documentación</Link>
                  <div className="dropdown-menu">
                    <Link to="/crearFactura" className="dropdown-item">Crear facturas</Link>
                    <Link to="/facturas" className="dropdown-item">Ver facturas </Link>
                    <Link to="/polizas" className="dropdown-item">Ver pólizas </Link>
                  </div>
                </div>
              )}
             <Link to="/controlCompras">Compras</Link>
            
{/*                <Link to="/assignations">Asignaciones</Link>        */}
                {userType !== 'comun' && userType !== 'rh' &&(
                <div className="dropdown">
                  <Link to="/inventario" className="dropdown-toggle">Inventario</Link>
                  <div className="dropdown-menu">
{/*                    <Link to="/facturas" className="dropdown-item">Facturas</Link>              */}

                  <Link to="/articulos/bajaBien" className="dropdown-item">Baja de bienes</Link>
                  <Link to="/resguardoGeneral" className="dropdown-item">Resguardo general</Link>
                  <Link to="/entregaArticulo" className="dropdown-item">Entrega de bien a usuario</Link>
                  <Link to="/inventarios/usuario" className="dropdown-item">Inventarios de usuario</Link>
                  <Link to="/verSolicitud/bien" className="dropdown-item">Solicitudes de Bienes</Link>
                  <Link to="/historial/bajas" className="dropdown-item">Historial de baja de bienes</Link>
                  <Link to="" className="dropdown-item">Salida de existencias</Link>
                  <Link to="/dictamenes/dajabien" className="dropdown-item">Control de dictamenes</Link>
                  </div>
                </div>
                    )}
              </>
            ) : (
              <>
                <Link to="/inicio">Inicio</Link>
                {/*                <Link to="/stateOfThegoods">Estado de los productos</Link>      */}
                <Link to="/almacen">Almacén</Link>
                <Link to="/documentacion">Documentación</Link>
                {/*                <Link to="/assignations">Asignaciones</Link>         */}
                <Link to="/inventario">Inventario</Link>
                <Link to="/compras">Compras</Link>
                <Link onClick={handleAvatarClick}>Ver perfil</Link>

              </>
            )}
            <a href="#" onClick={openLogoutModal} disabled={isLoggingOut}>
              {isLoggingOut ? "Saliendo..." : "Salir"}
            </a>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-header">
              <img
                className="modal-avatar"
                src={userInfo.img || "https://via.placeholder.com/150"}
                alt="User"
              />
            </div>
            <div className="modal-content">
              <h2>{userInfo.name}</h2>
              <h3>{userInfo.type}</h3>
              <div className="info-section">
                <h3>Adscripción: {userInfo.ascription}</h3>
                <h3>Correo Electrónico: {userInfo.email}</h3>
                <h3>Departamento: {userInfo.userDepartment.name}</h3>
                {userType !== 'comun' && userType !== 'almacen' && userType !== 'admin' &&(
                <Link to="/usuario/nuevoUsuario"><button className="profile-button" onClick={closeModal}>Nuevo usuario</button></Link>
              )}
              </div>
              <hr />
              <div className="info-grid">
                <div>
                  <span>RFC</span>
                  <p>{userInfo.RFC}</p>
                </div>
                <div>
                  <span>CARGO</span>
                  <p>{userInfo.userCharge.name}</p>
                </div>
                <div>
                  <span>NÚMERO</span>
                  <p>{userInfo.worker_nomber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModalSalir
        show={isLogoutModalOpen}
        handleClose={closeLogoutModal}
        handleConfirm={handleLogout}
      />
    </div>
  );
};

Header.PropTypes={
  userType: propTypes.string.isRequired,
}

export default Header;
