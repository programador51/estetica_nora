import { fetchServicesPaginated } from "@/app/helpers/api/v1/services";
import { useEffect, useState } from "react";
import { StateServices } from "./types";

const INITIAL_STATE: StateServices = {
  isLoading: true,
  pages: 1,
  page: 1,
  services: [],
};

export default function useServices() {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    (async function () {
      setState((current) => ({
        ...current,
        isLoading: true,
        services: [],
      }));

      const dto = await fetchServicesPaginated(state.page);

      setState((current) => ({
        ...current,
        isLoading: false,
        services: dto.records,
        page: dto.page,
        pages: dto.pages,
      }));
    })();
  }, [state.page]);

  return {
    ...state,
  };
}
