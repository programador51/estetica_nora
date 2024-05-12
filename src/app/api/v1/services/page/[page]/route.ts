import { CustomError } from "@/app/helpers/errors/types";
import model from "@/app/models/services";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const page = +req.url.split("/").reverse()[0];

    const services = await model.paginated(page);

    return NextResponse.json(services, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error as CustomError, {
      status: 500,
    });
  }
}
