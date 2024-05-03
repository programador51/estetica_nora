import { ServiceOption } from "@/app/molecule/servicesSelect/types";

export interface OverviewCalculation {
  durationOnMinutes: number;
  total: number;
}


export interface  StateUseAccessUserRoles extends OverviewCalculation {
  isLoading: boolean;
  services: ServiceOption[];
}

export interface ReturnUseService extends StateUseAccessUserRoles {
  appendService: (service: ServiceOption) => void;
  promptCancelation: () => Promise<void>;
}

