import { ReturnUseDayItem } from "@/app/customHooks/useDays/types";
import { createContext } from "react";

export const ContextDays = createContext<ReturnUseDayItem>({
  isLoading: true,
  page: 1,
  days: [],
});

