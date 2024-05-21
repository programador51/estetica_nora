import { useEffect, useState } from "react";
import { ReturnUseTimeTablesItem, StateUseTimeTables } from "./types";
import { getSchedule } from "@/app/helpers/api/v1/schedule";

const INITIAL_STATE: StateUseTimeTables = {
  isLoading: true,
  schedules: [],
  refetch: false,
};

export default function useTimeTables(): ReturnUseTimeTablesItem {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    (async function () {
      setState((current) => ({
        ...current,
        isLoading: true,
      }));

      const apiSchedules = await getSchedule();

      setState((current) => ({
        ...current,
        isLoading: false,
        schedules: apiSchedules.map((item) => ({
          day: item.dia,
          endTime: item.hasta,
          id: item.id,
          startTime: item.desde,
        })),
      }));
    })();
  }, [state.refetch]);

  const refetchSchedule = () => {
    setState((current) => ({
      ...current,
      refetch: !current.refetch,
    }));
  };

  return {
    ...state,
    refetchSchedule
  };
}
