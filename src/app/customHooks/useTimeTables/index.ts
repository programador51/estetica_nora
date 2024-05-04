import { useEffect, useState } from "react";
import { ReturnUseTimeTablesItem, StateUseTimeTables } from "./types";

const INITIAL_STATE: StateUseTimeTables = {
  page: 1,
  isLoading: true,
  timetables: [
    {
      day: {
        start: "10:00:00", 
        end: "19:00:00"   
      },
      name: "Lunes",
    },
    {
      
      day: {
        start: "10:00:00", 
        end: "19:00:00"
      },
      name: "Martes",
    },
    {
      
      day: {
        start: "10:00:00", 
        end: "19:00:00"
      },
      name: "Miércoles",
    },
    {
      
      day: {
        start: "10:00:00", 
        end: "19:00:00"
      },
      name: "Jueves",
    },
    {
      
      day: {
        start: "10:00:00", 
        end: "19:00:00"
      },
      name: "Viernes",
    },
    {
      day: {
        start: "10:00:00", 
        end: "19:00:00"
      },
      name: "Sábado",
    },
    {
      day: {
        start: "10:00:00", 
        end: "19:00:00"
      },
      name: "Domingo",
    },

  
  ],
};

export default function useTimeTables(): ReturnUseTimeTablesItem {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    setState((current) => ({
      ...current,
      isLoading: false,
    }));
  }, []);

  return {
    ...state,
  };
}
