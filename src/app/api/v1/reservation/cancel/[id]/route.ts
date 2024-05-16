import reservation from "@/app/models/reservations";
import { NextResponse } from "next/server";

interface Params {
  id: number;
}

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    const id = +context.params.id;

    await reservation.cancel(id);

    return NextResponse.json(
      {
        message: "Reservación cancelada",
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
