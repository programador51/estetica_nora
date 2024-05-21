import { ReservationItem } from "@/app/molecule/reservationItem/types";

export interface StateUseReservations {
  page: number;
  isLoading: boolean;
  reservations: ReservationItem[];
  pages: number;
  refetch: boolean;
}

export interface ReturnUseReservationItem extends StateUseReservations {
  refetchServices: () => void;
}
