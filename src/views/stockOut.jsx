import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import "../styles/Forms.css"

function StockOut(){

    const [articulos, setArticulos]= useState([]);

    useEffect(() => { 
        const fetchData = async() => {
            try{
                const response = await fetch('articulos?type=Insumos');
                const data = await response.json();
                setArticulos(data);
            } catch (error) {
                console.error('error al obtener los datos', error);
            }
        };
        fetchData();
    })

    const fechahoy= new Date();

    const fechaFormateada= `${fechahoy.getDate()}/${fechahoy.getMonth()+1}/${fechahoy.getFullYear()}`;
    return(
        <>
        <Helmet><title>Salida de existentes</title></Helmet>

        <input type="" placeholder="Buscar"></input>

        <input placeholder="Numero de trabajador"></input>

        <p style={{ textAlign: "center"}}>Tabla de articulos salientes</p>
        <table>
            <thead>
                <tr> 
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Cantidad A entregar</th>
                    <th>Tipo de salida</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{fechaFormateada}</td>
                    <td></td>
                    <td> <input type="number"></input> </td>
                </tr>
            </tbody>
        </table>

        <h3 style={{textAlign: "center"}}>Tabla de articulos existentes</h3>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Fecha de adquisicion</th>
                    <th>Numero de serie</th>
                    <th>Status</th>
                    <th>Descripcion</th>
                    <th>Caracteristicas</th>
                    <th>Tipo</th>
                    <th>QR</th>
                </tr>
            </thead>
            <tbody>
                {articulos.map((articulo)=>(
                    <tr key= {articulo.id}>
                        <td>{articulo.name}</td>
                        <td>{articulo.brand}</td>
                        <td>{articulo.model}</td>
                        <td>{articulo.acquisition_date}</td>
                        <td>{articulo.nuumber_series}</td>
                        <td>{articulo.status}</td>
                        <td>{articulo.description}</td>
                        <td>{articulo.caracteristics}</td>
                        <td>{articulo.type}</td>
                        <td>{articulo.qr}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )

}

export default StockOut