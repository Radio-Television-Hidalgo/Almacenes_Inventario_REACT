import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/formUser.css'; 

const CreateUserForm = ({ userId }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    worker_nomber: '',
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
    area_budget: 'RADIO Y TELEVISION',
    superior_organ: 'ORGANISMOS DESCENTRALIZADO',
    department_id: '',
    charge_id: ''
  });

  const [departments, setDepartments] = useState([]);
  const [charges, setCharges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = userId ? await axios.get(`/api/usuario/${userId}`) : null;
        const departmentsResponse = await axios.get('http://localhost:3000/depertments/depertments'); 
        const chargesResponse = await axios.get('http://localhost:3000/depertments/charges'); 
        
        if (userResponse) {
          setUserData(userResponse.data);
        }
        setDepartments(departmentsResponse.data.data);
        setCharges(chargesResponse.data.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setUserData({ ...userData, img: e.target.files[0] });
    }
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
      navigate("/inicio");
      console.log('Usuario creado:', response.data);
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
  <div class="main-container">
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="worker_nomber">Número de Trabajador</label>
          <input type="text" id="worker_nomber" name="worker_nomber" placeholder="Número de Trabajador" value={userData.worker_nomber} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="ascription">Adscripción</label>
          <input type="text" id="ascription" name="ascription" placeholder="Adscripción" value={userData.ascription} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <input type="text" id="type" name="type" placeholder="Tipo" value={userData.type} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" placeholder="Nombre" value={userData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="img">Imagen</label>
          <input type="file" id="img" name="img" onChange={handleFileChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" placeholder="Correo Electrónico" value={userData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" placeholder="Contraseña" value={userData.password} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="identification">Identificación</label>
          <input type="text" id="identification" name="identification" placeholder="Identificación" value={userData.identification} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="RFC">RFC</label>
          <input type="text" id="RFC" name="RFC" placeholder="RFC" value={userData.RFC} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="CURP">CURP</label>
          <input type="text" id="CURP" name="CURP" placeholder="CURP" value={userData.CURP} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="department_id">Departamento</label>
          <select
            id="department_id"
            name="department_id"
            value={userData.department_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar Departamento</option>
            {departments.map(department => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="charge_id">Cargo</label>
          <select
            id="charge_id"
            name="charge_id"
            value={userData.charge_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar Cargo</option>
            {charges.map(charge => (
              <option key={charge.id} value={charge.id}>
                {charge.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group checkbox-group">
          <input type="checkbox" id="status" name="status" checked={userData.status} onChange={() => setUserData({ ...userData, status: !userData.status })} />
          <label htmlFor="status">Activo</label>
        </div>
      </div>
      <button type="submit" className="submit-button">Guardar Usuario</button>
    </form>
  </div>
  );
};

export default CreateUserForm;
