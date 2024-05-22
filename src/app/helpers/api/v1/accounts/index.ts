import { UserOption } from "@/app/molecule/usersSelect/types";
import { isOkRes } from "../../../fetch";
import { DtoUser } from "@/app/models/users/types";

export async function resumeSession():Promise<DtoUser|undefined>{
  try {
    const res = await fetch("/api/v1/auth", {
      method: "GET",
    });

    if(isOkRes(res)){
      const sessionData = await res.json();
      return sessionData;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}

export async function fetchUsers(): Promise<UserOption[]> {
  try {
    const res = await fetch("/api/v1/roles", {
      method: "GET",
    });

    if (isOkRes(res)) {
      const users = await res.json();
      return users;
    }

    return []
  } catch (error) {
    console.log(error)
    return [];
  }
}
