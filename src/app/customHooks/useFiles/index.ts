import { useEffect, useRef, useState } from "react";
import { OnChangeFilesCallback, ReturnUseFiles, StateUseFiles } from "./types";
import { promptConfirmation } from "@/app/helpers/alerts";

const INITIAL_STATE: StateUseFiles = {
  files: [],
};

export default function useFiles(
  onChange: OnChangeFilesCallback,
  defaultFiles: File[] = []
): ReturnUseFiles {
  const [state, setState] = useState({
    ...INITIAL_STATE,

    files: defaultFiles,
  });

  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    onChange(state.files);
  }, [state.files]);

  const openFileBrowser = () => {
    fileInput.current?.click();
  };

  const appendFiles = (files: FileList | null) => {
    if (files === null) return;

    const parsedData = Array.from(files);

    setState((current) => ({
      ...current,
      files: [...parsedData, ...current.files],
    }));
  };

  const deleteFile = async (indexFile: number) => {
    const { isConfirmed } = await promptConfirmation({
      title: "¿Borrar imagen?",
      text: "Una vez aplicado el cambio no se puede recuperar la imagen",
      icon: "question",
    });

    if (isConfirmed) {
      setState((current) => ({
        ...current,
        files: current.files.filter((file, i) => i !== indexFile),
      }));
    }
  };

  return {
    openFileBrowser,
    fileInput,
    ...state,
    appendFiles,
    deleteFile,
  };
}
