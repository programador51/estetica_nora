import model from "@/app/models/catalogue";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

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
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
