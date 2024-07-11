import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm = () => {
  // Estado inicial del formulario con todos los campos requeridos
  const [userData, setUserData] = useState({
    ascription: '',
    chargeId: '',
    name: '',
    img: '',
    email: '',
    password: '',
    identification: '',
    RFC: '',
    CURP: '',
    departmentId: '',
    status: true // Usuario activo por defecto
  });

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Actualiza el estado del campo correspondiente
    setUserData({ ...userData, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    try {
      // Realiza una solicitud POST al servidor para crear un nuevo usuario
      const response = await axios.post('/api/usuario/crearUsuario', userData);
      console.log('Usuario creado:', response.data);
    } catch (error) {
      // Manejo de errores en la solicitud
      console.error('Error al crear usuario:', error);
      if (error.response) {
        // Si hay una respuesta del servidor con un error
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        // Si la solicitud fue realizada pero no se recibió respuesta
        console.error('Error request:', error.request);
      } else {
        // Cualquier otro error
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campo de texto para la adscripción */}
      <input
        type="text"
        name="ascription"
        placeholder="Ascription"
        value={userData.ascription}
        onChange={handleInputChange}
        required
      />
      {/* Campo de texto para el ID del cargo */}
      <input
        type="text"
        name="chargeId"
        placeholder="Charge ID"
        value={userData.chargeId}
        onChange={handleInputChange}
        required
      />
      {/* Campo de texto para el nombre */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={userData.name}
        onChange={handleInputChange}
        required
      />
      {/* Campo de archivo para la imagen */}
      <input
        type="file"
        name="img"
        placeholder="Image URL"
        value={userData.img}
        onChange={handleInputChange}
        required
      />
      {/* Campo de texto para el email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleInputChange}
        required
      />
      {/* Campo de contraseña */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleInputChange}
        required
      />
      {/* Campo de texto para la identificación */}
      <input
        type="text"
        name="identification"
        placeholder="Identification"
        value={userData.identification}
        onChange={handleInputChange}
        required
      />
      {/* Campo de texto para el RFC */}
      <input
        type="text"
        name="RFC"
        placeholder="RFC"
        value={userData.RFC}
        onChange={handleInputChange}
        required
      />
      {/* Campo de texto para el CURP */}
      <input
        type="text"
        name="CURP"
        placeholder="CURP"
        value={userData.CURP}
        onChange={handleInputChange}
        required
      />
      {/* Campo de texto para el ID del departamento */}
      <input
        type="text"
        name="departmentId"
        placeholder="Department ID"
        value={userData.departmentId}
        onChange={handleInputChange}
        required
      />
      {/* Checkbox para el estado del usuario */}
      <label>
        <input
          type="checkbox"
          name="status"
          checked={userData.status}
          onChange={() => setUserData({ ...userData, status: !userData.status })}
        />
        Activo
      </label>
      {/* Botón para enviar el formulario */}
      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default CreateUserForm;
