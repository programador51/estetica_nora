import { DtoAddReservation } from "@/app/api/v1/reservation/types";
import {
  performOneConnection,
  retrieveOnlyConnection,
} from "@/app/helpers/db/connection";
import { generateError } from "@/app/helpers/errors";
import servicesModel from "@/app/models/services";
import { ServicesIndexed } from "../services/types";
import { secondsToHHMM, timeStringToSeconds } from "@/app/helpers/dates";
import { ResDtoPaginated } from "@/app/helpers/api/v1/types";
import { ReservationItem } from "@/app/molecule/reservationItem/types";
import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { DtoReservationPaginated } from "./types";

async function add(dto: DtoAddReservation) {
  let db;

  let services: ServicesIndexed = {};

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    services = await servicesModel.getAll();
  } catch (error) {
    throw error;
  }

  try {
    const totalCost = dto.services.reduce(
      (sum, service) => (sum += +service.cost),
      0
    );
    const totalSell = dto.services.reduce(
      (sum, service) => (sum += +service.price),
      0
    );

    const startTimeOnSeconds = timeStringToSeconds(dto.timeStart);

    const finishOnSeconds = dto.services.reduce(
      (minutes, service) =>
        (minutes += services[service.id].durationOnMinutes * 60),
      startTimeOnSeconds
    );

    const finishTime = secondsToHHMM(finishOnSeconds);

    await db.query(`CALL AddReservation(?,?,?,?)`, [
      dto.day,
      dto.timeStart,
      finishTime,
      totalSell,
    ]);
  } catch (error) {
    const messageError = error as any;
    throw generateError(
      "aac1abc7-32d0-46a4-8c89-db884e4357ee",
      messageError.message as any,
      error
    );
  } finally {
    db.release();
  }
}

async function paginated(
  page: number|string
): Promise<ResDtoPaginated<DtoReservationPaginated>> {
  let db: PoolConnection;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [results] = await db.query<RowDataPacket[]>(
      `CALL GetReservations(?)`,
      page
    );

    return {
      page: +page,
      pages: results[1][0].total_pages,
      records: results[0] as DtoReservationPaginated[],
    };
  } catch (error) {
    throw generateError(
      "94d9227c-c701-4d08-81ff-e929ca51ef67",
      "No se pudo obtener las reservaciones, re-intenta o reportar a soporte",
      error
    );
  }
}

const model = {
  add,
  paginated,
};

export default model;
