import mysql, { Pool } from "mysql2/promise";
import { generateError } from "../../errors";

async function performConnection(): Promise<Pool> {
  try {
    // Create the connection to database
    const connection = await mysql.createPool({
      uri: `${process.env.DB_URI}`,
      waitForConnections:true,
      queueLimit:0,
      
    });

    return connection;
  } catch (error) {
    const errorParsed = generateError(
      "8e9cf7ce-1576-4ea1-b58b-3152a86aae54",
      "No se pudo conectar a la base de datos, reportar a soporte",
      error
    );

    throw errorParsed;
  }
}

export default performConnection;
