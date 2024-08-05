import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation  } from 'react-router-dom';
import Modal from 'react-modal';
import "../../styles/downArticle.css";

Modal.setAppElement('#root'); // Establece el elemento raíz para accesibilidad

export default function DownArticle() {
    const location = useLocation();
    const { id } = location.state;
    const [removalType, setRemovalType] = useState('');
    const [removalDate, setRemovalDate] = useState('');
    const [removalReason, setRemovalReason] = useState('');
    const [status, setStatus] = useState('Aceptada');
    const [confirmationId, setConfirmationId] = useState('');
    const [requestWithdrawId, setRequestWithdrawId] = useState('');
    const [articlesId, setArticlesId] = useState('');
    const [inventoryId, setInventoryId] = useState(''); // ID del inventario visible
    const [hiddenInventoryId, setHiddenInventoryId] = useState(''); // ID del inventario para enviar
    const [articleName, setArticleName] = useState('');
    const [articleImages, setArticleImages] = useState([]); // Estado para las URLs de las imágenes
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para abrir/cerrar el modal
    const [selectedImage, setSelectedImage] = useState(''); // URL de la imagen seleccionada

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

                    // Obtener las imágenes del artículo
                    const photoEntries = response.data.articleDetails.photos_entry.split(',');
                    const imageUrls = photoEntries.map(photoEntry => `/api/${photoEntry.trim()}`);
                    setArticleImages(imageUrls); // Establecer las URLs de las imágenes
                } else {
                    setArticleName(''); // Limpiar el nombre del artículo si no se encuentra
                    setArticlesId(''); // Limpiar el ID del artículo si no se encuentra
                    setHiddenInventoryId(''); // Limpiar el ID del inventario en caso de no encontrar datos
                    setArticleImages([]); // Limpiar las imágenes si no se encuentra
                }
            } catch (error) {
                console.error('Error fetching article details:', error);
                setArticleName(''); // Limpiar el nombre del artículo en caso de error
                setArticlesId(''); // Limpiar el ID del artículo en caso de error
                setHiddenInventoryId(''); // Limpiar el ID del inventario en caso de error
                setArticleImages([]); // Limpiar las imágenes en caso de error
            }
        } else {
            setArticleName(''); // Limpiar el nombre del artículo si el campo de inventario está vacío
            setArticlesId(''); // Limpiar el ID del artículo si el campo de inventario está vacío
            setHiddenInventoryId(''); // Limpiar el ID del inventario si el campo está vacío
            setArticleImages([]); // Limpiar las imágenes si el campo está vacío
        }
    };
    function BajaBien() {
        const location = useLocation();
        const { id } = location.state;
      
        console.log("id", id);
      }
      BajaBien();
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
            const response = await fetch(`/api/bajas/casualtys/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Casualty created:', data);
            setSuccess('Baja registrada exitosamente.'); // Mensaje de éxito
            navigate('/inicio'); // Redirige a la página de inicio
        } catch (error) {
            console.error('Error creating casualty:', error);
            setError('Error al registrar la baja.'); // Mensaje de error
        } finally {
            setIsLoading(false); // Detener el estado de carga
        }
    };
    

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage('');
    };

    return (
        <div className="custom-form-container">
            <div className="custom-form-grid">
                <div className="custom-form-group">
                    <label>Tipo de Baja</label>
                    <select 
                        value={removalType} 
                        onChange={e => setRemovalType(e.target.value)} 
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="prestamo">Préstamo</option>
                        <option value="descompuesto">Descompuesto</option>
                        <option value="descontinuación">Descontinuación</option>
                    </select>
                </div>
                <div className="custom-form-group">
                    <label>Fecha de Baja</label>
                    <input 
                        type="datetime-local" 
                        value={removalDate} 
                        onChange={e => setRemovalDate(e.target.value)} 
                    />
                </div>
                <div className="custom-form-group">
                    <label>Razón de Baja</label>
                    <input 
                        type="text" 
                        value={removalReason} 
                        onChange={e => setRemovalReason(e.target.value)} 
                    />
                </div>
                <div className="custom-form-group">
    <label>Estatus</label>
    <select 
        value={status} 
        onChange={e => setStatus(e.target.value)} 
        disabled // Esto deshabilita el campo de selección
    >
        <option value="Aceptada">Aceptada</option>
    </select>
</div>

                <div className="custom-form-group">
                    <label>Id de Confirmación</label>
                    <input 
                        type="text" 
                        value={userName} // Muestra el nombre del usuario
                        readOnly 
                    />
                </div>
                <div className="custom-form-group">
                    <label>Id de Solicitud de Retiro</label>
                    <select 
                        value={requestWithdrawId} 
                        onChange={e => setRequestWithdrawId(e.target.value)} 
                    >
                        <option value="">Seleccione una opción</option>
                        {Array.isArray(users) && users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div className="custom-form-group">
                    <label>Número de Inventario</label>
                    <input 
                        type="text" 
                        value={inventoryId} 
                        onChange={handleInventoryIdChange} // Actualizar al cambiar el número de inventario
                    />
                </div>
                <div className="custom-form-group">
                    <label>Nombre del Artículo</label>
                    <input 
                        type="text" 
                        value={articleName} // Mostrar el nombre del artículo
                        readOnly 
                    />
                </div>
                {articleImages.length > 0 && (
    <div className="custom-form-group">
        <label>Imágenes del Artículo</label>
        <div className="article-images">
            {articleImages.map((imageUrl, index) => (
                <img 
                    key={index} 
                    src={imageUrl} 
                    alt={`Imagen ${index + 1}`} 
                    className="article-image" 
                    onClick={() => openModal(imageUrl)} 
                />
            ))}
        </div>
    </div>
)}

                {error && (
                    <div className="custom-error-message">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="custom-success-message">
                        {success}
                    </div>
                )}
            </div>
            <button 
                className="custom-submit-button"
                onClick={handleSubmit} 
                disabled={isLoading}
            >
                {isLoading ? 'Cargando...' : 'Registrar Baja'}
            </button>

            {/* Modal para mostrar la imagen seleccionada */}
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal}
                contentLabel="Imagen del Artículo"
                className="custom-modal"
                overlayClassName="custom-overlay"
            >
                <button className="close-modal-button" onClick={closeModal}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg></button>
                {selectedImage && <img src={selectedImage} alt="Imagen del Artículo" className="modal-image" />}
            </Modal>
        </div>
    );
}
