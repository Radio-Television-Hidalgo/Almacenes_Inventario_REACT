import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function useLogin(email, password, setLoginError) {
  const navigate = useNavigate();

  return useCallback(async (e) => {
    e.preventDefault();

    // Validaciones de los campos
    if (!email) {
      setLoginError('El campo de correo electrónico es obligatorio');
      return;
    }

    if (!password) {
      setLoginError('El campo de contraseña es obligatorio');
      return;
    }

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
        navigate('/inicio');
        console.log('Inicio de sesión exitoso');
      } else {
        setLoginError('Usuario no encontrado en el sistema');
      }
    } catch (error) {
      console.log('Error al iniciar sesión: ', error);
      setLoginError('Error al conectar con el servidor');
    }
  }, [email, password, setLoginError, navigate]);
}

export default useLogin;
