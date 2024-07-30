import React, { useState, useEffect } from "react";
import '../../styles/StockEntry.css'; 

function StockEntry() {
    const [formData, setFormData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); 
    const [editQuantity, setEditQuantity] = useState(null); 

    useEffect(() => {
        fetch("/api/almacen/almacen")
            .then((response) => response.json())
            .then((data) => setFormData(data.data)) 
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleQuantityChange = (e) => {
        setEditQuantity(e.target.value); 
    };

    const handleEditClick = (index) => {
        setEditIndex(index); 
        setEditQuantity(formData[index].quantity); 
    };

    const handleSaveClick = (id) => {
        fetch(`/api/almacen/almacen/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: editQuantity }), 
        })
        .then((response) => response.json())
        .then((updatedData) => {
            setFormData((prevData) =>
                prevData.map((item) => (item.id === id ? { ...item, quantity: editQuantity } : item))
            );
            setEditIndex(null);
            setEditQuantity(null);
        })
        .catch((error) => console.error("Error updating quantity:", error));
    };

    return (
        <div className="stock-entry-custom-container">
            <h1 className="stock-entry-custom-title">Entrada de existencias</h1>
            <table className="stock-entry-custom-table">
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'stock-entry-custom-row-even' : 'stock-entry-custom-row-odd'}>
                            <td>{item.acquisition_type}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.type}</td>
                            <td>{new Date(item.entry_date).toLocaleDateString()}</td>
                            <td>{item.exit_date ? new Date(item.exit_date).toLocaleDateString() : 'N/A'}</td>
                            <td>{item.asset_type}</td>
                            <td>{item.harmonizable_code}</td>
                            <td>{item.accounting_record}</td>
                            <td>
                                {editIndex === index ? (
                                    <input
                                        className="stock-entry-custom-input"
                                        type="number"
                                        value={editQuantity}
                                        onChange={handleQuantityChange}
                                    />
                                ) : (
                                    item.quantity 
                                )}
                            </td>
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
                            <td>
                                {editIndex === index ? (
                                    <button className="stock-entry-custom-button" onClick={() => handleSaveClick(item.id)}>Guardar</button>
                                ) : (
                                    <button className="stock-entry-custom-button" onClick={() => handleEditClick(index)}>Editar</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StockEntry;
