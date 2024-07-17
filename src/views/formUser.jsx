import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css'; // Importamos el archivo CSS

const CreateUserForm = ({ userId }) => {
  const [userData, setUserData] = useState({
    worker_number: '',
    ascription: '',
    type: '',
    name: '',
    img: null,
    email: '',
    password: '',
    identification: '',
    RFC: '',
    CURP: '',
    status: true,
    area_budget: '',
    superior_organ: '',
    department_id: '',
    charge_id: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/usuario/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    try {
      const response = await axios.post('/api/usuario/crearUsuario', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Usuario creado:', response.data);
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <div className="formField">
        <label htmlFor="worker_number">Número de Trabajador</label>
        <input type="text" id="worker_number" name="worker_number" placeholder="Número de Trabajador" value={userData.worker_number} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="ascription">Adscripción</label>
        <input type="text" id="ascription" name="ascription" placeholder="Adscripción" value={userData.ascription} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="type">Tipo</label>
        <input type="text" id="type" name="type" placeholder="Tipo" value={userData.type} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="name" placeholder="Nombre" value={userData.name} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="img">Imagen</label>
        <input type="file" id="img" name="img" className="fileInput" onChange={handleFileChange} required />
      </div>
      <div className="formField">
        <label htmlFor="email">Correo Electrónico</label>
        <input type="email" id="email" name="email" placeholder="Correo Electrónico" value={userData.email} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" name="password" placeholder="Contraseña" value={userData.password} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="identification">Identificación</label>
        <input type="text" id="identification" name="identification" placeholder="Identificación" value={userData.identification} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="RFC">RFC</label>
        <input type="text" id="RFC" name="RFC" placeholder="RFC" value={userData.RFC} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="CURP">CURP</label>
        <input type="text" id="CURP" name="CURP" placeholder="CURP" value={userData.CURP} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="department_id">ID del Departamento</label>
        <input type="text" id="department_id" name="department_id" placeholder="ID del Departamento" value={userData.department_id} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="charge_id">ID del Cargo</label>
        <input type="text" id="charge_id" name="charge_id" placeholder="ID del Cargo" value={userData.charge_id} onChange={handleInputChange} required />
      </div>
      <div className="checkboxContainer">
        <input type="checkbox" id="status" name="status" checked={userData.status} onChange={() => setUserData({ ...userData, status: !userData.status })} />
        <label htmlFor="status">Activo</label>
      </div>
      <button type="submit" className="submitButton">Guardar Usuario</button>
    </form>
  );
};

export default CreateUserForm;
