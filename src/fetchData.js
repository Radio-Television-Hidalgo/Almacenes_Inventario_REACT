//define una función fetchData que recibe una URL y devuelve un objeto con un método read que devuelve los datos de la URL.
const getSuspender = (promise) => {
    let status = "pending";
    let response;
  //La promesa se resuelve con el método then y se captura el error con el método catch.
    const suspender = promise.then(
      (res) => {
        status = "success";
        response = res;
      },
      //Si la promesa falla, el estado se establece en error y se captura el error.
      (err) => {
        status = "error";
        response = err;
      }
    );
  //Se define una función read que devuelve los datos de la URL.
    const read = () => {
      switch (status) {
        case "pending":
          throw suspender;
        case "error":
          throw response;
        default:
          return response;
      }
    };
  
    return { read };
  };
  //Se exporta la función fetchData.
  export function fetchData(url) {
    const promise = fetch(url)
      .then((response) => response.json())
      .then((json) => json);
  //Se llama a la función getSuspender y se le pasa la promesa.
    return getSuspender(promise);
  }