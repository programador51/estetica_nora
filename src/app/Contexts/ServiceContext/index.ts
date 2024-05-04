import { ReturnUseService } from "@/app/customHooks/useReservation/types";
import { createContext } from "react";

const ContextService = createContext<ReturnUseService>({
  isLoading: true,
  appendService:()=>{},
  deleteService:()=>{},
  durationOnMinutes:0,
  promptCancelation:async()=>{},
  services:[],
  total:0
});

export default ContextService;