import React, { useState, useEffect } from "react";
import InsumoTable from "./insumoTable";
import BienTable from "./bienTable";
import "/src/styles/MaterialRequest.css";

function MaterialRequest() {
  const [userInfo, setUserInfo] = useState({});
  const [warehouseManager, setWarehouseManager] = useState({});
  const [formData, setFormData] = useState({
    description: "",
    quantity: "",
    type: "Insumo",
    status: "En Espera",
    file: "",
    approving_user_id: "",
    requesting_user_id: "",
    article_id: "",
    inventory_number_id: "",
    warehouses_number_id: "",
  });
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState("");

  useEffect(() => {
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
          setFormData((prevFormData) => ({
            ...prevFormData,
            requesting_user_id: data.id || "",
          }));
        } else {
          console.error("Error al obtener la información del usuario");
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario", error);
      }
    };

    const fetchWarehouseManager = async () => {
      try {
        const response = await fetch("/api/usuario/encargadoAlmacen", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setWarehouseManager(data);
          setFormData((prevFormData) => ({
            ...prevFormData,
            approving_user_id: data.id || "",
          }));
        } else {
          console.error("Error al obtener al encargado de almacén");
        }
      } catch (error) {
        console.error("Error al obtener al encargado de almacén", error);
      }
    };

    fetchUserInfo();
    fetchWarehouseManager();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "warehouses_number_id" && value) {
      fetchArticlesByWarehouse(value);
    }
    if (name === "inventory_number_id" && value) {
      fetchArticlesByInventoryNumber(value);
    }
  };

  const fetchArticlesByWarehouse = async (warehouseNumber) => {
    try {
      const response = await fetch(
        `/api/articulos/porAlmacen/${warehouseNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
        setFormData((prevFormData) => ({
          ...prevFormData,
          warehouses_number_id: data.warehouseId,
        }));
      } else {
        console.error("Error al obtener los artículos por almacén");
      }
    } catch (error) {
      console.error("Error al obtener los artículos por almacén", error);
    }
  };

  const fetchArticlesByInventoryNumber = async (inventoryNumber) => {
    try {
      const response = await fetch(
        `/api/articulos/porInventario/${inventoryNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
        setFormData((prevFormData) => ({
          ...prevFormData,
          inventory_number_id: data.inventoryId,
        }));
      } else {
        console.error(
          "Error al obtener los artículos por número de inventario"
        );
      }
    } catch (error) {
      console.error(
        "Error al obtener los artículos por número de inventario",
        error
      );
    }
  };

  const handleArticleSelect = (e) => {
    const articleId = e.target.value;
    setSelectedArticle(articleId);
    setFormData({ ...formData, article_id: articleId });
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
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Solicitud creada:", data);
      } else {
        console.error("Error al crear la solicitud:", response.statusText);
      }
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

        {formData.type === "Insumo" && (
          <input
            type="text"
            name="warehouses_number_id"
            value={formData.warehouses_number_id}
            onChange={handleChange}
            placeholder="Número de Almacén"
            className="material-request-input"
          />
        )}

        {formData.type === "Bien" && (
          <input
            type="text"
            name="inventory_number_id"
            value={formData.inventory_number_id}
            onChange={handleChange}
            placeholder="Número de Inventario"
            className="material-request-input"
          />
        )}

        {articles.length > 0 && (
          <select
            value={selectedArticle}
            onChange={handleArticleSelect}
            className="material-request-select"
            required
          >
            <option value="">Seleccionar artículo</option>
            {articles.map((article) => (
              <option key={article.id} value={article.id}>
                {article.name}
              </option>
            ))}
          </select>
        )}

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
          onChange={(e) =>
            setFormData({ ...formData, file: e.target.files[0] })
          }
          className="material-request-file"
        />
        <input
          type="text"
          name="warehouseManager"
          value={warehouseManager.name}
          readOnly
          className="material-request-input"
          placeholder="Encargado de Almacén"
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
