import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/articleDelivety.css";
import BienTable from '../materialRequest/bienTable';

function ArticleDelivery() {
    const [datos, setDatos] = useState([]);
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [artDelData, setArtDelData] = useState({
        delivery_date: '',
        description: "",
        observations: "",
        photos_entrance: null,
        type: "",
        ubication: "",
        inventori_id: '',
        user_id_receives: 0
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArtDelData({ ...artDelData, [name]: value });
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setArtDelData({ ...artDelData, photos_entrance: e.target.files[0] });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in artDelData) {
            formData.append(key, artDelData[key]);
        }
        try{
            const response = await axios.post('/api/entregas/insertarEntrega', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/inicio");
            console.log('Entrega creada:', response.data);
        }catch(error){
            console.error('Error al crear el registro:', error);
        }
    }

    const fetchDatos = async () => {
        const departmentsResponse = await axios.get('http://localhost:3000/depertments/depertments');
        setDepartments(departmentsResponse.data.data);
        fetch("/api/solicitud/solicitudesBienes")
          .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar los datos: " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setDatos(data);
          })
          .catch((error) => {
            console.error("Error al cargar los datos", error);
          });
    };

    useEffect(() => {
        fetchDatos();
    }, []);

    return (
        <div className="entrega-bien-main-container">
        
        <form className="entrega-bien-form" onSubmit={handleSave}>
            <div className="entrega-bien-form-grid">
                <div className="entrega-bien-form-group">
                    <label htmlFor="" className="entrega-bien-label">Fecha de entrega</label>
                    <input type="date" className="entrega-bien-input" placeholder='Fecha de entrega' name='delivery_date' onChange={handleInputChange} />
                </div>
                <div className="entrega-bien-form-group">
                    <label htmlFor="" className="entrega-bien-label">Descripción</label>
                    <input type="text" className="entrega-bien-input" placeholder='Descripción' name='description' onChange={handleInputChange} />
                </div>
                <div className="entrega-bien-form-group">
                    <label htmlFor="" className="entrega-bien-label">Observaciones</label>
                    <input type="text" className="entrega-bien-input" placeholder='Observaciones' name='observations' onChange={handleInputChange} />
                </div>
                <div className="entrega-bien-form-group">
                    <label htmlFor="" className="entrega-bien-label">Tipo</label>
                    <select name="type" id="" className="entrega-bien-select" onChange={handleInputChange}>
                        <option value="#" selected disabled>Selecciona un tipo</option>
                        <option value="externo">Externo</option>
                        <option value="interno">Interno</option>
                    </select>
                </div>
                <div className="entrega-bien-form-group">
                    <label htmlFor="" className="entrega-bien-label">Ubicación</label>
                    <select  name="ubication" id="" className="entrega-bien-select" onChange={handleInputChange}>
                        <option value="#" selected disabled>Selecciona una ubicación</option>
                        {departments.map(department => (
                            <option key={department.id} value={department.name}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="entrega-bien-form-group">
                    <label htmlFor="warehous_id" className="entrega-bien-label">Numero de Inventario:</label>
                    <input type="text" className="entrega-bien-input" placeholder='Almacén' name='inventori_id' onChange={handleInputChange} />
                </div>
                <div className="entrega-bien-form-group">
                    <label htmlFor="" className="entrega-bien-label">Recibe: </label>
                    <select name="user_id_receives" className="entrega-bien-input" id="" onChange={handleInputChange}>
                        <option value="#" selected disabled>Selecciona un usuario</option>
                        {datos.map(dato => (
                            <option value={dato.requestingUser.id}>{dato.requestingUser.name}</option>
                        ))}
                    </select>
                </div>
                <div className="entrega-bien-form-group">
                    <label htmlFor="" className="entrega-bien-label">Fotos de entrada: </label>
                    <input type="file" className="entrega-bien-input" name='photos_entrance' onChange={handleFileChange} />
                </div>
            </div>
            <div className="entrega-bien-submit">
                <input type="submit" className="entrega-bien-button" value={"Guardar entrega"} />
            </div>
        </form>
        <BienTable/>
    </div>
    )
}

export default ArticleDelivery