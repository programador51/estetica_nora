import { NextResponse } from "next/server";
import reservation from "@/app/models/reservations/index";

interface Params {
  id: number;
}

export async function GET(req: Request, context: { params: Params }) {
  try {
    const id = +context.params.id;

    const overview = await reservation.get(id);

    return NextResponse.json(overview, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
