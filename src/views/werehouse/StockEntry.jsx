import React, { useState, useEffect } from "react";
import '../../styles/StockEntry.css'; 

function StockEntry() {
    const [formData, setFormData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); 
    const [editQuantity, setEditQuantity] = useState(); // Inicializa como 0

    useEffect(() => {
        fetch("/api/almacen/almacen")
            .then((response) => response.json())
            .then((data) => setFormData(data.data)) 
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleQuantityChange = (e) => {
        setEditQuantity(Number(e.target.value)); // Convierte el valor a número
    };

    const handleEditClick = (index) => {
        setEditIndex(index); 
        setEditQuantity(); // Inicializa la cantidad a 0 
    };

    const handleSaveClick = (id, currentQuantity) => {
        if (editQuantity < 0) {
            alert("Por favor no ingrese cantidades negativas.");
            return;
        }
        const newQuantity = currentQuantity + editQuantity; // Suma la cantidad ingresada
        fetch(`/api/almacen/almacen/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: newQuantity }), // Envía la nueva cantidad
        })
        .then((response) => response.json())
        .then(() => {
            setFormData((prevData) =>
                prevData.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
            );
            setEditIndex(null);
            setEditQuantity(); // Reinicia el valor
        })
        .catch((error) => console.error("Error updating quantity:", error));
    };

    return (
        <div className="stock-entry-custom-container">
            <br />
            <table className="stock-entry-custom-table">
                <thead>
                    <tr>
                        <th>Tipo de alta</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Fecha de Adquisición</th>
                        <th>Tipo de activo</th>
                        <th>Código armonizable</th>
                        <th>Cuenta contable</th>
                        <th>Locación</th>
                        <th>Estatus</th>
                        <th>Número de serie</th>
                        <th>Número de almacén</th>
                        <th>Número de inventario</th>
                        <th>Motivo</th>
                        <th>Tipo de resguardo</th>
                        <th>Artículo</th>
                        <th>Cantidad</th>
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
                            <td>{item.asset_type}</td>
                            <td>{item.harmonizable_code}</td>
                            <td>{item.accounting_record}</td>
                            <td>{item.location}</td>
                            <td>{item.status ? 'Activo' : 'Inactivo'}</td>
                            <td>{item.serial_number}</td>
                            <td>{item.warehouses_number}</td>
                            <td>{item.inventory_number}</td>
                            <td>{item.reason}</td>
                            <td>{item.custody_type}</td>
                            <td>{item.article_id}</td>
                            <td>{item.quantity}</td>
                            <td>
                                {editIndex === index ? (
                                    <>
                                        <input
                                        className="input"
                                            type="number"
                                            value={editQuantity}
                                            onChange={handleQuantityChange}
                                            placeholder="Agrega"
                                        />
                                        <button className="botones" onClick={() => handleSaveClick(item.id, item.quantity)}>Guardar</button>
                                    </>
                                ) : (
                                    <button className="botones" onClick={() => handleEditClick(index)}>Agregar mas existencias</button>
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
