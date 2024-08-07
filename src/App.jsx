import { useContext, useEffect } from "react";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";
import { UserProvider } from "./components/ContextUser";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UserContext } from "./components/ObtenertipoUsuario";
import Articles from "./views/articles/Articles";
import ArticleDetails from "./views/articles/ArticlesDetails"; // Importación correcta
import CreateArticle from "./views/articles/createArticle";
import Dictum from "./views/articles/Dictum";
import DownArticle from "./views/articles/downArticle";
import Goods from "./views/articles/Goods";
import Invoice from "./views/articles/invoice";
import Lowgoods from "./views/articles/lowgoods";
import Assignations from "./views/Assignations";
import ArticleDelivery from "./views/deliveries/articleDelivery";
import PendingDeliveries from "./views/deliveries/pendingDeliveries";
import DeregistrationofMaterial from "./views/deregistrationofMaterial";
import BillDetails from "./views/documentacion/BillDetails";
import Bills from "./views/documentacion/Bills";
import Documentacion from "./views/documentacion/documentacion";
import Policy from "./views/documentacion/policy";
import PolicyDetail from "./views/documentacion/PolicyDetail";
import PolicyScreen from "./views/documentacion/policyScreen";
import Home from "./views/home/home";
import GeneralReceipt from "./views/inventory/generalReceipt";
import InventoryControl from "./views/inventory/InventoryControl";
import InventoryScreen from "./views/inventory/inventoryScreen";
import SeelowWell from "./views/inventory/Seelowwell";
import MaterialRequest from "./views/materialRequest/materialRequest";
import ReceptionRequests from "./views/materialRequest/receptionRequests";
import RequestforSuppliesGoods from "./views/RequestforSuppliersGoods";
import RequestforSupplies from "./views/RequestforSupplies";
import RequestHistory from "./views/materialRequest/requestHistory";
import StockOut from "./views/stockOut";
import EditUser from "./views/users/editUser";
import User from "./views/users/formUser";
import Login from "./views/users/login";
import SeeUser from "./views/users/seeUsers";
import UserInventory from "./views/users/userInventory";
import SeeSupplies from "./views/werehouse/seeSupplies";
import StockEntry from "./views/werehouse/StockEntry";
import WarehouseArticle from "./views/werehouse/warehouseArticle";
import WerehouseScreen from "./views/werehouse/werehouseScreen";


const showHeaderRoutes = [
  "/inicio",
  "/almacen",
  "/inventario",
  "/solicitudMaterial",
  "/usuario/nuevoUsuario",
  "/facturas",
  "/Assignations",
  "/usuario/misBienes",
  "/usuario/gestionUsuarios",
  "/articulos/insertarArticulo",
  "/usuario/editarUsuario",
  "/ControlInventario",
  "/crearFactura",
  "/crearPoliza",
  "/articulos/bajaBien",
  "/entregaArticulo",
  "/inventarios/usuario",
  "/Bajadebien",
  "/articulos",
  "/assignations",
  "/polizas",
  "/resguardoGeneral",
  "/recepcionSolicitudes",
  "/SalidadeExistencia",
  "/articulos/almacen",
  "/solicitudInsumos",
  "/documentacion",
  "/articulos/insertararticulo",
  "/entregasPendientes",
  "/facturas/:billNumber",
  "/entrada/existencias",
  "/historial/bajas",
  "/polizas/:policyId",
  "verSolicitud/bien",
  "/articulos/articulo/:inventoryNumber",
  "/almacen/insumos",
  "/almacen/hitorialSolicitudes",
  "/dictamenes",
  "/dictamenes/dajabien" 
];

const routeTitles = {
  "/crearPoliza": "Nueva Póliza",
  "/polizas": "Todas las Pólizas",
  "/crearFactura": "Crear Factura",
  "/ControlInventario": "Control de Inventario",
  "/": "Iniciar Sesión",
  "/inicio": "Inicio",
  "/inventario": "Control de Inventario",
  "/almacen": "Control de Almacen",
  "/solicitudMaterial": "Solicitar Material",
  "/usuario/nuevoUsuario": "Nuevo Usuario",
  "/facturas": "Facturas",
  "/Assignations": "Asignaciones",
  "/usuario/misBienes": "Bienes",
  "/usuario/gestionUsuarios": "Gestión de Usuarios",
  "/articulos/:inventoryNumber": "Detalles del Artículo",
  "/articulos/insertarArticulo": "Crear Artículo",
  "/usuario/editarUsuario": "Edicion de usuario",
  "/articulos/bajaBien": "Baja de Bien",
  "/entregaArticulo": "Entrega de Articulos",
  "/inventarios/usuario": "Inventarios de Usuarios",
  "/articulos": "Lista de Bienes",
  "/resguardoGeneral": "Resguardo General",
  "/articulos/almacen": "Articulos en Almacen",
  "/documentacion": "Documentacion",
  "/facturas/:billNumber": "Detalles de Factura",
  "/recepcionSolicitudes": "Recpcion de Solicitudes",
  "/entregasPendientes": "Entregas Pendientes",
  "/entrada/existencias": "Entrada de Existencias",
  "/historial/bajas": "Historial de Bajas",
  "verSolicitud/bien":"Ver la Solicitud del Bien",
  "/articulos/articulo/:inventoryNumber": "Detalles del Artículo",
  "/almacen/insumos":"Insumos del Almacen",
  "/almacen/hitorialSolicitudes": "Historial Solicitudes",
  "/dictamenes": "Dictamenes",
  "/dictamenes/dajabien" : "Dictamen de Baja de Bien"
};

