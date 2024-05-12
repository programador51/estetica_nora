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

export async function GET(req: NextRequest) {
  const dbRecords: ServiceOption[] = [
    {
      name: "Haircut",
      id: 1,
      picture: "https://example.com/haircut.jpg",
      costPrice: 20,
      sellPrice: 30,
      durationOnMinutes: 30,
      toleranceOnMinutes: 5,
      susceptibleToChange: true,
    },
    {
      name: "Massage",
      id: 2,
      picture: "https://example.com/massage.jpg",
      costPrice: 40,
      sellPrice: 60,
      durationOnMinutes: 60,
      toleranceOnMinutes: 10,
      susceptibleToChange: true,
    },
    {
      name: "Manicure",
      id: 3,
      picture: "https://example.com/manicure.jpg",
      costPrice: 15,
      sellPrice: 25,
      durationOnMinutes: 45,
      toleranceOnMinutes: 5,
      susceptibleToChange: true,
    },
    {
      name: "Pedicure",
      id: 4,
      picture: "https://example.com/pedicure.jpg",
      costPrice: 20,
      sellPrice: 35,
      durationOnMinutes: 60,
      toleranceOnMinutes: 5,
      susceptibleToChange: true,
    },
    {
      name: "Facial",
      id: 5,
      picture: "https://example.com/facial.jpg",
      costPrice: 50,
      sellPrice: 80,
      durationOnMinutes: 60,
      toleranceOnMinutes: 10,
      susceptibleToChange: true,
    },
  ];

  try {
    return NextResponse.json(dbRecords, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
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
