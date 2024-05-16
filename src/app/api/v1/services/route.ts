import { readFormData } from "@/app/helpers/fetch";
import { ServiceOption } from "@/app/molecule/servicesSelect/types";
import { NextRequest, NextResponse } from "next/server";
import { PostService } from "./types";
import { DtoAddService } from "@/app/customHooks/useFormServices/types";
import { json } from "stream/consumers";
import { retrieveFilesFromReq } from "@/app/helpers/api/v1/files";
import { uploadFiles } from "@/app/models/gallery";
import model from "@/app/models/services/index";
import { model as modelGallery } from "@/app/models/gallery/index";
import service from "@/app/models/services";

export async function GET(req: NextRequest) {
  try {
    const services = await service.getAll();

    const arrayServices = Object.entries(services).map(([key, value]) => value);

    return NextResponse.json(arrayServices, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json([], {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await readFormData<PostService>(req);

    const dto: DtoAddService = JSON.parse(
      typeof formData.dto === "string" ? formData.dto : "{}"
    );

    const files = retrieveFilesFromReq(formData);

    const [idService, filesUploaded] = await Promise.all([
      model.add(dto),
      uploadFiles(files),
    ]);

    await modelGallery.massiveAdd(filesUploaded, idService, "servicios");

    return NextResponse.json({
      message: "Alta de servicio con éxito",
      dto: { idService },
    });
  } catch (error) {
    return NextResponse.json(json, {
      status: 500,
    });
  }
}
