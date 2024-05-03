import { promptConfirmation } from "@/app/helpers/alerts";//
import { ServiceOption } from "@/app/molecule/servicesSelect/types";//
import { OverviewCalculation, ReturnUseService, StateUseTimeTable } from "./types";
import { useEffect, useState } from "react";

const INITIAL_STATE:StateUseTimeTable = {
  isLoading:false,
  services:[],
  durationOnMinutes:0,
  total:0
}

export default function useTimeTable(id?: number):ReturnUseService {

  const [state,setState] = useState(INITIAL_STATE);

  useEffect(()=>{

    const overview = calculateOverview();

    setState(current=>({
      ...current,
      durationOnMinutes:overview.durationOnMinutes,
      total:overview.total
    }))

    ////////////////////////////////////////////

    function calculateOverview(){
      const data:OverviewCalculation = state.services.reduce((indexed,service)=>({
        total:indexed.total + service.sellPrice,
        durationOnMinutes:indexed.durationOnMinutes + service.durationOnMinutes
      }),{ total:0,
        durationOnMinutes:0 })

      return data;
    }


  },[state.services]);

  const promptCancelation = async () => {
    const response = await promptConfirmation({
      title: "Borrar horario",
  text: "¿Estás seguro de que deseas eliminar este horario?",
    });
  };

  const appendService = (service:ServiceOption) => {
    setState(current=>({
      ...current,
      services:[service,...current.services]
    }))
  }

  return {
    promptCancelation,
    appendService,
    ...state
  };
}
