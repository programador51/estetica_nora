import { useState } from "react";
import { ReturnUseLogin, StateUseLogin } from "./types";
import { TypeAccount } from "@/app/molecule/typeAccount/types";

const INITIAL_STATE: StateUseLogin = {
  type: "administrador",
  isLoging: false,
};

export default function useLogin(): ReturnUseLogin {
  const [state, setState] = useState(INITIAL_STATE);

  const setTypeAccount = (type: TypeAccount) => {
    setState((current) => ({
      ...current,
      type,
    }));
  };

  return {
    ...state,
    setTypeAccount,
  };
}
