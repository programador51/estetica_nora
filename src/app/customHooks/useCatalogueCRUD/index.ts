import { useEffect, useState } from "react";
import {
  DtoCatalogueAbc,
  ReturnUseCatalogueCRUD,
  StateCatalogueCRUD,
} from "./types";
import { addProduct, updateProduct } from "@/app/helpers/api/v1/catalogue";
import { useRouter } from "next/navigation";
import { downloadAndSaveFiles } from "@/app/helpers/fetch";
import { findDeleteImages } from "@/app/helpers/files";

const INITIAL_STATE: StateCatalogueCRUD = {
  isLoading: false,
  dto: undefined,
  files: [],
  filesLoadedFromApi: false,
  initialPicturesUrls: [],
};

export default function useCatalogueCRUD(
  id: null | number = null
): ReturnUseCatalogueCRUD {
  const [state, setState] = useState({
    ...INITIAL_STATE,
    filesLoadedFromApi: id === null ? true : false,
  });

  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (typeof id !== "number") await attemptAdd();
      else await attemptUpdate();
    })();
  }, [state.dto]);

  const setDto = (dto: DtoCatalogueAbc) =>
    setState((current) => ({
      ...current,
      dto,
    }));

  const setFiles = (files: File[]) =>
    setState((current) => ({
      ...current,
      files,
    }));

  async function attemptAdd() {
    if (state.dto === undefined) return;

    setState((current) => ({
      ...current,
      isLoading: true,
    }));

    const wasAdded = await addProduct(state.dto, state.files);

    setState((current) => ({
      ...current,
      isLoading: false,
    }));

    if (wasAdded) router.push("/app/catalogo");
  }

  async function attemptUpdate() {
    const indexedFilesNames = state.initialPicturesUrls.reduce(
      (indexed, url) => ({
        ...indexed,
        [url.split("/").reverse()[0]]: url,
      }),
      {}
    );

    const currentFileNames = state.files.map((file) => file.name);

    const deletedImages = findDeleteImages(indexedFilesNames, currentFileNames);

    const initialFileName = state.initialPicturesUrls.map(
      (url) => url.split("/").reverse()[0]
    );

    const filesToAdd = state.files.filter(
      (file) => !initialFileName.includes(file.name)
    );

    if (typeof id !== "number" || state.dto === undefined) return;
    setState((current) => ({
      ...current,
      isLoading: true,
    }));

    const wasUpdated = await updateProduct(
      {
        ...state.dto,
        id,
        filesToDelete: deletedImages,
      },
      filesToAdd
    );

    setState((current) => ({
      ...current,
      isLoading: false,
    }));

    if (wasUpdated) router.push("/app/catalogo");
  }

  const setSavedFiles = async (urls: string[]) => {
    const photos = await downloadAndSaveFiles(urls);

    const picsFiltered = photos.filter((photo) => photo !== null) as File[];

    setState((current) => ({
      ...current,
      files: picsFiltered,
      filesLoadedFromApi: true,
      initialPicturesUrls: urls,
    }));
  };

  return {
    ...state,
    setDto,
    setSavedFiles,
    setFiles,
    attemptAdd,
  };
}
