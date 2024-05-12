import { AddService } from "../useFormServices/types";

export interface StateUseService {
  isLoading: boolean;
  dto: DtoServiceAbc;
  files: File[];
  filesLoadedFromApi: boolean;
  initialPicturesUrls: string[];
  isUpdating:boolean; 
}

export interface ProductI {
  id: number;
  image: string | File | Blob;
  title: string;
}

export type DtoServiceAbc = undefined | AddService;

export interface ReturnUseCatalogue extends StateUseService {}
