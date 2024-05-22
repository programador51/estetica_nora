import {
  performOneConnection,
  retrieveOnlyConnection,
} from "@/app/helpers/db/connection";
import { PoolConnection } from "mysql2/promise";
import bcrypt from "bcrypt";
import { DtoRegisterUser } from "@/app/customHooks/useRegisterUser/types";
import { generateError } from "@/app/helpers/errors";

async function createUser(dto: DtoRegisterUser) {
  let db: PoolConnection;

  try {
    await performOneConnection();
    db = retrieveOnlyConnection();
  } catch (error) {
    throw error;
  }

  const hashedPassword = bcrypt.hashSync(dto.contrasena, 10);

  try {
    await db.query(
      `CALL AddAccount(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
      [
        dto.telefono,
        dto.correo,
        dto.primerNombre,
        dto.segundoNombre,
        dto.apellidoPaterno,
        dto.apellidoMaterno,
        dto.tipoDeCuenta,
        hashedPassword,
        null,
      ]
    );
  } catch (error) {
    throw generateError(
      "94d92763-87f9-459a-8630-19e062144040",
      "No se pudo crear la cuenta, reportar a soporte",
      error
    );
  }
}

const model = {
  create: createUser,
};

export default model;