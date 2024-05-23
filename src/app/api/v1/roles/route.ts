import { UserOption } from "@/app/molecule/usersSelect/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const dbRecords: UserOption[] = [];

  try {
    return NextResponse.json(dbRecords, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}
