import { ReturnUseReservationItem } from "@/app/customHooks/useReservations/types";
import { createContext } from "react";

export const ContextReservations = createContext<ReturnUseReservationItem>({
  isLoading: true,
  page: 1,
  reservations: [],
  pages:0,
  refetchServices:()=>{},
  refetch:false
});
