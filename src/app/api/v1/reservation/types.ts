interface ServiceReservation {
  id: number;
  price: number;
  cost: number;
}

export interface DtoAddReservation {
  day: string;
  timeStart: string;
  customer: number|null;
  services: ServiceReservation[];
  customerName:string;
}
