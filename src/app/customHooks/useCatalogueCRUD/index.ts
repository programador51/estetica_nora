import { useState } from "react";
import {
  DtoCatalogueAbc,
  ReturnUseCatalogueCRUD,
  StateCatalogueCRUD,
} from "./types";

const INITIAL_STATE: StateCatalogueCRUD = {
  isLoading: true,
  dto: undefined,
  files: [],
};

export default function useCatalogueCRUD(id?: number): ReturnUseCatalogueCRUD {
  const [state, setState] = useState(INITIAL_STATE);

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

  return {
    ...state,
    setDto,
    setFiles
  };
}
