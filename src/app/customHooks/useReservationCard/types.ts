export interface StateReservationCard {
  isCancelling: boolean;
}

export interface ReturnReservationCard extends StateReservationCard {
  promptCancellation: () => Promise<void>;
}
