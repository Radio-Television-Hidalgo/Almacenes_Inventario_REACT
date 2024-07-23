import React, { useState, useCallback } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { useDropzone } from "react-dropzone";
import '../../styles/createArticle.css'; 


export default function CreateArticle() {
  const [formData, setFormData] = useState({
    name: "",
    inventory_number: "",
    brand: "",
    model: "",
    acquisition_date: "",
    number_series: "",
    status: "en uso",
    description: "",
    caracteristics: "",
    type: "Bien",
    userful_live_id: "",
    policy_id: "",
    bill_id: "",
    photos_entry: [],
    previewPhotos: [],
  });

  const [qrValue, setQrValue] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const newPreviewPhotos = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setFormData((prevState) => ({
      ...prevState,
      photos_entry: [...prevState.photos_entry, ...acceptedFiles],
      previewPhotos: [...prevState.previewPhotos, ...newPreviewPhotos],
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveFile = (index) => {
    setFormData((prevState) => {
      const newPhotosEntry = [...prevState.photos_entry];
      const newPreviewPhotos = [...prevState.previewPhotos];

      newPhotosEntry.splice(index, 1);
      newPreviewPhotos.splice(index, 1);

      return {
        ...prevState,
        photos_entry: newPhotosEntry,
        previewPhotos: newPreviewPhotos,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleWithQR = {
      ...formData,
      QR: `http://localhost:3000/articulos/${formData.inventory_number}`,
    };

    const formDataObj = new FormData();
    for (const key in articleWithQR) {
      if (key === "photos_entry") {
        articleWithQR.photos_entry.forEach((file) => {
          formDataObj.append("photos_entry", file);
        });
      } else {
        formDataObj.append(key, articleWithQR[key]);
      }
    }

    try {
      const response = await axios.post(
        "/api/articulos/insertarArticulo",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Artículo creado:", response.data);
      setQrValue(articleWithQR.QR);
    } catch (error) {
      console.error("Hubo un error al crear el artículo!", error);
    }
  };

  return (
<div class="article-container">
  <form onSubmit={handleSubmit} className="article-form">
    <div className="form-grid2">
      <div className="form-group2">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
      </div>

      <div className="form-group2">
        <label htmlFor="inventory_number">Número de Inventario</label>
        <input
          type="text"
          name="inventory_number"
          value={formData.inventory_number}
          onChange={handleChange}
          placeholder="Número de Inventario"
          required
        />
      </div>

      <div className="form-group2">
        <label htmlFor="brand">Marca</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Marca"
          required
        />
      </div>

      <div className="form-group2">
        <label htmlFor="model">Modelo</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Modelo"
          required
        />
      </div>

      <div className="form-group2">
        <label htmlFor="acquisition_date">Fecha de Adquisición</label>
        <input
          type="date"
          name="acquisition_date"
          value={formData.acquisition_date}
          onChange={handleChange}
          placeholder="Fecha de Adquisición"
        />
      </div>

      <div className="form-group2">
        <label htmlFor="number_series">Número de Serie</label>
        <input
          type="text"
          name="number_series"
          value={formData.number_series}
          onChange={handleChange}
          placeholder="Número de Serie"
        />
      </div>

      <div className="form-group2">
        <label htmlFor="status">Estado</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="reparacion">Reparación</option>
          <option value="en uso">En uso</option>
          <option value="baja">Baja</option>
          <option value="descompuesto">Descompuesto</option>
        </select>
      </div>

      <div className="form-group2">
        <label htmlFor="description">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
        ></textarea>
      </div>

      <div className="form-group2">
        <label htmlFor="caracteristics">Características</label>
        <textarea
          name="caracteristics"
          value={formData.caracteristics}
          onChange={handleChange}
          placeholder="Características"
          required
        ></textarea>
      </div>

      <div className="form-group2">
        <label htmlFor="type">Tipo</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="Insumos">Insumos</option>
          <option value="Bien">Bien</option>
        </select>
      </div>

      <div className="form-group2">
        <label htmlFor="userful_live_id">ID de Vida Útil</label>
        <input
          type="number"
          name="userful_live_id"
          value={formData.userful_live_id}
          onChange={handleChange}
          placeholder="ID de Vida Útil"
          required
        />
      </div>

      <div className="form-group2">
        <label htmlFor="policy_id">ID de Póliza</label>
        <input
          type="number"
          name="policy_id"
          value={formData.policy_id}
          onChange={handleChange}
          placeholder="ID de Póliza"
          required
        />
      </div>

      <div className="form-group2">
        <label htmlFor="bill_id">ID de Factura</label>
        <input
          type="number"
          name="bill_id"
          value={formData.bill_id}
          onChange={handleChange}
          placeholder="ID de Factura"
          required
        />
      </div>

      <div
        className="form-group2"
        {...getRootProps()}
        style={{
          border: "2px dashed #cccccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        <p>
          Arrastra y suelta algunas fotos aquí, o haz clic para seleccionar fotos
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {formData.previewPhotos.map((file, index) => (
            <div key={index} style={{ position: "relative", margin: "10px" }}>
              <img src={file.preview} alt="preview" width={100} />
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group2">
        <button type="submit" className="submit-button">Crear Artículo</button>
      </div>
    </div>

    {qrValue && (
      <div className="form-group2">
        <h3>Código QR generado:</h3>
        <QRCode value={qrValue} />
      </div>
    )}
  </form>
</div>

  );
}
