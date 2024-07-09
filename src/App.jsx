import Login from './views/login'; // Asegúrate de que la ruta es correcta
import Inicio from './views/Inicio'; // Asegúrate de que la ruta es correcta
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/src/views/home.jsx" element={<Inicio />} />
    </Routes>
  );
}

export default App;
