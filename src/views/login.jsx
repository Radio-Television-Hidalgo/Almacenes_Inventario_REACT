import { useState } from 'react';
import useLogin from '../controllers/useLogin.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const handleLogin = useLogin(email, password, setLoginError);


  return (
    <div>
      <form onSubmit={handleLogin}>
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
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  );
}

export default Login;
