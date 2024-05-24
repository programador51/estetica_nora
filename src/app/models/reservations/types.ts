import { ServiceOption } from "@/app/molecule/servicesSelect/types";
import { DtoUser } from "../users/types";

export type ReservationStatus = "cancelado" | "terminado" | "reservado";

export interface DtoReservationPaginated {
  cuenta: number | null;
  total: string;
  nombre: string;
  fechaReservacion: string;
  hasta: string;
  administrador: number;
  estatus: ReservationStatus;
  id: number;
  fotoPerfil: string | null;
}

export interface DtoReservationItem {
  id: number;
  cuenta: number;
  total: string;
  nombre: string;
  fechaReservacion: Date;
  hasta: Date;
  estatus: string;
  administrador: number;
  terminacionServicio: null;
}

export interface QueryServiceData {
  id: number;
  servicio: number;
  reservacion: number;
  venta: string;
  costo: string;
}

export interface DtoReservationOverview {
  reservation: DtoReservationItem;
  customer: DtoUser;
  employer: DtoUser;
  services: ServiceOption[];
}
