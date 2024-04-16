"use client";
import useReservations from "@/app/customHooks/useReservations";
import ReservationItem from "@/app/molecule/reservationItem";
import React, { Fragment, useRef } from "react";
import { v4 } from "uuid";

export default function Reservations() {
  const hook = useReservations();

  const key = useRef(`${v4()}`);

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
