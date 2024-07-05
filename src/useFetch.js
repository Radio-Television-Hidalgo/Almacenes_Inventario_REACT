import { useState, useEffect } from "react";
//Funcion para obtener los datos de la API
export function useFetch(url) {
//Se definen los estados de los datos, la carga y los errores.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);
//Se utiliza el hook useEffect para realizar la petición a la API.
  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
//Se realiza la petición a la API y se captura el error.
    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Cancelled request");
        } else {
          setError(error);
        }
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, []);
//Se define la función handleCancelRequest para cancelar la petición.
  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Cancelled Request");
    }
  };

  return { data, loading, error, handleCancelRequest };
}