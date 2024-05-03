import React, { useContext, useRef } from "react";
import Spinner from "@/app/molecule/Spinner";
import { v4 } from "uuid";
import ui from "../styles.module.scss";

import TimeTablesItem from "@/app/molecule/timetablesItem";//nueva
import { ContextReservations } from "@/app/Contexts/ReservationsContext";//DaysContext

import { ContextTimeTables } from "@/app/Contexts/TimetablesContext";//nueva

export default function HorariosCards() {
  const hook = useContext(ContextTimeTables);

  const key = useRef(`${v4()}`);

  if (hook.isLoading) return <Spinner text="Cargando " />;

  return (
    <div className={ui.items}>
      {hook.timetables && hook.timetables.map((item, i) => (
        <TimeTablesItem
          key={`${key.current}-${i}`}
          name={item.name}
          day={item.day}
          urlPicture={item.urlPicture}
        />
    ))}
    </div>
  );
}
