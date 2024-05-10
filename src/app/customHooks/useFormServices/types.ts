import { UseFormReturn } from "react-hook-form";

export interface AddService {
  titulo: string;
  costo: number;
  precio: number;
  descripcion: string;
  duracion: number;
  tolerancia: number;
}

export interface ReturnUseFormServices{
  form: (UseFormReturn<AddService, any, undefined>)|undefined;
}
