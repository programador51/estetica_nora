import { toQueryParams } from "@/app/helpers/fetch";
import axios, { AxiosError } from "axios";
import { Data, ImgBbResponse } from "./types";
import { generateError } from "@/app/helpers/errors";
import performConnection from "@/app/helpers/db/connection";
import { Connection, RowDataPacket } from "mysql2/promise";

export async function uploadToBlobStorage(
  file: File | string
): Promise<Data | null> {
  try {
    const queryParam = toQueryParams([`key=${process.env.IMG_BB}`]);

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post<ImgBbResponse>(
      `https://api.imgbb.com/1/upload${queryParam}`,
      formData
    );

    if (response.data.data !== undefined) return response.data.data as Data;

    return null;
  } catch (error) {
    throw generateError(
      "d520048a-34b4-4af0-9f60-50426d7bc3a8",
      "No se pudo cargar la imagen al repositorio de imágenes, reportar a soporte",
      error
    );
  }
}

export async function uploadFiles(
  files: string[] | File[] | (string | File)[]
): Promise<Data[]> {
  try {
    const querys = files.map((file) =>
      uploadToBlobStorage(file)
        .then((data) => data)
        .catch((e) => {
          throw e;
        })
    );

    const filesUploaded = await Promise.all(querys);

    const successFiles = filesUploaded.filter((file) => file !== null);

    return successFiles as Data[];
  } catch (error) {
    throw error;
  }
}

export async function add(
  idEntity: number,
  type: "catalogo" | "servicios",
  url: string
) {
  let db: Connection;

  try {
    db = await performConnection();
  } catch (error) {
    throw error;
  }

  try {
    const [results] = await db.query<RowDataPacket[]>(
      "INSERT INTO Galeria (urlFoto,idEntidad,tipo,estatus) VALUES (?,?,?,?)",
      [url, idEntity, type, 1]
    );
  } catch (error) {
    throw generateError(
      "97ffc403-64ca-4e99-92d6-81e5811eea9f",
      "No se pudo agregar la imagen, reportar a soporte",
      error
    );
  }
}

export const model = {
    add
}