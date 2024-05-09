import {
  DtoAddProduct,
  UpdateProduct,
} from "@/app/customHooks/useFormCatalogue/types";
import { promptError, promptSuccess } from "@/app/helpers/alerts";
import { parseError } from "@/app/helpers/errors";
import { CustomError } from "@/app/helpers/errors/types";
import { isOkRes } from "@/app/helpers/fetch";
import { ResDtoPaginated } from "../types";
import { ProductI } from "@/app/customHooks/useCatalogue/types";

export async function addProduct(dto: DtoAddProduct, files: File[]) {
  try {
    const formData = new FormData();

    formData.append("dto", JSON.stringify(dto));

    if (files.length > 0)
      files.forEach((file, i) => formData.append(`file_${i + 1}`, file));

    const res = await fetch("/api/v1/catalogue", {
      method: "POST",
      body: formData,
    });

    if (isOkRes(res)) {
      const data = await res.json();

      promptSuccess({
        title: "Éxito",
        text: data.message,
      });
      return true;
    }

    const error: CustomError = await res.json();

    promptError(error);

    return false;
  } catch (error) {
    promptError(parseError(error));
    return false;
  }
}

// ProductI
export async function getProducts(
  page: number
): Promise<ResDtoPaginated<ProductI>> {
  const ERROR: ResDtoPaginated<ProductI> = {
    page: 1,
    pages: 1,
    records: [],
    noRecordsFound: 0,
  };

  try {
    const response = await fetch("/api/v1/catalogue", {
      method: "GET",
    });

    if (isOkRes(response)) {
      const data: ResDtoPaginated<ProductI> = await response.json();

      return data;
    }
    const data: CustomError = await response.json();

    promptError(data);

    return ERROR;
  } catch (error) {
    promptError(parseError(error));
    return ERROR;
  }
}

export async function getById(id: number): Promise<ProductI | null> {
  try {
    const response = await fetch(`/api/v1/catalogue/${id}`, {
      method: "GET",
    });

    if (isOkRes(response)) {
      const data = await response.json();
      return data;
    }

    const error: CustomError = await response.json();

    promptError(error);

    return null;
  } catch (error) {
    promptError(parseError(error));
    return null;
  }
}

export async function updateProduct(dto: UpdateProduct, files: File[] = []) {
  try {
    const formData = new FormData();

    formData.append("dto", JSON.stringify(dto));

    if (files.length > 0)
      files.forEach((file, i) => formData.append(`file_${i + 1}`, file));

    const response = await fetch(`/api/v1/catalogue/${dto.id}`, {
      method: "PUT",
      body: formData,
    });

    if (isOkRes(response)) {
      const message =
        dto.filesToDelete.length >= 1 ? "E imágenes borradas." : "";

      promptSuccess({
        title: "Éxito",
        text: `Producto actualizado correctamente. ${message}`,
      });

      return true;
    }

    const ERROR: CustomError = await response.json();

    promptError(ERROR);

    return false;
  } catch (error) {
    promptError(parseError(error));

    return false;
  }
}
