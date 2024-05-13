import { timeStringToSeconds } from "@/app/helpers/dates";
import { KeysDayName } from "@/app/molecule/ScheduleCard/types";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { ScheduleForm } from "./types";

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
  schedules: [
    { day: 1, startTime: 9 * 3600, endTime: 17 * 3600 }, // Day 1 (Monday) from 9 AM to 5 PM
    { day: 2, startTime: 9 * 3600, endTime: 17 * 3600 }, // Day 2 (Tuesday) from 9 AM to 5 PM
    { day: 3, startTime: 9 * 3600, endTime: 17 * 3600 }, // Day 3 (Wednesday) from 9 AM to 5 PM
    { day: 4, startTime: 9 * 3600, endTime: 17 * 3600 }, // Day 4 (Thursday) from 9 AM to 5 PM
    { day: 5, startTime: 9 * 3600, endTime: 17 * 3600 }, // Day 5 (Friday) from 9 AM to 5 PM
    { day: 6, startTime: 10 * 3600, endTime: 16 * 3600 }, // Day 6 (Saturday) from 10 AM to 4 PM
    { day: 7, startTime: 10 * 3600, endTime: 16 * 3600 }, // Day 7 (Sunday) from 10 AM to 4 PM
  ],
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

    setSchedules((current) => ({
      ...current,
      schedules: [schedule, ...current.schedules],
    }));

    e.currentTarget.reset();
  };

  return {
    ...schedules,
    deleteSchedule,
    appendSchedule,
  };
}
