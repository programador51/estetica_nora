import { ScheduleItem } from "../useSchedules";

export interface StateUseTimeTables {
  isLoading: boolean;
  schedules: ScheduleItem[];
}

export interface ReturnUseTimeTablesItem extends StateUseTimeTables {}
