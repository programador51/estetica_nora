import { useRef, useState } from "react";
import { ReturnUseFiles, StateUseFiles } from "./types";

const INITIAL_STATE:StateUseFiles = {
  files: [],
};

export default function useFiles(): ReturnUseFiles {
  const [state, setState] = useState(INITIAL_STATE);

  const fileInput = useRef<HTMLInputElement | null>(null);

  const openFileBrowser = () => {
    fileInput.current?.click();
  };

  const appendFiles = (files:FileList|null) => {

    if(files===null) return

    const parsedData = Array.from(files);

    setState(current=>({
      ...current,
      files:[...parsedData,...current.files]
    }))
  }

  const deleteFile = (indexFile:number) => setState(current=>({
    ...current,
    files:current.files.filter((file,i)=>i!==indexFile)
  }))

  return {
    openFileBrowser,
    fileInput,
    ...state,
    appendFiles,
    deleteFile
  };
}
