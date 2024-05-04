import { TimeTablesItem } from "@/app/molecule/timetablesItem/types";

export interface StateUseTimeTables {
  page: number;
  isLoading: boolean;
  timetables: TimeTablesItem[];
  days:Date[]
}

export interface ReturnUseTimeTablesItem extends StateUseTimeTables {}


