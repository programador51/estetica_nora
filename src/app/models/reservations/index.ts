import { DtoAddReservation } from "@/app/api/v1/reservation/types";
import {
  getConnection,
  performOneConnection,
  retrieveOnlyConnection,
} from "@/app/helpers/db/connection";
import { generateError } from "@/app/helpers/errors";
import servicesModel from "@/app/models/services";
import { ServicesIndexed } from "../services/types";
import { secondsToHHMM, timeStringToSeconds } from "@/app/helpers/dates";
import { ResDtoPaginated } from "@/app/helpers/api/v1/types";
import { PoolConnection, RowDataPacket } from "mysql2/promise";
import {
  DtoReservationItem,
  DtoReservationOverview,
  DtoReservationPaginated,
  QueryServiceData,
} from "./types";
import users from "@/app/models/users";
import services from '@/app/models/services';
import { ServiceOption } from "@/app/molecule/servicesSelect/types";

async function add(dto: DtoAddReservation) {

  let services: ServicesIndexed = {};

  let db: PoolConnection;

  try {
    db = await getConnection()
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

    db.beginTransaction();

    const [result] = await db.query<RowDataPacket[]>(
      `CALL AddReservation(?,?,?,?,?,?)`,
      [
        dto.day,
        dto.timeStart,
        finishTime,
        totalSell,
        dto.customer,
        dto.customerName,
      ]
    );

    const idReservation = result[0][0].id;

    for (const service of dto.services) {
      await db.query(`CALL AddReservationService(?,?,?,?)`, [
        service.id,
        idReservation,
        service.cost,
        service.price,
      ]);
    }

    db.commit();
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
  page: number | string
): Promise<ResDtoPaginated<DtoReservationPaginated>> {
  let db: PoolConnection;

  try {
    db = await getConnection()
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
  }finally{
    db.release()
  }
}

async function cancel(id: number) {
  let db: PoolConnection;

  try {
    db = await getConnection()
  } catch (error) {
    throw error;
  }

  try {
    await db.query(`CALL CancelReservation(?)`, [id]);
  } catch (error) {
    const parsedError = error as any;
    throw generateError(
      "08cdadec-77b2-41a8-abf6-bf5c0cb069e3",
      parsedError.message,
      error
    );
  } finally {
    db.release();
  }
}

async function get(id: number): Promise<DtoReservationOverview> {
  let db: PoolConnection;

  try {
    db = await getConnection()
  } catch (error) {
    throw error;
  }
  try {
    const [result] = await db.query<RowDataPacket[]>(`CALL GetReservation(?)`, [
      id,
    ]);

    const reservation = result[0][0] as DtoReservationItem;
    const serviceData = result[1] as QueryServiceData[];

    let servicesOfReservation:ServiceOption[] = []

    for(const service of serviceData){
      const serviceGot = await services.get(service.servicio);

      if(serviceGot!==undefined){
        servicesOfReservation.push({
          costPrice:+service.costo,
          sellPrice:+service.venta,
          durationOnMinutes:serviceGot?.durationOnMinutes,
          id:service.id,
          imagen:serviceGot.imagen,
          name:serviceGot.name,
          picture:serviceGot.imagen[0],
          susceptibleToChange:serviceGot.susceptibleToChange,
          toleranceOnMinutes:serviceGot.toleranceOnMinutes
  
        })

      }

    }

    const customer = await users.get("usuario", reservation.cuenta);

    let unrefCustomer = { ...customer };
    delete unrefCustomer.contrasena_hash;
    delete unrefCustomer.contrasena_hash_temporal;

    const employer = await users.get(
      "administrador",
      reservation.administrador
    );

    return {
      reservation,
      customer: unrefCustomer,
      employer,
      services: servicesOfReservation,
    };
  } catch (error) {
    throw generateError(
      "0c199a32-e698-434b-9dc1-da95609f52e2",
      "No se pudo obtener la informacion de la cita, reportar a soporte",
      error
    );
  } finally {
    db.release();
  }
}

const model = {
  add,
  paginated,
  get,
  cancel,
};

export default model;
