export interface StateUseService {
  isLoading: boolean;
  dto: DtoServiceAbc;
  files: File[];
  filesLoadedFromApi: boolean;
  initialPicturesUrls: string[];
}

export interface ProductI {
  id: number;
  image: string | File | Blob;
  title: string;
}

export type DtoServiceAbc = undefined;

export interface ReturnUseCatalogue extends StateUseService {}
