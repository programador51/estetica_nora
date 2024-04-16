import { ReservationItem } from "@/app/molecule/reservationItem/types";

export interface StateUseReservations {
  page: number;
  isLoading: boolean;
  reservations: ReservationItem[];
}

export interface ReturnUseReservationItem extends StateUseReservations {}
