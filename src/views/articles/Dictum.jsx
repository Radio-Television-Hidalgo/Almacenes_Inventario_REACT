import React, { useState, useEffect } from 'react';

export default function Dictum() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('Revisión');
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/usuario/infoUsuario', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error('Error al obtener la información del usuario');
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario', error);
      }
    };

    fetchUserInfo(); 
  }, []);

  useEffect(() => {
    if (userInfo) {
      setUserId(userInfo.id); // Ajustar según la estructura de los datos de usuario
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('status', status);
    formData.append('user_id', userId);
  
    try {
      const response = await fetch('http://localhost:3000/bajas/casualtys', {
        method: 'POST',
        body: formData,
        headers: {
          // Aquí no es necesario especificar 'Content-Type' ya que fetch lo gestiona automáticamente con FormData
        },
      });
  
      if (response.ok) {
        // Manejo de la respuesta exitosa
        console.log('Formulario enviado correctamente');
        console.log('Respuesta:', await response.json());
      } else {
        // Manejo de errores
        console.error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
    console.log("form data", formData);
  };
  

  return (
    <div>
      <h1>Dictamen</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Archivo:</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Estado:</label>
            <input
                type="text"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                readOnly // El campo es de solo lectura porque el estado se establece automáticamente
            />
        </div>
        <div>
          <label htmlFor="user_id">ID de Usuario:</label>
          <input
            type="number"
            id="user_id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            readOnly // El campo es de solo lectura porque el userId se establece automáticamente
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
