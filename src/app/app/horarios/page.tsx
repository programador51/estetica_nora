"use client";
import useTimeTables from "@/app/customHooks/useTimeTables"; //
import React from "react";
import ui from "./styles.module.scss";
import Button from "@/app/atom/button";
import HorariosCards from "./HorariosCards";
import Link from "next/link";
import { ContextTimeTables } from "@/app/Contexts/TimetablesContext"; //

export default function Schedules() {
  const hook = useTimeTables();

  return (
    <ContextTimeTables.Provider value={hook}>
      <div className={ui.container}>
        <div className={ui.header}>
          <h1>Horario</h1>
          <Link href={"/app/horarios/agregar"}>
            <Button>Agregar</Button>
          </Link>
        </div>

        <HorariosCards />
      </div>
    </ContextTimeTables.Provider>
  );
}
