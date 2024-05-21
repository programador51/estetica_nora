import { ReturnUseTimeTablesItem } from "@/app/customHooks/useTimeTables/types";
import { createContext } from "react";

export const ContextTimeTables = createContext<ReturnUseTimeTablesItem>({
  isLoading: true,
  schedules: [],
  refetch:false,
  refetchSchedule:()=>{}
  
});

