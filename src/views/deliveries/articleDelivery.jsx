import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/articleDelivety.css";

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
        <div class="entrega-bien-main-container">
        <h1 class="entrega-bien-titulo">Entrega de bien</h1>
        <form class="entrega-bien-form" onSubmit={handleSave}>
            <div class="entrega-bien-form-grid">
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">Cantidad</label>
                    <input type="text" class="entrega-bien-input" placeholder='Cantidad' name='quantity' onChange={handleInputChange} />
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">Fecha de entrega</label>
                    <input type="date" class="entrega-bien-input" placeholder='Fecha de entrega' name='delivery_date' onChange={handleInputChange} />
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">Descripción</label>
                    <input type="text" class="entrega-bien-input" placeholder='Descripción' name='description' onChange={handleInputChange} />
                </div>
                <div class="entrega-bien-form-group" hidden>
                    <label htmlFor="" class="entrega-bien-label">Estatus</label>
                    <input type="text" class="entrega-bien-input" name='status' onChange={handleInputChange} defaultValue={"proceso"} />
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">Observaciones</label>
                    <input type="text" class="entrega-bien-input" placeholder='Observaciones' name='observations' onChange={handleInputChange} />
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">Tipo</label>
                    <select name="type" id="" class="entrega-bien-select" onChange={handleInputChange}>
                        <option value="#" selected disabled>Selecciona un tipo</option>
                        <option value="externo">Externo</option>
                        <option value="interno">Interno</option>
                    </select>
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">Ubicación</label>
                    <select  name="ubication" id="" class="entrega-bien-select" onChange={handleInputChange}>
                        <option value="#" selected disabled>Selecciona una ubicación</option>
                        <option value='Ub1'>Ubicación 1</option>
                        <option value='Ub2'>Ubicación 2</option>
                        <option value='Ub3'>Ubicación 3</option>
                    </select>
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="warehous_id" class="entrega-bien-label">Almacén</label>
                    <input type="text" class="entrega-bien-input" placeholder='Almacén' name='warehous_id' onChange={handleInputChange} />
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">No de Inventario</label>
                    <input type="text" class="entrega-bien-input" placeholder='No de Inventario' name='inventori_id' onChange={handleInputChange} />
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">Artículo</label>
                    <input type="text" class="entrega-bien-input" placeholder='Artículo' name='articles_id' onChange={handleInputChange} />
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">Entrega: </label>
                    <input type="number" class="entrega-bien-input" placeholder='Entrega' name='user_id_delivery' onChange={handleInputChange} />
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">Recibe: </label>
                    <input type="number" class="entrega-bien-input" placeholder='Recibe' name='user_id_receives' onChange={handleInputChange} />
                </div>
                <div class="entrega-bien-form-group">
                    <label htmlFor="" class="entrega-bien-label">Fotos de entrada: </label>
                    <input type="file" class="entrega-bien-input" name='photos_entrance' onChange={handleFileChange} />
                </div>
            </div>
            <div class="entrega-bien-submit">
                <input type="submit" class="entrega-bien-button" value={"Guardar entrega"} />
            </div>
        </form>
    </div>
    )
}

export default ArticleDelivery