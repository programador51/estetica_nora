import { promptConfirmation, promptSuccess } from "@/app/helpers/alerts";
import { ServiceOption } from "@/app/molecule/servicesSelect/types";
import {
  OverviewCalculation,
  ReturnUseService,
  StateUseReservation,
  TimeReservation,
} from "./types";
import { useEffect, useState } from "react";
import useTimeTables from "@/app/customHooks/useTimeTables";
import { UserOptionsSelect } from "@/app/molecule/usersSelect/types";
import { addReservation } from "@/app/helpers/api/v1/reservation";
import { formatDateToYYYYMMDD, secondsToHHMM } from "@/app/helpers/dates";
import { useRouter } from "next/navigation";

const INITIAL_STATE: StateUseReservation = {
  isLoading: false,
  services: [],
  durationOnMinutes: 0,
  total: 0,
  day: new Date(),
  disabledWeekDays: [],
  minTime: 0,
  maxTime: 0,
  timeReservation: 0,
  customer: undefined,
  isUpdating: false,
};

export default function useReservation(id?: number): ReturnUseService {
  const [state, setState] = useState(INITIAL_STATE);

  const schedule = useTimeTables();

  const router = useRouter();

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
    const weekday = state.day.getDay();

    const schedulesFound = schedule.schedules.filter(
      (schedule) => schedule.day === weekday
    );

    // Initialize variables to hold the minimum startTime and maximum endTime
    let minStartTime = Infinity;
    let maxEndTime = -Infinity;

    // Iterate through each time slot object
    schedulesFound.forEach((slot) => {
      // Update minStartTime if the current slot's startTime is smaller
      minStartTime = Math.min(minStartTime, slot.startTime);

      // Update maxEndTime if the current slot's endTime is larger
      maxEndTime = Math.max(maxEndTime, slot.endTime);

      setState((current) => ({
        ...current,
        maxTime: maxEndTime,
        minTime: minStartTime,
      }));
    });
  }, [state.day, schedule.schedules]);

  useEffect(() => {
    let allowedWeekDays = new Set();

    const weekDays = [1, 2, 3, 4, 5, 6, 7];

    schedule.schedules.forEach((schedule) => allowedWeekDays.add(schedule.day));

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

  const attemptAddReservation = async () => {
    if (state.customer === undefined) return;

    setState((current) => ({
      ...current,
      isUpdating: true,
    }));

    const wasAdded = await addReservation({
      customer: state.customer.id || null,
      customerName:state.customer.label,
      day: formatDateToYYYYMMDD(state.day),
      services: state.services.map((service) => ({
        cost: service.costPrice,
        id: service.id,
        price: service.sellPrice,
      })),
      timeStart: secondsToHHMM(state.timeReservation || 0),
    });

    setState((current) => ({
      ...current,
      isUpdating: false,
    }));

    if (wasAdded) router.push("/app/citas");
  };

  const setTimeReservation = (time: TimeReservation) => {
    setState((current) => ({
      ...current,
      timeReservation: time,
    }));
  };

  const setCustomer = (customer: UserOptionsSelect) =>
    setState((current) => ({
      ...current,
      customer,
    }));

  return {
    promptCancelation,
    appendService,
    setTimeReservation,
    deleteService,
    setCustomer,
    setDayReservation,
    schedule,
    tileDisabled,
    attemptAddReservation,
    ...state,
  };
}
