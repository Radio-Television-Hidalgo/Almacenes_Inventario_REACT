import React, { useEffect, useState } from 'react';
import "../../styles/Seelowwell.css";

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
    <div className="datos-bajas-container">
      <br />
      <table  className="datos-bajas-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Razón</th>
            <th>Estado</th>
            <th>Alta/Baja</th>
            <th>Usuario Confirmación</th>
            <th>Usuario Solicitud Retiro</th>
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
              <td>{casualty.confirmation}</td> {/* Acceder al nombre del usuario de confirmación */}
              <td>{casualty.requestWithdraw}</td> {/* Acceder al nombre del usuario de solicitud de retiro */}
              <td>{casualty.article}</td> {/* Acceder al nombre del artículo */}
              <td>{casualty.inventory}</td> {/* Acceder al número de inventario */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeelowWell;
