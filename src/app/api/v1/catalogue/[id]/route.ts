import { readFormData } from "@/app/helpers/fetch";
import model from "@/app/models/catalogue";
import { NextResponse } from "next/server";
import { PutCatalogue } from "./types";
import { DtoUpdateProduct } from "@/app/customHooks/useFormCatalogue/types";
import { uploadFiles, model as modelGallery } from "@/app/models/gallery";

export async function GET(req: Request) {
  try {
    const id = +req.url.split("/").reverse()[0];

    const product = await model.byId(id);

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const formData = await readFormData<PutCatalogue>(req);

    const dto: DtoUpdateProduct = JSON.parse(
      typeof formData.dto === "string" ? formData.dto : "{}"
    );

    ////////////////////////////////////////////////
    // TODO: Convertir en una funcion
    let files = { ...formData };
    delete files.dto;

    const filesToUpload = Object.entries(files).map(([key, value]) => value);

    const filesUploaded = await uploadFiles(filesToUpload);
    ////////////////////////////////////////////////

    for (const data of filesUploaded) {
      try {
        await modelGallery.add(dto.id, "catalogo", data.display_url);
      } catch (e) {
        throw e;
      }
    }

    await model.update(dto);

    return NextResponse.json(
      { message: "Producto actualizado", dto: {} },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
