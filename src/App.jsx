import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './views/login'; // Asegúrate de que la ruta es correcta
import Home from './views/home'; // Asegúrate de que la ruta es correcta
import User from './views/formUser';
import Header from './components/Header'; // Importa el componente Header aquí
import Home from './views/home'; // Asegúrate de que la ruta es correcta
import Bills from './views/Bills';
import StateofThegoods from './views/StateofThegoods';
import { Routes, Route } from 'react-router-dom';

function App() {
  const location = useLocation(); // Obtiene la ubicación actual de la ruta

  // Definir las rutas donde se debe mostrar el Header
  const showHeaderRoutes = ['/Home', '/User'];

  // Verificar si la ruta actual está en showHeaderRoutes
  const showHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {showHeader && <Header />} 
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/User" element={<User />} />
          <Route path="/Bills" element={<Bills/>}/>
      <Route path="/StateofThegoods" element={<StateofThegoods/>}/>
    </Routes>
      </main>
    </div>
  );
}

export default App;
