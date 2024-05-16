import { NextResponse } from "next/server";
import { DtoAddReservation } from "./types";
import reservation from "@/app/models/reservations/index";

export async function POST(req: Request) {
  try {
    const dto: DtoAddReservation = await req.json();

    await reservation.add(dto);

    return NextResponse.json(
      {
        message: "Reservación agregada",
      },
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
