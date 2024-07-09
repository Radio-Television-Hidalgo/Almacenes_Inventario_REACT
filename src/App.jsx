import Login from './views/login'; // Asegúrate de que la ruta es correcta
import Home from './views/Home'; // Asegúrate de que la ruta es correcta
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}

export default App;
