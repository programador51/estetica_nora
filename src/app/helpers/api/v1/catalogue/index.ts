import { DtoAddProduct } from "@/app/customHooks/useFormCatalogue/types";
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

    return false;
  } catch (error) {
    return false;
  }
}
