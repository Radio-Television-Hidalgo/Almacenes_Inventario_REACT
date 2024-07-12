import React, { useState } from 'react';
import axios from 'axios';
import '../styles/user.css'; // Importamos el archivo CSS

const CreateUserForm = () => {
  const [userData, setUserData] = useState({
    ascription: '',
    chargeId: '',
    name: '',
    img: null,
    email: '',
    password: '',
    identification: '',
    RFC: '',
    CURP: '',
    departmentId: '',
    status: true
  });

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
        <label htmlFor="ascription">Ascription</label>
        <input type="text" id="ascription" name="ascription" placeholder="Ascription" value={userData.ascription} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="chargeId">Charge ID</label>
        <input type="text" id="chargeId" name="chargeId" placeholder="Charge ID" value={userData.chargeId} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Name" value={userData.name} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="img">Image</label>
        <input type="file" id="img" name="img" className="fileInput" onChange={handleFileChange} required />
      </div>
      <div className="formField">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email" value={userData.email} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" value={userData.password} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label htmlFor="identification">Identification</label>
        <input type="text" id="identification" name="identification" placeholder="Identification" value={userData.identification} onChange={handleInputChange} required />
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
        <label htmlFor="departmentId">Department ID</label>
        <input type="text" id="departmentId" name="departmentId" placeholder="Department ID" value={userData.departmentId} onChange={handleInputChange} required />
      </div>
      <div className="checkboxContainer">
        <input type="checkbox" id="status" name="status" checked={userData.status} onChange={() => setUserData({ ...userData, status: !userData.status })} />
        <label htmlFor="status">Activo</label>
      </div>
      <button type="submit" className="submitButton">Crear Usuario</button>
    </form>
  );
};

export default CreateUserForm;
