import { useEffect, useState } from "react";
import { ReturnUseApp, StateUseApp } from "./types";
import { resumeSession } from "@/app/helpers/api/v1/accounts";

export const INITIAL_STATE: StateUseApp = {
  isLoading: true,
  profile: undefined,
};

export default function useApp(): ReturnUseApp {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    (async function () {
      const session = await resumeSession();

      setState((current) => ({
        ...current,
        isLoading: false,
      }));

      if (session !== undefined) {
        setState((current) => ({
          ...current,
          profile: {
            email: session.correo,
            fullName: "".concat(
              session.primerNombre + " ",
              session.segundoNombre || " " + " ",
              session.apellidoPaterno || " " + " ",
              session.apellidoMaterno || " "
            ),
            phone: session.telefono,
            picture: session.fotoPerfil,
            type: session.tipoDeCuenta,
          },
        }));
      }
    })();
  }, []);

  return {
    ...state,
  };
}
