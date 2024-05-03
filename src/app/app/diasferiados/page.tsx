"use client";
import useReservations from "@/app/customHooks/useReservations";//Days
import useDays from "@/app/customHooks/useDays";//Days

import React from "react";
import ui from "./styles.module.scss";
import Button from "@/app/atom/button";
import DiasCards from "./DiasCards";
import Link from "next/link";

//import { ContextReservations } from "@/app/Contexts/ReservationsContext";//
import { ContextDays } from "@/app/Contexts/DaysContext";

export default function Schedules() {
  const hook = useDays();

  return (
    <ContextDays.Provider value={hook}>
      <div className={ui.header}>
        <h1>Días Feriados</h1>
        <Link href={'/app/diasferiados/agregar'}>
        <Button>Agregar</Button>
        </Link>
      </div>

      <DiasCards />
    </ContextDays.Provider>
  );
}
