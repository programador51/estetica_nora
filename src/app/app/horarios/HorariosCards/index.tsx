import React, { useContext, useRef } from "react";
import Spinner from "@/app/molecule/Spinner";
import { v4 } from "uuid";
import { ContextTimeTables } from "@/app/Contexts/TimetablesContext"; //nueva
import Schedule from "@/app/molecule/ScheduleCard";

export default function HorariosCards() {
  const hook = useContext(ContextTimeTables);

  const key = useRef(`${v4()}`);

  if (hook.isLoading) return <Spinner text="Cargando horarios" />;

  return (
    <>
      {hook.schedules.map((item, i) => (
        <Schedule
          day={item.day}
          endTime={item.endTime}
          id={item.id}
          startTime={item.startTime}
          key={`${key.current}-${i}`}
          onDeleted={hook.refetchSchedule}
        />
      ))}
    </>
  );
}
