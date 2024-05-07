import { readFormData } from "@/app/helpers/fetch";
import model from "@/app/models/catalogue";
import { NextResponse } from "next/server";
import { PutCatalogue } from "./types";
import { DtoUpdateProduct } from "@/app/customHooks/useFormCatalogue/types";

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
    const id = +req.url.split("/").reverse()[0];

    const formData = await readFormData<PutCatalogue>(req);

    const dto: DtoUpdateProduct = JSON.parse(
      typeof formData.dto === "string" ? formData.dto : "{}"
    );

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
