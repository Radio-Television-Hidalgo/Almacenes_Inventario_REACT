import React, { useState, useEffect } from "react";
import InsumoTable from "./insumoTable";
import BienTable from "./bienTable";
import Modal from "./Modal";
import "/src/styles/MaterialRequest.css";

function MaterialRequest() {
  const [userInfo, setUserInfo] = useState({});
  const [warehouseManager, setWarehouseManager] = useState({});
  const [formData, setFormData] = useState({
    description: "",
    quantity: "",
    type: "Insumo",
    status: "En Espera",
    file: null,
    approving_user_id: "",
    requesting_user_id: "",
    article_id: "",
    inventory_number: "",
    inventory_number_id: 0,
    warehouses_number: "",
    warehouses_number_id: 0,
  });
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState(null);

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

    if (name === "quantity") {
      const requestedQuantity = parseInt(value);
      if (availableQuantity !== null && requestedQuantity > availableQuantity) {
        setFormData({ ...formData, quantity: availableQuantity.toString() });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === "warehouses_number" && value) {
        fetchArticlesByWarehouse(value);
      }
      if (name === "inventory_number" && value) {
        fetchArticlesByInventoryNumber(value);
      }
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
        setArticles(Array.isArray(data) ? data : []);
        if (data.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            warehouses_number_id: data[0].warehouse_id || 0,
          }));
        }
      } else {
        console.error("Error al obtener los artículos por almacén");
        setArticles([]);
      }
    } catch (error) {
      console.error("Error al obtener los artículos por almacén", error);
      setArticles([]);
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
        setArticles(Array.isArray(data) ? data : []);
        if (data.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            inventory_number_id: data[0].inventory_id || 0,
          }));
        }
      } else {
        console.error(
          "Error al obtener los artículos por número de inventario"
        );
        setArticles([]);
      }
    } catch (error) {
      console.error(
        "Error al obtener los artículos por número de inventario",
        error
      );
      setArticles([]);
    }
  };

  const handleArticleSelect = (e) => {
    const articleId = e.target.value;
    setSelectedArticle(articleId);
    setFormData({ ...formData, article_id: articleId });

    const selectedArticleData = articles.find(
      (article) => article.id === parseInt(articleId)
    );
    if (selectedArticleData) {
      setAvailableQuantity(selectedArticleData.quantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = {
      ...formData,
      inventory_number_id: formData.inventory_number_id || null,
      warehouses_number_id: formData.warehouses_number_id || null,
    };
  
    const bodyData = new FormData();
    for (const key in formDataToSend) {
      if (key !== "warehouses_number" && key !== "inventory_number") {
        bodyData.append(key, formDataToSend[key]);
      }
    }
      try {
      const response = await fetch("/api/articulos/crearSolicitud", {
        method: "POST",
        body: bodyData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Solicitud creada:", data);
        setShowModal(true);
      } else {
        console.error("Error al crear la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error al crear la solicitud:", error);
    }
  };
  

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="material-request-container">
    <form className="material-request-form" onSubmit={handleSubmit}>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="material-request-select"
        required
      >
        <option value="">Seleccionar tipo de material</option>
        <option value="Insumo">Insumo</option>
        <option value="Bien">Bien</option>
      </select>


      {formData.type === "Insumo" && (
        <input
          type="text"
          name="warehouses_number"
          value={formData.warehouses_number}
          onChange={handleChange}
          placeholder="Número de Almacén"
          className="material-request-input"
        />
      )}
      
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        required
        className="material-request-input"
      />

      {Array.isArray(articles) && articles.length > 0 && (
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

      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Cantidad"
        required
        className="material-request-input"
        max={availableQuantity !== null ? availableQuantity : ""}
      />
      {availableQuantity !== null && (
        <small className="material-request-quantity-info">
          Cantidad disponible: {availableQuantity}</small>
      )}

      {formData.type === "Bien" && (
        <input
          type="text"
          name="inventory_number"
          value={formData.inventory_number}
          onChange={handleChange}
          placeholder="Número de Inventario"
          className="material-request-input"
        />
      )}

      <input
        type="text"
        name="warehouseManager"
        value={warehouseManager.name}
        readOnly
        className="material-request-input"
        placeholder="Encargado de Almacén"
      />
      <input
        type="file"
        name="file"
        onChange={(e) =>
          setFormData({ ...formData, file: e.target.files[0] })
        }
        className="material-request-file"
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

    {showModal && <Modal onClose={handleModalClose} />}
  </div>
  );
}

export default MaterialRequest;
