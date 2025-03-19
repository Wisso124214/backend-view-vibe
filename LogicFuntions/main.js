// Importa la librería axios para realizar solicitudes HTTP
import axios from "axios";

// Importa la constante SERVER_URL desde el archivo de configuración
import { SERVER_URL } from "../config.js";

// Importa la librería cryptlib para operaciones de cifrado
import cryptlib from "cryptlib";

import { logicSession } from "./logicSession.js";
import { logicRegister } from "./logicRegister.js";
import { logicUser } from "./logicUser.js";

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




