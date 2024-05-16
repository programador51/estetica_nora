import React, { useContext, useRef } from "react";
import Spinner from "@/app/molecule/Spinner";
import { v4 } from "uuid";
import ui from "../styles.module.scss";
import ReservationItem from "@/app/molecule/reservationItem";
import { ContextReservations } from "@/app/Contexts/ReservationsContext";

export default function ReservationCards() {
  const hook = useContext(ContextReservations);

  const key = useRef(`${v4()}`);

  if (hook.isLoading) return <Spinner text="Cargando reservaciones" />;

  return (
    <div className={ui.items}>
      {hook.reservations.map((item, i) => (
        <ReservationItem
          key={`${key.current}-${i}`}
          name={item.name}
          reservation={item.reservation}
          urlPicture={item.urlPicture}
          id={item.id}
        />
      ))}
    </div>
  );
}
