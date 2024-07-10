import {Helmet} from "react-helmet";
import { useState } from 'react';
import '../styles/bills.css';

function StateofThegoods() {

    const [billInputType, setBillInputType] = useState("password");
    const [policyInputType, setPolicyInputType] = useState("password");

    const toggleBillVisibility = () => {
        setBillInputType(billInputType === 'text' ? 'password' : 'text');
    };

    const togglePolicyVisibility = () => {
        setPolicyInputType(policyInputType === 'text' ? 'password' : 'text');
    };

    return (
        <div>
            <Helmet>
                <title>Estado de los bienes</title>
            </Helmet>
            <h1>Sistema de inventario y Almacen de Radio y Television de Hidalgo</h1>

            <form>
                {/* PARA FRONTEND: en jsx los label no pueden ser referenciados mediante
                "label for" deben ser referenciados mediante "label htmlFor"*/}
                <label htmlFor="Namegood">Nombre del bien</label>
                <input type="text" id="Namegood" placeholder=""/>

                <label htmlFor="Brand">Marca</label>
                <input type="text" id="Brand" placeholder=""/>
                
                <label htmlFor="Model">Modelo</label>
                <input type="text" id="Model" placeholder=""/>
                
                <label htmlFor="Description">Descripcion</label>
                <input type="text" id="Description" placeholder=""/>
                
                <label htmlFor="NI">NI</label>
                <input type="text" id="NI" placeholder=""/>
                
                <label htmlFor="NSerial">Serial</label>
                <input type="text" id="NSerial" placeholder=""/>
                
                <label htmlFor="Bill">Factura</label>
                <input type={billInputType} id="Bill" placeholder=""/>
                <button type="button" onClick={toggleBillVisibility}>{billInputType === 'text' ? 'Ocultar' : 'Mostrar'}</button>
                
                <label htmlFor="Policy">Poliza</label>
                <input type={policyInputType} id="Policy" placeholder=""/>
                <button type="button" onClick={togglePolicyVisibility}>{policyInputType === 'text' ? 'Ocultar' : 'Mostrar'}</button>
                
                <label htmlFor="Status">Estado</label>
                <input type="text" id="Status" placeholder=""/>
                
                <label htmlFor="Ubi">Ubicacion del bien</label>
                <input type="text" id="Ubi" placeholder=""/>
                
                <label htmlFor="Depresiation">Depreciacion Acumulada</label>
                <input type="text" id="Depresiation" placeholder=""/>
                
                <label htmlFor="Cost">Valor</label>
                <input type="text" id="Cost" placeholder=""/>
                
                <label htmlFor="libre">Libre</label>
                <input type="text" id="libre"></input>


            </form>
                 
            <p>Esta es la página del estado de los bienes de la app.</p>
        </div>
    );



}

export default StateofThegoods;