import React, { useEffect, useState } from "react";

function UserInventory() {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedUser, setExpandedUser] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("/api/inventories/inventarios")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al cargar los datos");
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    setDatos(data.data);
                } else {
                    throw new Error("La respuesta de la API no contiene un array en la propiedad 'data'");
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const groupedData = datos.reduce((acc, dato) => {
        if (!acc[dato.user_id]) {
            acc[dato.user_id] = {
                user: dato.user, // Asegúrate de que el dato tiene la estructura correcta
                items: []
            };
        }
        acc[dato.user_id].items.push(dato);
        return acc;
    }, {});

    const handleViewMore = (items) => {
        setModalData(items);
    };

    const closeModal = () => {
        setModalData(null);
        setSearchTerm(""); // Clear search term when closing the modal
    };

    const filteredModalData = modalData
        ? modalData.filter(item =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {Object.values(groupedData).map(({ user, items }) => (
                <div key={user.worker_nomber} style={styles.card}>
                    <div style={styles.userInfo}>
                        <img src={user.img} alt="Foto del Usuario" style={styles.userImage} />
                        <div>
                            <p style={styles.userText}><strong>Nombre:</strong> {user.name}</p>
                            <p style={styles.userText}><strong>Número de Trabajador:</strong> {user.worker_nomber}</p>
                            <p style={styles.userText}><strong>Tipo:</strong> {user.type}</p>
                        </div>
                    </div>
                    <button style={styles.button} onClick={() => handleViewMore(items)}>
                        Ver Más
                    </button>
                </div>
            ))}
            {/* Modal */}
            {modalData && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <span style={styles.closeButton} onClick={closeModal}>&times;</span>
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            style={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.tableHeaderCell}>Nombre</th>
                                    <th style={styles.tableHeaderCell}>Descripción</th>
                                    <th style={styles.tableHeaderCell}>Categoría</th>
                                    <th style={styles.tableHeaderCell}>Fecha de Entrada</th>
                                    <th style={styles.tableHeaderCell}>Fecha de Salida</th>
                                    <th style={styles.tableHeaderCell}>Locación</th>
                                    <th style={styles.tableHeaderCell}>Estatus</th>
                                    <th style={styles.tableHeaderCell}>Fecha de Resguardo</th>
                                    <th style={styles.tableHeaderCell}>Motivo no Asignado</th>
                                    <th style={styles.tableHeaderCell}>Comentario</th>
                                    <th style={styles.tableHeaderCell}>Número de Serie</th>
                                    <th style={styles.tableHeaderCell}>Número de Inventario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredModalData.map(item => (
                                    <tr key={item.id} style={styles.tableRow}>
                                        <td style={styles.tableCell}>{item.name}</td>
                                        <td style={styles.tableCell}>{item.description}</td>
                                        <td style={styles.tableCell}>{item.category}</td>
                                        <td style={styles.tableCell}>{new Date(item.entry_date).toLocaleDateString()}</td>
                                        <td style={styles.tableCell}>{new Date(item.exit_date).toLocaleDateString()}</td>
                                        <td style={styles.tableCell}>{item.location}</td>
                                        <td style={styles.tableCell}>{item.status}</td>
                                        <td style={styles.tableCell}>{item.safeguard_date ? new Date(item.safeguard_date).toLocaleDateString() : 'N/A'}</td>
                                        <td style={styles.tableCell}>{item.reason_not_assigned || 'N/A'}</td>
                                        <td style={styles.tableCell}>{item.comment || 'N/A'}</td>
                                        <td style={styles.tableCell}>{item.serial_number}</td>
                                        <td style={styles.tableCell}>{item.inventory_number}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

// Estilos en línea para los componentes
const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '10px',
    },
    userImage: {
        borderRadius: '50%',
        width: '50px',
        height: '50px',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px',
        cursor: 'pointer',
        textAlign: 'center',
    },
    userText: {
        color: 'black',
    },
    modal: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        width: '90%',
        maxWidth: '1200px',
        position: 'relative',
        overflowX: 'auto',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        fontSize: '20px',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeaderCell: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: '1px solid #000',
        padding: '12px',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    tableRow: {
        backgroundColor: '#ddd', // Set uniform background color for rows
    },
    tableCell: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },
};

export default UserInventory;
