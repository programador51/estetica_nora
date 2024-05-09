"use client";
import React, { useRef, useState } from "react";
import ui from "./styles.module.scss";
import DateInput from "@/app/molecule/dateInput";
import Input from "@/app/atom/input";
import Money from "@/app/atom/money";
import Button from "@/app/atom/button";
import useSchedules from "@/app/customHooks/useSchedules";
import Schedule from "@/app/molecule/ScheduleCard";
import { v4 } from "uuid";
import WeekDay from "@/app/molecule/weekDay";

export default function Schedules() {
  const hook = useSchedules();

  const key = useRef(`${v4()}`);

  return (
    <div className={ui.container}>
      <h1 className={ui.header}>Horario Estética</h1>

      <form>
        <WeekDay />
        <Input type="time" label="Desde" />
        <Input type="time" label="Hasta" />

        <Button>Agregar</Button>
      </form>

      {hook.schedules.map((schedule, i) => (
        <Schedule
          onDelete={() => hook.deleteSchedule(i)}
          key={`${key.current}-${i}`}
          day={schedule.day}
          endTime={schedule.endTime}
          startTime={schedule.startTime}
        />
      ))}
    </div>
  );
}
