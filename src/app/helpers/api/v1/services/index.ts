import {
  AddService,
  DtoAddService,
} from "@/app/customHooks/useFormServices/types";
import { promptError, promptSuccess } from "@/app/helpers/alerts";
import { CustomError } from "@/app/helpers/errors/types";
import { isOkRes } from "@/app/helpers/fetch";
import { PaginatedRecords } from "@/app/helpers/fetch/types";
import { ServiceOption } from "@/app/molecule/servicesSelect/types";
import { ResDtoPaginated } from "../types";
import { ServicesPaginated } from "@/app/models/services/types";

export async function fetchServices(): Promise<ServiceOption[]> {
  try {
    const res = await fetch("/api/v1/services", {
      method: "GET",
    });

    if (isOkRes(res)) {
      const services = await res.json();
      return services;
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchServicesPaginated(
  page: number
): Promise<ResDtoPaginated<ServicesPaginated>> {
  const ERROR_DATA: ResDtoPaginated<ServicesPaginated> = {
    page: 1,
    pages: 1,
    records: [],
    noRecordsFound: 0,
  };

  try {
    const res = await fetch(`/api/v1/services/page/${page}`, {
      method: "GET",
    });

    if (isOkRes(res)) {
      const services: ResDtoPaginated<ServicesPaginated> = await res.json();
      return services;
    }

    return ERROR_DATA;
  } catch (error) {
    return ERROR_DATA;
  }
}

export async function sendDtoToApi(dto: DtoAddService, files: File[] = []) {
  try {
    const formData = new FormData();

    formData.append("dto", `${JSON.stringify(dto)}`);

    files.forEach((file, i) => formData.append(`file_${i + 1}`, file));

    const res = await fetch("/api/v1/services", {
      method: "POST",
      body: formData,
    });

    if (isOkRes(res)) {
      const data = await res.json();

      promptSuccess({
        title: "Alta exitosa",
        text: data.message,
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
