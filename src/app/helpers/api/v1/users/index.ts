import { UserOption } from "@/app/molecule/usersSelect/types";
import { isOkRes } from "../../../fetch";
import {
  DtoLoginUser,
  DtoRegisterUser,
} from "@/app/customHooks/useRegisterUser/types";
import { promptError, promptSuccess } from "@/app/helpers/alerts";
import { CustomError } from "@/app/helpers/errors/types";
import { TypeAccount } from "@/app/molecule/typeAccount/types";
import { DtoPromoteUser } from "@/app/api/v1/users/promote/types";

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

/**
 * Login user into system
 * @param dto - Information for login account
 * @returns {Promise<boolean>} True if credentials are correct
 */
export async function loginUser(dto: DtoLoginUser) {
  try {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(dto),
    });

    if (isOkRes(res)) {
      return true;
    }

    const error = await res.json();

    promptError(error);

    return false;
  } catch (error) {
    promptError(error as CustomError);

    return true;
  }
}

export async function closeSessionUser() {
  try {
    const res = await fetch("/api/v1/auth", {
      method: "DELETE",
    });

    if (isOkRes(res)) {
      return true;
    }

    const error = await res.json();

    promptError(error);

    return false;
  } catch (error) {
    promptError(error as CustomError);

    return true;
  }
}

export async function promoteUserAccount(id: number, type: TypeAccount) {
  try {
    const dto: DtoPromoteUser = {
      id: id,
      type,
    };

    const res = await fetch("/api/v1/users/promote", {
      method: "PUT",
      body: JSON.stringify(dto),
    });

    if (isOkRes(res)) {
      promptSuccess({
        title: "Cuenta actualizada",
        text: "El tipo de cuenta fue actualizado con éxito",
      });
      return true;
    }

    const error = await res.json();

    promptError(error);

    return false;
  } catch (error) {
    promptError(error as CustomError);

    return true;
  }
}
