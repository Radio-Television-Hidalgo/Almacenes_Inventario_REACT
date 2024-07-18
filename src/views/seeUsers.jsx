import { useEffect, useState } from "react";

function SeeUser() {
    const [datos, setDatos] = useState({ data: [] });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("/api/usuario/usuariosGestion")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Verifica los datos recibidos
                setDatos(data);
            })
            .catch(error => {
                console.error("Error al cargar los datos", error);
            });
    }, []);

    if (!Array.isArray(datos.data)) {
        return <div>No se han encontrado datos de usuarios.</div>;
    }

    const filteredDatos = datos.data.filter(dato =>
        dato.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dato.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Información de Usuarios</h1>
            <input
                type="text"
                placeholder="Buscar por nombre o correo"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
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
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDatos.map((dato) => (
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
                                <img src={`${dato.img}`} alt={`Foto de ${dato.name}`} width="100" />
                            </td>
                            <td><button>Editar</button></td>
                            <td><button>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SeeUser;
