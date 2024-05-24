import mysql, { Pool, PoolConnection } from "mysql2/promise";
import { generateError } from "../../errors";

let pool: Pool | undefined = undefined;
let activeConnections = 0;

function updateActiveConnections(connectionIncreased: number) {
  const newCounter = (activeConnections += connectionIncreased);

  if (newCounter <= 0){
    activeConnections = 0;
    return;
  }

  activeConnections = newCounter;
}

async function performConnection() {
  try {
    // Create the connection to database
    const connection = await mysql.createPool({
      uri: `${process.env.DB_URI}`,
      waitForConnections: true,
      queueLimit: 0,
      connectionLimit: 5,
      idleTimeout:5000,
      enableKeepAlive:true,
      keepAliveInitialDelay:0,
      typeCast: function (field, next) {
        if (field.type === "BIT" && field.length === 1) {
          var bytes = field.buffer();

          if (bytes === null) return 0;

          return bytes[0] === 1;
        }
        return next();
      },
    });

    connection.on("acquire", () => {
      // console.log("Connection acquired from pool");
    });

    connection.on("release", () => {
      console.log("Connection released back to pool");
      updateActiveConnections(-1);
    });

    connection.on("enqueue", () => {
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

async function getConnectionWithRetry(
  retries: number = 1
): Promise<PoolConnection> {
  try {
    await initializePool();
    if (!pool) {
      throw new Error("Failed to initialize connection pool");
    }

    const connection = await pool.getConnection();
    updateActiveConnections(1);

    connection.on("error", (err) => {
      console.error("Connection encountered an error:", err);
      updateActiveConnections(-1);
      console.log("Active connections:", activeConnections);
    });

    connection.on("end", () => {
      console.log("Connection ended");
      updateActiveConnections(-1);
      console.log("Active connections:", activeConnections);
    });

    return connection;
  } catch (error) {

    const delay = Math.floor(Math.random() * 2000) + 1000;

    console.log(
      `Error, re-intentando en ${
        delay / 1000
      } segundos... (${retries} retries)`
    );
    await new Promise((res) => setTimeout(res, delay));
    return getConnectionWithRetry(retries + 1);

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
}

export default performConnection;
