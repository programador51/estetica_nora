import { UserOption } from "@/app/molecule/UserAccess/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const dbRecords: UserOption[] = [
    {
      rol: "Administrador(a)",
      id: 1,
      profilePicture:
        "https://c1.klipartz.com/pngpicture/170/1020/sticker-png-games-icon-system-administrator-icon-design-user-data-database-administrator-symbol-blackandwhite.png",
    },
    {
      rol: "Usuario",
      id: 2,
      profilePicture:
        "https://icon-icons.com/icons2/827/PNG/512/user_icon-icons.com_66546.png",
    },
    
  ];

  try {
    return NextResponse.json(dbRecords,{
      status:200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}
