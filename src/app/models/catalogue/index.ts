import { ProductI } from "@/app/customHooks/useCatalogue/types";
import {
  DtoAddProduct,
  DtoGetProducts,
} from "@/app/customHooks/useFormCatalogue/types";
import { ResDtoPaginated } from "@/app/helpers/api/v1/types";
import {
  getConnection,
  performOneConnection,
  retrieveOnlyConnection,
} from "@/app/helpers/db/connection";
import { generateError } from "@/app/helpers/errors";
import { PoolConnection, RowDataPacket } from "mysql2/promise";

async function add(dto: DtoAddProduct): Promise<number> {
  let db: PoolConnection;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [results] = await db.query<RowDataPacket[]>(
      "CALL InsertIntoCatalogo(?, ?, ?, ?,?)",
      [dto.descripcion, dto.precio, dto.costo, dto.stockDisponible, dto.titulo]
    );

    db.release();

    return results[0][0].id;
  } catch (error) {
    throw generateError(
      "989f1381-1212-48c7-b6ec-b858768206af",
      "No se pudo agregar el productor, reportar a soporte",
      error
    );
  }
}

async function get(dto: DtoGetProducts): Promise<ResDtoPaginated<ProductI>> {
  try {
    const db = await getConnection();

    const [results] = await db.query<RowDataPacket[]>(`CALL GetCatalogue(?)`, [
      dto.page,
    ]);

    db.release();

    const dtoResponse: ResDtoPaginated<ProductI> = {
      pages: results[1][0]["total_pages"],
      page: dto.page,
      records: results[0] as ProductI[],
      noRecordsFound: results[1][0]["total_records"],
    };

    return dtoResponse;
  } catch (error) {
    throw generateError(
      "11ffc8d4-18b5-4b0e-9613-a2a620084ba8",
      "No se pudo obtener el catálogo, reportar a soporte",
      error
    );
  }
}

async function byId(id: number):Promise<ProductI> {
  let db: PoolConnection;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [product] = await db.query<RowDataPacket[]>("CALL GetCatalogueItem(?)", [id]);

    db.release();

    return product[0][0];
  } catch (error) {
    throw generateError(
      "472a37f7-171c-465c-b1f6-616919d37ba0",
      "No se pudo obtener el producto, reportar a soporte",
      error
    );
  }
}

const model = {
  add,
  get,
  byId
};

export default model;
