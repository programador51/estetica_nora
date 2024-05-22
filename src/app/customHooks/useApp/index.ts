import { useState } from "react";
import { ReturnUseApp, StateUseApp } from "./types";

export const INITIAL_STATE: StateUseApp = {
  isLoading: true,
  profile: {
    fullName: "Nora",
    phone: "+52 81 2173 2091",
    email: "correo@correo.com",
    type: "administrador",
    picture: "",
  },
};

export default function useApp(): ReturnUseApp {
  const [state, setState] = useState(INITIAL_STATE);

  return {
    ...state,
  };
}
