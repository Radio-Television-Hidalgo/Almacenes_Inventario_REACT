import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Lowgoods() {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/bajas/casualtys")
      .then((response) => response.json())
      .then((data) => setFormData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAccept = (id) => {
    // Redirige a /articulos/bajaBien y pasa el ID como JSON en el estado
    navigate('/articulos/bajaBien', { state: { id: id } });
  };

  const handleReject = (id) => {
    // Actualizar el estado del registro con el ID especificado a "Rechazada"
    fetch(`/api/bajas/casualtys/${id}`, {
      method: 'PUT',
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
  const urlbase= '/api/uploads/';

  return (
    <div>
      <h1>Lowgoods</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Archivo</th>
            <th>Estatus</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <a href={`${urlbase}${item.file}`} target="_blank" rel="noopener noreferrer">
                  Ver PDF
                </a>
              </td>              <td>{item.status}</td>
              <td>{item.user_id}</td>
              <td>
                <button onClick={() => handleAccept(item.id)}>Aceptar</button>
                <button onClick={() => handleReject(item.id)}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
