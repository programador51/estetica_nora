import { useState } from "react";
import { StateReservationCard } from "./types";
import { promptConfirmation } from "@/app/helpers/alerts";
import { cancelReservation } from "@/app/helpers/api/v1/reservation";

const INITIAL_STATE: StateReservationCard = {
  isCancelling: false,
};

export default function useReservationCard(id: number) {
  const [state, setState] = useState(INITIAL_STATE);

  const promptCancellation = async () => {
    const { isConfirmed } = await promptConfirmation({
      title: "¿Cancelar cita?",
      text: "¿Estas seguro? Si deseas re-agendar las horas y servicios estan sujeto a disponibilidad",
    });

    if (isConfirmed) {
      setState((current) => ({
        ...current,
        isCancelling: true,
      }));

      const wasCancelated = await cancelReservation(id);

      setState((current) => ({
        ...current,
        isCancelling: false,
      }));
    }
  };

  return {
    ...state,
    promptCancellation
  };
}
