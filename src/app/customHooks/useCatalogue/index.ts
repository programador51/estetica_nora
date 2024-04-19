import { useEffect, useState } from "react";
import { ReturnUseCatalogue, StateUseCatalogue } from "./types";

const INITIAL_STATE: StateUseCatalogue = {
  isLoading: true,
  page: 1,
  pages: 1,
  products: [],
};

export default function useCatalogue(): ReturnUseCatalogue {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    setState((current) => ({
      ...current,
      isLoading:false,
      products: [
        {
          id: 1,
          image:
            "https://ibarramayoreo.com/images/IMAGENES/49827/02.jpg/A05",
          title: "Ratrillo Gillette 2x1",
        },
        {
            id:2,
            image:"https://m.media-amazon.com/images/I/51qHyIgmwQL._AC_UF1000,1000_QL80_.jpg",
            title:"Espuma afeitar Gillette"
        }
      ],
    }));
  }, [state.page]);

  return {
    ...state,
  };
}
