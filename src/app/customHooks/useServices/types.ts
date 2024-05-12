import { ServicesPaginated } from "@/app/models/services/types";

export interface StateServices {
  isLoading: boolean;
  pages: number;
  page: number;
  services: ServicesPaginated[];
}

export interface ReturnUseServices extends StateServices {}
