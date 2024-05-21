import { UserOption } from "@/app/molecule/usersSelect/types";
import { NextRequest, NextResponse } from "next/server";
import email from "@/app/models/email";
import { readFormData } from "@/app/helpers/fetch";
import { DtoRegisterUser } from "@/app/customHooks/useRegisterUser/types";

interface PostUser {
  [key: string | "dto"]: File | string;
}

export async function GET(req: NextRequest) {
  const dbRecords: UserOption[] = [
    {
      name: "John Doe",
      id: 1,
      profilePicture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC-buhde5C1FxyNtkRvkUTCe6gq73eLIv_JOycF3WMvg&s",
    },
    {
      name: "Jane Smith",
      id: 2,
      profilePicture:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
    {
      name: "Michael Johnson",
      id: 3,
      profilePicture: null,
    },
    {
      name: "Emily Brown",
      id: 4,
      profilePicture:
        "https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
    },
    {
      name: "Christopher Davis",
      id: 5,
      profilePicture: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4xexRkB2oRGhkw70cmFbw1HeAwG3oc36f1dDwwKgjNg&s`,
    },
    {
      name: "Amanda Wilson",
      id: 6,
      profilePicture:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      name: "James Taylor",
      id: 7,
      profilePicture:
        "https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg",
    },
    {
      name: "Sarah Martinez",
      id: 8,
      profilePicture: null,
    },
    {
      name: "David Anderson",
      id: 9,
      profilePicture: null,
    },
    {
      name: "Emma Thomas",
      id: 10,
      profilePicture: "https://example.com/emma-thomas.jpg",
    },
  ];

  try {
    return NextResponse.json(dbRecords, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const formData = await readFormData<PostUser>(req);

    const dto: DtoRegisterUser =
      typeof formData.dto === "string" ? JSON.parse(formData?.dto) : {};

    email.sendCreationAccountEmail(dto.correo, dto.primerNombre);

    return NextResponse.json(
      {
        message: "Cuenta creada con éxito",
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
