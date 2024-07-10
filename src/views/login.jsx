import { useState } from 'react';
import useLogin from '../controllers/useLogin.js';
import '../styles/login.css'; // Asegúrate de que la ruta sea correcta

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const handleLogin = useLogin(email, password, setLoginError);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <p>bienvenido a sitema inventarios</p>
        <label htmlFor="correo">Usuario o email</label>
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
        <button type="submit">Iniciar sesión</button>
        {loginError && <p className="login-error">{loginError}</p>}
      </form>
    </div>
  );
}

export default Login;
