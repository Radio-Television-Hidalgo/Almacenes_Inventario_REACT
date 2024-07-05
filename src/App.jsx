import { fetchData } from "./fetchData";
import "./App.css";
import { Suspense } from "react";

const apiData = fetchData("http://192.168.11.253:3001/usuario/iniciarSesion");//Url de la API

function App() {//Funcion principal
  const data = apiData.read();

  return (//Retorna la lista de datos
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="card">
          {data?.map((item) => (//Mapea los datos
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}
export default App;