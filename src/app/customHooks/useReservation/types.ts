import { ServiceOption } from "@/app/molecule/servicesSelect/types";
import { ReturnUseTimeTablesItem } from "../useTimeTables/types";
import { UserOptionsSelect } from "@/app/molecule/usersSelect/types";

export interface OverviewCalculation {
  durationOnMinutes: number;
  total: number;
}

export type TimeReservation = number | null | undefined;

export interface StateUseReservation extends OverviewCalculation {
  isLoading: boolean;
  services: ServiceOption[];
  day: Date;
  disabledWeekDays: number[];
  minTime: number;
  timeReservation: TimeReservation;
  maxTime: number;
  customer: UserOptionsSelect | undefined;
  isUpdating:boolean;
}

export interface ReturnUseService extends StateUseReservation {
  appendService: (service: ServiceOption) => void;
  promptCancelation: () => Promise<void>;
  schedule: ReturnUseTimeTablesItem;
  deleteService: (index: number) => void;
  setDayReservation: (day: Date) => void;
  tileDisabled: ({ date, view }: { date: Date; view: string }) => boolean;
  setTimeReservation: (time: TimeReservation) => void;
  setCustomer: (customer: UserOptionsSelect) => void;
  attemptAddReservation: () => Promise<void>;
}
