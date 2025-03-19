import axios from "axios";
import { SERVER_URL } from "../config.js";

// Función para guardar datos de registro
export const saveDataRegister = async (username, password, email, data) => {
    const id_contact = await getIdContact(email); // Obtiene el ID del contacto
  
    const {
      setIsKeyboardVisible, // Función para ocultar el teclado
      setListUsernames, // Función para actualizar la lista de nombres de usuario
      listUsernames, // Lista actual de nombres de usuario
      setLoading, // Función para actualizar el estado de carga
      mode, // Modo de la aplicación
      theme, // Tema de la aplicación
      methods, // Métodos adicionales
    } = data;
  
    setIsKeyboardVisible(false); // Oculta el teclado
  
    if (!err) {
      setListUsernames([...listUsernames, username]); // Agrega el nuevo nombre de usuario a la lista
  
      if (!err) {
        console.log("username: ", username); // Muestra el nombre de usuario en consola
        await axios
          .post(`${SERVER_URL}/user`, {
            // id_device: id_device, // ID del dispositivo
            username: username, // Nombre de usuario
            password: hashedPassword, // Contraseña cifrada
            id_contact: id_contact, // ID del contacto
          })
          .then(async (objuser) => {
            createSession(objuser.data._id) // Crea una sesión para el usuario
              .then(async (id_session) => {
                methods.setIdMainSession(id_session); // Establece el ID de la sesión principal
              })
              .catch((error) => {
                methods.setLoading(false); // Detiene el estado de carga
                handleError(error, "Error Registering"); // Maneja errores
              });
          })
          .catch((error) => {
            methods.setLoading(false); // Detiene el estado de carga
            handleError(error, "Error Registering"); // Maneja errores
          });
      } else {
        methods.setLoading(false); // Detiene el estado de carga
        handleError(err, "Error Registering"); // Maneja errores
      }
    } else {
      setLoading(false); // Detiene el estado de carga
      handleError(err, "Error Registering"); // Maneja errores
    }
  };
  
  // Función para manejar errores
  export const handleError = (error, errString) => {
    console.log(errString); // Muestra el mensaje de error
  };