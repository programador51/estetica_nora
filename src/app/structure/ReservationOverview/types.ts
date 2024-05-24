import { DtoReservationOverview } from "@/app/models/reservations/types";

export interface StateReservation {
  isLoading: boolean;
  reservation: DtoReservationOverview | undefined;
}
