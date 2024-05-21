import { DtoAddService } from "@/app/customHooks/useFormServices/types";
import { ResDtoPaginated } from "@/app/helpers/api/v1/types";
import {
  performOneConnection,
  retrieveOnlyConnection,
} from "@/app/helpers/db/connection";
import { generateError } from "@/app/helpers/errors";
import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { ServicesIndexed, ServicesPaginated } from "./types";
import { ServiceOption } from "@/app/molecule/servicesSelect/types";

/**
 * Create a new service into system
 * @param dto - Information to create a service
 * @returns Id of the record inserted
 */
async function addService(dto: DtoAddService): Promise<number> {
  let db: PoolConnection;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [result] = await db.query<RowDataPacket[]>(
      `CALL InsertIntoService(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    );`,
      [dto.precio, dto.costo, dto.tolerancia, dto.duracion, 0, dto.descripcion,dto.titulo]
    );

    return result[0][0].id;
  } catch (error) {
    throw generateError(
      "6fcfa971-316d-491d-af30-c086c38b1614",
      "No se pudo agregar el servicio, reportar a soporte",
      error
    );
  } finally {
    db.release();
  }
}

async function servicesPaginated(
  page: number
): Promise<ResDtoPaginated<ServicesPaginated>> {
  let db: PoolConnection;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [result] = await db.query<RowDataPacket[]>("CALL GetServices(?)", [
      page,
    ]);

    return {
      noRecordsFound: result[1][0]["total_records"],
      page,
      pages: result[1][0]["total_pages"],
      records: result[0] as ServicesPaginated[],
    };
  } catch (error) {
    throw generateError(
      "5b558a36-6ae3-4318-a3db-077941e3cdaf",
      "No se pudo obtener los servicios, reportar a soporte",
      error
    );
  } finally {
    db.release();
  }
}

async function getService(id: number): Promise<any> {
  let db;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    // TODO: Crear un stored procedure dedicado para consultar por id, que pereza hacer otro sp... Zzzzz
    const [results] = await db.query<RowDataPacket[]>("CALL GetAllServices()");

    const services = results[0] as ServiceOption[];

    const serviceFound = services.find((service) => service.id === id);

    return serviceFound;
  } catch (error) {
    throw generateError(
      "bd10569a-876a-4b1c-aa08-fd915024d271",
      "No se pudo obtener el servicio, reportar a soporte",
      error
    );
  }
}

async function getAllServices(): Promise<ServicesIndexed> {
  let db;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [results] = await db.query<RowDataPacket[]>("CALL GetAllServices()");

    const services = results[0] as ServiceOption[];

    /**
     * @type {ServicesIndexed}
     */
    const indexedServices = services.reduce(
      (indexed, service) => ({
        ...indexed,
        [service.id]: service,
      }),
      {}
    );

    return indexedServices;
  } catch (error) {
    throw generateError(
      "fab9f534-e4c3-4fc1-b3d0-f7835fa7c196",
      "No se pudieron consultar los servicios, reportar a soporte",
      error
    );
  }
}

const model = {
  add: addService,
  paginated: servicesPaginated,
  get: getService,
  getAll:getAllServices
};

export default model;
