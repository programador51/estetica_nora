import { useEffect, useState } from "react";
import { ReturnUseTimeTablesItem, StateUseTimeTables } from "./types";

const INITIAL_STATE: StateUseTimeTables = {
  page: 1,
  isLoading: true,
  days:[],
  timetables: [

    {
      day: {
        start: "10:00:00", 
        end: "19:00:00"
      },
      name: "Domingo",
      urlPicture:""
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
