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
