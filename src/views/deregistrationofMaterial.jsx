import { Helmet } from "react-helmet";
import "../styles/Forms.css";
import { useState } from "react";

function DeregistrationofMaterial() {
    const [showExtraInputs, setShowExtraInputs] = useState(false);

    const handleSearchClick= (event)=>{
        event.preventDefault();
        setShowExtraInputs(true);
    };

    const hidesearchclick= (event)=> {
        event.preventDefault();
        setShowExtraInputs(false)
    }

  return (
    <>
    <Helmet>
        <title>Baja de bien</title>
    </Helmet>
    <form>
      <label htmlFor="inventoryNumber">Numero de inventario</label>
      <input type="text" id="inventoryNumber" name="inventoryNumber" required />
      <button type="submit" onClick={handleSearchClick}>Buscar</button>

      {showExtraInputs && (
        <>
         <label htmlFor="Description">Descripción</label>
          <input type="text" id="Description" name="Description" required />

          <label htmlFor="Brand">Marca</label>
          <input type="text" id="Brand" name="Brand" required />

          <label htmlFor="Model">Modelo</label>
          <input type="text" id="Model" name="Model" required />

          <label htmlFor="Serial">Serie</label>
          <input type="text" id="Serial" name="Serial" required />

          <button type="submit" onClick={hidesearchclick}>Ocultar busqueda</button>

        </>
      )}
      
      <label htmlFor="DateofDeregistration">Fecha de baja</label>
      <input type="date" id="DateofDeregistration" name="DateofDeregistration" required />

      <label htmlFor="TypeofDeregistration">Tipo de baja</label>
        <select id="TypeofDeregistration" name="TypeofDeregistration" required>
            <option value="Robo">Robo</option>
            <option value="Extravio">Extravio</option>
            <option value="Deterioro">Deterioro</option>
            <option value="Obsolecencia">Obsolecencia</option>
            <option value="Donacion">Donacion</option>
        </select>

        <label htmlFor="Document">Documento que ampara la baja</label>
        <input type="file" id="Document" name="Document" required />

        <input type="file" id="Photo" name="Photo" required />
    </form>
    </>
  );
}

export default DeregistrationofMaterial;
