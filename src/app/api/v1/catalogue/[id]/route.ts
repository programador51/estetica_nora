import model from "@/app/models/catalogue";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const product = await model.byId(17);

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
