import { useEffect, useState } from "react";
import { StateUseService } from "./types";

const INITIAL_STATE: StateUseService = {
  isLoading: true,
  dto: undefined,
  files: [],
  filesLoadedFromApi: false,
  initialPicturesUrls: [],
};

export default function useService() {
  const [state, setState] = useState(INITIAL_STATE);

  return {
    ...state,
  };
}
