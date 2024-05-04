import React, { useContext, useRef } from "react";
import Spinner from "@/app/molecule/Spinner";
import { v4 } from "uuid";
import ui from "../styles.module.scss";

import DayItem from "@/app/molecule/dayitem";//nueva
import { ContextReservations } from "@/app/Contexts/ReservationsContext";//DaysContext

import { ContextDays } from "@/app/Contexts/DaysContext";//nueva

export default function HorariosCards() {
  const hook = useContext(ContextDays);

  const key = useRef(`${v4()}`);

  if (hook.isLoading) return <Spinner text="Cargando " />;

  return (
    <div className={ui.items}>
      {hook.days.map((item, i) => (
        <DayItem
          key={`${key.current}-${i}`}
          name={item.name}
          day={item.day}
          urlPicture={item.urlPicture}
        />
      ))}
    </div>
  );
}
