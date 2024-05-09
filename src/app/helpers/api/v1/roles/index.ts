import { UserOption } from "@/app/molecule/usersSelect/types";
import { isOkRes } from "../../../fetch";

export async function fetchRoles(): Promise<UserOption[]> {
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
