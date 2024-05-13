import { promptError, promptSuccess } from "@/app/helpers/alerts";
import { CustomError } from "@/app/helpers/errors/types";
import { isOkRes } from "@/app/helpers/fetch";
import {
  DtoAddScheduleItem,
  DtoScheduleItem,
  ReqDtoAddSchedule,
} from "@/app/models/schedule/types";

/**
 * Get the schedule of the system
 * @returns {Promise<DtoScheduleItem[]>}
 */
export async function getSchedule() {
  try {
    const res = await fetch("/api/v1/schedule", {
      method: "GET",
    });

    if (isOkRes(res)) {
      const schedules: DtoScheduleItem[] = await res.json();
      return schedules;
    }

    const error: CustomError = await res.json();

    promptError(error);
    return [];
  } catch (error) {
    promptError(error as CustomError);
    return [];
  }
}

export async function attemptAddSchedule(schedules: DtoAddScheduleItem[]) {
  try {
    const body: ReqDtoAddSchedule = {
      schedules: schedules,
    };

    const res = await fetch("/api/v1/schedule", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (isOkRes(res)) {
      promptSuccess({
        title: "Horario agregado",
        text: "Alta de horario con éxito",
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
