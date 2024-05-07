import { useEffect, useState } from "react";
import {
  DtoCatalogueAbc,
  ReturnUseCatalogueCRUD,
  StateCatalogueCRUD,
} from "./types";
import { addProduct, updateProduct } from "@/app/helpers/api/v1/catalogue";
import { useRouter } from "next/navigation";

const INITIAL_STATE: StateCatalogueCRUD = {
  isLoading: false,
  dto: undefined,
  files: [],
};

export default function useCatalogueCRUD(
  id: null | number = null
): ReturnUseCatalogueCRUD {
  const [state, setState] = useState(INITIAL_STATE);

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
    if (typeof id !== "number" || state.dto === undefined) return;
    setState((current) => ({
      ...current,
      isLoading: true,
    }));

    const wasUpdated = await updateProduct(
      {
        ...state.dto,
        id,
        filesToDelete: [],
      },
      state.files
    );

    setState((current) => ({
      ...current,
      isLoading: false,
    }));
  }

  return {
    ...state,
    setDto,
    setFiles,
    attemptAdd,
  };
}
