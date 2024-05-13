"use client";
import React, { useRef, useState } from "react";
import ui from "./styles.module.scss";
import Input from "@/app/atom/input";
import Button from "@/app/atom/button";
import useSchedules from "@/app/customHooks/useSchedules";
import Schedule from "@/app/molecule/ScheduleCard";
import { v4 } from "uuid";
import WeekDay from "@/app/molecule/weekDay";
import Spinner from "@/app/molecule/Spinner";

export default function Schedules() {
  const hook = useSchedules();

  const key = useRef(`${v4()}`);

  if (hook.isLoading)
    return (
      <div className={ui.container}>
        <h1 className={ui.header}>Horario Estética</h1>
        <Spinner text="Cargando horario" />
      </div>
    );

  return (
    <div className={ui.container}>
      <h1 className={ui.header}>Horario Estética</h1>

      <form
        className={ui.formSchedule}
        onSubmit={(e) => hook.appendSchedule(e)}
      >
        <WeekDay required name="dia" label="Día" />
        <Input
          placeholder="Selecciona o escribe aquí"
          name="desde"
          required
          type="time"
          label="Desde"
        />
        <Input
          name="hasta"
          placeholder="Selecciona o escribe aquí"
          required
          type="time"
          label="Hasta"
        />
        <Button disabled={hook.isUpdating}>Agregar</Button>
      </form>

      {hook.isUpdating ? (
        <Spinner text="Actualizando horario" />
      ) : (
        <Button onClick={hook.addScheduleToDb} theme="secondary">
          Guardar cambios
        </Button>
      )}

      {hook.schedules.map((schedule, i) => (
        <Schedule
          id={schedule.id}
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
