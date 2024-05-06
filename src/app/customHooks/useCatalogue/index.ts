import { useEffect, useState } from "react";
import { ReturnUseCatalogue, StateUseCatalogue } from "./types";
import { getProducts } from "@/app/helpers/api/v1/catalogue";

const INITIAL_STATE: StateUseCatalogue = {
  isLoading: true,
  page: 1,
  pages: 1,
  products: [],
};

export default function useCatalogue(): ReturnUseCatalogue {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    (async function () {
      const { page, pages, records, noRecordsFound } = await getProducts(
        state.page
      );

      setState((current) => ({
        ...current,
        isLoading: false,
        page,
        pages,
        products: records,
      }));
    })();
  }, [state.page]);

  return {
    ...state,
  };
}
