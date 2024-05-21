import { ReservationStatus } from "@/app/models/reservations/types";

export interface ReservationItem {
  urlPicture: string | null;
  reservation: Date;
  name: string;
  id:number;
  onCancelated?:()=>void;
  estatus:ReservationStatus
}
