import { ReservationItem } from "@/app/molecule/reservationItem/types";

export interface StateUseReservations {
  page: number;
  isLoading: boolean;
  reservations: ReservationItem[];
  pages:number;
}

export interface ReturnUseReservationItem extends StateUseReservations {}
