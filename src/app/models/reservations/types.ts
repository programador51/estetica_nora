export interface DtoReservationPaginated {
  cuenta: number | null;
  total: string;
  nombre: string;
  fechaReservacion: string;
  hasta: string;
  administrador: number;
  estatus: string;
}
