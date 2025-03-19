import axios from "axios";
import { SERVER_URL } from "../config.js";

// Función para obtener una lista de nombres de usuario
export async function getListUsernames(setListUsernames, username) {
    await axios
      .get(`${SERVER_URL}/users`, { params: { username: username } }) // Solicita usuarios al servidor
      .then(async (res) => {
        let arr = [];
        // Itera sobre los datos recibidos y extrae los nombres de usuario
        await res.data.forEach((objusername) => {
          arr.push(objusername.username);
        });
        setListUsernames(arr); // Actualiza la lista de nombres de usuario
      })
      .catch((error) => {
        handleError(error, "Error getting users"); // Maneja errores
      });
  }
  
  
  
  // Función para obtener el ID de un usuario
  export const getIdUser = async (username) => {
    let id = "";
  
    await axios
      .get(`${SERVER_URL}/users`, { params: { username: username } }) // Solicita usuarios al servidor
      .then(async (res) => {
        await res.data.forEach((objuser) => {
          // Busca un usuario que coincida con el nombre de usuario
          if (objuser.username === username && id === "") {
            id = objuser._id; // Asigna el ID del usuario
          }
        });
      })
      .catch((error) => {
        handleError(error, "Error getting users"); // Maneja errores
      });
    return id; // Devuelve el ID del usuario
  };
  
  // Función para obtener el ID de un contacto
  export const getIdContact = async (email) => {
    let id = "";
  
    await axios
      .get(`${SERVER_URL}/contacts`, { params: { email: email } }) // Solicita contactos al servidor
      .then(async (res) => {
        await res.data.forEach((objcontact) => {
          // Busca un contacto que coincida con el correo electrónico
          if (objcontact.email === email && id === "") {
            id = objcontact._id; // Asigna el ID del contacto
          }
        });
  
        if (id === "") { // Si no se encuentra el contacto, lo crea
          await axios
            .post(`${SERVER_URL}/contact`, {
              email: email, // Crea un nuevo contacto con el correo electrónico
            })
            .catch((error) => {
              handleError(error, "Error getting contacts"); // Maneja errores
            });
          id = await getIdContact(email); // Vuelve a buscar el ID del contacto
        }
      })
      .catch((error) => {
        handleError(error, "Error getting contacts"); // Maneja errores
      });
    return id; // Devuelve el ID del contacto
  };