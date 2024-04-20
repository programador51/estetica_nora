import { useRef, useState } from "react";
import { ReturnUseFiles, StateUseFiles } from "./types";
import { promptConfirmation } from "@/app/helpers/alerts";

const INITIAL_STATE: StateUseFiles = {
  files: [],
};

export default function useFiles(): ReturnUseFiles {
  const [state, setState] = useState(INITIAL_STATE);

  const fileInput = useRef<HTMLInputElement | null>(null);

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
      text: "La imagen desaparecera de la galería ilustrativa",
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
