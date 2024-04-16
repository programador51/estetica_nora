import { INITIAL_STATE } from "@/app/customHooks/useApp";
import { ReturnUseApp } from "@/app/customHooks/useApp/types";
import { createContext } from "react";


export const ContextApp = createContext<ReturnUseApp>(INITIAL_STATE);
