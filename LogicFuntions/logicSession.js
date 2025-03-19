import axios from "axios";
import { SERVER_URL } from "../config.js";
import cryptlib from "cryptlib";

// Función para cerrar sesión
export const closeSession = async (
    setStrPage,
    setIdMainSession,
    idMainSession
  ) => {
    if (idMainSession !== "") { // Verifica si hay una sesión abierta
      axios
        .put(`${SERVER_URL}/session/${idMainSession}`, {
          state: "closed", // Cambia el estado de la sesión a "cerrado"
          date: new Date(Date.now()).toString(), // Registra la fecha actual
        })
        .then(async () => {
          setIdMainSession(""); // Limpia el ID de la sesión principal
          setStrPage("login"); // Redirige a la página de inicio de sesión
          console.log("Session closed"); // Muestra un mensaje en consola
        })
        .catch((error) => {
          handleError(error, "Error closing session"); // Maneja errores
        });
    } else {
      console.log("We does not found an open session"); // Mensaje si no hay sesión abierta
    }
  };
  
  // Función para crear una sesión
  export const createSession = async (id_user) => {
    let strId = "";
  
    await getIdSession(id_user) // Obtiene el ID de la sesión
      .then(async (id_session) => {
        strId = id_session;
  
        await setSession(id_user, "open", strId).then(async (id_session) => {
          strId = id_session; // Actualiza el ID de la sesión
        });
      })
      .catch((error) => {
        handleError(error, "Error setting session"); // Maneja errores
      });
  
    return strId; // Devuelve el ID de la sesión
  };
  
  // Función para obtener el ID de una sesión
  export const getIdSession = async (id_user) => {
    let strId = "";
  
    await axios
      .get(`${SERVER_URL}/sessions`, {
        params: {
          id_user: id_user, // Pasa el ID del usuario como parámetro
          // id_device: id_device, // Incluye el ID del dispositivo
        },
      })
      .then(async (res) => {
        await res.data.forEach((objsession) => {
          // Busca una sesión que coincida con el usuario y dispositivo
          if (
            objsession.id_user === id_user
            // && objsession.id_device === id_device
          ) {
            strId = objsession._id; // Asigna el ID de la sesión
          }
        });
      })
      .catch((error) => {
        handleError(error, "Error setting session"); // Maneja errores
        return error;
      });
  
    return strId; // Devuelve el ID de la sesión
  };
  
  // Función para configurar una sesión
  export const setSession = async (id_user, state, id_session) => {
    let strId = "";
  
    const date_4 = new Date(); // Obtiene la fecha actual
    date_4.setHours(date_4.getHours() - 4); // Ajusta la hora a GMT-4
  
    const objsession = {
      // id_device: id_device, // ID del dispositivo
      id_user: id_user, // ID del usuario
      state: state, // Estado de la sesión
      date: date_4, // Fecha ajustada
    };
  
    if (id_session === "") { // Si no hay ID de sesión, crea una nueva
      await axios
        .post(`${SERVER_URL}/session`, objsession)
        .then((res) => {
          strId = res.data._id; // Asigna el ID de la nueva sesión
        })
        .catch((error) => {
          handleError(error, "Error setting session"); // Maneja errores
        });
    } else if (method === "put") { // Si hay ID de sesión, actualiza la existente
      await axios
        .put(`${SERVER_URL}/session/${id_session}`, objsession)
        .catch((error) => {
          handleError(error, "Error setting session"); // Maneja errores
        });
      strId = id_session; // Asigna el ID de la sesión existente
    }
    return strId; // Devuelve el ID de la sesión
  };

  // Función para cifrar datos
export async function encryptData(data) {
    // Genera un IV (vector de inicialización) aleatorio de 16 bytes
    const iv = cryptlib.generateRandomIV(16);
    // Genera una clave hash SHA-256 de longitud 32 bytes
    const key = cryptlib.getHashSha256('1029jh01d3n9ioqwuhr97823h', 32);
    // Cifra los datos usando la clave y el IV
    const encryptedData = cryptlib.encrypt(data, key, iv);
    return encryptedData; // Devuelve los datos cifrados
  }