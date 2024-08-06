import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function InventoryForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        entry_date: '',
        exit_date: '',
        location: '',
        status: 'operativo',
        safeguard_date: '',
        reason_not_assigned: '',
        comment: '',
        serial_number: '',
        inventory_number: '',
        policy_id: '',
        article_id: '',
        warehouse_id: '',
        user_id: ''
    });

    const [articles, setArticles] = useState([]); // Estado para almacenar los artículos
    const [policies, setPolicies] = useState([]); // Estado para almacenar las políticas
    const [users, setUsers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        // Fetch articles from the backend
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/api/articulos/articulos'); // Asegúrate de que esta sea la URL correcta
                console.log(response)
                if (response.status === 200) {
                    setArticles(response.data); // Actualiza el estado con los artículos
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const response = await fetch("/api/articulos/datosCatalogo");
                const data = await response.json();
                // console.log(data);
                setPolicies(data.policies);
            } catch (error) {
                console.error("Error fetching catalogs:", error);
            }
        };

        fetchCatalogs();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/usuario/usuarios');
                console.log('API Response:', response.data); // Verifica la estructura aquí

                // Extraer el array de la propiedad `data` del objeto de respuesta
                const usersData = response.data.data;
                if (Array.isArray(usersData)) {
                    setUsers(usersData); // Actualiza el estado con los usuarios
                } else {
                    console.error('Expected an array in response.data.data but received:', usersData);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);


    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get('/api/inventories/almacen');
                console.log('API Response:', response.data);

                const warehouseData = response.data.data;
                if (Array.isArray(warehouseData)) {
                    setWarehouses(warehouseData);
                    console.log('Warehouses data:', warehouseData); // Verifica que los datos son correctos
                } else {
                    console.error('Expected an array in response.data.data but received:', warehouseData);
                }
            } catch (error) {
                console.error('Error fetching warehouses:', error);
            }
        };

        fetchWarehouses();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); // Imprime los datos del formulario en la consola
        try {
            const response = await axios.post('/api/inventories/inventarios', formData);
            alert('Inventory created successfully!');
            // Clear the form
            setFormData({
                name: '',
                description: '',
                category: '',
                entry_date: '',
                exit_date: '',
                location: '',
                status: 'operativo',
                safeguard_date: '',
                reason_not_assigned: '',
                comment: '',
                serial_number: '',
                inventory_number: '',
                policy_id: '',
                article_id: '',
                warehouse_id: '',
                user_id: ''
            });
        } catch (error) {
            console.error('Error creating inventory:', error);
            alert('Failed to create inventory. Please try again.');
        }
    };

    return (
        <div style={styles.formContainer}>
            <h1>Create Inventory</h1>
            <form onSubmit={handleSubmit} style={styles.inventoryForm}>
                <div style={styles.column}>
                    <label style={styles.label}>
                        Nombre:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Descripción:
                        <textarea name="description" value={formData.description} onChange={handleChange} style={styles.textarea}></textarea>
                    </label>
                    <label style={styles.label}>
                        Categoría:
                        <input type="text" name="category" value={formData.category} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Fecha de entrada:
                        <input type="date" name="entry_date" value={formData.entry_date} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Fecha de salida:
                        <input type="date" name="exit_date" value={formData.exit_date} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Ubicación:
                        <input type="text" name="location" value={formData.location} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Status:
                        <select name="status" value={formData.status} onChange={handleChange} style={styles.select}>
                            <option value="operativo">Operativo</option>
                        </select>
                    </label>
                    <label style={styles.label}>
                        Fecha de resguardo:
                        <input type="date" name="safeguard_date" value={formData.safeguard_date} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Razón de no asignación:
                        <textarea name="reason_not_assigned" value={formData.reason_not_assigned} onChange={handleChange} style={styles.textarea}></textarea>
                    </label>
                </div>
                <div style={styles.column}>
                    <label style={styles.label}>
                        Comentario:
                        <textarea name="comment" value={formData.comment} onChange={handleChange} style={styles.textarea}></textarea>
                    </label>
                    <label style={styles.label}>
                        Numero de serie:
                        <input type="text" name="serial_number" value={formData.serial_number} onChange={handleChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Número de inventario:
                        <input type="text" name="inventory_number" value={formData.inventory_number} onChange={handleChange} required style={styles.input} />
                    </label>

                    <label style={styles.label}>
                       Id póliza:
                        <select name="policy_id" value={formData.policy_id} onChange={handleChange} required style={styles.select}>
                            <option value="">Seleccione póliza</option>
                            {policies.map((policy) => (
                                <option key={policy.id} value={policy.id}>
                                    {policy.description}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label style={styles.label}>
                        Article:
                        <select name="article_id" value={formData.article_id} onChange={handleChange} required style={styles.select}>
                            <option value="">Seleccione artículo</option>
                            {articles.map(article => (
                                <option key={article.id} value={article.id}>
                                    {article.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label style={styles.label}>
                        Warehouse:
                        <select name="warehouse_id" value={formData.warehouse_id} onChange={handleChange} required style={styles.select}>
                            <option value="">Seleccione almacén</option>
                            {warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>
                                    {warehouse.acquisition_type} {/* Cambiado de warehouse.name a warehouse.acquisition_type */}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label style={styles.label}>
                        User:
                        <select name="user_id" value={formData.user_id} onChange={handleChange} required style={styles.select}>
                            <option value="">Seleccione usuario</option>
                            {Array.isArray(users) && users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit" style={styles.button}>Crear inventario</button>
            </form>
        </div>
    );
}

const styles = {
    formContainer: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    inventoryForm: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '15px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    select: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
        gridColumn: '1 / span 2', // Makes the button span both columns
    },
};
