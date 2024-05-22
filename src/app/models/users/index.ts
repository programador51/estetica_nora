import {
  performOneConnection,
  retrieveOnlyConnection,
} from "@/app/helpers/db/connection";
import { PoolConnection } from "mysql2/promise";
import bcrypt from "bcrypt";
import { DtoRegisterUser } from "@/app/customHooks/useRegisterUser/types";
import { generateError } from "@/app/helpers/errors";
import { CustomError } from "@/app/helpers/errors/types";

async function createUser(
  dto: DtoRegisterUser,
  urlProfilePicture: null | string = null
) {
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
        dto.telefono.replaceAll("-", ""),
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
    const parsed = error as CustomError;
    throw generateError(
      "94d92763-87f9-459a-8630-19e062144040",
      parsed.message,
      error
    );
  }
}

const model = {
  create: createUser,
};

export default model;
