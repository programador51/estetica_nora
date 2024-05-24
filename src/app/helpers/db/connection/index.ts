import mysql, { PoolConnection } from "mysql2/promise";
import { generateError } from "../../errors";

let pool: PoolConnection | undefined = undefined;

async function performConnection(): Promise<PoolConnection> {
  try {
    // Create the connection to database
    const connection = await mysql.createPool({
      uri: `${process.env.DB_URI}`,
      waitForConnections: true,
      queueLimit: 0,
      connectionLimit: 5,
      typeCast: function (field, next) {
        if (field.type === "BIT" && field.length === 1) {
          var bytes = field.buffer();

          if (bytes === null) return 0;

          return bytes[0] === 1;
        }
        return next();
      },
    });

    const pooled = await connection.getConnection();

    pooled.on("connection", () =>
      console.log("Conectado a la base de datos （￣︶￣）↗　")
    );

    return pooled;
  } catch (error) {
    const errorParsed = generateError(
      "8e9cf7ce-1576-4ea1-b58b-3152a86aae54",
      "No se pudo conectar a la base de datos, reportar a soporte",
      error
    );

    throw errorParsed;
  }
}

export async function performOneConnection() {
  if (pool !== undefined) return;

  const attemptedConnection = await performConnection();

  pool = attemptedConnection;
}

export function retrieveOnlyConnection() {
  if (pool === undefined)
    throw generateError(
      "8e9cf7ce-1576-4ea1-b58b-3152a86aae54",
      "No se pudo conectar a la base de datos, reportar a soporte",
      "??"
    );

  return pool;
}

export async function getConnection() {
  try {
    await performOneConnection();
    const db = retrieveOnlyConnection();

    return db;
  } catch (error) {
    throw error;
  }
}

export default performConnection;
