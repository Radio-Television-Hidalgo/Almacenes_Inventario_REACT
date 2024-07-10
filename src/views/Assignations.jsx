import '../styles/bills.css';
import { useState } from 'react';


function Assignations() {

        const [userData, setUserData] = useState({
            userNumber: '',
            name: '',
            area: '',
            department: '',
            deliveryDate: '',
            inventoryNumber: '',
            photos: null
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setUserData(prevData => ({
                ...prevData,
                [name]: value
            }));
        };

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            setUserData(prevData => ({
                ...prevData,
                photos: file
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            // Handle form submission logic here
        };

        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="userNumber">Número de Usuario:</label>
                <input type="text" id="userNumber" name="userNumber" value={userData.userNumber} onChange={handleChange} />

                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} />

                <label htmlFor="area">Área del Usuario:</label>
                <input type="text" id="area" name="area" value={userData.area} onChange={handleChange} />

                <label htmlFor="department">Departamento del Usuario:</label>
                <input type="text" id="department" name="department" value={userData.department} onChange={handleChange} />

                <label htmlFor="deliveryDate">Fecha de Entrega:</label>
                <input type="date" id="deliveryDate" name="deliveryDate" value={userData.deliveryDate} onChange={handleChange} />

                <label htmlFor="inventoryNumber">Número de Inventario:</label>
                <input type="text" id="inventoryNumber" name="inventoryNumber" value={userData.inventoryNumber} onChange={handleChange} />

                <label htmlFor="photos">Fotos del Bien:</label>
                <input type="file" id="photos" name="photos" onChange={handleFileChange} />

                <button type="submit">Submit</button>
            </form>
        );
    }

export default Assignations;