import React, { useState, useEffect } from 'react';

const Articles = () => {
  const [casualtys, setCasualtys] = useState([]);
  const [error, setError] = useState(null);

  const fetchCasualtys = async () => {
    try {
      const response = await fetch('/api/bajas/casualtys');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (!result.data) {
        throw new Error('Invalid JSON format');
      }
      setCasualtys(result.data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching casualtys:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/bajas/casualtys/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Actualiza el estado local con el nuevo valor
      setCasualtys((prevCasualtys) =>
        prevCasualtys.map((casualty) =>
          casualty.id === id ? { ...casualty, status: newStatus, low: newStatus === 'Aceptada' ? true : (newStatus === 'Rechazada' ? false : null) } : casualty
        )
      );
    } catch (error) {
      setError(error.message);
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchCasualtys();
  }, []);

  return (
    <div>
      <h1>Lista de Casualtys</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Razón</th>
            <th>Estado</th>
            <th>Alta/Baja</th>
            <th>ID Confirmación</th>
            <th>ID Solicitud de Retiro</th>
            <th>ID Artículo</th>
            <th>ID Inventario</th>
          </tr>
        </thead>
        <tbody>
          {casualtys.length > 0 ? (
            casualtys.map((casualty) => (
              <tr key={casualty.id}>
                <td>{casualty.type}</td>
                <td>{new Date(casualty.date).toLocaleDateString()}</td>
                <td>{casualty.reason}</td>
                <td>
                  <select
                    value={casualty.status}
                    onChange={(e) => handleStatusChange(casualty.id, e.target.value)}
                    disabled={casualty.status === 'Aceptada' || casualty.status === 'Rechazada'}
                  >
                    <option value="Revisión">Revisión</option>
                    <option value="Aceptada">Aceptada</option>
                    <option value="Rechazada">Rechazada</option>
                  </select>
                </td>
                <td>
                  {casualty.status === 'Rechazada' || casualty.status === 'Aceptada' ? (
                    <span>{casualty.low !== null ? (casualty.low ? 'Sí' : 'No') : 'No Aplicable'}</span>
                  ) : (
                    <select
                      value={casualty.low || ''}
                      onChange={(e) =>
                        handleLowChange(casualty.id, e.target.value === 'true')
                      }
                    >
                      <option value="">Seleccione</option>
                      <option value="true">Sí</option>
                      <option value="false">No</option>
                    </select>
                  )}
                </td>
                <td>{casualty.confirmation_id}</td>
                <td>{casualty.request_withdraw_id}</td>
                <td>{casualty.articles_id}</td>
                <td>{casualty.inventori_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Articles;
