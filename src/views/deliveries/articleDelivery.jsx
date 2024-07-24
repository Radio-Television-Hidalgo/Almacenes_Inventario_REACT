import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ArticleDelivery() {
    const navigate = useNavigate();
    const [artDelData, setArtDelData] = useState({
        quantity: 0,
        delivery_date: '',
        description: "",
        status: 'proceso',
        observations: "",
        photos_entrance: null,
        type: "",
        ubication: "",
        warehous_id: null,
        inventori_id: null,
        articles_id: 0,
        user_id_delivery: 0,
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

    return (
        <div>
            <h1>Entrega de bien</h1>
            <form onSubmit={handleSave}>
                <div>
                    <label htmlFor="">Cantidad</label><br />
                    <input type="text" placeholder='Cantidad' name='quantity' onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="">Fecha de entrega</label><br />
                    <input type="date" placeholder='Fecha de entrega' name='delivery_date'  onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="">Descripcion</label><br />
                    <input type="text" placeholder='Descripcion' name='description' onChange={handleInputChange} />
                </div>
                <div hidden>
                    <label htmlFor="">Estatus</label>
                    <input type="text" name='status' onChange={handleInputChange} defaultValue={"proceso"} />
                </div>
                <div>
                    <label htmlFor="">Observaciones</label><br />
                    <input type="text" placeholder='Observaciones' name='observations' onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="">Tipo</label>
                    <select name="type" id="" onChange={handleInputChange}>
                        <option value="#" selected disabled>Selecciona un tipo</option>
                        <option value="externo">Externo</option>
                        <option value="interno">Interno</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Ubicacion</label>
                    <select name="ubication" id="" onChange={handleInputChange}>
                        <option value="#" selected disabled>Selecciona una ubicacion</option>
                        <option value='Ub1'>Ubicacion 1</option>
                        <option value='Ub2'>Ubicacion 2</option>
                        <option value='Ub3'>Ubicacion 3</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Almacen</label><br />
                    <input type="text" placeholder='Almacen' name='warehous_id' onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="">No de Inventario</label><br />
                    <input type="text" placeholder='No de Inventario' name='inventori_id' onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="">Articulo</label><br />
                    <input type="text" placeholder='Articulo' name='articles_id' onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="">Entrega: </label><br />
                    <input type="number" placeholder='Entrega' name='user_id_delivery' onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="">Recibe: </label><br />
                    <input type="number" placeholder='Recibe' name='user_id_receives' onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="">Fotos de entrada: </label><br />
                    <input type="file" placeholder='fotos de entrada' name='photos_entrance' onChange={handleFileChange} />
                </div>
                <div>
                    <input type="submit" value={"Guardar entrega"} />
                </div>
            </form>
        </div>
    )
}

export default ArticleDelivery