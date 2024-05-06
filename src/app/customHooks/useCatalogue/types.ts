export interface StateUseCatalogue {
  isLoading: boolean;
  page: number;
  pages: number;
  products: ProductI[];
}

export interface ProductI {
  id: number;
  descripcion: string;
  venta: number | string;
  costo: number | string;
  stockDisponible: number;
  imagen: string[];
  titulo: string;
}

export interface ReturnUseCatalogue extends StateUseCatalogue {}
