"use client";
import React from "react";
import ui from "./styles.module.scss";
import DateInput from "@/app/molecule/dateInput";
import Input from "@/app/atom/input";
import UsersSelect from "@/app/molecule/usersSelect";
import Money from "@/app/atom/money";
import Button from "@/app/atom/button";
import ServicesSelect from "@/app/molecule/servicesSelect";
import useReservation from "@/app/customHooks/useReservation";
import ContextReservation from "@/app/Contexts/ReservationContext";
import Services from "./services";
import Time from "@/app/atom/time";
import Spinner from "@/app/molecule/Spinner";
import TimePicker from "react-time-picker";

export default function AddReservation() {
  const hook = useReservation();

  return (
    <ContextReservation.Provider value={hook}>
      <div className={ui.container}>
        <h1 className={ui.header}>Alta cita</h1>

        {hook.schedule.isLoading ? (
          <Spinner text="Cargando horarios" />
        ) : (
          <>
            <DateInput
              minDate={new Date()}
              value={hook.day}
              tileDisabled={hook.tileDisabled}
              onChange={(date) =>
                date instanceof Date ? hook.setDayReservation(date) : null
              }
            />
            <TimePicker onChange={(e) => console.log(e)} />
          </>
        )}

        <UsersSelect onChange={(user) => console.log(user.id)} />
        <ServicesSelect onChange={hook.appendService} />

        <Services />

        <Button>Crear reservación</Button>

        <div className={ui.time}>
          <b>Tiempo total</b>
          <Time>{hook.durationOnMinutes}</Time>
        </div>

        <div className={ui.subtotal}>
          <b>Precio</b>
          <Money>{hook.total}</Money>
        </div>
      </div>
    </ContextReservation.Provider>
  );
}
