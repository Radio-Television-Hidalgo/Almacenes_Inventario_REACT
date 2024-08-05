import React, { useEffect, useState } from "react";
import '../../styles/userInventory.css'; // Asegúrate de que la ruta sea correcta

function UserInventory() {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [itemModalData, setItemModalData] = useState(null);
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
        if (!acc[dato.user_id_receives]) {
            acc[dato.user_id_receives] = {
                user: dato.user,
                items: []
            };
        }
        acc[dato.user_id_receives].items.push(dato);
        return acc;
    }, {});

    const handleViewMore = (items) => {
        setModalData(items);
    };

    const handleViewItemMore = (item) => {
        setItemModalData(item);
    };

    const closeModal = () => {
        setModalData(null);
        setSearchTerm("");
    };

    const closeItemModal = () => {
        setItemModalData(null);
    };

    const filteredGroupedData = Object.values(groupedData).filter(({ user }) => {
        const userName = user.name ? user.name.toLowerCase() : "";
        const workerNumber = user.worker_nomber ? String(user.worker_nomber).toLowerCase() : "";
        return userName.includes(searchTerm.toLowerCase()) || workerNumber.includes(searchTerm.toLowerCase());
    });

    const filteredModalData = modalData
        ? modalData.filter(item => {
            const itemName = item.articles.name ? item.articles.name.toLowerCase() : "";
            const inventoryNumber = item.deliveryWarehouse.inventory_number ? String(item.deliveryWarehouse.inventory_number).toLowerCase() : "";
            return itemName.includes(searchTerm.toLowerCase()) || inventoryNumber.includes(searchTerm.toLowerCase());
        })
        : [];

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container-u">
            <input
                type="text"
                placeholder="Buscar por nombre o número de trabajador"
                className="searchInput-u"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredGroupedData.map(({ user, items }) => (
                <UserCard key={user.worker_nomber} user={user} items={items} handleViewMore={handleViewMore} />
            ))}
            {modalData && (
                <Modal closeModal={closeModal}>
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        className="searchInput-u"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ItemTable items={filteredModalData} handleViewItemMore={handleViewItemMore} />
                </Modal>
            )}
            {itemModalData && (
                <Modal closeModal={closeItemModal}>
                    <ItemDetails item={itemModalData} />
                </Modal>
            )}
        </div>
    );
}

const UserCard = ({ user, items, handleViewMore }) => (
    <div className="card-u">
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
);

const Modal = ({ children, closeModal }) => (
    <div className="modal-u">
        <div className="modalContent-u">
            <span className="closeButton-u" onClick={closeModal}>&times;</span>
            {children}
        </div>
    </div>
);

const ItemTable = ({ items, handleViewItemMore }) => (
    <table className="table-u">
        <thead>
            <tr>
                <th className="tableHeaderCell-u">IMG</th>
                <th className="tableHeaderCell-u">Nombre</th>
                <th className="tableHeaderCell-u">Número de inventario</th>
                <th className="tableHeaderCell-u">Fecha de Resguardo</th>
                <th className="tableHeaderCell-u">Número de Serie</th>
                <th className="tableHeaderCell-u">Ver más</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.id} className="tableRow-u">
                    <td className="tableCell-u">
                        <img
                            src={item.articles.photos_entry}
                            alt="Foto del Artículo"
                            className="userImage-u"
                        />
                    </td>
                    <td className="tableCell-u">{item.articles.name}</td>
                    <td className="tableCell-u">{item.deliveryWarehouse.inventory_number}</td>
                    <td className="tableCell-u">{new Date(item.delivery_date).toLocaleDateString()}</td>
                    <td className="tableCell-u">{item.articles.number_series}</td>
                    <td className="tableCell-u">
                        <button className="button-more" onClick={() => handleViewItemMore(item)}>Ver más</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const ItemDetails = ({ item }) => (
    <div className="item-modal">
        
        <div className="itemDetails-u">
            <div className="item-image-details">
                <img
                    src={item.articles.photos_entry}
                    alt="Foto del Artículo"
                    className="item-modal-image"
                />
                <h3>{item.articles.name}</h3>
                <p>Número de inventario: <strong>{item.deliveryWarehouse.inventory_number}</strong></p>
            </div>
            <div className="item-info-details">
                <p><strong>Fecha de Resguardo:</strong> {new Date(item.delivery_date).toLocaleDateString()}</p>
                <p><strong>Número de serie:</strong> {item.articles.number_series}</p>
                <p><strong>Observaciones:</strong> {item.observations}</p>
                <p><strong>Descripción:</strong> {item.articles.description}</p>
                <div className="item-icons">
                    <div className="item-icon item-icon-blue">
                        <span className="item-icon-text">Marca</span>
                        <span className="item-icon-value">{item.articles.brand}</span>
                    </div>
                    <div className="item-icon item-icon-red">
                        <span className="item-icon-text">Modelo</span>
                        <span className="item-icon-value">{item.articles.model}</span>
                    </div>
                    <div className="item-icon item-icon-green">
                        <span className="item-icon-text">Total</span>
                        <span className="item-icon-value">{item.articles.articleBill.total}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default UserInventory;