import { timeStringToSeconds } from "@/app/helpers/dates";
import { KeysDayName } from "@/app/molecule/ScheduleCard/types";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { ScheduleForm } from "./types";
import { promptError } from "@/app/helpers/alerts";

type ScheduleItem = {
  day: KeysDayName;
  endTime: number;
  startTime: number;
};

type DaySchedule = {
  isLoading: false;
  schedules: ScheduleItem[];
  day: number;
  startTime: string;
  endTime: string;
};

const INITIAL_SCHEDULES: DaySchedule = {
  isLoading: false,
  schedules: [],
  day: 1,
  endTime: "",
  startTime: "",
};

export default function useSchedules() {
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);

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
        errorCode:'Datos inválidos',
        message:'No puedes agregar el horario, se sobre pone con otro',
        error:{}
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
        schedule.day === day &&
        (schedule.endTime <= to || schedule.startTime >= from)
    );

    if (scheduleToValidate === undefined || scheduleToValidate === null)
      return false;

    return true;
  }

  return {
    ...schedules,
    deleteSchedule,
    appendSchedule,
  };
}

