import Login  from '../src/useFetch.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './Inicio.jsx'

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="./Inicio.jsx" element={<Inicio />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;