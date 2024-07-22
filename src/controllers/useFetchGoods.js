import { useEffect, useState } from "react";

const useFetchGoods = () => {
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        fetch("/api/bienes/bienesadquiridos")
        .then(response => response.json())
        .then(data => setDatos(data))
        .catch(error => console.error("Error al cargar los datos", error));
    }, []);

    return datos;
};

export default useFetchGoods;