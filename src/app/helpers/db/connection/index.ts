import mysql, { Pool, PoolConnection } from "mysql2/promise";
import { generateError } from "../../errors";

let pool: Pool | undefined = undefined;
let activeConnections = 0;
const maxRetries = 5;
const retryDelay = 1500; // 1 second
const CONNECTION_LIMIT = 5

async function performConnection() {
  try {

    // Create the connection to database
    const connection = await mysql.createPool({
      uri: `${process.env.DB_URI}`,
      waitForConnections: true,
      queueLimit: 0,
      connectionLimit: CONNECTION_LIMIT,
      typeCast: function (field, next) {
        if (field.type === "BIT" && field.length === 1) {
          var bytes = field.buffer();

          if (bytes === null) return 0;

          return bytes[0] === 1;
        }
        return next();
      },
    });

    connection.on('acquire', () => {
      console.log("Connection acquired from pool");
    });

    connection.on('release', () => {
      console.log("Connection released back to pool");
    });

    connection.on('enqueue', () => {
      console.log("Waiting for available connection slot");
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

async function getConnectionWithRetry(retries: number = maxRetries): Promise<PoolConnection> {
  try {
    await initializePool();
    if (!pool) {
      throw new Error("Failed to initialize connection pool");
    }
    
    if (activeConnections >= CONNECTION_LIMIT) {
      if (retries > 0) {
        console.log(`Connection limit reached. Retrying in ${retryDelay / 1000} seconds... (${retries} retries left)`);
        await new Promise(res => setTimeout(res, retryDelay));
        return getConnectionWithRetry(retries - 1);
      } else {
        throw new Error("Max connection retries reached");
      }
    }
    const connection = await pool.getConnection();
    console.log("Connected to the database （￣︶￣）↗");
    return connection;
  } catch (error) {
    const errorParsed = generateError(
      "8e9cf7ce-1576-4ea1-b58b-3152a86aae54",
      "Failed to get database connection, please report to support",
      error
    );
    throw errorParsed;
  }
}


async function initializePool() {
  if (pool === undefined) {
    pool = await performConnection();
  }
}

export async function performOneConnection() {
  if (pool !== undefined) return;

  const attemptedConnection = await performConnection();

  pool = attemptedConnection;
}

export function retrieveOnlyConnection() {
  if (!pool) {
    throw generateError(
      "8e9cf7ce-1576-4ea1-b58b-3152a86aae54",
      "No se pudo conectar a la base de datos, reportar a soporte",
      "??"
    );
  }
  return pool;
}
export async function getConnection() {

  return getConnectionWithRetry();

  // try {
  //   await initializePool();
  //   if (!pool) {
  //     throw new Error("No se pudo inicializar el pool de conexiones");
  //   }
  //   return await pool.getConnection();
  // } catch (error) {
  //   const errorParsed = generateError(
  //     "8e9cf7ce-1576-4ea1-b58b-3152a86aae54",
  //     "No se pudo obtener la conexión a la base de datos, reportar a soporte",
  //     error
  //   );
  //   throw errorParsed;
  // }

  // try {
  //   await performOneConnection();
  //   const db = retrieveOnlyConnection();

  //   return db;
  // } catch (error) {
  //   throw error;
  // }
}

export default performConnection;
