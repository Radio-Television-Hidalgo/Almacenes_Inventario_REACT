import { useState } from 'react';
import useLogin from '../../controllers/useLogin.js';
import '../../styles/login.css'; // Asegúrate de que la ruta sea correcta
import { useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = useLogin(email, password, setLoginError);

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (

    <div className="login-container">
      <div className="logo-container">
        <img src="public/SIA.webp" alt="Logotipo de la empresa" />
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Radio y Television de Hidalgo</h2>
        <p>Sistema Inventario y almacen de radio y Television de Hidalgo</p>
        <label htmlFor="correo">Usuario o Email</label>
        <input
          type="email"
          id="correo"
          placeholder="Ingrese su correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="contrasena">Contraseña</label>
        <input
          type="password"
          id="contrasena"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Siguiente</button>
        {loginError && <p className="login-error">{loginError}</p>}
      </form>
    </div>
  );
}

export default Login;
