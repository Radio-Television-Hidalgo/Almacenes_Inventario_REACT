import { useCallback } from 'react';

function useLogin(email, password, setLoginError) {

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
        window.location.href = './views/home.jsx'; 
        console.log(window.location.href)// Redirige al usuario a la página de inicio
        console.log('Inicio de sesión exitoso');
      } else {
        setLoginError('Inicio de sesión fallido');
      }
    } catch (error) {
      console.log('Error al iniciar sesión: ', error);
      setLoginError('Error al conectar con el servidor');
    }
  }, [email, password, setLoginError, history]); // Asegúrate de incluir history como dependencia
}

export default useLogin;
