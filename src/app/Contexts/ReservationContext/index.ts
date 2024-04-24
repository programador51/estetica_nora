import { ReturnUseService } from "@/app/customHooks/useReservation/types";
import { createContext } from "react";

const ContextReservation = createContext<ReturnUseService>({
  appendService: () => {},
  durationOnMinutes: 0,
  isLoading: true,
  promptCancelation: async () => {},
  services: [],
  total: 0,
});

export default ContextReservation;
