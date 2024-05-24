import {
  ContentModalPromote,
  OnUpdatedUser,
  ReturnUseService,
  StateUseAccessUserRoles,
} from "./types";
import { useState } from "react";
import { TypeAccount } from "@/app/molecule/typeAccount/types";
import { promptConfirmation } from "@/app/helpers/alerts";
import { promoteUserAccount } from "@/app/helpers/api/v1/users";

const INITIAL_STATE: StateUseAccessUserRoles = {
  isPerformingUpdate: false,
};

export default function useAccessUserRoles(
  onUpdated: OnUpdatedUser = () => {}
): ReturnUseService {
  const [state, setState] = useState(INITIAL_STATE);

  const promptPromoteConfirmation = async (id: number, type: TypeAccount) => {
    const title: ContentModalPromote = {
      administrador: "Promover a administrador",
      superAdministrador: "Promover a super administrador",
      usuario: "Delegar a tipo usuario",
    };

    const messsage: ContentModalPromote = {
      administrador: `¿Estas seguro de promover? El usuario tendra acceso a todo excepto al modulo de 'Cuentas'`,
      superAdministrador: `¿Estas seguro de promover? El usuario tendra acceso a todas las opciones del sistema`,
      usuario: `¿Estas seguro de delega? El usuario solo podra utilizar el sistema como cliente para reservar citas`,
    };

    const { isConfirmed } = await promptConfirmation({
      title: title[type],
      text: messsage[type],
    });

    if (isConfirmed) {
      setState((current) => ({
        ...current,
        isPerformingUpdate: true,
      }));

      const wasUpdated = await promoteUserAccount(id, type);

      if(wasUpdated) onUpdated(type);

      setState((current) => ({
        ...current,
        isPerformingUpdate: false,
      }));
    }
  };

  return {
    promptPromoteConfirmation,
    ...state,
  };
}
