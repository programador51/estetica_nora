import { UserOption } from "@/app/molecule/usersSelect/types";
import { NextRequest, NextResponse } from "next/server";
import email from "@/app/models/email";
import { readFormData } from "@/app/helpers/fetch";
import { DtoRegisterUser } from "@/app/customHooks/useRegisterUser/types";
import user from "@/app/models/users";
import { model as blob, uploadToBlobStorage } from "@/app/models/gallery";
import { retrieveFilesFromReq } from "@/app/helpers/api/v1/files";
import { Data } from "@/app/models/gallery/types";
import jwt from "jsonwebtoken";

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
    // Retrieve data from http request
    const formData = await readFormData<PostUser>(req);

    const dto: DtoRegisterUser =
      typeof formData.dto === "string" ? JSON.parse(formData?.dto) : {};

    // Read profile picture and upload
    const files = retrieveFilesFromReq(formData);

    let resApiBlob: Data | null = null;

    if (files.length > 0) {
      resApiBlob = await uploadToBlobStorage(files[0]);
    }

    const url = resApiBlob !== null ? resApiBlob.medium.url : null;

    // Create account with information
    let accountCreated = await user.create(dto, url);

    // Delete password from response object
    let unrefAccounted = { ...accountCreated };

    delete unrefAccounted.contrasena_hash;
    delete unrefAccounted.contrasena_hash_temporal;

    // Send email confirmation account creation
    email.sendCreationAccountEmail(dto.correo, dto.primerNombre);

    // Sign tokens for auth
    const accessToken = jwt.sign(
      unrefAccounted,
      process.env.JWT_ACCESS_TOKEN || "ND"
    );
    const refreshToken = jwt.sign(
      unrefAccounted,
      process.env.JWT_REFRESH_TOKEN || "ND",
      {
        expiresIn: "1h",
      }
    );

    const res = NextResponse.json({
      message: "Cuenta creada con éxito",
      dto: unrefAccounted,
      accessToken,
      refreshToken,
    });

    res.cookies.set({
      name: "nora_access",
      value: accessToken,
      httpOnly: true,
      sameSite: "strict",
    });

    res.cookies.set({
      name: "nora_refresh",
      value: refreshToken,
      httpOnly: true,
      sameSite: "strict",
    });

    return res;
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
