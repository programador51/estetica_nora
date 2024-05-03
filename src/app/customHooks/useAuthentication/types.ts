import { configureItem } from "@/app/molecule/configureitem/types";


export interface StateUseAuthentication {
  page: number;
  isLoading: boolean;
  authentication: configureItem[];
}

export interface ReturnUseConfigureItem extends StateUseAuthentication {}
