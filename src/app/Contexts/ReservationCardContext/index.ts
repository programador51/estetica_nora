import { ReturnReservationCard } from "@/app/customHooks/useReservationCard/types";
import { ReservationItem } from "@/app/molecule/reservationItem/types";
import { createContext } from "react";

interface ContextReservationCard extends ReservationItem , ReturnReservationCard {}

const ContextReservationCard = createContext<ContextReservationCard>({
  id: 0,
  name: "",
  estatus: "reservado",
  urlPicture: "",
  onCancelated: () => {},
  reservation: new Date(),
  isCancelling:false,
  promptCancellation:async()=>{}
});

export default ContextReservationCard;
