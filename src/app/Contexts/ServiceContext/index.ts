import { ReturnUseService } from "@/app/customHooks/useReservation/types";
import { createContext } from "react";

const ContextService = createContext<ReturnUseService>({
  isLoading: true,
  appendService: () => {},
  deleteService: () => {},
  durationOnMinutes: 0,
  promptCancelation: async () => {},
  services: [],
  total: 0,
  day: new Date(),
  disabledWeekDays: [],
  maxTime: 0,
  minTime: 0,
  schedule: {
    isLoading: false,
    schedules: [],
  },
  setDayReservation: () => {},
  setTimeReservation: () => {},
  tileDisabled: () => false,
  timeReservation: 0,
  customer:undefined,
  setCustomer:()=>{},
  attemptAddReservation:async()=>{},
  isUpdating:false
});

export default ContextService;
