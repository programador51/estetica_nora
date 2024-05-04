import { UserOption } from "@/app/molecule/UserAccess/types";
import { isOkRes } from "../../../fetch";

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
