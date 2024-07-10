import Login from './views/login'; // Asegúrate de que la ruta es correcta
import Home from './views/home'; // Asegúrate de que la ruta es correcta
import Bills from './views/Bills';
import StateofThegoods from './views/StateofThegoods';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Bills" element={<Bills/>}/>
      <Route path="/StateofThegoods" element={<StateofThegoods/>}/>
    </Routes>
  );
}

export default App;
