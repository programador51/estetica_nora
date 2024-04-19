"use client";
import useReservations from "@/app/customHooks/useReservations";
import React, { createContext, useRef } from "react";
import { v4 } from "uuid";
import ui from "./styles.module.scss";
import Button from "@/app/atom/button";
import { ReturnUseReservationItem } from "@/app/customHooks/useReservations/types";
import ReservationCards from "./ReservationCards";
import Link from "next/link";

export const ContextReservations = createContext<ReturnUseReservationItem>({
  isLoading: true,
  page: 1,
  reservations: [],
});

export default function Reservations() {
  const hook = useReservations();

  const key = useRef(`${v4()}`);

  return (
    <ContextReservations.Provider value={hook}>
      <div className={ui.header}>
        <h1>Citas</h1>
        <Link href={'/app/citas/agregar'}>
        <Button>Agregar reservación</Button>
        </Link>
      </div>

      <ReservationCards />
    </ContextReservations.Provider>
  );
}
