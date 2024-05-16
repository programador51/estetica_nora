import { NextResponse } from "next/server";
import reservation from "@/app/models/reservations/index";

interface Params {
  page: number;
}

export async function GET(req: Request, context: { params: Params }) {
  try {
    const page = +context.params.page;
    
    const reservations = await reservation.paginated(page);

    return NextResponse.json(reservations, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
