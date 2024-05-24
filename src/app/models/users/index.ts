import {
  getConnection,
  performOneConnection,
  retrieveOnlyConnection,
} from "@/app/helpers/db/connection";
import { PoolConnection, RowDataPacket } from "mysql2/promise";
import bcrypt from "bcrypt";
import { DtoRegisterUser } from "@/app/customHooks/useRegisterUser/types";
import { generateError } from "@/app/helpers/errors";
import { CustomError } from "@/app/helpers/errors/types";
import { TypeAccount } from "@/app/molecule/typeAccount/types";
import { DtoUser } from "./types";

async function createUser(
  dto: DtoRegisterUser,
  urlProfilePicture: null | string = null
) {
  let db: PoolConnection;

  try {
    db = await getConnection()
  } catch (error) {
    throw error;
  }

  const hashedPassword = bcrypt.hashSync(dto.contrasena, 10);

  let idUser = 0;

  try {
    const [result] = await db.query<RowDataPacket[]>(
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
        urlProfilePicture,
      ]
    );

    idUser = result[0][0].id;
  } catch (error) {
    const parsed = error as CustomError;
    throw generateError(
      "94d92763-87f9-459a-8630-19e062144040",
      parsed.message,
      error
    );
  } finally {
    db.release();
  }

  try {
    const user = await getUser("usuario", idUser, null);
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch the information of an account with his id
 * @param id - Id of the user to fetch their data
 */
async function getUser(
  type: TypeAccount,
  id: number,
  email: string | null = null
): Promise<DtoUser> {
  let db: PoolConnection;

  try {
    db = await getConnection()
  } catch (error) {
    throw error;
  }

  try {
    const [result] = await db.query<RowDataPacket[]>(`CALL GetAccount(?,?,?)`, [
      id,
      email,
      type,
    ]);

    return result[0][0] as DtoUser;
  } catch (error) {
    throw generateError(
      "73361359-ab22-4e22-baae-aae09cda2c66",
      "No se pudo obtener la cuenta, reportar a soporte",
      error
    );
  } finally {
    db.release();
  }
}

/**
 * Retrieve all the accounts active on the system
 */
async function getAllUsers(): Promise<DtoUser[]> {
  let db: PoolConnection;

  try {
    db = await getConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [result] = await db.query<RowDataPacket[]>(`CALL GetAllAccounts()`);

    return result[0] as DtoUser[];
  } catch (error) {
    throw generateError(
      "c46a3f8d-adee-4210-8895-fea628e298eb",
      "No se pudo obtener la lista de usuarios registrados, reportar a soporte",
      error
    );
  } finally {
    db.release();
  }
}

/**
 * Update the type of account for a specific user
 * @param id - Id of the account to update
 * @param rol - New type of account to be set on the account
 */
async function promoteUser(id: number, rol: TypeAccount) {
  let db: PoolConnection;

  try {
    db = await getConnection()
  } catch (error) {
    throw error;
  }

  try {
    await db.query("CALL UpdateUserRol(?,?)", [id, rol]);
  } catch (error) {
    throw generateError(
      "a934987e-d757-43cf-89e4-ef4e0033d434",
      "No se pudo actualizar la configuracion del usuario, reportar a soporte",
      error
    );
  } finally {
    db.release();
  }
}

async function blockAccount(id: number, mustBeBlocked: boolean|number) {
  let db: PoolConnection;

  try {
    db = await getConnection()
  } catch (error) {
    throw error;
  }

  try {
    await db.query("CALL UpdateBlockAccount(?,?)", [id, +mustBeBlocked]);
  } catch (error) {
    throw generateError(
      "bcfcacb3-45c4-4efd-a413-9c6bbf50e797",
      "No se pudo actualizar el bloqueo del usuario, reportar a soporte",
      error
    );
  } finally {
    db.release();
  }
}

const model = {
  create: createUser,
  get: getUser,
  getAll: getAllUsers,
  promote: promoteUser,
  block:blockAccount
};

export default model;
