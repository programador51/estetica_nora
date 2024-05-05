import { DtoAddProduct } from "@/app/customHooks/useFormCatalogue/types";
import performConnection from "@/app/helpers/db/connection";
import { generateError } from "@/app/helpers/errors";
import { Connection, RowDataPacket } from "mysql2/promise";

async function add(dto: DtoAddProduct): Promise<number> {
  let db: Connection;

  try {
    db = await performConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [results] = await db.query<RowDataPacket[]>(
      "CALL InsertIntoCatalogo(?, ?, ?, ?,?)",
      [dto.descripcion, dto.precio, dto.costo, dto.stockDisponible, dto.titulo]
    );

    return results[0][0].id;
  } catch (error) {
    throw generateError(
      "989f1381-1212-48c7-b6ec-b858768206af",
      "No se pudo agregar el productor, reportar a soporte",
      error
    );
  }
}

const model = {
  add,
};

export default model;
