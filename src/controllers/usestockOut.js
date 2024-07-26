import { useState, useEffect } from "react";

export const useStockOut = () => {
  const [articulos, setArticulos] = useState([]);
  const [articulosAgregados, setArticulosAgregados] = useState([]);

  const agregarCantidad = (articulo) => {
    setArticulosAgregados((prevArticulosAgregados) => {
      const articuloExistente = prevArticulosAgregados.find(
        (a) => a.id === articulo.id
      );
      if (articuloExistente) {
        return prevArticulosAgregados.map((a) =>
          a.id === articulo.id ? { ...a, cantidad: a.cantidad + 1 } : a
        );
      } else {
        return [...prevArticulosAgregados, { ...articulo, cantidad: 1 }];
      }
    });
  };

  const limpiarArticulosAgregados = () => {
    setArticulosAgregados([]);
  };

  const eliminarArticulo = (id) => {
    setArticulosAgregados((prevArticulosAgregados) =>
      prevArticulosAgregados.filter((articulo) => articulo.id !== id)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/articulos/articulos");
        const data = await response.json();
        if (Array.isArray(data)) {
          setArticulos(data);
        } else {
          console.error("error al obtener los datos", data);
        }
      } catch (error) {
        console.error("error al obtener los datos", error);
      }
    };
    fetchData();
  }, []);

  const fechahoy = new Date();
  const fechaFormateada = `${fechahoy.getDate()}/${
    fechahoy.getMonth() + 1
  }/${fechahoy.getFullYear()}`;

  return {
    articulos,
    articulosAgregados,
    agregarCantidad,
    limpiarArticulosAgregados,
    eliminarArticulo,
    fechaFormateada,
  };
};
