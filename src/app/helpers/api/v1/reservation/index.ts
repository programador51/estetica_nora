import { DtoAddReservation } from "@/app/api/v1/reservation/types";
import {
  promptConfirmation,
  promptError,
  promptSuccess,
} from "@/app/helpers/alerts";
import { CustomError } from "@/app/helpers/errors/types";
import { isOkRes } from "@/app/helpers/fetch";
import { DtoReservationPaginated } from "@/app/models/reservations/types";
import { ResDtoPaginated } from "../types";

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

export async function getReservationsPaginated(
  page: number
): Promise<ResDtoPaginated<DtoReservationPaginated>> {
  const error_data: ResDtoPaginated<DtoReservationPaginated> = {
    page: 1,
    pages: 1,
    records: [],
    noRecordsFound: 0,
  };

  try {
    const res = await fetch(`/api/v1/reservation/page/${page}`, {
      method: "GET",
    });

    if (isOkRes(res)) {
      const data: ResDtoPaginated<DtoReservationPaginated> = await res.json();
      return data;
    }

    const error:CustomError = await res.json();

    promptError(error)

    return error_data;
  } catch (error) {
    promptError(error as CustomError)
    return error_data;
  }
}

export async function cancelReservation(idReservation: number) {
  try {
    const res = await fetch(`/api/v1/reservation/cancel/${idReservation}`, {
      method: "DELETE",
    });

    if (isOkRes(res)) {
      promptSuccess({
        title: "Reservación cancelada",
        text: "Reservación cancelada con éxito 😁",
      });
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
