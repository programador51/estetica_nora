import { ReturnUseService } from "@/app/customHooks/useReservation/types";
import { createContext } from "react";

const ContextReservation = createContext<ReturnUseService>({
  appendService: () => {},
  durationOnMinutes: 0,
  isLoading: true,
  promptCancelation: async () => {},
  services: [],
  total: 0,
  deleteService: () => {},
  day: new Date(),
  disabledWeekDays: [],
  maxTime: 0,
  minTime: 0,
  schedule: {
    isLoading: true,
    schedules: [],
  },
  setDayReservation: () => {},
  setTimeReservation: () => {},
  tileDisabled: () => false,
  timeReservation: 0,
  customer:undefined,
  setCustomer:()=>{},
  attemptAddReservation:async()=>{}
});

export default ContextReservation;
