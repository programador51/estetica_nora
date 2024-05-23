import { UserOption } from "@/app/molecule/usersSelect/types";
import { NextRequest, NextResponse } from "next/server";
import email from "@/app/models/email";
import { readFormData } from "@/app/helpers/fetch";
import { DtoRegisterUser } from "@/app/customHooks/useRegisterUser/types";
import user from "@/app/models/users";
import { uploadToBlobStorage } from "@/app/models/gallery";
import { retrieveFilesFromReq } from "@/app/helpers/api/v1/files";
import { Data } from "@/app/models/gallery/types";
import auth from "@/app/models/auth";
import { parseNameOfUser } from "@/app/helpers/api/v1/accounts";

interface PostUser {
  [key: string | "dto"]: File | string;
}

export async function GET(req: NextRequest) {
  try {
    const listUsers = await user.getAll();

    const dtoList: UserOption[] = listUsers.map((item) => ({
      id: item.id,
      name: parseNameOfUser(item.primerNombre,item.segundoNombre,item.apellidoPaterno,item.apellidoMaterno),
      profilePicture: item.fotoPerfil,
      type:item.tipoDeCuenta
    }));

    return NextResponse.json(dtoList, {
      status: 200,
    });
  } catch (error) {
    console.log(error)

    return NextResponse.json([], {
      status: 500,
    });
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

    const url = resApiBlob !== null ? resApiBlob.display_url : null;

    // Create account with information
    let accountCreated = await user.create(dto, url);

    // Send email confirmation account creation
    email.sendCreationAccountEmail(dto.correo, dto.primerNombre);

    // Sign tokens for auth
    const [accessToken, refreshToken] = auth.generateTokens(accountCreated);

    const res = NextResponse.json({
      message: "Cuenta creada con éxito",
      dto: accountCreated,
      accessToken,
      refreshToken,
    });

    auth.setCookiesTokens(res,accessToken,refreshToken)

    return res;
  } catch (error) {   
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
