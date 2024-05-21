import schedule from "@/app/models/schedule";
import { NextResponse } from "next/server";

interface Params {
  id: number;
}

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    const id = +context.params.id;

    await schedule.cancel(id);

    return NextResponse.json(
      {
        message: "Horario eliminado",
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
