import { DtoAddProduct } from "@/app/customHooks/useFormCatalogue/types";
import { promptError } from "@/app/helpers/alerts";
import { parseError } from "@/app/helpers/errors";
import { CustomError } from "@/app/helpers/errors/types";
import { isOkRes } from "@/app/helpers/fetch";

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

