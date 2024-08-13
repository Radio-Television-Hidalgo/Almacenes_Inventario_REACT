import React, { useState, useEffect } from "react";
import BienTable from "./bienTable";
import InsumoTable from "./insumoTable";
import "../../styles/TablaInsumos.css";

function MaterialRequest() {
  const [formData, setFormData] = useState({
    description: "",
    file: null,
    approving_user_id: "",
    requesting_user_id: "",
    requisition_proposal_id: "",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [warehouseManager, setWarehouseManager] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("Insumo");
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [objectExpenditures, setObjectExpenditures] = useState([]);

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

    const fetchObjectExpenditures = async () => {
      try {
        const response = await fetch("/api/articulos/datosCatalogo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setObjectExpenditures(data.objectexpenditure);
        } else {
          console.error("Error al obtener los objetos de gasto");
        }
      } catch (error) {
        console.error("Error al obtener los objetos de gasto", error);
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
    fetchObjectExpenditures();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  const handleQuantityChange = (index, newQuantity) => {
    setSelectedArticles((prevSelectedArticles) => {
      const updatedArticles = [...prevSelectedArticles];
      const maxQuantity = updatedArticles[index].quantity;

      updatedArticles[index].selectedQuantity = Math.min(
        newQuantity,
        maxQuantity
      );

      return updatedArticles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Imprimir los artículos seleccionados en el frontend
    console.log("Artículos seleccionados:", selectedArticles);

    const validArticles = selectedArticles.every(
      (article) => article.id && article.selectedQuantity > 0 && selectedType
    );

    if (!validArticles) {
      console.error(
        "Error: Algunos artículos seleccionados no tienen todos los campos requeridos."
      );
      return;
    }

    const articlesData = selectedArticles.map((article) => ({
      article_id: article.id || null,
      quantity: article.selectedQuantity,
      type: selectedType,
      inventory_number_id: article.id || null, // Cambiar a inventory_id
      warehouses_number_id: article.id || null, // Cambiar a warehouse_id
    }));
    console.log(articlesData)
    console.log("Datos de los artículos a enviar:", articlesData);

    console.log("Datos de los artículos a enviar:", articlesData);

    const form = new FormData();
    form.append("description", formData.description);
    form.append("approving_user_id", formData.approving_user_id);
    form.append("requesting_user_id", formData.requesting_user_id);
    form.append("file", formData.file);
    form.append("requisition_proposal_id", formData.requisition_proposal_id);
    form.append("articles", JSON.stringify(articlesData));

    try {
      const response = await fetch("/api/articulos/crearSolicitud", {
        method: "POST",
        body: form,
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

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const addArticle = (article) => {
    const articleWithDetails = {
      ...article,
      id: article.id || article.article_id,
      quantity: article.articleWarehouses[0]?.quantity || 0,
      inventory_number_id: article.articleWarehouses[0]?.inventory_id || null, // Guardar el ID
      warehouses_number_id: article.articleWarehouses[0]?.warehouse_id || null, // Guardar el ID
      inventory_number: article.articleWarehouses[0]?.inventory_number || "N/A", // Guardar el número
      warehouses_number:
        article.articleWarehouses[0]?.warehouses_number || "N/A", // Guardar el número
      selectedQuantity: 1,
    };

    setSelectedArticles((prevSelectedArticles) => [
      ...prevSelectedArticles,
      articleWithDetails,
    ]);
  };

  return (
    <div>
      <h1>Solicitud de Material</h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
        />
        <input type="file" name="file" onChange={handleFileChange} />
        <h2>Seleccionar Objeto de Gasto</h2>
        <select
          name="requisition_proposal_id"
          value={formData.requisition_proposal_id}
          onChange={handleChange}
        >
          <option value="">Seleccione un objeto de gasto</option>
          {objectExpenditures.map((obj) => (
            <option key={obj.id} value={obj.id}>
              {`${obj.name} - ${obj.description}`}
            </option>
          ))}
        </select>
        <button type="submit">Enviar Solicitud</button>
      </form>
      {showModal && <div>¡Solicitud creada con éxito!</div>}

      <h2>Visualizar Tabla de Artículos</h2>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="Insumo">Insumo</option>
        <option value="Bien">Bien</option>
      </select>
      {selectedType === "Insumo" ? (
        <InsumoTable onAddArticle={addArticle} />
      ) : (
        <BienTable onAddArticle={addArticle} />
      )}

      <h2>Artículos Seleccionados</h2>
      <table className="style-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Número de Inventario</th>
            <th>Número de Almacén</th>
            <th>Fotos</th>
          </tr>
        </thead>
        <tbody>
          {selectedArticles.map((article, index) => (
            <tr key={index}>
              <td>{article.name}</td>
              <td>{article.description}</td>
              <td>
                <input
                  type="number"
                  value={article.selectedQuantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  min="1"
                  max={article.quantity}
                />
              </td>
              <td>{article.inventory_number || "N/A"}</td>
              <td>{article.warehouses_number || "N/A"}</td>

              <td>
                {article.photos_entry &&
                  article.photos_entry
                    .split(",")
                    .map((photo, photoIndex) => (
                      <img
                        key={photoIndex}
                        src={`/api/uploads/${photo}`}
                        alt="Foto del artículo"
                        className="photo"
                      />
                    ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MaterialRequest;
