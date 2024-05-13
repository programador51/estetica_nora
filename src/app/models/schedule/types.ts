import { KeysDayName } from "@/app/molecule/ScheduleCard/types";

export interface DtoScheduleItem {
  id: number;
  desde: number;
  hasta: number;
  dia: KeysDayName;
}

export interface DtoAddScheduleItem {
  desde: number;
  hasta: number;
  dia: KeysDayName | string;
}

export interface ReqDtoAddSchedule {
  schedules: DtoAddScheduleItem[];
}
