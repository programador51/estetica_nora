import { NextResponse } from "next/server";
import model from "@/app/models/catalogue";
import { readFormData } from "@/app/helpers/fetch";
import { PostCatalogue } from "./types";
import { DtoAddProduct } from "@/app/customHooks/useFormCatalogue/types";

export async function POST(req: Request) {
  try {
    const formData = await readFormData<PostCatalogue>(req);

    const dto: DtoAddProduct = JSON.parse(
      typeof formData.dto === "string" ? formData.dto : "{}"
    );

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
