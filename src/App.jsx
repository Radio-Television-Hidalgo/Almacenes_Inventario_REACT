import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./components/ContextUser";
import Login from "./views/users/login";
import Home from "./views/home/home";
import InventoryControl from "./views/inventory/InventoryControl";
import Policy from "./views/articles/policy";
import Invoice from "./views/articles/invoice";
import User from "./views/users/formUser";
import Header from "./components/Header";
import Bills from "./views/articles/Bills";
import StateofThegoods from "./views/StateofThegoods";
import Assignations from "./views/Assignations";
import Goods from "./views/articles/Goods";
import SeeUser from "./views/users/seeUsers"
import ArticleDetails from "./views/articles/articleDetails";
import CreateArticle from "./views/articles/createArticle";
import EditUser from "./views/users/editUser";
import WerehouseScreen from "./views/werehouse/werehouseScreen";
import InventoryScreen from "./views/inventory/inventoryScreen";
import MaterialRequest from "./views/materialRequest/materialRequest";
import DownArticle from "./views/articles/downArticle"
import ArticleDelivery from "./views/articles/articleDelivery";
import UserInventory from "./views/users/userInventory";
import DeregistrationofMaterial from "./views/deregistrationofMaterial";

const showHeaderRoutes = [
  "/inicio",
  "/almacen",
  "/inventario",
  "/solicitudMaterial",
  "/usuario/nuevoUsuario",
  "/facturas",
  "/stateOfThegoods",
  "/Assignations",
  "/usuario/misBienes",
  "/usuario/gestionUsuarios",
  "/articulos/insertarArticulo",
  "/usuario/editarUsuario",
  "/ControlInventario",
  "/factura",
  "/poliza",
  "/articulos/bajaBien",
  "/entregaArticulo",
  "/inventarios/usuario"
  "/Bajadebien",
];

const routeTitles = {
  "/poliza": "Póliza",
  "/factura": "Factura",
  "/ControlInventario": "Control de Inventario",
  "/": "Iniciar Sesión",
  "/inicio": "Inicio",
  "/inventario": "Control de Inventario",
  "/almacen": "Control de Almacen",
  "/solicitudMaterial": "Solicitar Material",
  "/usuario/nuevoUsuario": "Nuevo Usuario",
  "/facturas": "Facturas",
  "/stateOfThegoods": "Estado de los Bienes",
  "/Assignations": "Asignaciones",
  "/usuario/misBienes": "Bienes",
  "/usuario/gestionUsuarios": "Gestión de Usuarios",
  "/articulos/:inventoryNumber": "Detalles del Artículo",
  "/articulos/insertarArticulo": "Crear Artículo",
  "/usuario/editarUsuario": "Edicion de usuario",
  "/articulos/bajaBien": "Baja de Bien",
  "/entregaArticulo": "Entrega de Articulos",
  "/inventarios/usuario" : "Inventarios de Usuarios"
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const currentRoute = location.pathname;
    document.title = routeTitles[currentRoute] || "Título por Defecto";
  }, [location.pathname]);

  const showHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {showHeader && <Header />}
      <main>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/almacen" element={<WerehouseScreen />} />
            <Route path="/inventario" element={<InventoryScreen />} />
            <Route path="/solicitudMaterial" element={<MaterialRequest />} />
            <Route path="/usuario/nuevoUsuario" element={<User />} />
            <Route path="/facturas" element={<Bills />} />
            <Route path="/stateOfThegoods" element={<StateofThegoods />} />
            <Route path="/assignations" element={<Assignations />} />
            <Route path="/usuario/misBienes" element={<Goods />} />
            <Route path="/usuario/gestionUsuarios" element={<SeeUser />} />
            <Route path="/usuario/editarUsuario" element={<EditUser />} />
            <Route path="/ControlInventario" element={<InventoryControl />} />
            <Route path="/factura" element={<Invoice />} />
            <Route path="/poliza" element={<Policy />} />
            <Route path="/entregaArticulo" element={<ArticleDelivery />} />
            <Route path="/inventarios/usuario" element={<UserInventory />} />
            <Route path="/Bajadebien" element={<DeregistrationofMaterial />} />
            <Route
              path="/articulos/:inventoryNumber"
              element={<ArticleDetails />}
            />
            <Route
              path="/articulos/insertarArticulo"
              element={<CreateArticle />}
            />
            <Route path="/articulos/bajaBien" element={<DownArticle />} />
          </Routes>
        </UserProvider>
      </main>
    </div>
  );
};

export default App;
