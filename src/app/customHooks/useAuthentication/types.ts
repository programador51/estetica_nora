import { configureItem } from "@/app/molecule/configureitem/types";


export interface StateUseAuthentication {
  page: number;
  isLoading: boolean;
  authentication: configureItem[];
  refetch:boolean;
}

export interface ReturnUseConfigureItem extends StateUseAuthentication {
  refetchData:()=>void;
}
