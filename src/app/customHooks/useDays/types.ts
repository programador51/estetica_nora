import { DayItem } from "@/app/molecule/dayitem/types";

export interface StateUseDays {
  page: number;
  isLoading: boolean;
  days: DayItem[];
  
}

export interface ReturnUseDayItem extends StateUseDays {}
