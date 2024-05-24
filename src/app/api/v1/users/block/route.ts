import { NextResponse } from "next/server";
import { DtoBlockAccount } from "./types";
import users from "@/app/models/users";

export async function PUT(req: Request) {
  try {
    const dto: DtoBlockAccount = await req.json();

    await users.block(dto.id, dto.accountMustBeBlocked);

    const message = dto.accountMustBeBlocked
      ? "Cuenta bloqueada"
      : "Cuenta des-bloqueada";

    return NextResponse.json({
      message,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
