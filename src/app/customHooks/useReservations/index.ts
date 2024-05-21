import { useEffect, useState } from "react";
import { ReturnUseReservationItem, StateUseReservations } from "./types";
import { getReservationsPaginated } from "@/app/helpers/api/v1/reservation";
import { ReservationItem } from "@/app/molecule/reservationItem/types";

const INITIAL_STATE: StateUseReservations = {
  page: 1,
  isLoading: true,
  reservations: [],
  pages:0,
  refetch:false
};

export default function useReservations(): ReturnUseReservationItem {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    (async function () {
      setState((current) => ({
        ...current,
        isLoading: true,
      }));

      const reservations = await getReservationsPaginated(state.page);

      const itemsParsed: ReservationItem[] = reservations.records.map(
        (item) => ({
          name: item.nombre,
          reservation: new Date(item.fechaReservacion),
          urlPicture: null,
          id:item.id,
          estatus:item.estatus
        })
      );

      setState((current) => ({
        ...current,
        isLoading: false,
        reservations: itemsParsed,
        pages:reservations.pages
      }));
    })();
  }, [state.page,state.refetch]);

  const refetchServices = () => setState(current=>({
    ...current,
    page:1,
    refetch:!current.refetch
  }));

  return {
    ...state,
    refetchServices
  };
}
