"use client";
import useReservations from "@/app/customHooks/useReservations";
import ReservationItem from "@/app/molecule/reservationItem";
import React, { Fragment, useRef } from "react";

export default function Reservations() {
  const hook = useReservations();

  const key = useRef(`${window.crypto.randomUUID()}`);

  return (
    <Fragment>
      <h1>Citas</h1>

      {hook.isLoading ? (
        <p>Cargando</p>
      ) : (
        hook.reservations.map((item, i) => (
          <ReservationItem
            key={`${key.current}-${i}`}
            name={item.name}
            reservation={item.reservation}
            urlPicture={item.urlPicture}
          />
        ))
      )}
    </Fragment>
  );
}
