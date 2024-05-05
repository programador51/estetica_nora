import { DtoAddProduct, DtoUpdateProduct } from "../useFormCatalogue/types";

export type DtoCatalogueAbc = undefined | DtoUpdateProduct | DtoAddProduct;

export interface StateCatalogueCRUD {
  isLoading: boolean;
  dto: DtoCatalogueAbc;
  files: File[];
}

export interface ReturnUseCatalogueCRUD extends StateCatalogueCRUD {
  setDto: (dto: DtoCatalogueAbc) => void;
  setFiles: (files: File[]) => void;
}
