import { DtoAddProduct, DtoUpdateProduct } from "../useFormCatalogue/types";

export type DtoCatalogueAbc = undefined | DtoUpdateProduct | DtoAddProduct;

export interface StateCatalogueCRUD {
  isLoading: boolean;
  dto: DtoCatalogueAbc;
  files: File[];
  filesLoadedFromApi:boolean;
  initialPicturesUrls:string[]
}

export interface ReturnUseCatalogueCRUD extends StateCatalogueCRUD {
  setDto: (dto: DtoCatalogueAbc) => void;
  setFiles: (files: File[]) => void;
  attemptAdd: () => Promise<void>;
  setSavedFiles: (urls: string[]) => Promise<void>;
}
