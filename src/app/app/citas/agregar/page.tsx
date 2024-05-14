"use client";
import React from "react";
import ui from "./styles.module.scss";
import DateInput from "@/app/molecule/dateInput";
import UsersSelect from "@/app/molecule/usersSelect";
import Money from "@/app/atom/money";
import Button from "@/app/atom/button";
import ServicesSelect from "@/app/molecule/servicesSelect";
import useReservation from "@/app/customHooks/useReservation";
import ContextReservation from "@/app/Contexts/ReservationContext";
import Services from "./services";
import Time from "@/app/atom/time";
import Spinner from "@/app/molecule/Spinner";
import TimeFieldReservation from "./TimeFieldReservation";
import ScheduleTime from "./ScheduleTime";

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

            <TimeFieldReservation />
          </>
        )}

        <UsersSelect onChange={(user) => hook.setCustomer(user)} />
        <ServicesSelect onChange={hook.appendService} />

        <Services />

        <div className={ui.time}>
          <b>Tiempo total</b>
          <Time>{hook.durationOnMinutes}</Time>
        </div>

        <div className={ui.subtotal}>
          <b>Precio</b>
          <Money>{hook.total}</Money>
        </div>

        <ScheduleTime />
        <Button
          onClick={hook.attemptAddReservation}
          disabled={
            hook.services.length <= 0 ||
            hook.customer === undefined ||
            typeof hook.timeReservation !== "number"
          }
        >
          Crear reservación
        </Button>
      </div>
    </ContextReservation.Provider>
  );
}
