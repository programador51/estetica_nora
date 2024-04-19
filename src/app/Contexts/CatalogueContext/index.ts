import { ReturnUseCatalogue } from "@/app/customHooks/useCatalogue/types";
import { createContext } from "react";

const ContextCatalogue = createContext<ReturnUseCatalogue>({
  isLoading: true,
  page: 1,
  pages: 1,
  products: [],
});

export default ContextCatalogue;