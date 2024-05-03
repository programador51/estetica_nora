import { promptConfirmation } from "@/app/helpers/account";
import { ServiceOption } from "@/app/molecule/servicesSelect/types";
import { OverviewCalculation, ReturnUseService, StateUseAccessUserRoles } from "./types";
import { useEffect, useState } from "react";

const INITIAL_STATE: StateUseAccessUserRoles = {
  isLoading: false,
  services: [],
  durationOnMinutes: 0,
  total: 0
}

export default function useAccessUserRoles(id?: number): ReturnUseService {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const overview = calculateOverview();
    setState(current => ({
      ...current,
      durationOnMinutes: overview.durationOnMinutes,
      total: overview.total
    }));
  }, [state.services]);

  const calculateOverview = () => {
    const data: OverviewCalculation = state.services.reduce((indexed, service) => ({
      total: indexed.total + service.sellPrice,
      durationOnMinutes: indexed.durationOnMinutes + service.durationOnMinutes
    }), { total: 0, durationOnMinutes: 0 });

    return data;
  }

  const promptCancelation = async () => {
    try {
      const response = await promptConfirmation({
        title: "¿Desea Configurar su Cuenta?",
        text: "¡Hola! Antes de comenzar, necesitamos saber cómo desea configurar su cuenta. Por favor, seleccione una opción:",
        
      });
      console.log("Respuesta del usuario:", response);
    } catch (error) {
      console.error("Error al mostrar la confirmación:", error);
    }
  };

  const appendService = (service: ServiceOption) => {
    setState(current => ({
      ...current,
      services: [service, ...current.services]
    }));
  }

  return {
    promptCancelation,
    appendService,
    ...state
  };
}
