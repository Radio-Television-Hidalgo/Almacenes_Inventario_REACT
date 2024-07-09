import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function useLogin(email, password, setLoginError) {
  const navigate = useNavigate();

  return useCallback(async (e) => {
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
        navigate('/Home')
        console.log('Inicio de sesión exitoso');
      } else {
        setLoginError('Inicio de sesión fallido');
      }
    } catch (error) {
      console.log('Error al iniciar sesión: ', error);
      setLoginError('Error al conectar con el servidor');
    }
  }, [email, password, setLoginError, navigate]); // Asegúrate de incluir history como dependencia
}

export default useLogin;
