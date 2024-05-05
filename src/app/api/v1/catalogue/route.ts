import { NextResponse } from "next/server";
import model from "@/app/models/catalogue";
import { readFormData } from "@/app/helpers/fetch";
import { PostCatalogue } from "./types";
import { DtoAddProduct } from "@/app/customHooks/useFormCatalogue/types";
import { uploadFiles, uploadToBlobStorage } from "@/app/models/gallery";

export async function POST(req: Request) {
  try {
    const formData = await readFormData<PostCatalogue>(req);

    const dto: DtoAddProduct = JSON.parse(
      typeof formData.dto === "string" ? formData.dto : "{}"
    );

    let files = { ...formData };
    delete files.dto;

    const filesToUpload = Object.entries(files).map(([key, value]) => value);

    await uploadFiles(filesToUpload);

    const idInserted = await model.add(dto);

    const okResponse = {
      message: "Alta de producto con éxito",
      dto: { idInserted },
    };
    return NextResponse.json(okResponse, {
      status: 200,
    });
  } catch (error) {}
}
