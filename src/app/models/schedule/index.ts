import {
  performOneConnection,
  retrieveOnlyConnection,
} from "@/app/helpers/db/connection";
import { generateError } from "@/app/helpers/errors";
import { PoolConnection, RowDataPacket } from "mysql2/promise";

async function getSchedules() {
  let db: PoolConnection;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [schedules] = await db.query<RowDataPacket[]>("CALL GetSchedules();");

    return schedules[0];
  } catch (error) {
    throw generateError(
      "5e893ee3-3e23-43ab-8de2-862f351eacf0",
      "No se pudo obtener el horario, reportar a soporte",
      error
    );
  } finally {
    db.release();
  }
}

const model = {
  get: getSchedules,
};

export default model;
