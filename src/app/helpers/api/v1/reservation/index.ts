import { DtoAddReservation } from "@/app/api/v1/reservation/types";
import { promptError } from "@/app/helpers/alerts";
import { CustomError } from "@/app/helpers/errors/types";
import { isOkRes } from "@/app/helpers/fetch";

export async function addReservation(dto: DtoAddReservation) {
  try {
    const res = await fetch(`/api/v1/reservation`, {
      method: "POST",
      body: JSON.stringify(dto),
    });

    if (isOkRes(res)) {
      return true;
    }

    const error: CustomError = await res.json();

    promptError(error);

    return false;
  } catch (error) {
    promptError(error as CustomError);
    return false;
  }
}
