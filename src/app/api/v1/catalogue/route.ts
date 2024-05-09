import { NextResponse } from "next/server";
import model from "@/app/models/catalogue";
import { readFormData } from "@/app/helpers/fetch";
import { PostCatalogue } from "./types";
import { DtoAddProduct } from "@/app/customHooks/useFormCatalogue/types";
import { uploadFiles, model as modelGallery } from "@/app/models/gallery";

export async function POST(req: Request) {
  try {
    const formData = await readFormData<PostCatalogue>(req);

    const dto: DtoAddProduct = JSON.parse(
      typeof formData.dto === "string" ? formData.dto : "{}"
    );

    ////////////////////////////////////////////////
    // TODO: Convertir en una funcion
    let files = { ...formData };
    delete files.dto;

    const filesToUpload = Object.entries(files).map(([key, value]) => value);

    const filesUploaded = await uploadFiles(filesToUpload);

    ////////////////////////////////////////////////

    const idInserted = await model.add(dto);

    for (const data of filesUploaded) {
      try {
        await modelGallery.add(idInserted, "catalogo", data.display_url);
      } catch (e) {
        throw e;
      }
    }

    const okResponse = {
      message: "Alta de producto con éxito",
      dto: { idInserted },
    };
    return NextResponse.json(okResponse, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(req: Request) {
  try {
    const catalogue = await model.get({
      page: 1,
    });

    return NextResponse.json(catalogue, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
