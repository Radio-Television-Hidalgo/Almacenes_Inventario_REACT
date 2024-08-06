import { useEffect, useState } from "react";
import React from 'react';

function PendingDeliveries() {
    const [datos, setDatos] = useState([]);

    const fetchDatos = () => {
        fetch("/api/entregas/gestionarEntregas")
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
        <div>
            <h1>Entregas pendientes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Articulo</th>
                        <th>Cantidad</th>
                        <th>Fecha de entrega</th>
                        <th>Descripción</th>
                        <th>Fotos</th>
                        <th>Usuario que entrego</th>
                        <th>Usuario que recibió</th>
                        <th>Estatus de entrega</th>
                        <th>Finalizar</th>
                        <th>Cancelar</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id}>
                            <td>{dato.tb_articulo.name}</td>
                            <td>{dato.quantity}</td>
                            <td>{dato.delivery_date}</td>
                            <td>{dato.description}</td>
                            <td><img src={`${dato.photos_entrance}`} alt={`foto de ${dato.tb_articulo.name}`} /></td>
                            <td>{dato.user_deliver.name}</td>
                            <td>{dato.user_receive.name}</td>
                            <td>{dato.status}</td>
                            <td><button>Finalizar</button></td>
                            <td><button>Cancelar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PendingDeliveries;
