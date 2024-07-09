import { useState,  } from "react";
import { useNavigate } from "react-router-dom";

// Declaración de función 
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate()

  // Previene el comportamiento del formulario por defecto y se llama a la función handleLogin.
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/usuario/iniciarSesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        navigate('/inicio')
        // TODO: Redirigir
        console.log('Inicio de sesión exitoso');
      } else {
        setLoginError('Inicio de sesión fallido');
      }
    } catch (error) {
      console.log('Error al iniciar sesión: ', error);
      setLoginError('Error al conectar con el servidor');
    }
  };

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
