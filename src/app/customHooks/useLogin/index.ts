import { useState } from "react";
import { ReturnUseLogin, StateUseLogin } from "./types";
import { TypeAccount } from "@/app/molecule/typeAccount/types";
import { DtoLoginUser } from "@/app/customHooks/useRegisterUser/types";
import { loginUser } from "@/app/helpers/api/v1/users";
import { useRouter } from "next/navigation";

const INITIAL_STATE: StateUseLogin = {
  type: "administrador",
  isLoging: false,
};

export default function useLogin(): ReturnUseLogin {
  const [state, setState] = useState(INITIAL_STATE);
  const router = useRouter();

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

    const wasLogged = await loginUser({
      contrasena: dto.contrasena,
      correo: dto.correo,
      tipoDeCuenta: state.type,
    });

    if (wasLogged) {
      window.location.href = `${window.location.origin}/app/citas`;
    }

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
