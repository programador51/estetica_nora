import { promptConfirmation } from "@/app/helpers/alerts";
import { ServiceOption } from "@/app/molecule/servicesSelect/types";
import {
  OverviewCalculation,
  ReturnUseService,
  StateUseReservation,
} from "./types";
import { useEffect, useState } from "react";
import useTimeTables from "@/app/customHooks/useTimeTables";

const INITIAL_STATE: StateUseReservation = {
  isLoading: false,
  services: [],
  durationOnMinutes: 0,
  total: 0,
  day: new Date(),
  disabledWeekDays: [],
};

export default function useReservation(id?: number): ReturnUseService {
  const [state, setState] = useState(INITIAL_STATE);

  const schedule = useTimeTables();

  useEffect(() => {
    const overview = calculateOverview();

    setState((current) => ({
      ...current,
      durationOnMinutes: overview.durationOnMinutes,
      total: overview.total,
    }));

    ////////////////////////////////////////////

    function calculateOverview() {
      const data: OverviewCalculation = state.services.reduce(
        (indexed, service) => ({
          total: indexed.total + service.sellPrice,
          durationOnMinutes:
            indexed.durationOnMinutes + service.durationOnMinutes,
        }),
        { total: 0, durationOnMinutes: 0 }
      );

      return data;
    }
  }, [state.services]);

  useEffect(() => {
    let allowedWeekDays = new Set();

    const weekDays = [1, 2, 3, 4, 5, 6,7];

    schedule.schedules.forEach((schedule) =>
      allowedWeekDays.add(schedule.day )
    );

    const parsedAllowedDays = Array.from(allowedWeekDays) as number[];

    const blockedDays = weekDays.filter(
      (day) => !parsedAllowedDays.includes(day)
    );

    setState((current) => ({
      ...current,
      disabledWeekDays: blockedDays,
    }));
  }, [schedule.schedules]);

  const promptCancelation = async () => {
    const response = await promptConfirmation({
      title: "¿Cancelar cita?",
      text: `La cita se cancelara y estara sujeto a disponibilidad si deseas volver a reservar`,
    });
  };

  const appendService = (service: ServiceOption) => {
    setState((current) => ({
      ...current,
      services: [service, ...current.services],
    }));
  };

  const deleteService = (index: number) =>
    setState((current) => ({
      ...current,
      services: current.services.filter((service, i) => i !== index),
    }));

  const setDayReservation = (day: Date) =>
    setState((current) => ({
      ...current,
      day: day,
    }));

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && state.disabledWeekDays.includes(date.getDay())) {
      return true; // Disable day if it's in the disabledDaysOfWeek array
    }
    return false; // Enable day otherwise
  };

  return {
    promptCancelation,
    appendService,
    deleteService,
    setDayReservation,
    schedule,
    tileDisabled,
    ...state,
  };
}
