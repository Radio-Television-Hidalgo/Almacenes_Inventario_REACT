import React, { useEffect, useState } from 'react';

const SeelowWell = () => {
  const [casualtys, setCasualtys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCasualtys = async () => {
      try {
        const response = await fetch('/api/bajas/casualtys'); // Asegúrate de que la URL es correcta
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { data } = await response.json();
        setCasualtys(data); // Acceder a la clave 'data'
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCasualtys();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <br />
      <table>
        <thead>
          <tr>
          
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Razón</th>
            <th>Estado</th>
            <th>Alta/Baja</th>
            <th>usuario Confirmación</th>
            <th>usuario Solicitud Retiro</th>
            <th>Artículo</th>
            <th>Inventario</th>
           
          </tr>
        </thead>
        <tbody>
          {casualtys.map(casualty => (
            <tr key={casualty.id}>
              <td>{casualty.type}</td>
              <td>{new Date(casualty.date).toLocaleDateString()}</td>
              <td>{casualty.reason}</td>
              <td>{casualty.status}</td>
              <td>{casualty.low ? 'Alta' : 'Baja'}</td>
              <td>{casualty.confirmationUser.name}</td>
              <td>{casualty.requestWithdrawUser.name}</td>
              <td>{casualty.casualtyArticle.name}</td> {/* Acceder al nombre del artículo */}
              <td>{casualty.casualtyInventory.inventory_number}</td> {/* Acceder al número de inventario */}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeelowWell;
