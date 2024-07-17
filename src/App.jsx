import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./views/login";
import Home from "./views/home";
import User from "./views/formUser";
import Header from "./components/Header";
import Bills from "./views/Bills";
import StateofThegoods from "./views/StateofThegoods";
import Assignations from "./views/Assignations";
import Goods from "./views/Goods";
import SeeUser from "./views/seeUsers";
import ArticleDetails from "./views/articles/articleDetails";
import CreateArticle from "./views/articles/createArticle";

const showHeaderRoutes = [
  "/inicio",
  "/usuario/nuevoUsuario",
  "/facturas",
  "/stateOfThegoods",
  "/assignations",
  "/bienes",
  "/usuarios/gestionUsuarios",
];

const routeTitles = {
  "/": "Iniciar Sesión",
  "/inicio": "Inicio",
  "/usuario/nuevoUsuario": "Nuevo Usuario",
  "/facturas": "Facturas",
  "/stateOfThegoods": "Estado de los Bienes",
  "/assignations": "Asignaciones",
  "/bienes": "Bienes",
  "/usuarios/gestionUsuarios": "Gestión de Usuarios",
  "/articulos/:inventoryNumber": "Detalles del Artículo",
  "/articulos/insertarArticulo": "Crear Artículo",
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
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/usuario/nuevoUsuario" element={<User />} />
          <Route path="/facturas" element={<Bills />} />
          <Route path="/stateOfThegoods" element={<StateofThegoods />} />
          <Route path="/assignations" element={<Assignations />} />
          <Route path="/bienes" element={<Goods />} />
          <Route path="/usuarios/gestionUsuarios" element={<SeeUser />} />
          <Route
            path="/articulos/:inventoryNumber"
            element={<ArticleDetails />}
          />
          <Route
            path="/articulos/insertarArticulo"
            element={<CreateArticle />}
          />
              <Route path='/Solicitude' element = {<Solicitude/>}/>
    </Routes>
      </main>
    </div>
  );
};

export default App;
