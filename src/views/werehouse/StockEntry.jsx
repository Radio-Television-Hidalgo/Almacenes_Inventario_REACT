import React, { useState, useEffect } from "react";

function StockEntry() {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        fetch("/api/almacen/almacen")
            .then((response) => response.json())
            .then((data) => setFormData(data.data)) // Acceder a data dentro de la respuesta
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Entrada de existencias</h1>
            <table>
                <thead>
                    <tr>
                        <th>Tipo de alta</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Fecha de Adquisición</th>
                        <th>Fecha de salida</th>
                        <th>Tipo de activo</th>
                        <th>Código armonizable</th>
                        <th>Cuenta contable</th>
                        <th>Cantidad</th>
                        <th>Locación</th>
                        <th>Estatus</th>
                        <th>Número de serie</th>
                        <th>Número de almacén</th>
                        <th>Número de inventario</th>
                        <th>Motivo</th>
                        <th>Tipo de resguardo</th>
                        <th>Artículo</th>
                        <th>Factura</th>
                        <th>Póliza</th>
                        <th>Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.acquisition_type}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.type}</td>
                            <td>{new Date(item.entry_date).toLocaleDateString()}</td>
                            <td>{item.exit_date ? new Date(item.exit_date).toLocaleDateString() : 'N/A'}</td>
                            <td>{item.asset_type}</td>
                            <td>{item.harmonizable_code}</td>
                            <td>{item.accounting_record}</td>
                            <td>{item.quantity}</td>
                            <td>{item.location}</td>
                            <td>{item.status ? 'Activo' : 'Inactivo'}</td>
                            <td>{item.serial_number}</td>
                            <td>{item.warehouses_number}</td>
                            <td>{item.inventory_number}</td>
                            <td>{item.reason}</td>
                            <td>{item.custody_type}</td>
                            <td>{item.article_id}</td>
                            <td>{item.invoice_id}</td>
                            <td>{item.policy_id}</td>
                            <td>{item.user_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StockEntry;
