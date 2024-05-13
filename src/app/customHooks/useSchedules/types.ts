import { KeysDayName } from "@/app/molecule/ScheduleCard/types";

export interface ScheduleForm {
  dia: KeysDayName;
  desde: number | string;
  hasta: number | string;
}
