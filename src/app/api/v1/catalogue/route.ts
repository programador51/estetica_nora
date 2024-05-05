import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const okResponse = {
      message: "Alta con éxito",
      dto: null,
    };
    return NextResponse.json(okResponse, {
      status: 200,
    });
  } catch (error) {}
}
