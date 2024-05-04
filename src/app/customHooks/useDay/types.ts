import { ServiceOption } from "@/app/molecule/servicesSelect/types";

export interface OverviewCalculation {
  durationOnMinutes: number;
  total: number;
}


export interface StateUseDay extends OverviewCalculation {
  isLoading: boolean;
  services: ServiceOption[];
}

export interface ReturnUseService extends StateUseDay {
  appendService: (service: ServiceOption) => void;
  promptCancelation: () => Promise<void>;
}

