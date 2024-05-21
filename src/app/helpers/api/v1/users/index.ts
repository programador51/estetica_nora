import { UserOption } from "@/app/molecule/usersSelect/types";
import { isOkRes } from "../../../fetch";
import { DtoRegisterUser } from "@/app/customHooks/useRegisterUser/types";
import { promptError } from "@/app/helpers/alerts";
import { CustomError } from "@/app/helpers/errors/types";

export async function fetchUsers(): Promise<UserOption[]> {
  try {
    const res = await fetch("/api/v1/users", {
      method: "GET",
    });

    if (isOkRes(res)) {
      const users = await res.json();
      return users;
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addUser(
  dto: DtoRegisterUser,
  profilePicture: File | null = null
): Promise<boolean> {
  try {
    const formData = new FormData();

    formData.append("dto", JSON.stringify(dto));

    if (profilePicture !== null) formData.append("file_1", profilePicture);

    const res = await fetch("/api/v1/users", {
      method: "POST",
      body: formData,
    });

    if (isOkRes(res)) return true;

    const error: CustomError = await res.json();

    promptError(error);

    return false;
  } catch (error) {
    promptError(error as CustomError);
    return false;
  }
}
