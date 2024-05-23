import { NextRequest, NextResponse } from "next/server";
import users from "@/app/models/users";
import { DtoLoginUser } from "@/app/customHooks/useRegisterUser/types";
import bcrypt from "bcrypt";
import { generateError } from "@/app/helpers/errors";
import auth from "@/app/models/auth";

export async function POST(req: NextRequest) {
  try {
    const dto: DtoLoginUser = await req.json();

    const userFound = await users.get(dto.tipoDeCuenta, 0, dto.correo);

    if (userFound === null || userFound === undefined)
      throw generateError("400", "Contraseña o usuario incorrectos", "ND");

    const isValidPassword = bcrypt.compareSync(
      dto.contrasena,
      userFound.contrasena_hash || ""
    );

    if (!isValidPassword)
      throw generateError("400", "Contraseña o usuario incorrectos", "ND");

    const [accessToken, refreshToken] = auth.generateTokens(userFound);

    const res = NextResponse.json({
      dto: userFound,
      message: "Login éxitoso",
    });

    auth.setCookiesTokens(res, accessToken, refreshToken);

    return res;
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
