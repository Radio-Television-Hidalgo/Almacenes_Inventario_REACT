import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../components/ContextUser"; // Importar el hook del contexto
import '../../styles/edituser.css'; // Importar el archivo de estilos

function EditUser() {
    const { user } = useUser(); // Obtener el usuario del contexto
    const [userData, setUserData] = useState(user || {});
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            console.log("No se ha encontrado el usuario a editar.");
        }
    }, [user]);

    if (!user) {
        return <div>No se ha encontrado el usuario a editar.</div>;
    }

    const handleSave = async (e) => {
        e.preventDefault();

        // Crear un objeto con solo el correo electrónico y la contraseña
        const data = {
            email: userData.email,
            password: userData.password
        };

        try {
            const response = await axios.post(`/api/usuario/actualizarUsuario/${userData.id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/inicio");
            console.log('Usuario actualizado:', response.data);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    return (
        <div className="main-container">
            <form className="user-form" onSubmit={handleSave}>
                <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input 
                        type="email" 
                        value={userData.email} 
                        onChange={e => setUserData({ ...userData, email: e.target.value })} 
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        placeholder="Nueva contraseña" 
                        onChange={e => setUserData({ ...userData, password: e.target.value })} 
                    />
                </div>
                <button className="submit-button" type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default EditUser;
