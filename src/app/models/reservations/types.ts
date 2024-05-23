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
