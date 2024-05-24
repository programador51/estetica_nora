export type ReservationStatus = 'cancelado' | 'terminado' | 'reservado';

export interface DtoReservationPaginated {
  cuenta: number | null;
  total: string;
  nombre: string;
  fechaReservacion: string;
  hasta: string;
  administrador: number;
  estatus: ReservationStatus;
  id:number;
  fotoPerfil:string|null;
}

export interface DtoReservationItem {
  id:                  number;
  cuenta:              number;
  total:               string;
  nombre:              string;
  fechaReservacion:    Date;
  hasta:               Date;
  estatus:             string;
  administrador:       number;
  terminacionServicio: null;
}
