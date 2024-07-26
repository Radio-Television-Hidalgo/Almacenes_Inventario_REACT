import React from 'react';

import "../../styles/documentacion.css";


const Documentation = () => {
    return (
        <div className="container">

            <main className="main-content">
                <h1>Documentación</h1>
                <tr></tr>
                <div className="buttons-container">
                    <button className="button">
                        <span className="icon">🚪</span>
                        <span>Ver facturas</span>
                    </button>
                    <button className="button">
                        <span className="icon">🚪</span>
                        <span>Crear Facturas</span>
                    </button>
                    <button className="button">
                        <span className="icon">📄</span>
                        <span>Crear Poliza</span>
                    </button>
                    <button className="button">
                        <span className="icon">📂</span>
                        <span>Ver polizas</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Documentation;
