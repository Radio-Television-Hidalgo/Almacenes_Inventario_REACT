import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DownArticle() {
    const [removalType, setRemovalType] = useState('');
    const [removalDate, setRemovalDate] = useState('');
    const [removalReason, setRemovalReason] = useState('');
    const [status, setStatus] = useState('');
    const [confirmationId, setConfirmationId] = useState('');
    const [requestWithdrawId, setRequestWithdrawId] = useState('');
    const [articlesId, setArticlesId] = useState('');
    const [inventoryId, setInventoryId] = useState(''); // ID del inventario visible
    const [hiddenInventoryId, setHiddenInventoryId] = useState(''); // ID del inventario para enviar
    const [articleName, setArticleName] = useState('');
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/usuario/infoUsuario');
                setConfirmationId(response.data.id); // Establecer el ID del usuario
                setUserName(response.data.name); // Establecer el nombre del usuario
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/usuario/usuariosGestion');
                setUsers(response.data.data); // Establecer la lista de usuarios
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUserData();
        fetchUsers();
    }, []);

    const handleInventoryIdChange = async (e) => {
        const inventoryId = e.target.value;
        setInventoryId(inventoryId);

        if (inventoryId) {
            try {
                const response = await axios.get(`/api/bajas/article-name/${inventoryId}`);
                if (response.data.articleDetails) {
                    setArticleName(response.data.articleDetails.name); // Establecer el nombre del artículo
                    setArticlesId(response.data.articleDetails.id); // Establecer el ID del artículo
                    setHiddenInventoryId(response.data.inventoryId); // Establecer el ID del inventario para enviar
                } else {
                    setArticleName(''); // Limpiar el nombre del artículo si no se encuentra
                    setArticlesId(''); // Limpiar el ID del artículo si no se encuentra
                    setHiddenInventoryId(''); // Limpiar el ID del inventario en caso de no encontrar datos
                }
            } catch (error) {
                console.error('Error fetching article details:', error);
                setArticleName(''); // Limpiar el nombre del artículo en caso de error
                setArticlesId(''); // Limpiar el ID del artículo en caso de error
                setHiddenInventoryId(''); // Limpiar el ID del inventario en caso de error
            }
        } else {
            setArticleName(''); // Limpiar el nombre del artículo si el campo de inventario está vacío
            setArticlesId(''); // Limpiar el ID del artículo si el campo de inventario está vacío
            setHiddenInventoryId(''); // Limpiar el ID del inventario si el campo está vacío
        }
    };

    const handleSubmit = async () => {
        const payload = {
            type: removalType,
            date: removalDate,
            reason: removalReason,
            status,
            confirmation_id: confirmationId,
            request_withdraw_id: parseInt(requestWithdrawId, 10),
            articles_id: parseInt(articlesId, 10),
            inventori_id: parseInt(hiddenInventoryId, 10), // Usar el ID del inventario para enviar
        };

        console.log('Payload being sent:', payload);

        try {
            setIsLoading(true); // Iniciar el estado de carga
            const response = await axios.post('/api/bajas/casualtys', payload);
            console.log('Casualty created:', response.data);
            setSuccess('Baja registrada exitosamente.'); // Mensaje de éxito
            navigate('/inicio'); // Redirige a la página de inicio
        } catch (error) {
            console.error('Error creating casualty:', error);
            setError('Error al registrar la baja.'); // Mensaje de error
        } finally {
            setIsLoading(false); // Detener el estado de carga
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formGroup}>
                <label>Tipo de Baja</label>
                <select 
                    value={removalType} 
                    onChange={e => setRemovalType(e.target.value)} 
                    style={styles.input}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="prestamo">Préstamo</option>
                    <option value="descompuesto">Descompuesto</option>
                    <option value="descontinuación">Descontinuación</option>
                </select>
            </div>
            <div style={styles.formGroup}>
                <label>Fecha de Baja</label>
                <input 
                    type="datetime-local" 
                    value={removalDate} 
                    onChange={e => setRemovalDate(e.target.value)} 
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label>Razón de Baja</label>
                <input 
                    type="text" 
                    value={removalReason} 
                    onChange={e => setRemovalReason(e.target.value)} 
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label>Estatus</label>
                <select 
                    value={status} 
                    onChange={e => setStatus(e.target.value)} 
                    style={styles.input}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Revisión">Revisión</option>
                    <option value="Aceptada">Aceptada</option>
                    <option value="Rechazada">Rechazada</option>
                </select>
            </div>
            <div style={styles.formGroup}>
                <label>Id de Confirmación</label>
                <input 
                    type="text" 
                    value={userName} // Muestra el nombre del usuario
                    readOnly 
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label>Id de Solicitud de Retiro</label>
                <select 
                    value={requestWithdrawId} 
                    onChange={e => setRequestWithdrawId(e.target.value)} 
                    style={styles.input}
                >
                    <option value="">Seleccione una opción</option>
                    {Array.isArray(users) && users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>
            <div style={styles.formGroup}>
                <label>Número de Inventario</label>
                <input 
                    type="text" 
                    value={inventoryId} 
                    onChange={handleInventoryIdChange} // Actualizar al cambiar el número de inventario
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label>Id del Artículo</label>
                <input 
                    type="text" 
                    value={articleName} // Mostrar el nombre del artículo
                    readOnly 
                    style={styles.input}
                />
            </div>
            {error && (
                <div style={styles.error}>
                    {error}
                </div>
            )}
            {success && (
                <div style={styles.success}>
                    {success}
                </div>
            )}
            <button onClick={handleSubmit} style={styles.button} disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Registrar Baja'}
            </button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    formGroup: {
        marginBottom: '15px',
        color: 'black',
        width: '100%',
        maxWidth: '400px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#FFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
    success: {
        color: 'green',
        marginBottom: '10px',
    },
};
