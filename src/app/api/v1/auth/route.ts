import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("nora_access")?.value || "ND";
    const refreshToken = req.cookies.get("nora_refresh")?.value || "ND";

    const account = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN || "ND"
    );

    return NextResponse.json(account, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const res = NextResponse.json({
      message: "Sesión cerrada",
    });

    res.cookies.delete("nora_access");
    res.cookies.delete("nora_refresh");

    return res;
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
