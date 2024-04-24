import { ReturnUseServices } from "@/app/customHooks/useServices/types";
import { createContext } from "react";

const ServiceContext = createContext<ReturnUseServices>({
  isLoading: true,
  page: 1,
  pages: 1,
  services: [],
});

export default ServiceContext;
