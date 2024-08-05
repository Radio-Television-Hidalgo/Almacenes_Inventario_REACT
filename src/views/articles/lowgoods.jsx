import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Lowgoods() {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate(); // Hook para redireccionar

  useEffect(() => {
    fetch("/api/bajas/casualtys")
      .then((response) => response.json())
      .then((data) => setFormData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAccept = () => {
    // Redirige a /articulos/bajaBien
    navigate('/articulos/bajaBien');
  };

  const handleReject = (id) => {
    // Actualizar el estado del registro con el ID especificado a "Rechazada"
    fetch(`/api/bajas/casualtys/${id}`, {
      method: 'PUT', // O 'PUT' dependiendo de cómo manejes las actualizaciones en tu API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Rechazada' }),
    })
    .then((response) => {
      if (response.ok) {
        setFormData((prevFormData) =>
          prevFormData.map((item) =>
            item.id === id ? { ...item, status: 'Rechazada' } : item
          )
        );
      } else {
        console.error("Error updating data:", response.statusText);
      }
    })
    .catch((error) => console.error("Error updating data:", error));
  };
  

  return (
    <div>
      <h1>Lowgoods</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Archivo</th>
            <th>Dictamen</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.file}</td>
              <td>{item.status}</td>
              <td>{item.user_id}</td>
              <td>
                <button onClick={handleAccept}>Aceptar</button>
                <button onClick={() => handleReject(item.id)}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

