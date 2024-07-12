import { useEffect, useState } from "react";

function SeeUser() {
    const [datos, setDatos] = useState({ data: [] });

    useEffect(() => {
        fetch("/api/bienes/bienesDeUsuarios")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos: ' + response.status);
                }
                return response.json();
            })
            .then(data => setDatos(data))
            .catch(error => {
                console.error("Error al cargar los datos", error);
            });
    }, []);

    if (!Array.isArray(datos.data)) {
        return <div>No se han encontrado datos de usuarios.</div>;
    }

    return (
        <div>
            <h1>Información de Usuarios</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Correo Electrónico</th>
                        <th>Identificación</th>
                        <th>RFC</th>
                        <th>CURP</th>
                        <th>Departamento</th>
                        <th>Estado</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.data.map((dato) => (
                        <tr key={dato.id}>
                            <td>{dato.id}</td>
                            <td>{dato.name}</td>
                            <td>{dato.email}</td>
                            <td>{dato.identification}</td>
                            <td>{dato.RFC}</td>
                            <td>{dato.CURP}</td>
                            <td>{dato.departmentId}</td>
                            <td>{dato.status ? "Activo" : "Inactivo"}</td>
                            <td>
                                <img src={dato.img} alt={`Foto de ${dato.name}`} width="100" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SeeUser;
