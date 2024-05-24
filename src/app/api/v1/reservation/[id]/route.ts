import { NextResponse } from "next/server";
import reservation from "@/app/models/reservations/index";

export async function GET(req: Request) {
  try {
    const overview = await reservation.get(6);

    return NextResponse.json(overview, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
