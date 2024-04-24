import { ServiceOption } from "@/app/molecule/servicesSelect/types";

export interface OverviewCalculation {
  durationOnMinutes: number;
  total: number;
}

export interface StateUseReservation extends OverviewCalculation {
  isLoading: boolean;
  services: ServiceOption[];
}

export interface ReturnUseService extends StateUseReservation {
  appendService: (service: ServiceOption) => void;
  promptCancelation: () => Promise<void>;
  deleteService: (index: number) => void;
}
