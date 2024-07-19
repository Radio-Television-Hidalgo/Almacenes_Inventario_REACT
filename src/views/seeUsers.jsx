import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/seeUsers.css";

function SeeUser() {
    const [state, setState] = useState(false);
    const [datos, setDatos] = useState({ data: [] });
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchDatos = () => {
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
    };

    useEffect(() => {
        fetchDatos();
    }, []);

    const handleStatus = async (event, id) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        setState(true);
        try {
            const response = await fetch(`/api/usuario/estadoUsuario/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.ok) {
                // Volver a cargar los datos después de una eliminación exitosa
                fetchDatos();
                navigate("/usuario/gestionUsuarios");
            } else {
                console.error("Error al dar de baja al usuario");
            }
        } catch (error) {
            console.error("Error al dar de baja al usuario", error);
        } finally {
            setState(false);
        }
    };

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
                className="search"
                type="text"
                placeholder="Buscar por nombre o correo"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr className="UserData" >
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
                <tbody className="InfoUser" >
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
                            <td><Link to="/usuario/editarUsuario" ><button className="Edit" >Editar</button></Link></td>
                            <td><button
                                className="Delete"
                                onClick={(event) => handleStatus(event, dato.id)}
                                disabled={state}
                            >Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SeeUser;
