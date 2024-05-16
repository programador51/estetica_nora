import reservation from "@/app/models/reservations";
import { NextResponse } from "next/server";

interface Params {
  id: number;
}

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    const id = +context.params.id;

    const reservations = await reservation.cancel(id);

    return NextResponse.json(reservations, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
