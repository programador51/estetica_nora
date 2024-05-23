import { useEffect, useState } from "react";
import { ReturnUseApp, StateUseApp } from "./types";
import { resumeSession } from "@/app/helpers/api/v1/accounts";
import { closeSessionUser } from "@/app/helpers/api/v1/users";

export const INITIAL_STATE: StateUseApp = {
  isLoading: true,
  profile: undefined,
  isClossingSession: false,
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

  const attemptCloseSession = async () => {
    setState((current) => ({
      ...current,
      isClossingSession: true,
    }));

    const wasClossed = await closeSessionUser();

    if (wasClossed) {
      window.location.href = `${window.location.origin}`;
    }

    setState((current) => ({
      ...current,
      isClossingSession: false,
    }));
  };

  return {
    ...state,
    attemptCloseSession,
  };
}
