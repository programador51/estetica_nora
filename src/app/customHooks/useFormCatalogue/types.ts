export type FormCatalogueType = "add" | "udpate";

export interface AddProduct {
  nombre: string;
  precio: number;
  costo: number;
  stockDisponible: number;
  descripcion: string;
}

export interface UpdateProduct extends AddProduct {
  id: number;
}
