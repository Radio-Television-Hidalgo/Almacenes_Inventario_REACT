import React, { useState, useEffect } from "react";
import InsumoTable from "./insumoTable";
import BienTable from "./bienTable";
import "/src/styles/MaterialRequest.css"

function MaterialRequest() {
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    description: "",
    quantity: "",
    type: "Insumo",
    status: "En Espera",
    file: "",
    approving_user_id: "",
    requesting_user_id: "",
    item_id: "",
    inventory_number_id: "",
  });

  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const response = await fetch("/api/articulos/warehouse/3");
        const data = await response.json();
        setFormData({
          ...formData,
          user_charge: data.user_charge.name,
          approving_user_id: data.user_charge.id,
        });
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/usuario/infoUsuario", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error("Error al obtener la información del usuario");
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario", error);
      }
    };

    fetchUserInfo();
    fetchWarehouseData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("/api/articulos/crearSolicitud", {
        method: "POST",
        body: formDataToSend,
        headers: {},
      });
      const data = await response.json();
      console.log("Solicitud creada:", data);
    } catch (error) {
      console.error("Error al crear la solicitud:", error);
    }
  };

  return (
    <div className="material-request-container">
      <form className="material-request-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
          className="material-request-input"
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Cantidad"
          required
          className="material-request-input"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="material-request-select"
        >
          <option value="Insumo">Insumo</option>
          <option value="Bien">Bien</option>
        </select>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="material-request-file"
        />
        <input
          type="text"
          name="user_charge"
          value={formData.user_charge}
          onChange={handleChange}
          placeholder="ID del usuario que aprueba"
          required
          className="material-request-input"
        />
        <input
          type="number"
          name="approving_user_id"
          value={userInfo.approving_user_id}
          onChange={handleChange}
          hidden
        />
        <input
          type="number"
          name="requesting_user_id"
          value={userInfo.id}
          onChange={handleChange}
          placeholder="ID del usuario que solicita"
          hidden
        />
        <input
          type="number"
          name="item_id"
          value={formData.item_id}
          onChange={handleChange}
          placeholder="ID del artículo"
          required
          className="material-request-input"
        />
        <input
          type="number"
          name="inventory_number_id"
          value={formData.inventory_number_id}
          onChange={handleChange}
          placeholder="Número de inventario"
          required
          className="material-request-input"
        />
        <button className="material-request-button" type="submit">
          Solicitar Material
        </button>
      </form>

      {formData.type === "Insumo" && (
        <>
          <h2 className="material-request-title">Insumos</h2>
          <InsumoTable />
        </>
      )}

      {formData.type === "Bien" && (
        <>
          <h2 className="material-request-title">Bienes</h2>
          <BienTable />
        </>
      )}
    </div>
  );
}

export default MaterialRequest;

