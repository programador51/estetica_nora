import { MutableRefObject } from "react";

export interface StateUseFiles {
    files:File[];
}

export interface ReturnUseFiles extends StateUseFiles {
  openFileBrowser: () => void;
  fileInput: MutableRefObject<HTMLInputElement | null>;
  appendFiles:(files:FileList|null)=>void;
  deleteFile:(indexFile:number)=>void;
}

export type OnChangeFilesCallback = (files:File[]) => void;