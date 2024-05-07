import { UseFormReturn } from "react-hook-form";

export interface StateFormCatalogue {
  isLoading: boolean;
}

export type FormCatalogueType = "add" | "udpate";

export interface AddProduct {
  precio: number;
  costo: number;
  stockDisponible: number;
  descripcion: string;
  titulo: string;
}

export interface DtoAddProduct extends AddProduct {}

export interface UpdateProduct extends AddProduct {
  id: number;
  filesToDelete: string[];
}

export interface DtoUpdateProduct extends UpdateProduct {}

export interface ReturnUseForm extends StateFormCatalogue {
  form: UseFormReturn<AddProduct | UpdateProduct, any, undefined> | undefined;
}

export interface DtoGetProducts {
  page: number;
}
