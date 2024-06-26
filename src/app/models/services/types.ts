import { ServiceOption } from "@/app/molecule/servicesSelect/types";

export interface ServicesPaginated {
  id: number;
  descripcion: string;
  venta: number;
  costo: number;
  suceptibleEnCambios: boolean;
  titulo: string;
  imagen: string[];
  toleranciaEnMinutos: number;
  duracionEnMinutos: number;
}

export interface ServicesIndexed {
  [key: string]: ServiceOption;
}
