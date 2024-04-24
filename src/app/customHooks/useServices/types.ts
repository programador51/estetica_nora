import { ServiceOption } from "@/app/molecule/servicesSelect/types";

export interface StateServices {
  isLoading: boolean;
  pages: number;
  page: number;
  services: ServiceOption[];
}

export interface ReturnUseServices extends StateServices{

}