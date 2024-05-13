import { timeStringToSeconds } from "@/app/helpers/dates";
import { KeysDayName } from "@/app/molecule/ScheduleCard/types";
import { useEffect, useState } from "react";
import { ScheduleForm } from "./types";
import { promptError } from "@/app/helpers/alerts";
import { v4 } from "uuid";
import { attemptAddSchedule, getSchedule } from "@/app/helpers/api/v1/schedule";
import { DtoAddScheduleItem } from "@/app/models/schedule/types";

export type ScheduleItem = {
  id: string | number;
  day: KeysDayName;
  endTime: number;
  startTime: number;
};

type DaySchedule = {
  isLoading: boolean;
  schedules: ScheduleItem[];
  day: number;
  startTime: string;
  endTime: string;
  refetch: boolean;
  isUpdating: boolean;
};

const INITIAL_SCHEDULES: DaySchedule = {
  isLoading: true,
  schedules: [],
  day: 1,
  endTime: "",
  startTime: "",
  refetch: false,
  isUpdating: false,
};

export default function useSchedules() {
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);

  useEffect(() => {
    (async function () {
      setSchedules((current) => ({
        ...current,
        isLoading: true,
        schedules: [],
      }));

      const apiSchedules = await getSchedule();

      setSchedules((current) => ({
        ...current,
        schedules: apiSchedules.map((item) => ({
          day: item.dia,
          id: item.id,
          endTime: item.hasta,
          startTime: item.desde,
        })),
        isLoading: false,
      }));
    })();
  }, [schedules.refetch]);

  const deleteSchedule = (index: number) =>
    setSchedules((current) => ({
      ...current,
      schedules: current.schedules.filter(
        (schedule, currentIndex) => index !== currentIndex
      ),
    }));

  const appendSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let values: ScheduleForm = {
      desde: "",
      dia: 1,
      hasta: "",
    };

    formData.forEach((value, name) => (values = { ...values, [name]: value }));

    values.desde = timeStringToSeconds(values.desde);
    values.hasta = timeStringToSeconds(values.hasta);

    const schedule: ScheduleItem = {
      id: v4(),
      day: values.dia,
      endTime: values.hasta,
      startTime: values.desde,
    };

    const alreadySchedule = checkScheduleExists(
      values.dia,
      values.desde,
      values.hasta
    );

    e.currentTarget.reset();

    if (alreadySchedule) {
      promptError({
        errorCode: "Datos inválidos",
        message: "No puedes agregar el horario, se sobre pone con otro",
        error: {},
      });
      return;
    }

    setSchedules((current) => ({
      ...current,
      schedules: [schedule, ...current.schedules],
    }));
  };

  function checkScheduleExists(day: number, from: number, to: number) {
    const scheduleToValidate = schedules.schedules.find(
      (schedule) =>
        +schedule.day === +day &&
        ((schedule.startTime >= from && schedule.startTime <= to) ||
          (schedule.endTime >= from && schedule.endTime <= to))
    );

    if (scheduleToValidate === undefined || scheduleToValidate === null)
      return false;

    return true;
  }

  const addScheduleToDb = async () => {
    const dto: DtoAddScheduleItem[] = schedules.schedules
      .filter((item) => typeof item.id !== "number")
      .map((item) => ({
        desde: item.startTime,
        dia: item.day,
        hasta: item.endTime,
      }));

    setSchedules((current) => ({
      ...current,
      isUpdating: true,
    }));

    await attemptAddSchedule(dto);

    setSchedules((current) => ({
      ...current,
      isUpdating: false,
    }));
  };

  return {
    ...schedules,
    deleteSchedule,
    addScheduleToDb,
    appendSchedule,
  };
}
