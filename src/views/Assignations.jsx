import "../styles/Forms.css";
import { useState, useEffect } from "react";

function Assignations() {

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentYear = currentDate.getFullYear();

  const [inventoryNumber, setInventoryNumber] = useState(
    `RTH/${currentMonth}/${currentYear}/`
  );

  const handleChange = (e) => {
    const value = e.target.value;
    const prefix = `RTH/${currentMonth}/${currentYear}/`;
    if (!value.startsWith(prefix)) {
      setInventoryNumber(prefix);
    } else {
      setInventoryNumber(value);
    }
  };
  const [areas, setAreas] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    // Llamadas corregidas con los endpoints correctos
    fetchData("/api/areas").then((data) => setAreas(data));
    fetchData("/api/departamentos").then((data) => setDepartments(data));
    fetchData("/usuario/usuariosGestion").then((data) => {
      if (Array.isArray(data)) {
        setUsuario(data);
      }else{
        console.error("Error al cargar los usuarios", data);
      }
     }).catch(console.error);
  }, []);

  return (
    <form>
      <label htmlFor="InventoryNumber">Número de inventario</label>
      <input
        type="text"
        id="InventoryNumber"
        name="InventoryNumber"
        value={inventoryNumber}
        onChange={handleChange}
        required
      />

      <label htmlFor="Nameoftheresponsible">Nombre del responsable</label>
      <select id="Nameoftheresponsible" name="Nameoftheresponsible" required>
        {usuario.map((user)=>(
          <option key={user.id} value= {user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <label htmlFor="Departmentoftheresponsible">
        Departamento del responsable
      </label>
      <select
        id="Departmentoftheresponsible"
        name="Departmentoftheresponsible"
        required
      >
        {departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
      </select>

      <label htmlFor="presupuestalArea">Área presupuestal</label>
      <input
        type="text"
        id="presupuestalArea"
        name="presupuestalArea"
        required
      />

      <label htmlFor="ResponsibleArea">Área del responsable</label>
      <select id="ResponsibleArea" name="ResponsibleArea" required>
        {areas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>

      <label htmlFor="Photo">Foto del bien cuando se recibió</label>
      <input type="file" id="Photo" name="Photo" required />

      <label htmlFor="Rfc">RFC</label>
      <input type="text" id="Rfc" name="Rfc" required />

      <label htmlFor="Date">Fecha de resguardo</label>
      <input type="date" id="Date" name="Date" required />

      <label htmlFor="Description">Descripción</label>
      <input type="text" id="Description" name="Description" required />

      <label htmlFor="Brand">Marca</label>
      <input type="text" id="Brand" name="Brand" required />

      <label htmlFor="Model">Modelo</label>
      <input type="text" id="Model" name="Model" required />

      <label htmlFor="SerialNumber">Número de serie</label>
      <input type="text" id="SerialNumber" name="SerialNumber" required />

      <button type="submit">Asignar</button>
    </form>
  );
}

export default Assignations;