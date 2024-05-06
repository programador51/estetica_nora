import { useEffect, useState } from "react";
import {
  DtoCatalogueAbc,
  ReturnUseCatalogueCRUD,
  StateCatalogueCRUD,
} from "./types";
import { addProduct } from "@/app/helpers/api/v1/catalogue";

const INITIAL_STATE: StateCatalogueCRUD = {
  isLoading: true,
  dto: undefined,
  files: [],
};

export default function useCatalogueCRUD(
  id: null | number = null
): ReturnUseCatalogueCRUD {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    (async function () {
      if (id === null) await attemptAdd();
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
    const wasAdded = await addProduct(state.dto, state.files);
  }

  return {
    ...state,
    setDto,
    setFiles,
    attemptAdd,
  };
}
