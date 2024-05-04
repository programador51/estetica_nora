import { ReturnUseConfigureItem } from "@/app/customHooks/useAuthentication/types";
import { createContext } from "react";

export const ContextUser = createContext<ReturnUseConfigureItem>({
  isLoading: true,
  page: 1,
  authentication: [],
});


