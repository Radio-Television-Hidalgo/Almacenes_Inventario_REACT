import { useState,  } from "react";
//declaracion de funcion 
function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const [loginError, setLoginError]= useState('')
//previene el comportamiento del formulario por defecto y se llama a la función handleLogin.
  const handleLogin = async (e) => {
    e.preventDefault();
//bienes/bienesadquiridos/1
    try {const response = await fetch('http://192.168.11.253:3001/usuario/iniciarSesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    body:JSON.stringify({email,password}),})

    const data = await response.json();

    if(data.sucess){
      localStorage.setItem('token', data.token)
      //TODO: Redirigir
      console.log('inicio de sesion exitoso')
    }else {
      setLoginError('Inicio de sesion fallido')
    }
  }catch(error){
    console.log('error al iniciar sesion: ',error)
    setLoginError('Error al conectar con el servidor');
  }
  };
  return (
      <div>
        <form onSubmit={handleLogin}>
        <label htmlFor="Correo">Usuario o email</label>
        <input 
        type="email"
        id="correo"
        placeholder="Ingrese su correo"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
        <label htmlFor="Contrasena">Contrasena</label>
        <input 
        type="password"
        id="Contrasena"
        placeholder="Ingrese su contrasena"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesion</button>
        {loginError && <p>{loginError}</p>}
        </form>
      </div>
    )
  }

  export default Login;



/*
//Funcion para obtener los datos de la API
export function useFetch(url) {
//Se definen los estados de los datos, la carga y los errores.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);
//Se utiliza el hook useEffect para realizar la petición a la API.
  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
//Se realiza la petición a la API y se captura el error.
    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Cancelled request");
        } else {
          setError(error);
        }
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, []);
//Se define la función handleCancelRequest para cancelar la petición.
  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Cancelled Request");
    }
  };

  return { data, loading, error, handleCancelRequest };
}
  */

