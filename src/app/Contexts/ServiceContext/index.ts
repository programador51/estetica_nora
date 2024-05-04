import { ReturnUseService } from "@/app/customHooks/useService/types";
import { createContext } from "react";

const ContextService = createContext<ReturnUseService>({
  isLoading: true,
  page: 1,
  pages: 1,
  products: [],
});

export default ContextService;