import users from "@/app/models/users";
import { NextRequest, NextResponse } from "next/server";
import { DtoPromoteUser } from "./types";

export async function PUT(req: NextRequest) {
  try {
    const dto: DtoPromoteUser = await req.json();

    await users.promote(dto.id, dto.type);

    return NextResponse.json(
      {
        message: "Configuración de cuenta aplicada",
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
