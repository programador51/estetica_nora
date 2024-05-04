import mysql from "mysql2/promise";
import { generateError } from "../../errors";

async function performConnection() {
  try {
    // Create the connection to database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      timezone: "America/Mexico_City",
      stringifyObjects: false,
    });

    return connection;
  } catch (error) {
    throw generateError(
      "8e9cf7ce-1576-4ea1-b58b-3152a86aae54",
      "No se pudo conectar a la base de datos, reportar a soporte",
      error
    );
  }
}

export default performConnection;
