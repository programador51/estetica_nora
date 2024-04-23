import { isOkRes } from "@/app/helpers/fetch";
import { ServiceOption } from "@/app/molecule/servicesSelect/types";

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
