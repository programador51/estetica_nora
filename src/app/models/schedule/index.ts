import {
  performOneConnection,
  retrieveOnlyConnection,
} from "@/app/helpers/db/connection";
import { generateError } from "@/app/helpers/errors";
import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { DtoAddScheduleItem, DtoScheduleItem } from "./types";

async function getSchedules(): Promise<DtoScheduleItem[]> {
  let db: PoolConnection;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [schedules] = await db.query<RowDataPacket[]>("CALL GetSchedules();");

    return schedules[0] as DtoScheduleItem[];
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

/**
 *
 * @param day - It can be number between 1 and 7 or the set of strings allowed on the db for the column insert
 * @param from - Time on seconds if number, otherwise a string
 * @param to - Time on seconds if number, otherwise a string
 * @returns {void} Nothing
 * @example
 * addSchedules(1,10000,20000); // Example 1
 * addSchedules('lunes','10:00','14:00'); // Example 2
 */
async function addSchedules(schedules: DtoAddScheduleItem[] = []) {
  let db: PoolConnection;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    db.beginTransaction();

    for (const schedule of schedules) {
      await db.query("CALL AddSchedule(?,?,?);", [
        schedule.dia,
        schedule.desde,
        schedule.hasta,
      ]);
    }

    db.commit();
  } catch (error) {
    throw generateError(
      "6e157951-07cf-4ad6-9431-a060d5120ac9",
      "No se pudo agregar el horario, reportar a soporte",
      error
    );
  } finally {
    db.release();
  }
}

const model = {
  get: getSchedules,
  add: addSchedules,
};

export default model;
