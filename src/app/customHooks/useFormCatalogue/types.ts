import { UseFormReturn } from "react-hook-form";

export type FormCatalogueType = "add" | "udpate";

export interface AddProduct {
  precio: number;
  costo: number;
  stockDisponible: number;
  descripcion: string;
  titulo:string;
}

export interface UpdateProduct extends AddProduct {
  id: number;
}

export interface ReturnUseForm {
  form: (UseFormReturn<AddProduct | UpdateProduct, any, undefined>)|undefined;
}
