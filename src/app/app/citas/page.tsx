"use client";
import useReservations from "@/app/customHooks/useReservations";
import React from "react";
import ui from "./styles.module.scss";
import Button from "@/app/atom/button";
import ReservationCards from "./ReservationCards";
import Link from "next/link";
import { ContextReservations } from "@/app/Contexts/ReservationsContext";
import Pagination from "@/app/molecule/pagination";

export default function Reservations() {
  const hook = useReservations();

  return (
    <ContextReservations.Provider value={hook}>
      <div className={ui.header}>
        <h1>Citas</h1>
        <Link href={"/app/citas/agregar"}>
          <Button>Agregar reservación</Button>
        </Link>
      </div>

      <ReservationCards />

      <Pagination page={hook.page} pages={hook.pages} />
    </ContextReservations.Provider>
  );
}
