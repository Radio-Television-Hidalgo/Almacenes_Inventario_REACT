import React, { useEffect, useState } from "react";
import '../../styles/userInventory.css'; // Asegúrate de que la ruta sea correcta

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
                user: dato.user,
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
        setSearchTerm("");
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
                <div key={user.worker_nomber} className="card-u">
                    <div className="userInfo-u">
                        <img src={user.img} alt="Foto del Usuario" className="userImage" />
                        <div>
                            <p className="C"><strong>Nombre:</strong> {user.name}</p>
                            <p className="userText"><strong>Número de Trabajador:</strong> {user.worker_nomber}</p>
                            <p className="userText"><strong>Tipo:</strong> {user.type}</p>
                        </div>
                    </div>
                    <button className="button-u" onClick={() => handleViewMore(items)}>
                        Ver Más
                    </button>
                </div>
            ))}
            {modalData && (
                <div className="modal-u">
                    <div className="modalContent-u">
                        <span className="closeButton" onClick={closeModal}>&times;</span>
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            className="searchInput"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <table className="table-u">
                            <thead>
                                <tr>
                                    <th className="tableHeaderCell">IMG</th>
                                    <th className="tableHeaderCell">Nombre</th>
                                    <th className="tableHeaderCell">Descripción</th>
                                    <th className="tableHeaderCell">Categoría</th>
                                    <th className="tableHeaderCell">Fecha de Entrada</th>
                                    <th className="tableHeaderCell">Fecha de Salida</th>
                                    <th className="tableHeaderCell">Locación</th>
                                    <th className="tableHeaderCell">Estatus</th>
                                    <th className="tableHeaderCell">Fecha de Resguardo</th>
                                    <th className="tableHeaderCell">Motivo no Asignado</th>
                                    <th className="tableHeaderCell">Comentario</th>
                                    <th className="tableHeaderCell">Número de Serie</th>
                                    <th className="tableHeaderCell">Número de Inventario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredModalData.map(item => (
                                    <tr key={item.id} className="tableRow">
                                        <td className="tableCell">
                                            <img
                                                src={item.articles.photos_entry}
                                                alt="Foto del Artículo"
                                                className="userImage"
                                            />
                                        </td>
                                        <td className="tableCell">{item.name}</td>
                                        <td className="tableCell">{item.description}</td>
                                        <td className="tableCell">{item.category}</td>
                                        <td className="tableCell">{new Date(item.entry_date).toLocaleDateString()}</td>
                                        <td className="tableCell">{new Date(item.exit_date).toLocaleDateString()}</td>
                                        <td className="tableCell">{item.location}</td>
                                        <td className="tableCell">{item.status}</td>
                                        <td className="tableCell">{item.safeguard_date ? new Date(item.safeguard_date).toLocaleDateString() : 'N/A'}</td>
                                        <td className="tableCell">{item.reason_not_assigned || 'N/A'}</td>
                                        <td className="tableCell">{item.comment || 'N/A'}</td>
                                        <td className="tableCell">{item.serial_number}</td>
                                        <td className="tableCell">{item.inventory_number}</td>
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

export default UserInventory;
