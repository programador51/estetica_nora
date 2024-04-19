export interface StateUseCatalogue {
  isLoading: boolean;
  page: number;
  pages: number;
  products: ProductI[];
}

export interface ProductI {
  id: number;
  image: string | File | Blob;
  title: string;
}

export interface ReturnUseCatalogue extends StateUseCatalogue {}
