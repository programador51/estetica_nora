import { ServiceOption } from "@/app/molecule/servicesSelect/types";

export interface OverviewCalculation {
  durationOnMinutes: number;
  total: number;
}


export interface StateUseTimeTable extends OverviewCalculation {
  isLoading: boolean;
  services: ServiceOption[];
}

export interface ReturnUseService extends StateUseTimeTable {
  appendService: (service: ServiceOption) => void;
  promptCancelation: () => Promise<void>;
}

