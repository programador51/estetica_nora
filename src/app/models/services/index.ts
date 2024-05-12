import { DtoAddService } from "@/app/customHooks/useFormServices/types";
import { ResDtoPaginated } from "@/app/helpers/api/v1/types";
import {
  performOneConnection,
  retrieveOnlyConnection,
} from "@/app/helpers/db/connection";
import { generateError } from "@/app/helpers/errors";
import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { ServicesPaginated } from "./types";

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
        ?
    );`,
      [dto.precio, dto.costo, dto.tolerancia, dto.duracion, 0, dto.descripcion]
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

const model = {
  add: addService,
  paginated: servicesPaginated,
};

export default model;
