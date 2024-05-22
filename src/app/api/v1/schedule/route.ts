import { NextRequest, NextResponse } from "next/server";
import schedule from "@/app/models/schedule";

export async function GET(req: NextRequest) {
  try {
    const schedules = await schedule.get();

    return NextResponse.json(schedules, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const dto = await req.json();

    await schedule.add(dto.schedules);

    return NextResponse.json(
      {
        message: "Horarios agregados",
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
