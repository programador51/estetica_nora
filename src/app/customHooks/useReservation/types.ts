import { ServiceOption } from "@/app/molecule/servicesSelect/types";
import { ReturnUseTimeTablesItem } from "../useTimeTables/types";

export interface OverviewCalculation {
  durationOnMinutes: number;
  total: number;
}

export interface StateUseReservation extends OverviewCalculation {
  isLoading: boolean;
  services: ServiceOption[];
  day:Date;
  disabledWeekDays:number[];
}

export interface ReturnUseService extends StateUseReservation {
  appendService: (service: ServiceOption) => void;
  promptCancelation: () => Promise<void>;
  schedule:ReturnUseTimeTablesItem;
  deleteService: (index: number) => void;
  setDayReservation:(day:Date)=>void;
  tileDisabled:({ date, view }: { date: Date; view: string })=>boolean;
}
