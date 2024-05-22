import { useState } from "react";
import { ReturnUseLogin, StateUseLogin } from "./types";
import { TypeAccount } from "@/app/molecule/typeAccount/types";
import { DtoLoginUser } from "@/app/customHooks/useRegisterUser/types";

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

  const attemptLoginUser = async (dto: DtoLoginUser) => {
    setState((current) => ({
      ...current,
      isLoging: true,
    }));

    setState((current) => ({
      ...current,
      isLoging: false,
    }));
  };

  return {
    ...state,
    attemptLoginUser,
    setTypeAccount,
  };
}