const App = () => {
  const location = useLocation();
  const { userType } = useContext(UserContext);

  useEffect(() => {
    const currentRoute = location.pathname;
    // Verifica rutas dinámicas para facturas
    const dynamicRoutes = [
      { path: "/facturas/:billNumber", title: "Detalles de Factura" },
      { path: "/articulos/:inventoryNumber", title: "Detalles del Artículo" },
      { path: "/polizas/:policyId", title: "Detalles de Póliza" },
    ];

    const matchedRoute = dynamicRoutes.find((route) =>
      matchPath(route.path, currentRoute)
    );
    const pageTitle = matchedRoute
      ? matchedRoute.title
      : routeTitles[currentRoute] || "Título por Defecto";
    document.title = pageTitle;
  }, [location.pathname]);

  const showHeader = showHeaderRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  return (
    <div>
      {showHeader && <Header />}
      <main>
        <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Home userType={userType} />} />
          <Route path="/almacen" element={<WerehouseScreen />} />
          <Route path="/inventario" element={<InventoryScreen />} />
          <Route path="/solicitudMaterial" element={<MaterialRequest />} />
          <Route path="/usuario/nuevoUsuario" element={<User />} />
          <Route path="/facturas" element={<Bills />} />
          <Route path="/assignations" element={<Assignations />} />
          <Route path="/usuario/misBienes" element={<Goods />} />
          <Route path="/usuario/gestionUsuarios" element={<SeeUser />} />
          <Route path="/usuario/editarUsuario" element={<EditUser />} />
          <Route path="/ControlInventario" element={<InventoryControl />} />
          <Route path="/crearFactura" element={<Invoice />} />
          <Route path="/crearPoliza" element={<Policy />} />
          <Route path="/polizas" element={<PolicyScreen />} />
          <Route path="/entregaArticulo" element={<ArticleDelivery />} />
          <Route path="/inventarios/usuario" element={<UserInventory />} />
          <Route path="/Bajadebien" element={<DeregistrationofMaterial />} />
          <Route path="/resguardoGeneral" element={<GeneralReceipt />} />
          <Route path="/documentacion" element={<Documentacion />} />
          <Route path="/recepcionSolicitudes" element={<ReceptionRequests />} />
          <Route path="/SalidadeExistencia" element={<StockOut />} />
          <Route path="/solicitudInsumos" element={<RequestforSupplies />} />
          <Route path="/entregasPendientes" element={<PendingDeliveries />} />
          <Route path="/articulos/insertarArticulo" element={<CreateArticle />} />
          <Route path="/articulos/bajaBien" element={<DownArticle />} />
          <Route path="/articulos" element={<Articles />} />
          <Route path="/articulos/almacen" element={<WarehouseArticle />} />
          <Route path="/facturas/:billNumber" element={<BillDetails />} />
          <Route path="/polizas/:policyId" element={<PolicyDetail />} />
          <Route path="/entrada/existencias" element={<StockEntry />} />
          <Route path="/historial/bajas" element={<SeelowWell />} />
          <Route path="/verSolicitud/bien" element={<RequestforSuppliesGoods />} />
          <Route path="/articulos/articulo/:inventoryNumber" element={<ArticleDetails />} /> 
          <Route path="/almacen/insumos" element={<SeeSupplies />} />
          <Route path="/almacen/hitorialSolicitudes" element={<RequestHistory />} />
          <Route path="/dictamenes" element={<Dictum />} />
          <Route path="/dictamenes/dajabien" element={<Lowgoods />} />
        </Routes>
        </UserProvider>
      </main>
      <Footer />
    </div>
  );
};

export default App;
