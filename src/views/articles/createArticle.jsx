import React, { useState, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import { useDropzone } from "react-dropzone";
import "../../styles/createArticle.css";

function CreateArticle() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    acquisition_date: "",
    number_series: "",
    status: "",
    description: "",
    caracteristics: "",
    type: "",
    userful_live_id: "",
    policy_id: "",
    bill_id: "",
  });
  const [qrValue, setQrValue] = useState("");
  const [files, setFiles] = useState([]);
  const [usefulLives, setUsefulLives] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [bills, setBills] = useState([]);
  const [availableBills, setAvailableBills] = useState([]);
  const [availablePolicies, setAvailablePolicies] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        // Check if the key is 'userful_live_id' and the value is empty
        if (key === "userful_live_id" && formData[key] === "") {
          // Set the value to null or some other default value
          data.append(key, null); // You can also use 0 or another default value if needed
        } else {
          data.append(key, formData[key]);
        }
      });
      files.forEach((file) => data.append("photos_entry", file));

      const response = await fetch("/api/articulos/insertarArticulo", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Error creating article");
      }

      const result = await response.json();
      console.log("Article created successfully:", result);
      setQrValue(result.name); // Set the QR value with the article's name

      // Redirigir a /articulos/almacen
      window.location.href = "/articulos/almacen";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await fetch("/api/articulos/datosCatalogo");
        const data = await response.json();
        console.log(data);
        setUsefulLives(data.usefulLives);
        setPolicies(data.policies);
        setBills(data.bills);

        const billsResponse = await fetch("/api/articulos/articulos");
        const articles = await billsResponse.json();

        const articleCountByBill = articles.reduce((acc, article) => {
          acc[article.bill_id] = (acc[article.bill_id] || 0) + 1;
          return acc;
        }, {});

        const articleCountByPolicy = articles.reduce((acc, article) => {
          acc[article.policy_id] = (acc[article.policy_id] || 0) + 1;
          return acc;
        }, {});

        const availableBills = data.bills.filter((bill) => {
          const articleCount = articleCountByBill[bill.id] || 0;
          return articleCount < bill.quantity;
        });

        const availablePolicies = data.policies.filter((policy) => {
          const articleCount = articleCountByPolicy[policy.id] || 0;
          return articleCount < policy.quantity;
        });

        setAvailableBills(availableBills);
        setAvailablePolicies(availablePolicies);
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      }
    };

    fetchCatalogs();
  }, []);

  return (
    <div className="main-container2">
      <h2>Crear nuevo articulo</h2>
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-grid2">
          {/* Form fields as before */}
          <div className="form-group2">
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group2">
            <label>Marca:</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group2">
            <label>Modelo:</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group2">
            <label>Fecha de Adquisición:</label>
            <input
              type="date"
              name="acquisition_date"
              value={formData.acquisition_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group2">
            <label>Número de serie:</label>
            <input
              type="text"
              name="number_series"
              value={formData.number_series}
              onChange={handleChange}
            />
          </div>
          <div className="form-group2">
            <label>Estado:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar estado</option>
              <option value="reparacion">Reparacion</option>
              <option value="en uso">En Uso</option>
              <option value="baja">Baja</option>
              <option value="descompuesto">Descompuesto</option>
            </select>
          </div>
          <div className="form-group2">
            <label>Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group2">
            <label>Caracteristicas:</label>
            <textarea
              name="caracteristics"
              value={formData.caracteristics}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group2">
            <label>Tipo:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona tipo</option>
              <option value="Insumos">Insumos</option>
              <option value="Bien">Bien</option>
            </select>
          </div>
          {formData.type !== "Insumos" && (
            <div className="form-group2">
              <label>Vida útil:</label>
              <select
                name="userful_live_id"
                value={formData.userful_live_id}
                onChange={handleChange}
                required={formData.type !== "Insumos"}
              >
                <option value="">Selecciona vida útil</option>
                {usefulLives.map((life) => (
                  <option key={life.id} value={life.id}>
                    {life.concept}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group2">
            <label>Póliza:</label>
            <select
              name="policy_id"
              value={formData.policy_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona póliza</option>
              {availablePolicies.map((policy) => (
                <option key={policy.id} value={policy.id}>
                  {policy.description}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group2">
            <label>Factura:</label>
            <select
              name="bill_id"
              value={formData.bill_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona factura</option>
              {availableBills.map((bill) => (
                <option key={bill.id} value={bill.id}>
                  {bill.bill_number}
                </option>
              ))}
            </select>
          </div>
          <div
            className="form-group2"
            {...getRootProps({ className: "dropzone" })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Suelta los archivos aquí...</p>
            ) : (
              <p>
                Arrastre y suelte algunos archivos aquí o haga clic para
                seleccionar archivos
              </p>
            )}
            <div className="file-list">
              {files.map((file) => (
                <div key={file.name} className="file-item">
                  <p>{file.name}</p>
                  <button type="button" onClick={() => removeFile(file)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit">Crear artículo</button>
      </form>
      {/* Mostrar el código QR solo después de que el artículo ha sido creado */}
      {qrValue && (
        <div className="qr-code-container">
          <h3>Código QR para el artículo:</h3>
          <QRCode value={qrValue} size={150} />
        </div>
      )}
    </div>
  );
}

export default CreateArticle;
