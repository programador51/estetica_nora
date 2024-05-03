import { ReturnUseconfigureItem } from "@/app/customHooks/useAuthentication/types";
import { createContext } from "react";

export const ContextUser = createContext<ReturnUseconfigureItem>({
  isLoading: true,
  page: 1,
  authentication: [],
});


