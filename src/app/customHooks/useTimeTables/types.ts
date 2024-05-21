import { ScheduleItem } from "../useSchedules";

export interface StateUseTimeTables {
  isLoading: boolean;
  schedules: ScheduleItem[];
  refetch:boolean;
}

export interface ReturnUseTimeTablesItem extends StateUseTimeTables {
  refetchSchedule:()=>void;
}
