import { useEffect, useState } from "react";

function Goods() {
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        fetch("/api/bienes/bienesadquiridos")
        .then(response => response.json())
        .then(data => setDatos(data))
        .catch(error => console.error("Error al cargar los datos", error));
    }, []);

    return (
        <div>
            <h1>Bienes Adquiridos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Modelo</th>
                        <th>Características</th>
                        <th>Marca</th>
                        <th>Número de serie</th>
                        <th>Número de inventario</th>
                        <th>Origen</th>
                        <th>Foto</th>
                        <th>Ubicación</th>
                        <th>Depreciación</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id}>
                            <td>{dato.id}</td>
                            <td>{dato.name}</td>
                            <td>{dato.model}</td>
                            <td>{dato.characteristics}</td>
                            <td>{dato.brand}</td>
                            <td>{dato.serial_number}</td>
                            <td>{dato.inventory_number}</td>
                            <td>{dato.origin}</td>
                            <td>
                                <img src={dato.photo} alt={`Foto de ${dato.name}`} width="100" />
                            </td>
                            <td>{dato.ubication}</td>
                            <td>{dato.accumulated_depreciation}</td>
                            <td>{dato.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Goods;
