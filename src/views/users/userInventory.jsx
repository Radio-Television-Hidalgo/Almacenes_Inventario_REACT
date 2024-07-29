import React, { useEffect, useState } from "react";
import '../../styles/userInventory.css'; // Asegúrate de que la ruta sea correcta

function UserInventory() {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            item.articles.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container-u">
            {Object.values(groupedData).map(({ user, items }) => (
                <div key={user.worker_nomber} className="card-u">
                    <div className="userInfo-u">
                        <img src={user.img} alt="Foto del Usuario" className="userImage-u" />
                        <div>
                            <p className="userText-u"><strong>{user.name}</strong></p>
                            <p className="userRole-u">{user.type}</p>
                        </div>
                    </div>
                    <p className="userText-u"><strong>Número de Trabajador:</strong> {user.worker_nomber}</p>
                    <button className="button-u" onClick={() => handleViewMore(items)}>
                        Ver más
                    </button>
                </div>
            ))}
            {modalData && (
                <div className="modal-u">
                    <div className="modalContent-u">
                        <span className="closeButton-u" onClick={closeModal}>&times;</span>
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            className="searchInput-u"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <table className="table-u">
                            <thead>
                                <tr>
                                    <th className="tableHeaderCell-u">IMG</th>
                                    <th className="tableHeaderCell-u">Nombre</th>
                                    <th className="tableHeaderCell-u">Descripción</th>
                                    <th className="tableHeaderCell-u">Locación</th>
                                    <th className="tableHeaderCell-u">Estatus</th>
                                    <th className="tableHeaderCell-u">Fecha de Resguardo</th>
                                    <th className="tableHeaderCell-u">Comentario</th>
                                    <th className="tableHeaderCell-u">Número de Serie</th>
                                    <th className="tableHeaderCell-u">Ver más</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredModalData.map(item => (
                                    <tr key={item.id} className="tableRow-u">
                                        <td className="tableCell-u">
                                            <img
                                                src={item.articles.photos_entry}
                                                alt="Foto del Artículo"
                                                className="userImage-u"
                                            />
                                        </td>
                                        <td className="tableCell-u">{item.articles.name}</td>
                                        <td className="tableCell-u">{item.articles.description}</td>
                                        <td className="tableCell-u">{item.ubication}</td>
                                        <td className="tableCell-u">{item.status}</td>
                                        <td className="tableCell-u">{new Date(item.delivery_date).toLocaleDateString()}</td>
                                        <td className="tableCell-u">{item.observations}</td>
                                        <td className="tableCell-u">{item.articles.number_series}</td>
                                        <td className="tableCell-u"><button>Ver mas</button></td>
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
